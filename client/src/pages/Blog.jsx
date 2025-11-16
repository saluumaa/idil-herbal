import React, { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import { AuthContext } from "../context/AuthContext";
import { motion} from "framer-motion";

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
    <motion.div className=" mb-14 min-h-full"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >

     {/* heroSection */}
     <div className="relative max-w-7xl mx-auto  py-12 mb-5">
          <div className="relative px-4 sm:px-6 lg:px-8 -mt-10">
          <div className='flex gap-4 justify-start items-center cursor-pointer'>
              <Link to='/' className= "text-3xl font-bold  underline ">Home</Link>
              <span className="text-xl font-bold text-green-300  rounded-md ">
               /
              </span>
              <Link to='/blog' className= "text-3xl font-bold  rounded-md ">Blog</Link>
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
    </motion.div>
  );
}
