"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { characters } from "@/data/characters";

export function Characters() {
  const [selectedId, setSelectedId] = useState(characters[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const selected =
    characters.find((character) => character.id === selectedId) ??
    characters[0];

  const openCharacter = (
    character: (typeof characters)[number],
    trigger: HTMLButtonElement,
  ) => {
    triggerRef.current = trigger;
    setSelectedId(character.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  return (
    <Section bg="pale">
      <Container>
        <SectionHeading>幸築サポーターズの紹介</SectionHeading>
        <p className="mx-auto mb-10 max-w-[600px] text-center text-[15px] leading-loose text-text-mid">
          丸伊不動産をもっと身近に感じていただくための、
          <br />
          オリジナルキャラクターたちです。
        </p>

        <div className="grid grid-cols-2 gap-4 lp-md:grid-cols-4 lp-md:gap-6">
          {characters.map((character) => {
            const isSelected = character.id === selectedId;
            const isFlipped = isSelected && isModalOpen;
            return (
              <button
                key={character.id}
                type="button"
                aria-pressed={isSelected}
                onClick={(event) =>
                  openCharacter(character, event.currentTarget)
                }
                style={{ perspective: "1200px" }}
                className={`flex min-h-11 min-w-0 flex-col items-center gap-2 rounded-card border px-3 py-4 transition-transform motion-safe:duration-200 ${
                  isSelected
                    ? "scale-[1.03] border-primary bg-[oklch(0.94_0.03_235)]"
                    : "border-border bg-bg-white hover:border-primary-dark"
                }`}
              >
                <div
                  className="character-flip-card relative aspect-square w-full"
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div className="character-flip-face absolute inset-0 overflow-hidden rounded-card bg-bg-white">
                    <Image
                      src={character.thumbnailImage}
                      alt={`${character.name} キャラクター紹介`}
                      fill
                      sizes="(min-width: 900px) 22vw, 45vw"
                      className="object-contain p-2"
                      style={
                        character.thumbnailScale
                          ? { transform: `scale(${character.thumbnailScale})` }
                          : undefined
                      }
                    />
                  </div>
                  <div className="character-flip-face character-flip-face-back absolute inset-0 flex items-center justify-center rounded-card bg-primary">
                    <span className="px-2 text-center text-sm font-bold text-white">
                      {character.name}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-text-dark">
                  {character.name}
                </span>
              </button>
            );
          })}
        </div>
      </Container>

      {isModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-8">
          <button
            type="button"
            aria-label="閉じる"
            onClick={closeModal}
            className="absolute inset-0 bg-black/30"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="character-modal-title"
            className="relative w-[92vw] max-h-[85vh] motion-safe:animate-fade-up lp-md:w-full lp-md:max-w-[760px] lp-md:max-h-[80vh]"
          >
            <h2 id="character-modal-title" className="sr-only">
              {selected.name} キャラクター紹介
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="閉じる"
              onClick={closeModal}
              className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg-white text-lg font-bold text-text-dark shadow-lg"
            >
              ×
            </button>
            <div className="max-h-[85vh] overflow-y-auto rounded-card bg-bg-white shadow-xl lp-md:max-h-[80vh]">
              <Image
                src={selected.profileImage}
                alt={`${selected.name} キャラクター紹介`}
                width={3240}
                height={4050}
                className="h-auto w-full rounded-card"
                sizes="(min-width: 900px) 760px, 92vw"
              />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
