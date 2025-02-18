import React, { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import { AuthContext } from "../context/AuthContext";
import { ArrowBigLeftIcon } from "lucide-react";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiRequest.get("/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-100 mb-14">

     {/* heroSection */}
     <div className="relative max-w-7xl mx-auto bg-green-600 py-20 mb-5">
          <div className="absolute inset-0">
            <img
              src="./herbalPhoto.jpeg"
              alt="Contact background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative  px-4 sm:px-6 lg:px-8 text-center">
          <div className='flex gap-4 justify-center items-center cursor-pointer'>
              <Link to='/' className= "text-xl font-bold text-white py-2">Home</Link>
              <span className="text-xl font-bold text-green-300 py-2 rounded-md  mx-2">
                <ArrowBigLeftIcon />
              </span>
              <Link to='/blog' className= "text-xl font-bold text-white py-2  rounded-md ">Blog</Link>
          </div>
          
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={`http://localhost:5000/${blog.image}`}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
