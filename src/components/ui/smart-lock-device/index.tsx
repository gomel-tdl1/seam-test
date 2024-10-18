"use client";
import { cn } from "@/lib/utils";
import { FC, useCallback } from "react";
import { OUTLINED_STYLES } from "./constants";
import { IOutlinedProps } from "./types";
import { SmartLockButton } from "./smart-lock-button";
import { LockIcon, LockOutlinedIcon } from "@/components/icons/lock";
import {
  DashedBorderIn,
  DashedBorderOut,
} from "@/components/icons/dashed-border";
import * as motion from "framer-motion/client";
import { useIotDeviceStore } from "@/store/iot-device-store";

export const SmartLockDevice: FC<IOutlinedProps> = ({ outlined }) => {
  const iotStore = useIotDeviceStore();

  const checkPin = useCallback(() => {
    iotStore.checkPin("1231");
  }, [iotStore]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className={cn(
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
                onClick={() => iotStore.pressKey(num)}
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
              onClick={() => iotStore.pressKey(0)}
            >
              0
            </SmartLockButton>
            <SmartLockButton outlined={outlined} onClick={checkPin}>
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
