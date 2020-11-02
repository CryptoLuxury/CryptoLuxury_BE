const express = require("express");
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require("express-rate-limit");

const authAdmin = require('../admins/authAdmins-router.js')
const adminRouter = require('../admins/admins-router.js')

const contactRouter = require('../forms/contact-router.js')
const devTicketRouter = require('../forms/devTicket-router.js')
const enlistRouter = require('../forms/enlist-router.js')

const teamRouter = require('../team/team-router.js')

const paypalRouter = require('../paypal/paypal-router.js')
const stripeRouter = require('../stripe/stripe-router.js')

const featureRouter = require('../store/feature-router.js')
const productRouter = require('../store/products-router.js')

const server = express();

const minuteLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: "The request limit has been exceeded try again in a minute."
});

const hourLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: "The request limit has been exceeded try again in about an hour."
});

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(minuteLimiter)
server.use(hourLimiter)

server.use(`${process.env.AUTH_ROUTE}`, authAdmin);
server.use(`${process.env.ACCOUNTS_ROUTE}`, adminRouter);

server.use(`${process.env.BASE_ROUTE}`, teamRouter)

server.use(`${process.env.FORM_ROUTE}`, contactRouter);
server.use(`${process.env.FORM_ROUTE}`, devTicketRouter);
server.use(`${process.env.FORM_ROUTE}`, enlistRouter);

server.use(`${process.env.STORE_ROUTE}`, featureRouter)
server.use(`${process.env.STORE_ROUTE}`, productRouter);

server.use(`${process.env.PAYPAL_ROUTE}`, paypalRouter)
server.use(`${process.env.STRIPE_ROUTE}`, stripeRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

module.exports = server;