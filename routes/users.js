var express = require('express');
const userController = require('../controllers').User;
var router = express.Router();

/* GET users listing. */
router.get('/', userController.findAll);
router.post('/', userController.create);
router.delete('/:id', userController.delete);
router.put('/:id', userController.update);
router.get('/search', userController.search);

module.exports = router;
