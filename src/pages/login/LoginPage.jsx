import React, { useState } from "react";
import logo from "../../assets/Commission_on_Higher_Education_(CHEd).png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/useAuthentication";

const LoginPage = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const {
    mutateAsync: mutateLogin,
    isError: loginError,
    error: errorDetLogin,
  } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await mutateLogin(formdata);

      if (localStorage.getItem("ROLE") === "SuperAdmin") {
        navigate("/");
      } else {
        navigate("/user/");
      }
    } catch (error) {
      throw error;
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen overflow-y-auto md:pt-4 pt-4 px-6 bg-base-200">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-24" />
          </div>

          {/* Login Form */}
          <h2 className="text-2xl font-bold text-center mb-6">OCDRA-SPISyS</h2>
          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formdata.username}
                onChange={(e) =>
                  setFormdata((prev) => ({ ...prev, username: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={formdata.password}
                onChange={(e) =>
                  setFormdata((prev) => ({ ...prev, password: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="***********"
                required
              />
              {/* Show/Hide Password Button */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
              >
                {passwordVisible ? (
                  <FaEye size={"20px"} />
                ) : (
                  <FaEyeSlash size={"20px"} />
                )}
              </button>
            </div>

            {/* error */}
            <p></p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
