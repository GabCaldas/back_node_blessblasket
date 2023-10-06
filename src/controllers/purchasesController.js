
const PurchaseModel = require('../models/purchaseModel')
module.exports= {
    getPurchases: (req, res) => {
        PurchaseModel.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({message: "Não foi possível recuperar as compras"})
        })
    },
    deletePurchases: async (req, res) => {
        try {
            await PurchaseModel.deleteMany({})
            res.status(200).send({message: "Todas as compras foram apagadas"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível apagar as compras"})
        }
    },
    createPurchase: async (req, res) => {
        try {
            const result = await PurchaseModel.create(req.body)
            res.status(201).json({message: `A compra foi realizada com sucesso!`})
        } catch (err) {
            res.status(500).json({message: `Não foi possível realizar a compra`})

        }
    }
}