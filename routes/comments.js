var express = require('express');
const commentController = require('../controllers/comment');
var router = express.Router();

/* GET comments listing. */
router.get('/', commentController.findAll);
router.post('/', commentController.create);
router.delete('/:id', commentController.delete);
router.put('/:id', commentController.update);
router.get('/comments/:recipe_id', commentController.getCommentsByRecipeId);

module.exports = router;