
import React, { useContext, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [show, setShow] = useState(false);
  const { serverUrl, loading, setLoading } = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setLoading(false);
      setUserData(result.data);
      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300 relative">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-red-500 transition"
      >
        <FaArrowLeftLong /> Back
      </button>

      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-md flex flex-col gap-6">
        
        <h1 className="text-3xl font-bold text-gray-800 text-center">Welcome Back 👋</h1>
        <p className="text-gray-500 text-center">Login to continue your journey</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
            <input 
              type="email" 
              id="email"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <input 
              type={show ? "text" : "password"} 
              id="password"
              className="w-full h-12 px-4 pr-10 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <div 
              className="absolute right-3 bottom-3 text-gray-500 cursor-pointer hover:text-red-400"
              onClick={() => setShow(!show)}
            >
              {show ? <IoMdEyeOff size={22}/> : <IoMdEye size={22}/>}
            </div>
          </div>

          {/* Login Button */}
          <button 
            className="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Divider + Signup */}
        <p className="text-center text-gray-600">
          Don’t have an account?{" "}
          <span 
            className="text-red-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/SignUP")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

//This is

export default Login;
