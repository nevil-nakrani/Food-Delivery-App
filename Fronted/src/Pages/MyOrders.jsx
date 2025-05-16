import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosClient.get("/order");
      if (data.success) {
        setData(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Fetch failed");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-sm shadow-sm shadow-orange-200 p-5 grid grid-rows-[auto,1fr,auto] gap-4 hover:shadow-md hover:shadow-orange-200 transition duration-300 bg-white"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Order ID:{" "}
                  <span className="text-gray-900">
                    {order._id.slice(-6).toUpperCase()}
                  </span>
                </span>
                <img
                  src={assets.parcel_icon}
                  alt="Parcel Icon"
                  className="size-16"
                />
              </div>

              {/* Items */}
              <div className="grid gap-2">
                {order.items.map((item, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    <span className="font-medium">{item.name}</span> ×{" "}
                    {item.quantity}
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 border-t pt-3 items-center">
                <div>
                  Total Items: <b>{order.items.length}</b>
                </div>
                <div>
                  Total Price: <b>₹ {order.totalPrice?.toFixed(2)}</b>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  <b>{order.status}</b>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={fetchOrders}
                    className=" text-orange-400 px-6 py-2 border-2 border-orange-300 rounded-md hover:bg-orange-100 transition text-sm"
                  >
                    Track
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
