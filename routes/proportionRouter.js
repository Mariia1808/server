const Router = require('express')
const router = new Router()
const proportionController = require('../controllers/proportionController')

router.post('/', proportionController.create)
router.get('/', proportionController.getAll)
router.get('/:id', proportionController.getOne)
router.delete('/:id', proportionController.delete)
router.put('/:id', proportionController.update)

module.exports = router