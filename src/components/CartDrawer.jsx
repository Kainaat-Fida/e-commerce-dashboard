import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import {
    removeFromCart,
    updateQuantity,
    clearCart,
} from "../features/cart/cartSlice";

const CartDrawer = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    const totalAmount = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-transparent z-40"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 
                ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Cart Items (scrollable) */}
                <div className="p-4 space-y-4 overflow-y-auto flex-1">
                    {items.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 border-b pb-2"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Rs. {item.price}</p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2 mt-1">
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    updateQuantity({
                                                        id: item.id,
                                                        quantity: Math.max(item.quantity - 1, 1),
                                                    })
                                                )
                                            }
                                            className="p-1 border rounded"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    updateQuantity({
                                                        id: item.id,
                                                        quantity: item.quantity + 1,
                                                    })
                                                )
                                            }
                                            className="p-1 border rounded"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer (always visible) */}
                <div className="p-4 border-t space-y-2">
                    <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>Rs. {totalAmount}</span>
                    </div>
                    <button
                        onClick={() =>
                            items.length > 0
                                ? alert("Proceeding to Checkout!")
                                : alert("Your cart is empty!")
                        }
                        disabled={items.length === 0}
                        className={`w-full py-2 rounded text-white 
                            ${items.length > 0
                                ? "bg-orange-500 hover:bg-orange-600"
                                : "bg-gray-300 cursor-not-allowed"}`}
                    >
                        Checkout
                    </button>
                    <button
                        onClick={() => dispatch(clearCart())}
                        disabled={items.length === 0}
                        className={`w-full border border-gray-300 py-2 rounded text-sm 
                            ${items.length > 0
                                ? "hover:bg-gray-100"
                                : "bg-gray-100 cursor-not-allowed text-gray-400"}`}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
