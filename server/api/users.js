const router = require('express').Router();
const { User, Order, Boat } = require('../db/models');
const { isAdmin, isAdminOrCorrectUser } = require('./gateway.js');
var Promise = require('bluebird');

module.exports = router;

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/orders', async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.id, {
      include: [{ model: Order }],
    });

    const ordersWithBoats = await Promise.map(user.orders, async function(
      order
    ) {
      const orderWithBoats = await Order.findByPk(order.id, {
        include: [{ model: Boat }],
      });
      return orderWithBoats;
    });

    res.json(ordersWithBoats);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isAdminOrCorrectUser, async (req, res, next) => {
  try {
    let order;

    const existingOrder = await Order.findOne({
      where: {
        userId: +req.params.id,
        status: 'PENDING',
      },
      attributes: ['id', 'status', 'shippingAddress', 'total'],
      include: [
        { model: Boat, attributes: ['id', 'cost', 'name', 'imageUrl'] },
      ],
    });

    if (existingOrder) {
      order = existingOrder;
      await existingOrder.calculateTotal();
    } else {
      // create new order for user
      const newOrder = await Order.create();

      const newOrderWithBoats = await Order.findByPk(newOrder.id, {
        attributes: ['id', 'status', 'shippingAddress', 'total'],
        include: [
          { model: Boat, attributes: ['id', 'cost', 'name', 'imageUrl'] },
        ],
      });

      // create associations
      const user = await User.findByPk(+req.params.id);
      await newOrderWithBoats.setUser(user);

      order = newOrderWithBoats;
    }

    await order.save();

    res.json(order.dataValues);
  } catch (err) {
    next(err);
  }
});
