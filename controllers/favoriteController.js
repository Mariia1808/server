const {Favorites, Cook, Rating, Recipe} = require('../models/models')
const ApiError = require('../error/ApiError');

class FavoriteController {
    async create(req, res){
        const {recipeId, userId} = req.body
        const favorite = await Favorites.create({recipeId, userId})
        console.log(favorite)
        return res.json(favorite)
    }
    async getAll(req, res){
        let {recipeId, userId} = req.body
        let favorites;
        if(!recipeId && !userId) {
            favorites = await Favorites.findAndCountAll()
        }
        if(recipeId && !userId) {
            favorites = await Favorites.findAndCountAll({where:{recipeId}})
        }
        if(!recipeId && userId) {
            favorites = await Favorites.findAndCountAll({where:{userId}})
        }
        if(recipeId && userId) {
            favorites = await Favorites.findAndCountAll({where:{userId, recipeId}})
        }
        return res.json(favorites)

    }
    async getOne(req, res){
        const {id} = req.params
        const favorites = await Favorites.findOne(
            {where:{id}}
        )
        return res.json(favorites)
    }
    async delete(req, res){
        const {recipeId, userId} = req.params
        const favorites = await Favorites.destroy(
            {where: {recipeId: recipeId, userId: userId}},
        )
        console.log(favorites)
        return res.json(favorites)
    }
    async getFavorite(req,res,next){
        const {id,userId}= req.params
        const marks = []
        const favo = await Favorites.findOne({where:{recipeId:id, userId: userId}})
        const coo = await Cook.findOne({where:{recipeId:id, userId: userId}})
        const ra = await Rating.findOne({where:{recipeId:id, userId: userId}})
        marks.push(favo)
        marks.push(coo)
        marks.push(ra)
        return res.json(marks)
    }
    async getUserFavorite(req, res, next){
        const {id}= req.params
        const all_rating = await Favorites.findAll({where:{ userId: id}})
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
module.exports = new FavoriteController()