import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10);
    if (qty > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: qty }));
    }
  };

  return (
    <div className="flex items-center justify-between border rounded p-4 bg-white shadow">
      {/* Image */}
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-sm text-gray-500">{item.category}</p>
          <p className="text-orange-600 font-bold">Rs. {item.price}</p>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-600">Qty:</label>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 border rounded px-2 py-1"
        />
      </div>

      {/* Subtotal */}
      <p className="font-semibold">
        Rs. {(item.price * item.quantity).toLocaleString()}
      </p>

      {/* Remove Button */}
      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        className="text-red-600 hover:text-red-800 font-medium"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
