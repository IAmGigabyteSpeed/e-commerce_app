import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  Cartitems: CartItem[];
}

const initialState: CartState = {
  Cartitems: [],
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItem>) => {
      state.Cartitems.push(action.payload);
    },
    addQuantity: (state, action: PayloadAction<string>) => {
      const item = state.Cartitems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    reduceQuantity: (state, action: PayloadAction<string>) => {
      const item = state.Cartitems.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.Cartitems = state.Cartitems.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.Cartitems = state.Cartitems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearProducts: (state) => {
      state.Cartitems = [];
    },
  },
});

export const {
  addProduct,
  addQuantity,
  reduceQuantity,
  removeProduct,
  clearProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
