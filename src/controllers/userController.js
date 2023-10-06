
const UserModel = require('../models/userModel')
const jwtService = require('jsonwebtoken')

module.exports= {
    getUsers: (req, res) => {
        UserModel.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({message: "Não foi possível recuperar os Users"})
        })
    },
    deleteUserByCPF: async (req, res) => {
        try {
            const result = await UserModel.deleteOne({cpf: req.body.cpf})
            res.status(200).send({message: "User removido com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível remover o User"})
        }
    },
    getUserByCPF: async (req, res) => {
        try {
            const result = await UserModel.findOne({cpf: req.body.cpf}).select(["-__v", "-_id"])
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({message: "Não foi possível recuperar o User no momento"})
        }
    },
    updateUser: async (req, res) => { 
        try {
            const result = await UserModel.updateOne({cpf: req.body.cpf}, req.body)
            res.status(200).send({message: "User atualizado com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível atualizar os dados"})
        }
    },
    login: async (req, res) => {
        const result = await UserModel.findOne({email: req.body.email, password: req.body.password})
        if (!result) {
          res.status(401).json({message: 'Usuário não autorizado!'})
        } else {
            const secret = process.env.SECRET
            jwtService.sign(req.body, secret, (err, token) => {
                if (err) {
                    res.status(401).json({message: 'Não foi possível se autenticar no sistema'})
                }
                res.set('Access-Token', token)
                res.status(200).json({message: 'Usuário logado com sucesso!'})
                res.end()
            })
        }
    },
    createUser: async (req, res) => {
        try {
          const { name, email, password, cpf } = req.body;
 
          const existingUser = await UserModel.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: 'Este email já está em uso.' });
          }
      
          const newUser = new UserModel({ name, email, password, cpf });
          await newUser.save();
      
          res.status(201).json({ message: `Usuário ${name} criado com sucesso.` });
        } catch (err) {
        
          console.error(err);
          res.status(500).json({ message: 'Erro ao criar o usuário.' });
        }
      }
      
}