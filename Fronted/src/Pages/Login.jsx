import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import axiosClient from "../../utils/axiosClient";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signin, signup } from "../features/userSlice";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";

const Login = ({ setShowLogin }) => {
  const [currState, setCurrstate] = useState("Sign Up");
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currState === "Sign Up") {
      // Handle Sign Up logic here
      const result = await dispatch(signup(data));
      if (result.payload?.success) {
        toast.success("Account Created Successfully!");
        setItem(KEY_ACCESS_TOKEN, result.payload?.token);
        setShowLogin(false);
        console.log("Sign Up Data:", result.payload);
      } else {  
        toast.error("Please try again later.");
      }
    } else {
      const result = await dispatch(signin(data));
      if (result.payload?.success) {
        toast.success("Login Successfully!");
        setItem(KEY_ACCESS_TOKEN, result.payload?.token);
        setShowLogin(false);
        console.log("Sign In Data:", result.payload);
      } else {
        toast.error("Invalid Credentials");
      }
      // Handle Sign In logic here
    }
  };

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
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              placeholder="Enter Your Name"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            />
          )}
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
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
