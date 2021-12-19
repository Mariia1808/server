const {Product} = require('../models/models')
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res){
        const {name, kcal, protein, fat, carb} = req.body
        const product = await Product.create({name,  kcal, protein, fat, carb})
        console.log(product)
        return res.json(product)
    }
    async getAll(req, res){
        const products = await Product.findAll()
        return res.json(products)
    }
    async getOne(req, res){
        const {id} = req.params
        const products = await Product.findOne(
            {where:{id}}
        )
        return res.json(products)
    }
}

module.exports = new ProductController()