import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import bookImage from "../assets/research_paper_image.jpeg";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      } else {
        alert("Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
        {/* LEFT: FORM */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="username"
                type="text"
                required
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-slate-500 to-slate-200  text-black font-semibold hover:opacity-90 transition"
              >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account? {" "}
          <span className="text-green-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login_page")}
          >
          Login
         </span>
        </p>
          
        </div>

        {/* RIGHT: ILLUSTRATION */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={bookImage}
            alt="Decorative"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
