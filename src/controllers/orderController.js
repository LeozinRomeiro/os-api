const Ordem = require('../models/order');

exports.getAllOrders = async (req, res) => {
  try {
    const ordens = await Ordem.getAll();
    res.json(ordens);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};

exports.createOrder = async (req, res) => {
  try {
    const Ordem = new Order(req.body);
    await Ordem.create(Ordem);
    res.status(201).send(Ordem);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};