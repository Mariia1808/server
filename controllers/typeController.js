const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
    }
    async getOne(req, res){
        const {id} = req.params
        const types = await Type.findOne(
            {where:{id}}
        )
        return res.json(types)
    }
    async update(req, res, next){
            console.log(req.params)
            const {id} = req.params
            let {name} = req.body
            const type = await ( await (Type.findOne({where: {id}}))).update({name:name})
            return res.json({type})
        }
    async delete(req, res){
        const {id} = req.params
        const types = await type.destroy(
            {where: {id}},
        )
        return res.json(types)
    }
}

module.exports = new TypeController()