const Order = require('../models/order');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await Order.create(order);
    res.status(201).send(order);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};