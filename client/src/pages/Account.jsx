import React, { useState, useContext } from 'react';
import Login from '../components/layout/Login';
import Register from '../components/layout/Register';
import { AuthContext } from '../context/AuthContext';
import ProfilePage from './Profile';

const Account = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const { currentUser } = useContext(AuthContext);
  
  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between Login and Register
  };

  return (
    <>
      {currentUser ? (
        <div className="py-12 container mx-auto">
            <ProfilePage  />
          </div>
      ) :   
        (
        <div className="py-12 container mx-auto">
        <h2 className="text-2xl font-bold text-center italic">
          {isLogin ? 'Please login to proceed with your order!' : 'Please register to create an account!'}
        </h2>
        
        <div className="flex justify-center mt-8 mx-auto w-full px-2 md:w-1/2">
          {/* Conditionally render Login or Register based on isLogin state */}
          {isLogin ? (
            <Login />
          ) : (
            <Register />
          )}
        </div>

        <div className="text-center mt-4">
          {/* Toggle between Login and Register */}
          <button
            onClick={toggleForm}
            className="text-green-600 hover:underline italic text-lg"
          >
            {isLogin ? 'Don’t have an account? Register here' : 'Already have an account? Login here'}
          </button>
        </div>
      </div>
    )}
    </>
  );
};

export default Account;
