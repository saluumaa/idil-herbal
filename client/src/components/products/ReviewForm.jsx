import { useState } from "react";
import apiRequest from "../../utils/apiRequest";  

export default function ReviewForm({ productId, onReviewSubmit, fetchProduct, setRatingForm }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");

    const submitReview = async (e) => {
       try{
        e.preventDefault();
        const { data } = await apiRequest.post(`/products/${productId}/rate`, { rating, comment });
        onReviewSubmit(data.product);
        setRating(5);
        setComment("");
        setMessage("Review added successfully thank you");
        setTimeout(() => {
            setMessage("");
        }, 3000);
        fetchProduct();
        setRatingForm(false);

       }catch(err){
        console.error(err);
         }
    };

    return (
        <form onSubmit={submitReview} className="p-4 bg-white shadow-md rounded-lg mt-10">
            <h3 className="text-lg font-semibold mb-2">
                if you have used this product, please leave a review
            </h3>
            
            <label className="block text-gray-700">
                Rating:
                <select value={rating} onChange={(e) => setRating(e.target.value)} className="ml-2 border px-4 py-2 rounded">
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} Stars</option>
                    ))}
                </select>
            </label>

            <label className="block text-gray-700 mt-3">
                Comment:
                <textarea 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    className="w-full border p-2 rounded mt-1"
                    rows="3"
                    required
                ></textarea>
            </label>

            <button type="submit" className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
                Submit Review
            </button>

            {message && <p className="mt-3 text-green-500 fixed ">{message}</p>}
        </form>
    );
}
