import { useDispatch, useSelector } from "react-redux";
import { subTotal } from "../features/foodSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PlaceOrder = () => {
  const { user } = useSelector((state) => state.user);
  const subtotal = useSelector(subTotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deliveryFee = subtotal > 0 ? 5 : 0; // Add delivery fee if cart has items
  const total = subtotal + deliveryFee;

  return (
    <form className="flex flex-col lg:flex-row items-start justify-between mt-20 gap-24">
      {/* Delivery Information Section */}
      <div className="max-w-screen-lg flex-1 space-y-4">
        <p className="text-xl font-semibold">Delivery Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
        />
        <input
          type="text"
          placeholder="Street"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
          <input
            type="text"
            placeholder="State"
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Zip Code"
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
          <input
            type="text"
            placeholder="Country"
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
        />
      </div>

      {/* Cart Total Section */}
      <div className="p-6 flex flex-col w-full lg:w-96 mt-10 shadow-md space-y-6">
        <h2 className="text-lg font-bold text-gray-800">Cart Total</h2>
        <div className="text-gray-700 space-y-3">
          <div className="flex justify-between">
            <p className="font-medium">Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
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
          className="w-full py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700 transition"
          onClick={() => navigate("/order")}
        >
          PROCEED TO PAYMENT
        </motion.button>
      </div>
    </form>
  );
};

export default PlaceOrder;
