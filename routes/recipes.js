const express = require('express');
const router = express.Router();
const { Recipe } = require('../models/recipe'); // Sesuaikan dengan model yang sudah Anda buat

// Menampilkan semua resep
router.get('/recipes', async (req, res) => {
    const recipes = await Recipe.findAll();
    res.json(recipes);
});

// Menambahkan resep baru
router.post('/recipes', async (req, res) => {
    const newRecipe = await Recipe.create(req.body);
    res.json(newRecipe);
});

// Mengubah resep berdasarkan ID
router.put('/recipes/:id', async (req, res) => {
    const updatedRecipe = await Recipe.update(req.body, {
        where: { id: req.params.id },
    });
    res.json(updatedRecipe);
});

// Menghapus resep berdasarkan ID
router.delete('/recipes/:id', async (req, res) => {
    await Recipe.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Recipe deleted' });
});

// Pencarian resep berdasarkan nama  
router.get('/recipes/search', async (req, res) => {
    const { name } = req.query;
    const recipes = await Recipe.findAll({
        where: { title: { [Op.like]: `%${name}%` } }, // Menggunakan Sequelize Operators (Op)
    });
    res.json(recipes);
});

// Menampilkan resep terbaru (maksimal 5)
router.get('/recipes/recent', async (req, res) => {
    const recipes = await Recipe.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']], // Mengurutkan berdasarkan tanggal pembuatan
    });
    res.json(recipes);
});

module.exports = router;


