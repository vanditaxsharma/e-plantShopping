import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Each item: { name, image, cost, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload; // product object
      const existingItem = state.items.find(
        (item) => item.name === newItem.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // remove if quantity hits 0
        state.items = state.items.filter(
          (cartItem) => cartItem.name !== action.payload.name
        );
      }
    },

    deleteItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name
      );
    },
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, deleteItem } =
  CartSlice.actions;

export default CartSlice.reducer;
