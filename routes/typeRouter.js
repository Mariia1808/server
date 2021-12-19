const Router = require('express')
const typeController = require('../controllers/typeController')
const router = new Router()



router.post('/', typeController.create)
router.get('/',typeController.getAll)
router.get('/:id',typeController.getOne)
router.put('/:id', typeController.update)
router.delete('/:id', typeController.delete)

module.exports = router