import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import { ArrowLeft } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiRequest.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <div className="mb-12">
       {/* heroSection */}
       <div className=" max-w-7xl mx-auto relative bg-green-600 py-20">
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
              <Link to='/blog' className= "text-xl font-bold text-white py-2  rounded-md ">Blog</Link>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6 mt-3">{blog.title}</h1>
        <img
          src={`http://localhost:5000/${blog.image}`}
          alt={blog.title}
          className="w-full h-64 object-cover mb-6 rounded-lg"
        />
        <p className="text-gray-700 text-lg leading-relaxed">{blog.content}</p>
      </div>
    </div>
  );
}
