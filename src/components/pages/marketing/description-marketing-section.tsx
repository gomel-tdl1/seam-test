import { Button } from "@/components/ui/button";

export const DescriptionMarketingSection = () => {
  return (
    <div className="lg:p-20 px-6 py-10 flex flex-col gap-4">
      <p className="text-[16px] text-typography-light font-[500] leading-[22px] -tracking-[0.32px]">
        Seam makes it easy to integrate IoT devices with your applications. We
        have integrated many door locks, thermostats, and other device brands,
        and we have created simple application programming interfaces (APIs) for
        interacting with these devices.
      </p>
      <Button variant="link">Read docs</Button>
    </div>
  );
};
