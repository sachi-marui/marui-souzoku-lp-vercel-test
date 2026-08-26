import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/data/company";

const rows: Array<{ label: string; content: ReactNode }> = [
  { label: "代表者", content: company.representative },
  {
    label: "所在地",
    content: `〒${company.postalCode} ${company.address}`,
  },
  {
    label: "電話番号",
    content: (
      <a href={company.phoneHref} className="text-primary-dark">
        {company.phoneDisplay}
      </a>
    ),
  },
  { label: "FAX", content: company.faxDisplay },
  { label: "営業時間", content: company.businessHours },
  { label: "定休日", content: company.closedDay },
  { label: "宅地建物取引業免許番号", content: company.licenseNumber },
  {
    label: "加盟",
    content: (
      <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
        {company.membershipBadge}
      </span>
    ),
  },
];

export function CompanyOverview() {
  return (
    <Section
      id="company-overview"
      bg="pale"
      dividerBottom={{ variant: "b", color: "var(--color-primary)" }}
    >
      <Container narrow>
        <SectionHeading>会社概要</SectionHeading>
        <div className="rounded-card border border-border bg-bg-white px-6 py-8 lp-md:px-10 lp-md:py-10">
          <p className="mb-6 text-xl font-bold text-text-dark">
            {company.legalName}
          </p>
          <dl>
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 border-t border-border py-4 first:border-t-0 lp-md:flex-row lp-md:items-baseline lp-md:gap-6"
              >
                <dt className="shrink-0 text-sm font-bold text-text-mid lp-md:w-[180px]">
                  {row.label}
                </dt>
                <dd className="text-[15px] leading-relaxed text-text-dark">
                  {row.content}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
