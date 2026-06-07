// FILE: src/features/products/productsSlice.jsx
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

let unsubscribe = null; // reference to stop listener

// --- Async Thunk: Start real-time listener ---
export const listenToProducts = createAsyncThunk(
  "products/listenToProducts",
  async (_, { dispatch }) => {
    // Stop previous listener if any
    if (unsubscribe) {
      unsubscribe();
    }

    // Start new Firestore listener
    unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const products = snapshot.docs.map((doc) => {
        const { updatedAt: _updatedAt, ...rest } = doc.data(); // omit non-serializable field
        return {
          id: doc.id,
          ...rest,
        };
      });

      dispatch(setProducts(products));
    });

    return true; // just to fulfill thunk
  }
);

// --- Stop listener if needed ---
export const stopListeningProducts = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
};

// --- Initial State ---
const initialState = {
  products: [],
  category: "All",
  search: "",
  sort: "",
  status: "idle",
  error: null,
};

// --- Slice ---
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.status = "succeeded";
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setProducts, setCategory, setSearch, setSort } =
  productsSlice.actions;

// --- Selector: filter, search, sort ---
export const selectFilteredProducts = createSelector(
  [
    (state) => state.products.products,
    (state) => state.products.category,
    (state) => state.products.search,
    (state) => state.products.sort,
  ],
  (products, category, search, sort) => {
    let filtered = [...products];

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }
);

export default productsSlice.reducer;
