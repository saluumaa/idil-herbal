import { useState } from "react";
import apiRequest from "../../utils/apiRequest";

const ProductUpdateForm = ({ product, onUpdateSuccess, onClose }) => {
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || 0);
  const [discount, setDiscount] = useState(product.discount || 0);
  const [description, setDescription] = useState(product.description || "");
  const [stock, setStock] = useState(product.stock || 0);
  const [stockStatus, setStockStatus] = useState(product.stockStatus || "");
  const [sizes, setSizes] = useState(product.size || []);
  const [category, setCategory] = useState(product.category || "");
  const [deals, setDeals] = useState(product.deals || false);
  const [newProduct, setNewProduct] = useState(product.newProduct || false);
  const [topProduct, setTopProduct] = useState(product.topProduct || false);

  // Handle changes to size fields
  const handleSizeChange = (index, field, value) => {
    const updatedSizes = sizes.map((size, i) =>
      i === index ? { ...size, [field]: value } : size
    );
    setSizes(updatedSizes);
  };

  // Add new size
  const addSize = () => {
    setSizes([...sizes, { name: "", available: true }]);
  };

  // Remove size
  const removeSize = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await apiRequest.put(`/products/${product._id}`, {
        name,
        price,
        description,
        stock,
        discount,
        stockStatus,
        size: sizes,
        category,
        deals,
        newProduct,
        topProduct,
      });
      onUpdateSuccess();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-5 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Price Field */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Discount</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Description Field */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md"
        ></textarea>
      </div>

      {/* Stock Fields */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Stock Status</label>
        <input
          type="text"
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Sizes Field */}
      <div className="mb-4">
        <h4 className="block font-semibold mb-2">Sizes</h4>
        {sizes.map((size, index) => (
          <div key={index} className="flex items-center gap-4 mb-2">
            <input
              type="text"
              value={size.name}
              onChange={(e) => handleSizeChange(index, "name", e.target.value)}
              className="p-2 border rounded-md w-1/3"
              placeholder="Size Name"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={size.available}
                onChange={(e) =>
                  handleSizeChange(index, "available", e.target.checked)
                }
              />
              Available
            </label>
            <button
              type="button"
              onClick={() => removeSize(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSize}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Size
        </button>
      </div>

      {/* Category Field */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Flags */}
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={deals}
            onChange={(e) => setDeals(e.target.checked)}
          />
          Deals
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newProduct}
            onChange={(e) => setNewProduct(e.target.checked)}
          />
          New Product
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={topProduct}
            onChange={(e) => setTopProduct(e.target.checked)}
          />
          Top Product
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white py-2 px-4 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductUpdateForm;
