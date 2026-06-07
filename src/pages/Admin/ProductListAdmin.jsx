// FILE: src/pages/Admin/ProductListAdmin.jsx
import React from "react";
import { useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Pencil, Trash2, Image } from "lucide-react"; // Lucide Icons

export default function ProductListAdmin({ onEdit }) {
  const products = useSelector((state) => state.products?.products || []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      alert("✅ Product deleted.");
    } catch (err) {
      console.error(err);
      alert(err.message || "❌ Delete failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">
        Products ({products.length})
      </h2>

      <div className="overflow-auto">
        <table className="w-full text-sm border">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-2">#</th>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-2 align-top">{i + 1}</td>
                <td className="p-2 align-top">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-14 flex items-center justify-center bg-gray-100 rounded">
                      <Image size={20} className="text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="p-2 align-top">{p.name}</td>
                <td className="p-2 align-top">Rs.{p.price}</td>
                <td className="p-2 align-top">{p.category}</td>
                <td className="p-2 align-top flex gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
