import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  addToCart,
  decreaseFromtheCart,
  getFoodList,
  removeFromCart,
  subTotal,
} from "../features/foodSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  const { food_list, cartItems, isLoading } = useSelector(
    (state) => state.food
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(food_list, isLoading);

  // Read cartItems from localStorage (assumes JSON string format)
  const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {};

  const subtotal = food_list?.reduce((acc, item) => {
    const quantity = storedCart[item._id] || 0;
    return acc + item.price * quantity;
  }, 0);

  const deliveryFee = subtotal > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (!food_list || food_list.length === 0) {
      dispatch(getFoodList());
    }
  }, [dispatch, food_list]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v1m0 14v1m8-10h-1m-14 0H4m16.364 6.364l-.707-.707M7.636 7.636l-.707-.707M17.657 6.343l-.707.707M6.343 17.657l-.707.707"
          />
        </svg>
      </div>
    );
  }

  // Animation Variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="mt-24 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cart Items Section */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <div className="hidden sm:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] text-base sm:text-lg font-semibold py-3 px-4 sm:px-6 bg-gray-100 text-gray-700 border-b border-gray-300">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <AnimatePresence>
          {food_list?.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-wrap sm:grid sm:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] gap-4 items-center text-gray-800 py-4 px-4 sm:px-6 border-b border-gray-200 hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      onClick={() => dispatch(decreaseFromtheCart(item._id))}
                    >
                      −
                    </button>
                    <p className="mx-3">{cartItems[item._id]}</p>
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      onClick={() => dispatch(addToCart(item._id))}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-800 font-medium">
                    ${cartItems[item._id] * item.price}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-600 font-bold text-lg cursor-pointer"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    ×
                  </button>
                </motion.div>
              );
            }
          })}
        </AnimatePresence>

        {Object.values(cartItems).every((quantity) => quantity === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-10 text-gray-500 text-lg"
          >
            Your cart is empty 😞
          </motion.div>
        )}
      </div>

      {/* Cart Summary Section */}
      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        {/* Promo Code Section */}
        <motion.div
          className="lg:flex-1 bg-white shadow rounded-lg p-4 sm:p-6 order-1 lg:order-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-600 text-sm mb-2">
            If you have a promocode, enter it here:
          </p>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Promocode"
              className="flex-grow p-2 border rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Apply
            </motion.button>
          </div>
        </motion.div>

        {/* Cart Summary Section */}
        <motion.div
          className="flex-1 bg-white shadow rounded-lg p-4 sm:p-6 order-2 lg:order-1"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cart Total</h2>
          <div className="text-gray-700 space-y-3">
            <div className="flex justify-between">
              <p className="font-medium">Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="font-medium">Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-gray-900">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700 transition"
            onClick={() => navigate("/order")}
          >
            PROCEED TO CHECKOUT
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
