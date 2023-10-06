'use strict'
const express = require('express')
const purchasesRouter = express.Router();
const purchasesController = require('../controllers/purchasesController')

purchasesRouter.route('/purchase')
//Listar todas as compras
.get((req, res) => purchasesController.getPurchases(req, res))
//Criar compras, deve se passar no body dessa forma: {"products": [{"name": "arroz","quantity": 2}, etc]}
.post((req, res) => purchasesController.createPurchase(req, res))
//Excluir todos as compras
.delete((req, res) => purchasesController.deletePurchases(req, res))

module.exports = purchasesRouter;
