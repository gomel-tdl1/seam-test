"use client";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useIotDeviceStore } from "@/store/iot-device-store";
import { FC, HTMLAttributes } from "react";
import { useScramble } from "use-scramble";

const HashLine: FC<HTMLAttributes<HTMLParagraphElement> & { text: string }> = ({
  text,
  className,
  ...props
}) => {
  const { ref: hash } = useScramble({
    text,
  });
  return (
    <div
      className={cn(
        className,
        "w-full bg-background py-[2px] px-2 border-y-[1px] border-dashed border-grey-dark overflow-hidden",
      )}
    >
      <p
        className={
          "w-full text-grey-middle text-[14px] leading-5 font-mono font-[300] text-ellipsis overflow-hidden"
        }
        ref={hash}
        {...props}
      />
    </div>
  );
};

export const HashesMarketingSection = () => {
  const iotStore = useIotDeviceStore();

  return (
    <div className="relative">
      {/* Vertical lines below */}
      <div className="absolute top-0 md:right-[131px] right-[23px] border-l-[1px] border-dashed border-grey-dark h-full" />
      <div className="absolute top-0 md:right-[263px] right-[47px] border-l-[1px] border-dashed border-grey-dark h-full" />

      <div className="relative grid md:grid-cols-[1fr_132px_132px] grid-cols-[1fr_24px_24px] gap-y-2">
        <HashLine
          className="col-span-3"
          text="mRPzMrBW45hVRMDJCbmwpk9mGTkLGubnYev1eiRZ5TvUbf6RyuTkbuFGUiuBpffBfwxXrwBfXKJXeHVHE9qjPaeqzJzZZPFqkVTj"
        />
        <HashLine
          className="col-span-2"
          text="gB1AqU28p1ftcjderiYjpZa5eitTwQoQP9WisQ2Jzm5NMRhbfw2vdfv5BF1EjxTPJxFpU6j09J7ZHehjxGDKB9yZWZ1qYaVGqLfd"
        />
        <div /> {/* Empty grid slot */}
        <HashLine
          className="col-span-1"
          text="oxgxErXgpXZED9aeVXNmThkGaeHpm0zsb6mQNPCChMJPiRq3qQP9ewG5ZdRd2UVaeVzrYf6VywnpYET0pnjbTEbEa2Ly14isgDX4"
        />
        <div /> {/* Empty grid slot */}
        <div /> {/* Empty grid slot */}
        <div className="md:p-20 px-6 py-10">
          <p className="text-typography-light text-[16px] font-[500] leading-[22px] -tracking-[0.32px]">
            Some content here...
          </p>
          <div className="flex flex-row-reverse items-center justify-end gap-2 my-2">
            <p className="text-typography-light text-[16px] font-[500] leading-[22px] -tracking-[0.32px]">
              IoT auto-animation
            </p>
            <Switch
              checked={iotStore.autoAnimated}
              onClick={() => iotStore.toggleAutoAnimated()}
            />
          </div>
          <div className="flex flex-row-reverse items-center justify-end gap-2">
            <p className="text-typography-light text-[16px] font-[500] leading-[22px] -tracking-[0.32px]">
              IoT outlined
            </p>
            <Switch
              checked={iotStore.outlined}
              onClick={() => iotStore.toggleOutlined()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
