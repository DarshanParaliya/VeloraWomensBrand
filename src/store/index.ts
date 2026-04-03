import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});

// Persistence: Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("velora_cart", JSON.stringify(state.cart));
    localStorage.setItem("velora_wishlist", JSON.stringify(state.wishlist));
    // Auth state is handled inside the slice for persistence, 
    // but putting it here for centralized management if needed.
  } catch (err) {
    console.error("Could not save state", err);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
