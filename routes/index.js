const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const recipeRouter = require('./recipeRouter')
const productRouter = require('./productRouter')
const proportionRouter = require('./proportionRouter')
const favoriteRouter = require('./favoriteRouter')
const cookRouter = require('./cookRouter')
const ratingsRouter = require('./ratingsRouter')


router.use('/user', userRouter)
router.use('/recipe', recipeRouter)
router.use('/type', typeRouter)
router.use('/product', productRouter)
router.use('/proportion', proportionRouter)
router.use('/favorite', favoriteRouter)
router.use('/cook', cookRouter)
router.use('/rating', ratingsRouter)



module.exports = router