'use strict';
var Promise = require('bluebird');

const db = require('../server/db');
const { User, Order, Boat } = require('../server/db/models');

var ordersData = [
  { status: 'COMPLETED' },
  { status: 'PENDING' },
  { status: 'SHIPPED' },
  { status: 'CANCELLED' },
  { status: 'REFUNDED' },
];

var usersData = [
  { email: 'cody@email.com', password: '123' },
  { email: 'murphy@email.com', password: '123' },
];

var usersDataWithOrders = [
  { email: 'cody@aol.com', password: '123' },
  { email: 'murphy@aol.com', password: '123' },
];

var boatNames = [
  'Aquaholic',
  'Pearl',
  'Forever Young',
  'Second Chance',
  'Squid Pro Quo',
  'More Cowbell',
  'Pegasus',
  "Feelin' Nauti",
  'Why Not',
  'High Maintenance',
];

var boatsData = boatNames.slice(0, 5).map(name => ({
  name: name,
  description: '',
  cost: Math.floor(Math.random() * 1000000),
}));

var boatsWithOrdersData = boatNames.slice(5).map(name => ({
  name: name,
  description: '',
  cost: Math.floor(Math.random() * 1000000),
}));

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.map(usersData, function(user) {
    return db.model('user').create(user);
  });

  console.log(`seeded ${users.length} users with no orders`);

  const usersWithOrders = await Promise.map(usersDataWithOrders, function(
    user
  ) {
    return db
      .model('user')
      .create(Object.assign(user, { orders: ordersData }), {
        include: [Order],
      });
  });

  console.log(`seeded ${usersWithOrders.length} users with multiple orders`);

  const boats = await Promise.map(boatsData, function(boat) {
    return db.model('boat').create(boat);
  });

  console.log(`seeded ${boats.length} boats with no orders`);

  const dbUsers = await User.findAll();
  const userIds = dbUsers.map(user => user.id);
  const quantities = boatsWithOrdersData.map(_ =>
    Math.floor(Math.random() * boatsWithOrdersData.length)
  );

  const boatsWithOrders = await Promise.map(boatsWithOrdersData, function(
    boat,
    ind
  ) {
    return db.model('boat').create(
      Object.assign(boat, {
        orders: ordersData
          .slice(ind)
          .map(order => Object.assign(order, { userId: userIds[ind] })),
      }),
      {
        include: [Order],
      }
    );
  });

  console.log(`seeded ${boatsWithOrders.length} boats with orders`);

  const ordersWithBoats = await Promise.map(ordersData, function(order, ind) {
    return db.model('order').create(
      Object.assign(order, {
        boats: boatsData.slice(ind),
      }),
      {
        include: [Boat],
      }
    );
  });

  console.log(ordersWithBoats[0].dataValues);

  console.log(`seeded ${ordersWithBoats.length} orders with multiple boats`);

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
