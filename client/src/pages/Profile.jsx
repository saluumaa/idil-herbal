import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import AdminDashboard from '../components/profilePage/AdminDashboard';
import UserDashboard from '../components/profilePage/UserDashboard';

const ProfilePage = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className=" py-10 mb-10">
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isAdmin ? 'Admin Dashboard' : 'User Profile'}
        </h1> */}
        <div className="flex flex-col w-full gap-4">
          {/* Sidebar */}
          <div className="bg-white shadow rounded-lg p-6 w-full  mb-2 "> 
            <h2 className="text-xl font-semibold text-gray-700">Profile Details</h2>
            <p className="mt-4 text-gray-600">
              <strong>Name:</strong> {currentUser?.name}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Email:</strong> {currentUser?.email}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Role:</strong> {isAdmin ? 'Admin' : 'User'}
            </p>
            <button
              onClick={logout}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
        
          </div>

          {/* Main Section */}
          <div className="w-full h-screen flex-1 bg-white  ">
            {isAdmin ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
