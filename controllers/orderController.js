const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Orders could not be fetched." });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { items, customerName, customerEmail, paymentStatus } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items are required." });
    }

    const totalPrice = items.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity);
    }, 0);

    const newOrder = new Order({
      items,
      totalPrice,
      customerName,
      customerEmail,
      paymentStatus: paymentStatus || "Pending"
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: "Order could not be created." });
  }
};