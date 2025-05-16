import { useDispatch, useSelector } from "react-redux";
import { subTotal } from "../features/foodSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { food_list, cartItems } = useSelector((state) => state.food);
  // Read cartItems from localStorage (assumes JSON string format)
  const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {};

  const subtotal = food_list?.reduce((acc, item) => {
    const quantity = storedCart[item._id] || 0;
    return acc + item.price * quantity;
  }, 0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deliveryFee = subtotal > 0 ? 5 : 0; // Add delivery fee if cart has items
  const total = subtotal + deliveryFee;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
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
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        const itemWithQuantity = {
          item: item._id,
          price: item.price,
          name: item.name,
          quantity: cartItems[item._id],
        };
        orderItems.push(itemWithQuantity);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      totalPrice: total,
    };
    try {
      let { data } = await axiosClient.post("/order/place", orderData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (data?.success) {
        navigate("/myorders");
        toast.success("Order Placed Successfully!");
        localStorage.removeItem("cartItems");
        setData({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          phone: "",
        });
        dispatch(subTotal({}));
      } else {
        toast.error(data?.message || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
      return;
    }
  };

  useEffect(() => {}, [handleSubmit]);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row items-start justify-between mt-20 gap-24"
    >
      {/* Delivery Information Section */}
      <div className="max-w-screen-lg flex-1 space-y-4">
        <p className="text-xl font-semibold">Delivery Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            placeholder="First Name"
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
        </div>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            placeholder="State"
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="zipCode"
            value={data.zipCode}
            onChange={onChangeHandler}
            placeholder="Zip Code"
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
        />
      </div>

      {/* Cart Total Section */}
      <div className="p-6 flex flex-col w-full lg:w-96 mt-10 shadow-md space-y-6">
        <h2 className="text-lg font-bold text-gray-800">Cart Total</h2>
        <div className="text-gray-700 space-y-3">
          <div className="flex justify-between">
            <p className="font-medium">Subtotal</p>
            <p>${subtotal?.toFixed(2)}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p className="font-medium">Delivery Fee</p>
            <p>${deliveryFee?.toFixed(2)}</p>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-gray-900">
            <p>Total</p>
            <p>${total?.toFixed(2)}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700 transition"
        >
          PROCEED TO PAYMENT
        </motion.button>
      </div>
    </form>
  );
};

export default PlaceOrder;
