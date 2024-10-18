import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { IOutlinedProps } from "../types";
import { BUTTON_STATUSES } from "./config";

type IButtonAttributesWithoutOnClick = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export interface ISmartLockButton
  extends IOutlinedProps,
    IButtonAttributesWithoutOnClick {
  status?: BUTTON_STATUSES;
}
