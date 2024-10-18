import { BUTTON_STATUSES } from "@/components/ui/smart-lock-device/smart-lock-button/config";
import { sleep } from "@/lib/utils";
import { create } from "zustand";

export const MAX_PIN_LENGTH = 4;
export const LIGHT_DURATION = 300;
export const LIGHTS_COUNT = 3;

interface State {
  outlined: boolean;
  autoAnimated: boolean;
  pinCode: string;
  pinInput: string;
  keyStatus: Record<number, BUTTON_STATUSES>;
}

interface Action {
  pressKey: (keyNum: number) => void;
  validateAccessCodeInput: () => void;
  toggleOutlined: () => void;
  toggleAutoAnimated: () => void;
  reset: () => void;
}

const initialState: State = {
  pinCode: "1407",
  outlined: false,
  autoAnimated: true,
  pinInput: "",
  keyStatus: Object.fromEntries(
    Array.from({ length: 10 })
      .keys()
      .map((num) => [num, BUTTON_STATUSES.IDLE]),
  ),
};

export const useIotDeviceStore = create<State & Action>((set, getState) => ({
  ...initialState,
  pressKey: (keyNum) =>
    set((state) => {
      if (state.pinInput.length === MAX_PIN_LENGTH) return state;
      return {
        pinInput: state.pinInput + keyNum,
        keyStatus: { ...state.keyStatus, [keyNum]: BUTTON_STATUSES.PRESSED },
      };
    }),
  validateAccessCodeInput: async () => {
    const state = getState();
    const resultStatus =
      state.pinInput === state.pinCode
        ? BUTTON_STATUSES.GREEN
        : BUTTON_STATUSES.RED;
    for (let i = 0; i < LIGHTS_COUNT; i++) {
      await sleep(LIGHT_DURATION);
      set(() => ({
        keyStatus: Object.fromEntries(
          Array.from({ length: 10 })
            .keys()
            .map((num) => [num, resultStatus]),
        ),
      }));
      await sleep(LIGHT_DURATION);
      state.reset();
    }
  },
  toggleOutlined: () => set((state) => ({ outlined: !state.outlined })),
  toggleAutoAnimated: () =>
    set((state) => ({ autoAnimated: !state.autoAnimated })),
  reset: () =>
    set((state) => ({
      ...initialState,
      outlined: state.outlined,
      autoAnimated: state.autoAnimated,
    })),
}));
