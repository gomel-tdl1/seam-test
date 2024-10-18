import { DescriptionMarketingSection } from "@/components/pages/marketing/description-marketing-section";
import { HashesMarketingSection } from "@/components/pages/marketing/hashes-marketing-section";
import { MainMarketingSection } from "@/components/pages/marketing/main-marketing-section";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen md:max-w-[804px] max-w-[95%] border-x-[1px] border-dashed border-grey-dark md:pt-[182px] pt-[91px]">
      <MainMarketingSection />
      <DescriptionMarketingSection />
      <HashesMarketingSection />
    </div>
  );
}
