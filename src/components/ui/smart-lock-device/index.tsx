"use client";
import { cn, getRandomDigits, sleep } from "@/lib/utils";
import { FC, useCallback, useEffect, useState } from "react";
import { OUTLINED_STYLES } from "./constants";
import { IOutlinedProps } from "./types";
import { SmartLockButton } from "./smart-lock-button";
import { LockIcon, LockOutlinedIcon } from "@/components/icons/lock";
import {
  DashedBorderIn,
  DashedBorderOut,
} from "@/components/icons/dashed-border";
import * as motion from "framer-motion/client";
import {
  LIGHT_DURATION,
  LIGHTS_COUNT,
  MAX_PIN_LENGTH,
  useIotDeviceStore,
} from "@/store/iot-device-store";

const INPUT_ANIMATION_DELAY = 700;

export const SmartLockDevice: FC<
  IOutlinedProps & { autoAnimated?: boolean }
> = ({ outlined, classname, autoAnimated }) => {
  const iotStore = useIotDeviceStore();
  const [isRandomCode, setIsRandomCode] = useState(false);

  const simulatePinCodeFlow = useCallback(async () => {
    const passcode = isRandomCode
      ? getRandomDigits(MAX_PIN_LENGTH)
      : iotStore.pinCode;
    for (let i = 0; i < MAX_PIN_LENGTH; i++) {
      iotStore.pressKey(Number(passcode[i]));
      await sleep(700);
    }
    iotStore.validateAccessCodeInput();
  }, [iotStore, isRandomCode]);

  useEffect(() => {
    if (autoAnimated) {
      const interval = setInterval(
        async () => {
          await simulatePinCodeFlow();
          setIsRandomCode((prev) => !prev);
        },
        // Animation duration (digits input time + result lights duration + extra 1s)
        INPUT_ANIMATION_DELAY * MAX_PIN_LENGTH +
          LIGHT_DURATION * LIGHTS_COUNT +
          800,
      );

      return () => clearTimeout(interval);
    }
  }, [autoAnimated, simulatePinCodeFlow]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className={cn(
        classname,
        "h-[432px] w-[264px] rounded-[60px] p-2 transition-all relative",
        outlined ? OUTLINED_STYLES : "bg-smartlock-outline shadow-inner",
      )}
    >
      {outlined && <DashedBorderOut className="absolute top-0 left-0" />}
      <div
        className={cn(
          "w-full h-full rounded-[52px] transition-all p-6 flex flex-col items-center justify-between relative",
          outlined
            ? OUTLINED_STYLES
            : "bg-smartlock-background box-border border-[1px] border-solid border-smartlock-border shadow-inner",
        )}
      >
        {outlined && <DashedBorderIn className="absolute top-0 left-0" />}
        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
              <SmartLockButton
                key={num}
                outlined={outlined}
                status={iotStore.keyStatus[num]}
                onClick={() => {
                  if (!autoAnimated) iotStore.pressKey(num);
                }}
              >
                {num}
              </SmartLockButton>
            ))}
          </div>
          <div className="grid grid-cols-3 grid-rows-1 gap-4">
            <div /> {/* Make first grid slot empty */}
            <SmartLockButton
              outlined={outlined}
              status={iotStore.keyStatus[0]}
              onClick={() => {
                if (!autoAnimated) iotStore.pressKey(0);
              }}
            >
              0
            </SmartLockButton>
            <SmartLockButton
              outlined={outlined}
              onClick={() => {
                if (!autoAnimated) iotStore.validateAccessCodeInput();
              }}
            >
              ✓
            </SmartLockButton>
          </div>
        </div>
        {outlined && <LockOutlinedIcon />}
        {!outlined && <LockIcon />}
      </div>
    </motion.div>
  );
};
