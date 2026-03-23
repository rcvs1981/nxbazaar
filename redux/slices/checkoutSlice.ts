import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckoutState {
  currentStep: number;
  checkoutFormData: Record<string, unknown>;
}

const initialState: CheckoutState = {
  currentStep: 1,
  checkoutFormData: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    updateCheckoutFormData: (
      state,
      action: PayloadAction<Record<string, unknown>>
    ) => {
      state.checkoutFormData = {
        ...state.checkoutFormData,
        ...action.payload,
      };
    },

    resetCheckout: (state) => {
      state.currentStep = 1;
      state.checkoutFormData = {};
    },
  },
});

export const {
  setCheckoutStep,
  updateCheckoutFormData,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;