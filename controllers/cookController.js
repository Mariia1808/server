const {Cook, Recipe} = require('../models/models')
const ApiError = require('../error/ApiError');

class CookController {
    async create(req, res){
        const {userId, recipeId} = req.body
        const cook = await Cook.create({userId, recipeId})
        console.log(cook)
        return res.json(cook)
    }
    async getAll(req, res){
        const cooks = await Cook.findAll()
        return res.json(cooks)
    }
    async getOne(req, res){
        const {id} = req.params
        const cooks = await Cook.findOne(
            {where:{id}}
        )
        return res.json(cooks)
    }
    async delete(req, res){
        const {recipeId, userId} = req.params
        const cooks = await Cook.destroy(
            {where: {recipeId: recipeId, userId: userId}},
        )
        console.log(cooks)
        return res.json(cooks)
    }
    async getUserCook(req, res, next){
        const {id}= req.params
        const all_rating = await Cook.findAll({where:{ userId: id}})
        const new_rating= []
        for (const el_all_rating of all_rating)
        {
            const {recipeId} = el_all_rating
            const one_recipe = await Recipe.findOne({where:{id: recipeId}})
            new_rating.push(one_recipe)
        }
        return res.json(new_rating)

    }
}
module.exports = new CookController()