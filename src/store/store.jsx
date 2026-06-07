import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";

// Key for localStorage
const CART_STORAGE_KEY = "urban_cart";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!serializedCart) return undefined;
    return { items: JSON.parse(serializedCart) }; // match cartSlice structure
  } catch (e) {
    console.warn("Failed to load cart from localStorage", e);
    return undefined;
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (cartState) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState.items));
  } catch (e) {
    console.warn("Failed to save cart to localStorage", e);
  }
};

const preloadedState = {
  cart: loadCartFromLocalStorage(),
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState,
});

// Subscribe to store changes
store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart);
});
