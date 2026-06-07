import React, { useEffect, useState } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Plus, Pencil, Save, X } from "lucide-react";

export default function ProductForm({ product, setEditProduct }) {
  const [form, setForm] = useState({ name: "", category: "", price: "", image: "" });
  const [loading, setLoading] = useState(false);

  // Load product data into form when editing
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        image: product.image || "",
      });
    } else {
      setForm({ name: "", category: "", price: "", image: "" });
    }
  }, [product]);

  // Handle input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        category: form.category.trim(),
        price: Number(form.price) || 0,
        image: form.image.trim(),
      };

      if (product?.id) {
        // Update existing
        await updateDoc(doc(db, "products", product.id), payload);
        alert("✅ Product updated successfully.");
      } else {
        // Add new
        await addDoc(collection(db, "products"), payload);
        alert("✅ Product added successfully.");
      }

      // Reset form and clear edit state
      setForm({ name: "", category: "", price: "", image: "" });
      setEditProduct && setEditProduct(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "❌ An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setForm({ name: "", category: "", price: "", image: "" });
    setEditProduct && setEditProduct(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {product ? (
          <>
            <Pencil size={18} className="text-yellow-600" /> Edit Product
          </>
        ) : (
          <>
            <Plus size={18} className="text-green-600" /> Add Product
          </>
        )}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Product name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">-- Select Category --</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
            <option value="Grocery">Grocery</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Price"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="https://..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            {loading ? (
              "Saving..."
            ) : product ? (
              <>
                <Save size={16} /> Update
              </>
            ) : (
              <>
                <Plus size={16} /> Add
              </>
            )}
          </button>

          {product && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 flex items-center gap-2"
            >
              <X size={16} /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
