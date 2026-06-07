import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenToProducts, stopListeningProducts, selectFilteredProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify"; // ✅ import toast

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(listenToProducts());
    return () => stopListeningProducts();
  }, [dispatch]);

  if (status === "idle" || status === "loading") {
    return <p className="text-center py-10">Loading products...</p>;
  }

  if (!products.length) {
    return <p className="text-center py-10">No products found.</p>;
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added to cart!`); // ✅ show toast
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600 mt-1">{product.category}</p>
              <p className="text-orange-500 font-semibold mt-2">₹{product.price}</p>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
