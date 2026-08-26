"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faq";

export function Faq() {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <Section
      id="faq"
      bg="pale"
      dividerBottom={{ variant: "c", color: "var(--color-bg-white)" }}
    >
      <Container narrow>
        <SectionHeading>よくあるご質問</SectionHeading>
        <div className="mt-8 flex flex-col">
          {faqs.map((item, index) => {
            const isOpen = openIndexes.has(index);
            const questionId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <div key={item.question} className="border-b border-border">
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggle(index)}
                  className="flex min-h-11 w-full items-center justify-between gap-4 px-1 py-[22px] text-left"
                >
                  <span className="text-[15.5px] font-bold leading-[1.6] text-text-dark">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-[20px] font-normal text-primary transition-transform motion-safe:duration-300 ${
                      isOpen ? "rotate-[135deg]" : "rotate-0"
                    }`}
                  >
                    ＋
                  </span>
                </button>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  className={`overflow-hidden transition-[max-height,opacity] motion-safe:duration-300 ${
                    isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="mx-1 mb-[22px] text-[14.5px] leading-[1.9] text-text-mid">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
