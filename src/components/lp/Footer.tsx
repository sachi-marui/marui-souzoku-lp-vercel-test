import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";

const mapQuery = encodeURIComponent(
  `〒${company.postalCode} ${company.address}`,
);
const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const mapViewUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

export function Footer() {
  return (
    <footer className="bg-primary pb-[90px] text-white lp-md:pb-0">
      <Container className="flex flex-col gap-8 pt-12 pb-6 lp-md:flex-row lp-md:gap-12 lp-md:pt-16 lp-md:pb-8">
        <div className="flex flex-[1.2] flex-col gap-1.5">
          <p className="mb-2 text-xl font-black">{company.name}</p>
          <p className="text-[13.5px] leading-[1.8] opacity-[0.92]">
            〒{company.postalCode} {company.address}
          </p>
          <a
            href={company.phoneHref}
            className="text-[13.5px] leading-[1.8] opacity-[0.92]"
          >
            TEL：{company.phoneDisplay}
          </a>
          <p className="text-[13.5px] leading-[1.8] opacity-[0.92]">
            営業時間：{company.businessHours}　定休日：{company.closedDay}
          </p>
          <span className="mt-3 w-fit rounded-full border border-white/30 bg-accent px-[14px] py-[5px] text-[11.5px] font-semibold text-white">
            {company.membershipBadge}
          </span>
        </div>

        <div className="flex-1">
          <div className="h-[230px] w-full overflow-hidden rounded-[16px] lp-md:h-[260px]">
            <iframe
              src={mapEmbedUrl}
              title={`${company.legalName} Googleマップ`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={mapViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-white/80 underline"
          >
            Googleマップで見る
          </a>
        </div>

        <div className="flex flex-col gap-[10px] text-[13.5px]">
          <a href="#company-overview" className="text-white/90">
            会社概要
          </a>
          <a href={company.privacyPolicyUrl} className="text-white/90">
            プライバシーポリシー
          </a>
          <a href={company.contactUrl} className="text-white/90">
            お問い合わせ
          </a>
          <a
            href={company.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90"
          >
            公式サイト ↗
          </a>
        </div>
      </Container>
      <p className="border-t border-white/20 px-5 py-[18px] text-center text-[11.5px] opacity-75">
        © {company.legalName} All Rights Reserved.
      </p>
    </footer>
  );
}
