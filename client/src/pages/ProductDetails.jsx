import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useCart } from "../context/CartContext";
import apiRequest from "../utils/apiRequest";
import { AuthContext } from "../context/AuthContext";
import ProductUpdateForm from "../components/products/ProductUpdateForm";
import ProductDelete from "../components/products/ProductDelete";
import { ArrowLeft } from "lucide-react";
import ReviewForm from "../components/products/ReviewForm";
import { Star } from "lucide-react";


const ProductDetails = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [ratingForm, setRatingForm] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await apiRequest.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      image: product.images[0],
    };
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  
  const increment = () => {
    setQuantity((prev) => prev + 1);
  
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { _id: product._id, quantity: quantity + 1 },
    });
  };
  
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
  
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { _id: product._id, quantity: quantity - 1 },
      });
    }
  };
  

  const handleUpdateSuccess = () => {
    fetchProduct(); 
    setShowUpdateForm(false); 
  };

 
  const handleReviewSubmit = (updatedProduct) => {
    setComments(updatedProduct.comments);
};



  if (!product) return <div>Loading...</div>;

  return (
    <div className="mx-auto p-5">

      {/* heroSection */}
      {/* <div className="max-w-7xl mx-auto relative bg-green-600 py-20">
          <div className="absolute inset-0">
            <img
              src="../herbalPhoto.jpeg"
              alt="Contact background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8 text-center">
          <div className='flex gap-4 justify-center items-center cursor-pointer'>
              <Link to='/' className= "text-xl font-bold text-white py-2">Home</Link>
              <span className="text-xl font-bold text-green-300 py-2 rounded-md  mx-2">
                <ArrowLeft />
              </span>
              <Link to='/products' className= "text-xl font-bold text-white py-2  rounded-md ">Products</Link>
          </div>
        </div>
      </div> */}

      {/* Update Form */}
      {showUpdateForm && (
        <div className="mb-6">
          <ProductUpdateForm
            product={product}
            onUpdateSuccess={handleUpdateSuccess}
            onClose={() => setShowUpdateForm(false)}
          />
        </div>
      )}

      {currentUser && currentUser.role === "admin" && (
        <div className="flex mb-4 mt-2">
          <button
            onClick={() => setShowUpdateForm(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Edit
          </button>
       
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md ml-2"
            onClick={() => setShowDeleteConfirm(true)} >
            Delete
          </button>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <ProductDelete
              product={product}
              showDeleteConfirm={showDeleteConfirm}
              setShowDeleteConfirm={setShowDeleteConfirm}
            />
          )}
        </div>
      )}

      <div className=" max-w-6xl flex justify-center mx-auto mt-5 flex-col lg:flex-row gap-5">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
        {/* Active Image (Moves to Top) */}
        <img
          src={`http://localhost:5000/${product.images[activeIndex]}`}
          alt={product.name}
          className="rounded-lg shadow-lg w-full h-96 object-cover transition-all duration-500  "
        />
        

        {/* Thumbnail List */}
        <div className="flex gap-2 mt-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${image}`}
              alt={product.name}
              onClick={() => setActiveIndex(index)}
              className={`w-32 h-28 object-cover rounded-lg shadow-lg cursor-pointer transition-all duration-300
                ${index === activeIndex ? "scale-110 shadow-xl opacity-100" : "blur-lg opacity-60 hover:opacity-100"}
              `}
            />
          ))}
        </div>
       </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 lg:pl-10 overflow-visible">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-700 mb-3">{product.description}</p>

          {/* Display selected size price and weight */}
          <p className="text-lg font-semibold text-green-600 mb-3">
            ${selectedSize ? product.size.find(s => s.name === selectedSize).price?.toFixed(2) : product.price?.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            {selectedSize ? `Weight: ${product.size.find(s => s.name === selectedSize).weight}ml` : ''}
          </p>

          <p className="text-sm text-gray-500 mb-5">{product.stockStatus}</p>

          {/* Select Size */}
          <div className="mb-5">
            <h4 className="text-lg font-semibold mb-2">Select Size:</h4>
            <div className="flex gap-2">
              {product.size.map((size) => (
                <button
                  key={size.name}
                  disabled={!size.available}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size.name
                      ? "bg-blue-500 text-white"
                      : size.available
                      ? "bg-white text-gray-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() => size.available && setSelectedSize(size.name)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-5">
            <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={decrement}>
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={increment}>
              +
            </button>

            {/* Add to Cart */}
            <button
              className="px-4 ml-auto bg-blue-500 text-white py-3 rounded-md"
              onClick={() => handleAddToCart(product, selectedSize)}
            >
              Add to Cart
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-10">
            <div className="mt-3">
              <p className="font-semibold text-lg">Product Refund</p>
              <span className="text-gray-700 mb-3">
                You can return this product within 24 hours of delivery if the product
                is damaged or not as described. You will get a full refund, but delivery
                charges are non-refundable.
              </span>
            </div>
            <div className="mt-3">
              <p className="font-semibold text-lg">Product Shipping</p>
              <span className="text-gray-700 mb-3">
                We ship our products within 1-2 hours if you are in the same city, and
                2-3 days if you are in another city. Delivery charges may apply.
              </span>
            </div>
          </div>
        </div>

    </div>

            {/* Product Review Section */}
     <div className="w-full mt-10">
            <div className="max-w-6xl mx-auto mb-4">
              <h3 className="text-2xl md:text-3xl font-bold mb-5">Product Reviews</h3>
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <p className="text-lg font-semibold mb-4">Enjoyed this product? Please share your thoughts!</p>
                <button 
                  className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-all duration-300"
                  onClick={() => setRatingForm(!ratingForm)}
                >
                  Rate this product
                </button>
              </div>
            </div>
            {product.comments.length === 0 ? (
              <p className="text-center">No reviews yet</p>
            ) : (
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {product.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <img
                          src="../blankImage.png"
                          alt={comment.user?.name || "Anonymous"}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{comment.user?.name || "Anonymous"}</h4>
                          <div className="flex">
                            {[...Array(comment.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}


            {/* Review Form */}
            <div className=" flex justify-center">
              {
                ratingForm && (
                  <ReviewForm productId={product._id} onReviewSubmit={handleReviewSubmit} fetchProduct={fetchProduct} setRatingForm={setRatingForm} />
                )
                  
              }
            </div>
          </div>

    </div>
  );
};

export default ProductDetails;
