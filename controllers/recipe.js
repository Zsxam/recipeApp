/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const db = require('../models');

const Recipe = db.recipes;
const Sequelize = require('sequelize');

exports.findAll = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json({
      message: 'Recipes retrieved successfully.',
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while retrieving recipes.',
      data: null,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const recipe = {
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      banner: req.body.banner,
      description: req.body.description,
      video: req.body.video,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const data = await Recipe.create(recipe);
    res.json({
      message: 'Recipe created successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while creating the Recipe.',
      data: null,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const recipeId = req.params.id;
    
    const result = await Recipe.destroy({
      where: {
        id: recipeId
      }
    });

    if (result === 0) {
      return res.status(404).json({
        message: 'Recipe not found',
        data: null,
      });
    }

    res.json({
      message: 'Recipe deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while deleting the Recipe.',
      data: null,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updatedRecipeData = {
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      banner: req.body.banner,
      description: req.body.description,
      video: req.body.video,
      updatedAt: new Date(),
    };

    const [rowsUpdated, [updatedRecipe]] = await Recipe.update(updatedRecipeData, {
      where: { id: recipeId },
      returning: true,
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: 'Recipe not found',
        data: null,
      });
    }

    res.json({
      message: 'Recipe updated successfully',
      data: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while updating the Recipe.',
      data: null,
    });
  }
};

exports.search = async (req, res) => {
  try {
    const searchQuery = req.query.q; // Mengambil kriteria pencarian dari parameter query "q"

    if (!searchQuery) {
      return res.status(400).json({
        message: 'Search query is required',
        data: null,
      });
    }

    const recipes = await Recipe.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: `%${searchQuery}%`, // Menggunakan operasi "LIKE" untuk pencarian berdasarkan nama
        },
      },
    });

    if (recipes.length === 0) {
      return res.status(404).json({
        message: 'No recipes found with the given search criteria',
        data: null,
      });
    }

    res.json({
      message: 'Recipes found successfully',
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while searching for recipes.',
      data: null,
    });
  }
};

