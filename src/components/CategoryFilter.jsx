import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../features/products/productsSlice"; // <-- correct import

const categories = ["All", "Electronics", "Fashion", "Home", "Sports"];

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.products.category);

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="font-bold mb-2">Filter by Category</h3>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => dispatch(setCategory(cat))} // <-- correct
              className={`w-full text-left px-2 py-1 rounded ${
                activeCategory === cat
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
