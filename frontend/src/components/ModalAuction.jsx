import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ModalAuction({ isOpen, onClose, initialData }) {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [startingPrice, setStartingPrice] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setCondition(initialData.condition || "");
      setEstimatedValue(initialData.estimatedValue || "");
      setStartingPrice(initialData.startingPrice || "");
      setImages(initialData.images || []);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // append data
      images.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("description", description);
      formData.append("condition", condition);
      formData.append("estimatedValue", estimatedValue);
      formData.append("startingPrice", startingPrice);
      formData.append("name", name);
for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

      if (initialData && initialData._id) {
        await axios.put(`http://localhost:5000/api/items/${initialData._id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/items", formData);
      }

      onClose();
      toast.success("Item saved successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "Terjadi kesalahan : " + (error.response?.data?.errors?.[0]?.msg || error.message)
      );
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-40" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 px-4 transition-all duration-300 transform ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {initialData ? "Edit Item" : "Add Item"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <select
              name="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Choose condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>

            <input
              type="number"
              name="estimatedValue"
              placeholder="Estimated Value"
              value={estimatedValue}
              onChange={(e) => setEstimatedValue(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="number"
              name="startingPrice"
              placeholder="Starting Price"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />

            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
