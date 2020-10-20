const express = require("express");
const helmet = require('helmet')
const cors = require('cors')

const authUser = require('../users/authUsers-router.js')
const authAdmin = require('../admins/authAdmins-router.js')
const userRouter = require('../users/users-router.js')
const adminRouter = require('../admins/admins-router.js')

const contactRouter = require('../forms/contact-router.js')
const devTicketRouter = require('../forms/devTicket-router.js')

const cartsRouter = require('../store/carts-router.js')
const cardsRouter = require('../store/cards-router.js')
const watchesRouter = require('../store/watches-router.js')

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authAdmin);
server.use('/api/accounts', adminRouter);
server.use('/api/users', authUser);
server.use('/api/accounts', userRouter);

server.use('/api/form', contactRouter);
server.use('/api/form', devTicketRouter);

server.use('/api/store', cartsRouter);
server.use('/api/store', cardsRouter);
server.use('/api/store', watchesRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

module.exports = server;