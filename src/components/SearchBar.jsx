import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/products/productsSlice";
import { Search } from "lucide-react";

const SearchBar = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.products.search);

  // useCallback avoids creating a new function on every render
  const handleSearchChange = useCallback(
    (e) => {
      dispatch(setSearch(e.target.value));
    },
    [dispatch]
  );

  return (
    <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm w-full max-w-md">
      <Search className="text-gray-500 mr-2" size={18} />
      <input
        type="text"
        placeholder="Search for products..."
        value={search}
        onChange={handleSearchChange}
        className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm bg-transparent"
      />
    </div>
  );
};

export default SearchBar;
