import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "../icons/arrow-right";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap w-fit rounded-full font-[600] cursor-pointer disabled:cursor-not-allowed transition-all",
  {
    variants: {
      variant: {
        default:
          "bg-typography-dark text-typography-lightest px-[14px] py-2 hover:bg-typography-hover",
        link: "bg-transparent text-typography-dark flex items-center gap-2 p-0 hover:text-typography-hover hover:underline hover:gap-3",
      },
      size: {
        default: "h-[36px] text-[14px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {variant === "link" && <ArrowRightIcon />}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
