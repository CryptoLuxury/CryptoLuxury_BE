const express = require("express");
const helmet = require('helmet')
const cors = require('cors')

const authUser = require('../users/authUsers-router.js')
const authAdmin = require('../admins/authAdmins-router.js')
const userRouter = require('../users/users-router.js')
const adminRouter = require('../admins/admins-router.js')

const contactRouter = require('../forms/contact-router.js')
const devTicketRouter = require('../forms/devTicket-router.js')
const enlistRouter = require('../forms/enlist-router.js')

const teamRouter = require('../team/team-router.js')

const cardOrders = require('../orders/cardOrders-router.js')
const watchOrders = require('../orders/watchOrders-router.js')

const paypalRouter = require('../paypal/paypal-router.js')
const stripeRouter = require('../stripe/stripe-router.js')

const featureRouter = require('../store/feature-router.js')
const cartsRouter = require('../store/carts-router.js')
const cardsRouter = require('../store/cards-router.js')
const watchesRouter = require('../store/watches-router.js')

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(`${process.env.AUTH_ROUTE}`, authAdmin);
server.use(`${process.env.ACCOUNTS_ROUTE}`, adminRouter);
server.use(`${process.env.AUTH_ROUTE}`, authUser);
server.use(`${process.env.ACCOUNTS_ROUTE}`, userRouter);

server.use(`${process.env.BASE_ROUTE}`, teamRouter)

server.use(`${process.env.FORM_ROUTE}`, contactRouter);
server.use(`${process.env.FORM_ROUTE}`, devTicketRouter);
server.use(`${process.env.FORM_ROUTE}`, enlistRouter);
server.use(`${process.env.FORM_ROUTE}`, cardOrders);
server.use(`${process.env.FORM_ROUTE}`, watchOrders);

server.use(`${process.env.STORE_ROUTE}`, featureRouter)
server.use(`${process.env.STORE_ROUTE}`, cartsRouter);
server.use(`${process.env.STORE_ROUTE}`, cardsRouter);
server.use(`${process.env.STORE_ROUTE}`, watchesRouter);

server.use(`${process.env.PAYPAL_ROUTE}`, paypalRouter)
server.use(`${process.env.STRIPE_ROUTE}`, stripeRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

module.exports = server;