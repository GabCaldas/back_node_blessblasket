
const ProductModel = require('../models/productModel')
module.exports= {
    getProducts: (req, res) => {
        ProductModel.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({message: "Não foi possível recuperar os produtos"})
        })
    },
    deleteProductByName: async (req, res) => {
        try {
            await ProductModel.deleteOne({name:req.body.name})
            res.status(200).send({message: "Produto removido com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível remover o produto"})
        }
    },
    getProductByName: async (req, res) => {
        try {
            const result = await ProductModel.findOne({name:req.body.name}).select(["-__v", "-_id"])
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({message: "Não foi possível recuperar o produto no momento"})
        }
    },
    updateProduct: async (req, res) => { 
               try {
            const result = await ProductModel.updateOne({name: req.body.name}, req.body)
            res.status(200).send({message: "Produto atualizado com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível atualizar o produto"})
        }
    },
    createProduct: async (req, res) => {
        try {
            const result = await ProductModel.create(req.body)
            res.status(201).json({message: `O produto ${result._doc.name} foi criado com sucesso!`})
        } catch (err) {
            res.status(500).json({message: `Não foi possível criar o produto ${req.body.name}`})

        }
    }
}