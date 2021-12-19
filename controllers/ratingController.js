const {Rating, Recipe} = require('../models/models')
const ApiError = require('../error/ApiError');

class RatingController {
    async create(req, res){
        const {rate, userId, recipeId, rates } = req.body
        const rating = await Rating.create({rate, userId, recipeId})
        const recipe = await Recipe.update({rate: rates}, {where: {id: recipeId}})
        console.log(recipe)
        console.log(rating)
        return res.json(rating)
    }
    async getAll(req, res){
        const ratings = await Rating.findAll()
        return res.json(ratings)
    }
    async getOne(req, res){
        const {id} = req.params
        const ratings = await Rating.findOne(
            {where:{id}}
        )
        return res.json(ratings)
    }
    async delete(req, res){
        const {userId, recipeId, rate} = req.params
        const ratings = await Rating.destroy({where: {userId: userId, recipeId: recipeId}})
        const recipe = await Recipe.update({rate: rate}, {where: {id: recipeId}})
        console.log(ratings)
        console.log(recipe)
        return res.json(ratings)
    }
    async update(req, res){
        const {id} = req.params
        const {rate, recipeId, rates } = req.body
        const ratings = await Rating.update({rate: rate}, {where: {id: id}})
        const recipe = await Recipe.update({rate: rates}, {where: {id: recipeId}})
        console.log(ratings)
        return res.json(ratings)
    }
    async getUserRating(req, res, next){
        const {id}= req.params
        const all_rating = await Rating.findAll({where:{ userId: id}})
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
module.exports = new RatingController()