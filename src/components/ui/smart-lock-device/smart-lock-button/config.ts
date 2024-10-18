export enum BUTTON_STATUSES {
  IDLE, // base button status when inactive
  PRESSED, // user presses the button
  GREEN, // user entered correct number
  RED, // user entered incorrect number
}

export const ButtonConditionalStyles: Record<BUTTON_STATUSES, string> = {
  [BUTTON_STATUSES.IDLE]: "text-grey-dark",
  [BUTTON_STATUSES.PRESSED]:
    "text-grey-light enabled:translate-y-[1.6%] enabled:shadow-none [text-shadow:_0_0_2px_#E0E0E5]",
  [BUTTON_STATUSES.GREEN]: "text-green-light [text-shadow:_0_0_1px_#4ADE80]",
  [BUTTON_STATUSES.RED]: "text-red-light [text-shadow:_0_0_1px_#EF4444]",
};
