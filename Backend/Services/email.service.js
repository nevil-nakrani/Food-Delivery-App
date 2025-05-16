import { transporter } from "../config/mailtrap.js";
import { ORDER_TEMP } from "../Templates/order.template.js";

export const sendEmail = async (email, items, totalPrice, address) => {
//   email = "nakaraninevil2017@gmail.com";
  const recipients = [email];
  try {
    const info = await transporter.sendMail({
      from: {
        name: "Tomato - Food Delivery",
        address: process.env.EMAIL_USER,
      },
      to: recipients,
      subject: "Order Information",
      html: ORDER_TEMP(items, totalPrice, address),
      category: "Order Email",
    });
    console.log(`Order email sent to ${email}`);
  } catch (error) {
    console.log(`Error in sending booking email ${error.message}`);
  }
};
