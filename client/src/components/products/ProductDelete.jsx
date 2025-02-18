import { useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";

const ProductDelete = ({ product, showDeleteConfirm, setShowDeleteConfirm }) => {
const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await apiRequest.delete(`/products/${product._id}`);
        setShowDeleteConfirm(false);
        navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
    

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h4 className="text-lg font-bold mb-4">Confirm Delete</h4>
            <p className="mb-4 text-gray-500">Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="py-2 px-4 rounded-md bg-gray-500"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-4 rounded-md bg-red-500 text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDelete;
