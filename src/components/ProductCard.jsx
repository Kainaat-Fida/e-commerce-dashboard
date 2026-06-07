import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );

    // Show toast notification
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white flex flex-col">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-3"
      />

      {/* Product Info */}
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-orange-600 font-bold mt-2">Rs. {product.price}</p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
