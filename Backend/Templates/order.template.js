export const ORDER_TEMP = (items, totalPrice, address) => {
  const itemsHTML = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">₹ ${item.price.toFixed(
            2
          )}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            item.quantity
          }</td>
          <td style="padding: 8px; border: 1px solid #ddd;">₹ ${(
            item.price * item.quantity
          ).toFixed(2)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2 style="color: #e63946;">🍅 Tomato - Order Confirmation</h2>
      <p>Thank you for your order! Here are the details:</p>

      <h3>🧾 Order Summary:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f4f4f4;">
            <th style="padding: 8px; border: 1px solid #ddd;">Item</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <h3>📦 Delivery Address:</h3>
      <p>
        ${address.firstName} ${address.lastName}<br/>
        ${address.street}, ${address.city}, ${address.state} - ${
    address.zipCode
  }<br/>
        ${address.country}<br/>
        Phone: ${address.phone}<br/>
        Email: ${address.email}
      </p>

      <h3>💰 Total Price: ₹ ${totalPrice.toFixed(2)}</h3>

      <p style="margin-top: 30px;">If you have any questions, feel free to contact us.</p>
      <p style="color: #777;">© ${new Date().getFullYear()} Tomato - Food Delivery</p>
    </div>
  `;
};
