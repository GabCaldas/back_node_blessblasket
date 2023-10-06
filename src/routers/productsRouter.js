'use strict'
const express = require('express')
const productsRouter = express.Router();
const productsController = require('../controllers/productController')

//Rotas comuns
productsRouter.route('/products')
//Lista todos os produtos
.get((req, res) => productsController.getProducts(req, res))
//Cria um produto, passando: name, price, category, quantity, description
.post((req, res) => productsController.createProduct(req, res))
//Atualiza um produto 
.put((req, res) => productsController.updateProduct(req, res))

productsRouter.route('/product/name')
//Busca um produto específico, passando o name pelo body
.get((req, res) => productsController.getProductByName(req, res))

productsRouter.route('/delete/product/name')
//Deleta um produto específico, passando o name pelo body
.delete((req, res) => productsController.deleteProductByName(req, res))


module.exports = productsRouter;
