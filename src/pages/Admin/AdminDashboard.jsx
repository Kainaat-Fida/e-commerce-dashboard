import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { listenToProducts, stopListeningProducts } from "../../features/products/productsSlice";
import ProductForm from "./ProductForm";
import ProductListAdmin from "./ProductListAdmin";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("add"); // "add" or "list"
  const [editProduct, setEditProduct] = useState(null); // store product being edited

  useEffect(() => {
    dispatch(listenToProducts());

    return () => stopListeningProducts();
  }, [dispatch]);

  // Handler for editing a product
  const handleEdit = (product) => {
    setEditProduct(product);
    setActiveTab("add"); // switch to form tab
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab("add")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "add" ? "bg-orange-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            Add Product
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "list" ? "bg-orange-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            Product List
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "add" && <ProductForm product={editProduct} setEditProduct={setEditProduct} />}
        {activeTab === "list" && <ProductListAdmin onEdit={handleEdit} />}
      </main>
    </div>
  );
}
