import { cn } from "@/lib/utils";
import { FC, useMemo } from "react";
import { OUTLINED_STYLES } from "../constants";
import { BUTTON_STATUSES, ButtonConditionalStyles } from "./config";
import { ISmartLockButton } from "./types";
import { DashedBorderButton } from "@/components/icons/dashed-border";

export const SmartLockButton: FC<ISmartLockButton> = ({
  outlined,
  children,
  status = BUTTON_STATUSES.IDLE,
  className,
  ...props
}) => {
  const buttonConditionalStyles = useMemo(
    () => ButtonConditionalStyles[status],
    [status],
  );

  return (
    <button
      className={cn(
        className,
        "w-[56px] h-[56px] rounded-full flex items-center justify-center text-[18px] cursor-pointer transition-all font-mono relative disabled:cursor-default",
        outlined
          ? OUTLINED_STYLES
          : "border-solid border-[2px] border-smartlock-border bg-gradient-to-br from-smartlock-gradientLightSide to-smartlock-gradientDarkSide shadow-button",
        buttonConditionalStyles,
      )}
      {...props}
    >
      {outlined && <DashedBorderButton className="absolute top-0 left-0" />}
      {children}
    </button>
  );
};
