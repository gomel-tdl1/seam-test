import { BUTTON_STATUSES } from "@/components/ui/smart-lock-device/smart-lock-button/config";
import { sleep } from "@/lib/utils";
import { create } from "zustand";

const MAX_PIN_LENGTH = 4;
const LIGHT_DURATION = 300;
const LIGHTS_COUNT = 3;

interface State {
  pinInput: string;
  keyStatus: Record<number, BUTTON_STATUSES>;
}

interface Action {
  pressKey: (keyNum: number) => void;
  checkPin: (pin: string) => void;
  reset: () => void;
}

const initialState: State = {
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
  checkPin: async (pin) => {
    const state = getState();
    const resultStatus =
      state.pinInput === pin ? BUTTON_STATUSES.GREEN : BUTTON_STATUSES.RED;
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
      set(() => ({
        keyStatus: Object.fromEntries(
          Array.from({ length: 10 })
            .keys()
            .map((num) => [num, BUTTON_STATUSES.IDLE]),
        ),
      }));
    }
    state.reset();
  },
  reset: () => set(() => initialState),
}));
