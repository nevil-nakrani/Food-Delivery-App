import { instance } from "../config/razorpay.js";

export const createPayment = async (req, res) => {
  try {
    const { items, totalPrice, address } = req.body;
    if (!items || !totalPrice || !address) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }
    const options = {
      amount: totalPrice * 100,
      currency: process.env.CURRENCY,
      receipt: `receipt_${Math.random() * 100}`,
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

