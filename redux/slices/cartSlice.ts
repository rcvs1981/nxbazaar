import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  title: string;
  salePrice: number;
  imageUrl: string;
  qty: number;
  vendorId: string;
}

export interface AddToCartPayload {
  id: string;
  title: string;
  salePrice: number;
  imageUrl: string;
  userId: string;
}

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem("cart");
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persistCart(state: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state));
  }
}

const initialState: CartItem[] = readCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { id, title, salePrice, imageUrl, userId } = action.payload;

      const existing = state.find((item) => item.id === id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.push({
          id,
          title,
          salePrice,
          imageUrl,
          qty: 1,
          vendorId: userId,
        });
      }

      persistCart([...state]);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const newState = state.filter((item) => item.id !== action.payload);
      persistCart(newState);
      return newState;
    },

    incrementQty: (state, action: PayloadAction<string>) => {
      const item = state.find((i) => i.id === action.payload);
      if (!item) return;

      item.qty += 1;
      persistCart([...state]);
    },

    decrementQty: (state, action: PayloadAction<string>) => {
      const item = state.find((i) => i.id === action.payload);
      if (!item || item.qty <= 1) return;

      item.qty -= 1;
      persistCart([...state]);
    },

    clearCart: () => {
      persistCart([]);
      return [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;