"use client";
import { Button } from "@/components/ui/button";
import { SmartLockDevice } from "@/components/ui/smart-lock-device";
import { useIotDeviceStore } from "@/store/iot-device-store";

export const MainMarketingSection = () => {
  const outlinedIot = useIotDeviceStore((state) => state.outlined);
  const autoAnimatedIot = useIotDeviceStore((state) => state.autoAnimated);

  return (
    <div className="lg:grid grid-cols-[1fr_264px] grid-rows-1 border-y-[1px] border-dashed border-grey-dark h-fit">
      <div className="lg:border-r-[1px] lg:border-b-0 border-b-[1px] border-dashed border-grey-dark lg:p-20 px-6 py-10 flex text-start flex-col gap-8">
        <div className="flex flex-col lg:text-[36px] text-[30px] font-[600] lg:leading-10 leading-[34px] -tracking-[1.5px]">
          <h1 className="text-typography-dark">
            Create access codes for any smart lock using Seam API.
          </h1>
          <h1 className="text-typography-light">
            Just set up time and let us handle the rest
          </h1>
        </div>
        <Button>Learn more</Button>
      </div>
      <SmartLockDevice
        classname="scale-[1.007] mx-auto"
        outlined={outlinedIot}
        autoAnimated={autoAnimatedIot}
      />
    </div>
  );
};
