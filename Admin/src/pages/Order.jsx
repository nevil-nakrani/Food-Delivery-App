import { useState, useEffect } from "react";
import axiosClient from "../../../Fronted/utils/axiosClient";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosClient.get("/order/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error || "Fetch failed");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const statusHandler = async (e, id) => {
    const status = e.target.value;
    try {
      const { data } = await axiosClient.post(
        "/order/status",
        { status, id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error || "Update failed");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full px-6 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">All Orders</h1>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order, idx) => (
            <div
              key={order._id}
              className="w-full bg-white p-5 flex items-start gap-6 border-orange-100 border-2 transition"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <img
                  src={assets.parcel_icon}
                  alt="Parcel"
                  className="w-10 h-10"
                />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-6 w-full text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900">Items</p>
                  <p className="truncate">
                    {order.items.map((item, index) => (
                      <span key={index}>
                        {item.name} × {item.quantity}
                        {index < order.items.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Customer</p>
                  <p>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="truncate">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.country} -{" "}
                    {order.address.zipCode}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p>{order.address.phone}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Total</p>
                  <p>₹ {order.totalPrice.toFixed(2)}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">No. of Items</p>
                  <p>{order.items.length}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Status</p>
                  <select
                    defaultValue={order.status}
                    onChange={(e) => statusHandler(e, order._id)}
                    className="mt-1 border border-gray-300 rounded px-2 py-1 w-full bg-white text-sm"
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
