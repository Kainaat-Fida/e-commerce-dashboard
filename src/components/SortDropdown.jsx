import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../features/products/productsSlice"; // <-- correct import

const SortDropdown = () => {
  const dispatch = useDispatch();
  const sortOption = useSelector((state) => state.products.sort);

  return (
    <div>
      <label className="mr-2 font-medium">Sort by:</label>
      <select
        value={sortOption}
        onChange={(e) => dispatch(setSort(e.target.value))} // <-- correct
        className="border rounded px-2 py-1"
      >
        <option value="">Default</option>
        <option value="price-asc">Price (Low → High)</option>
        <option value="price-desc">Price (High → Low)</option>
        <option value="name-asc">Name (A → Z)</option>
        <option value="name-desc">Name (Z → A)</option>
      </select>
    </div>
  );
};

export default SortDropdown;
