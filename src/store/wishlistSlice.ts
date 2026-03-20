import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@shared/schema";

interface WishlistState {
  items: Product[];
}

// Helper to load from localStorage for initial state
const loadFromStorage = (): WishlistState | undefined => {
  try {
    const serializedState = localStorage.getItem("velora_wishlist");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState: WishlistState = loadFromStorage() || {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        state.items.push(product);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
