"use client";

import { useState } from "react";

export default function CreatePages() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", "PRODUCT"); // required by schema
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("basePrice", basePrice);
    formData.append("quantity", quantity);
    formData.append("userId", "6972258513eaa7bf3d93d551"); // temp userId

    images.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch("http://localhost:4002/api/products/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Response:", data);
      if (res.ok) {
        alert("✅ Product created! Check console for response.");
      } else {
        alert(`❌ Error: ${data.message || "Check console"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error creating product! See console.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Create a Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Dropdown for category - only valid enum values */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="input"
        >
          <option value="">Select Category</option>
          <option value="ELECTRONICS">Electronics</option>
          <option value="BOOKS">Books</option>
          <option value="FURNITURE">Furniture</option>
          <option value="CLOTHING">Clothing</option>
          <option value="FOOD">Food</option>
          <option value="SPORTS">Sports</option>
          <option value="BEAUTY">Beauty</option>
          <option value="TOYS">Toys</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          className="input"
          placeholder="SubCategory"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        />

        <input
          className="input"
          placeholder="Base Price"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          type="number"
          min="0"
          required
        />

        <input
          className="input"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          min="1"
          required
        />

        <input type="file" multiple onChange={handleImageChange} />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}