import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mainStaff, otherStaff } from "@/data/staff";

export function Staff() {
  return (
    <Section
      bg="white"
      dividerBottom={{ variant: "a", color: "var(--color-bg-pale)" }}
    >
      <Container>
        <SectionHeading>私たちがご相談をお伺いします。</SectionHeading>

        <div className="grid grid-cols-1 gap-8 lp-md:grid-cols-2 lp-md:gap-10">
          {mainStaff.map((member) => (
            <div key={member.id} className="flex min-w-0 flex-col gap-3">
              <ImagePlaceholder label={member.photo} aspectRatio="4/5" />
              <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                {member.certification}
              </span>
              <p className="text-[19px] font-bold text-text-dark">
                {member.name}
              </p>
              <p className="text-sm text-text-mid">{member.role}</p>
              <p className="text-sm leading-relaxed text-text-mid">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 mb-6 text-center text-lg font-bold text-text-dark">
          丸伊不動産スタッフ
        </p>
        <div className="mb-10 grid grid-cols-2 gap-6 lp-md:grid-cols-4 lp-md:gap-8">
          {otherStaff.map((member) => (
            <div key={member.id} className="flex min-w-0 flex-col gap-2">
              <ImagePlaceholder label={member.photo} aspectRatio="1/1" />
              <p className="text-sm font-bold text-text-dark">
                {member.name}
              </p>
              <p className="text-xs text-text-mid">{member.role}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto max-w-[600px] text-center text-[15px] leading-loose text-text-mid">
          相続や不動産のことは、分からないことが多くて当然です。
          <br />
          専門用語をできるだけ使わず、一つずつご説明します。
          <br />
          押し売りや、急いで決断を求めることはありません。
        </p>
      </Container>
    </Section>
  );
}
