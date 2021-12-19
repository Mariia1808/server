const Router = require('express')
const favoriteController = require('../controllers/favoriteController')
const router = new Router()
const recipeController = require('../controllers/recipeController')
const cookController = require('../controllers/cookController')

router.post('/', recipeController.create)
router.get('/', recipeController.getAll)
router.get('/:id', recipeController.getOne)
router.put('/:id', recipeController.update)
router.put('/kcal/:id', recipeController.updateKcal)
//router.put('/rate/:id', recipeController.updateRate)
router.delete('/:id', recipeController.delete)


router.get('/:id/:userId', favoriteController.getFavorite)
//router.get('/:id/:userId', cookController.getCook)





module.exports = router