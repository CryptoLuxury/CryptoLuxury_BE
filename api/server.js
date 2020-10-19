const express = require("express");
const helmet = require('helmet')
const cors = require('cors')

const authUser = require('../users/authUsers-router.js')
const authAdmin = require('../admins/authAdmins-router.js')
const userRouter = require('../users/users-router.js')
const adminRouter = require('../admins/admins-router.js')

const contactRouter = require('../contact/contact-router.js')

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

server.use('/api/carts', cartsRouter);
server.use('/api/cards', cardsRouter);
server.use('/api/watches', watchesRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

module.exports = server;