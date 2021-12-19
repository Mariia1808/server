const Router = require('express')
const favoriteController = require('../controllers/favoriteController')
const router = new Router()

router.post('/', favoriteController.create)
router.get('/', favoriteController.getAll)
router.get('/:id', favoriteController.getUserFavorite)
router.delete('/:recipeId/:userId', favoriteController.delete)


module.exports = router