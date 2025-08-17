import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const images = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80"
];

const Login = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
      navigate("/RoleRedirectDashboard");
    } else {
      alert("Invalid credentials. Try again or Sign up.");
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative font-poppins">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="absolute top-8 w-full text-center z-10">
        <h1 className="text-white text-4xl font-bold tracking-wide">
          NextGen Smart Code Editor
        </h1>
      </div>

      <div className="flex items-center justify-center h-full z-10 relative">
        <div className="bg-[#2A2A40] bg-opacity-90 shadow-xl rounded-xl p-8 w-full max-w-md">
          <h2 className="text-white text-2xl font-semibold mb-6 text-center">Login to Your Account</h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-500 text-white rounded-md"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-500 text-white rounded-md"
            />

            <div className="flex justify-between items-center text-sm text-gray-300">
              <label>
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <span className="hover:underline cursor-pointer">Forgot password?</span>
            </div>

            <button type="submit" className="w-full bg-green text-white py-2 rounded-md hover:bg-green/90 transition">
              Login
            </button>

            <p className="text-gray-400 text-sm text-center mt-4">
              Don’t have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
