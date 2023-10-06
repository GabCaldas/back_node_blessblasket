'use strict'
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
mongoose.connect('mongodb://127.0.0.1:27017/test')

const express = require('express')

const app = express();
const port = process.env.port || 3001;

const purchasesRouter = require('./src/routers/purchasesRouter')
const productsRouter = require('./src/routers/productsRouter');
const userRouter = require('./src/routers/userRouter');
const middlewareAuth = require('./src/middlewareAuth')

app.use(express.json())
app.use(cors());
app.use(middlewareAuth)
app.use(purchasesRouter)
app.use(productsRouter)
app.use(userRouter)

app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`)
});

