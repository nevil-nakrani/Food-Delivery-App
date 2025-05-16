import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import { instance } from "../config/razorpay.js";
import { sendEmail } from "../Services/email.service.js";

export const placeOrder = async (req, res) => {
  try {
    
    const { items, totalPrice, address, razorpay_order_id } = req.body;
    console.log();
    
    if (!items || !totalPrice || !address) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }
    const orderInfo = await instance.orders.fetch(razorpay_order_id);
    console.log(orderInfo);
    if (orderInfo.status === "paid") {
      const order = await Order.create({
        user: req.user._id,
        items,
        totalPrice,
        address,
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { orders: order._id },
      });

      // Send email to user
      sendEmail(req.user.email, items, totalPrice, address);

      return res.status(201).json({
        message: "Order placed successfully",
        success: true,
        order,
      });
    } else {
      return res.send(error(403, "Payment failed"));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const listAll = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.item")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    return res.status(200).json({
      message: "Order status updated successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
