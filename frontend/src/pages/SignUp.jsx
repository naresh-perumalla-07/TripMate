
import React, { useContext, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { serverUrl, loading, setLoading } = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      setLoading(false);
      setUserData(result.data);
      navigate("/");
      toast.success("Signup Successfully");
      console.log(result);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
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

      {/* SignUp Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md flex flex-col gap-6">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center">Create an Account</h1>
        <p className="text-gray-500 text-center">Join TripMate and start your journey</p>

        <form onSubmit={handleSignUP} className="flex flex-col gap-5">
          {/* Username */}
          <div className="relative">
            <label htmlFor="name" className="text-gray-700 font-medium">Username</label>
            <input 
              type="text" 
              id="name"
              className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
              required 
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
            <FaUserAlt className="absolute left-3 top-10 text-gray-400" />
          </div>

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
            <input 
              type="email" 
              id="email"
              className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <FaEnvelope className="absolute left-3 top-10 text-gray-400" />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <input 
              type={show ? "text" : "password"} 
              id="password"
              className="w-full h-12 pl-10 pr-10 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <FaLock className="absolute left-3 top-10 text-gray-400" />
            <div 
              className="absolute right-3 top-10 text-gray-500 cursor-pointer hover:text-red-400"
              onClick={() => setShow(!show)}
            >
              {show ? <IoMdEyeOff size={22}/> : <IoMdEye size={22}/>}
            </div>
          </div>

          {/* Sign Up Button */}
          <button 
            className="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {/* Divider + Login Link */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span 
            className="text-red-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
