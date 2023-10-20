var express = require('express');
const recipeController = require('../controllers/recipe');
var router = express.Router();

/* GET recipes listing. */
router.get('/', recipeController.findAll);
router.post('/', recipeController.create);
router.delete('/:id', recipeController.delete);
router.put('/:id', recipeController.update);

module.exports = router;