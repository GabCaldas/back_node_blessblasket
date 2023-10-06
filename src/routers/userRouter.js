'use strict'

//Imports
const express = require('express')
const userRouter = express.Router();
const userController= require('../controllers/userController')

//Rotas comuns
userRouter.route('/users')
.get((req,res) => userController.getUsers(req,res))
.put((req,res) => userController.updateUser(req,res))

//Rotas que precisam passar o cpf pelo body
userRouter.route('/users/cpf')
.get((req,res) => userController.getUserByCPF(req,res))
.delete((req,res) => userController.deleteUserByCPF(req,res))

//Rota de Login
//Necessário passar somente email e password no body
userRouter.route('/login')
.post((req,res) => userController.login(req,res))

//Rota de Create User
//Necessário passar: name, cpf, email e password
userRouter.route('/createuser')
.post((req,res) => userController.createUser(req,res))

module.exports = userRouter;