import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@shared/schema";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  selected: boolean;
}

interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

// Helper to load from localStorage for initial state
const loadFromStorage = (): CartState | undefined => {
  try {
    const serializedState = localStorage.getItem("velora_cart");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState: CartState = loadFromStorage() || {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

function calculateTotals(state: CartState) {
  const selectedItems = state.cartItems.filter(item => item.selected);
  state.totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  state.totalAmount = selectedItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; quantity?: number; size?: string }>) => {
      const { product, quantity = 1, size } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === product.id && item.size === size
      );
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity, size, selected: true });
      }
      calculateTotals(state);
    },
    removeItem: (state, action: PayloadAction<{ id: number; size?: string }>) => {
      state.cartItems = state.cartItems.filter(
        (item) => !(item.product.id === action.payload.id && item.size === action.payload.size)
      );
      calculateTotals(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number; size?: string }>) => {
      const { id, quantity, size } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === id && item.size === size
      );
      
      if (existingItem) {
        if (quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (item) => !(item.product.id === id && item.size === size)
          );
        } else {
          existingItem.quantity = quantity;
        }
        calculateTotals(state);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    toggleSelectItem: (state, action: PayloadAction<{ id: number; size?: string }>) => {
      const { id, size } = action.payload;
      const item = state.cartItems.find(
        (item) => item.product.id === id && item.size === size
      );
      if (item) {
        item.selected = !item.selected;
        calculateTotals(state);
      }
    },
    selectAllItems: (state, action: PayloadAction<boolean>) => {
      state.cartItems.forEach((item) => (item.selected = action.payload));
      calculateTotals(state);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, toggleSelectItem, selectAllItems } = cartSlice.actions;
export default cartSlice.reducer;
