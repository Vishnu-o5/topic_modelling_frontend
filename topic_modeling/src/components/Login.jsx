import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaUser, FaUserLock, FaLock } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import bookImage from "../assets/research_paper_image.jpeg";
const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    try {
      const response = await fetch("http://localhost:8080/perform_login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: new URLSearchParams({ username, password }),
      });


      if (response.ok) {
        alert("Login successful!");

        localStorage.setItem("username", username); 
        navigate("/dashboard_page");

    
      } else {
        alert("Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
        {/* LEFT: FORM */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Log in</h1>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-gray-500 border-gray-300 rounded focus:ring-gray-400"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-slate-500 to-slate-200  text-black font-semibold hover:opacity-90 transition"
            >
              Log in
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">Log in with</div>
          <div className="mt-4 flex space-x-4 justify-center">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:shadow"
            >
              <FaGoogle /> <span>Google</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
          <span className="text-green-600 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
          Register Now
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

export default Login;
