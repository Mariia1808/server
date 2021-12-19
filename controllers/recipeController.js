const uuid = require('uuid')
const path = require('path')
const {Recipe, Proportion} = require('../models/models')
const ApiError = require('../error/ApiError')
const { info } = require('console')
 
class RecipeController {
    async create(req, res){
        
        let {name, time, complex, profile_mini, profile, typeId, userId, kcal, protein, fat, carb, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        
        const recipe = await Recipe.create({name, time, complex, profile_mini, profile, img: fileName, kcal: parseInt(kcal), 
            protein: parseInt(protein), fat: parseInt(fat), carb: parseInt(carb), typeId, userId,})
        if (info) {
            info = JSON.parse(info)
            info.forEach(i =>
                Proportion.create({
                kolvo: parseInt(i.kolvo),
                recipeId: parseInt(recipe.id),
                productId: parseInt(i.product)}
                )
            )
        }
        
        console.log(recipe)
        return res.json(recipe)
        
    }
    async getAll(req, res){
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 12
        let offset = page * limit - limit
        let recipes;
        if(!typeId) {
            recipes = await Recipe.findAndCountAll({limit, offset})
        }
        if(typeId) {
            recipes = await Recipe.findAndCountAll({where:{typeId}, limit, offset})
        }
        return res.json(recipes)
    }
    async getOne(req, res){
        const {id} = req.params
        const recipe = await Recipe.findOne({
            where:{id}}
        )
        return res.json(recipe)

    }
    async update(req, res){
       
            console.log(req.params)
            const {id} = req.params
            const {name, time, complex, profile_mini, profile, typeId} = req.body
            const {img} = req.files
            const fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const recipe = await Recipe.update({name: name, time: time, complex: complex, profile_mini: profile_mini, profile: profile, typeId: typeId}, {where: {id: id}})
            console.log(recipe)
            return res.json({recipe})
           
        }
        
        async updateKcal(req, res){
       
            console.log(req.params)
            const {id} = req.params
            const {kcal, protein, fat, carb} = req.body
            const recipe = await Recipe.update({kcal: kcal, protein: protein, fat: fat, carb: carb}, {where: {id: id}})
            console.log(recipe)
            return res.json({recipe})
           
        }

        async delete(req, res){
        const {id} = req.params
        const recipe = await Recipe.destroy({
            where:{id}}
        )
        return res.json(recipe)
        }
    
}

module.exports = new RecipeController()