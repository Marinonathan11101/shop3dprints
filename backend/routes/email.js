const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
});

// POST route for sending an email
router.post('/send-email', (req, res) => {
 
    const { user, items } = req.body;

    console.log(user, items);
    console.log(process.env.GMAIL_PASSWORD);
    console.log(process.env.GMAIL_USER);

  if (!user || !user.email || !items || items.length === 0) {
    return res.status(400).send('User data or items missing');
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    return res.status(500).send('Gmail credentials are missing');
  }

  // Format the items list as a string for the email
  const itemsText = items.map(item => {
    const topColor = item.topColor;
    const baseColor = item.baseColor;
  
    // Check if both topColor and baseColor are not null
    let colorInfo = '';
    if (topColor && baseColor) {
      colorInfo = `Top Color: ${topColor}, Base Color: ${baseColor}`;
    } else if (topColor) {
      colorInfo = `Top Color: ${topColor}`;
    } else if (baseColor) {
      colorInfo = `Base Color: ${baseColor}`;
    }

    else{
      colorInfo = item.color;
    }
  
    return `${item.name} - Quantity: ${item.count || 1} - Price: $${item.price * (item.count || 1)} - Color: ${colorInfo} - Dimensions: ${item.dimensions}`;
  }).join('\n');
  const totalAmount = items.reduce((total, item) => total + item.price * (item.count || 1), 0).toFixed(2);

  // Prepare the email content for the user (order confirmation)
  const userMailOptions = {
    from: process.env.GMAIL_USER,
    to: user.email,
    subject: `Order Confirmation for ${user.displayName}`,
    text: `Hello ${user.displayName},\n\nThank you for your order!\n\nItems:\n${itemsText}\n\nTotal: $${totalAmount}\n\nShipping Address: ${user.shippingAddress}\n\n Postal Code: ${user.postalCode}\n\n Country: ${user.country}\n\n City: ${user.city}\n\n We will process your order shortly.`
  };

  // Prepare the email content for the admin (notification)
  const adminMailOptions = {
    from: user.email,
    to: process.env.GMAIL_USER, // Your email
    subject: `New Order from ${user.displayName}`,
    text: `New order from ${user.displayName} (${user.email})\n\nItems:\n${itemsText}\n\nTotal: $${totalAmount}\n\nShipping Address: ${user.shippingAddress}\n\n Postal Code: ${user.postalCode}\n\n Country: ${user.country}\n\n City: ${user.city}\n\n Please review and process the order.`
  };

  // Send the user's order confirmation email
  transporter.sendMail(userMailOptions, (userError, userInfo) => {
    if (userError) {
      return res.status(500).send('Failed to send user confirmation email');
    }

    console.log('User confirmation email sent: ' + userInfo.response);

    // Send the admin notification email after the user email is successfully sent
    transporter.sendMail(adminMailOptions, (adminError, adminInfo) => {
      if (adminError) {
        return res.status(500).send('Failed to send admin notification email');
      }

      console.log('Admin notification email sent: ' + adminInfo.response);
      res.status(200).send('Emails sent successfully');
    });
  });
});

module.exports = router;