import { useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Login = ({ setShowLogin }) => {
  const [currState, setCurrstate] = useState("Sign Up");

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white p-8 w-full max-w-md rounded-lg shadow-lg relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{currState}</h2>
          <img
            className="cursor-pointer w-4 h-4"
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        {/* Form Fields */}
        <form>
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Enter Your Name"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            />
          )}
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Enter Password"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
          >
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          {/* Terms and Conditions */}
          <div className="flex items-center mt-4">
            <input type="checkbox" className="mr-2" />
            <p className="text-sm text-gray-600">
              By continuing, I agree to the terms of use & privacy policy
            </p>
          </div>

          {/* Switch between Sign Up and Sign In */}
          {currState === "Sign Up" ? (
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <span
                onClick={() => setCurrstate("Sign In")}
                className="cursor-pointer text-orange-500 hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <span
                onClick={() => setCurrstate("Sign Up")}
                className="cursor-pointer text-orange-500 hover:underline"
              >
                Sign up here
              </span>
            </p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
