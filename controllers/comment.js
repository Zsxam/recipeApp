/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const db = require('../models');

const Comment = db.comments;
const Recipe = db.recipes;
const Sequelize = require('sequelize');

exports.findAll = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json({
      message: 'Comments retrieved successfully.',
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while retrieving comments.',
      data: null,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const comment = {
      text: req.body.text,
      user_id: req.body.user_id,
      recipe_id: req.body.recipe_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const data = await Comment.create(comment);
    res.json({
      message: 'Comment created successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while creating the Comment.',
      data: null,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const commentId = req.params.id;
    
    const result = await Comment.destroy({
      where: {
        id: commentId
      }
    });

    if (result === 0) {
      return res.status(404).json({
        message: 'Comment not found',
        data: null,
      });
    }

    res.json({
      message: 'Comment deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while deleting the Comment.',
      data: null,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const commentId = req.params.id;
    const updatedCommentData = {
      text: req.body.text,
      user_id: req.body.user_id,
      recipe_id: req.body.recipe_id,
      updatedAt: new Date(),
    };

    const [rowsUpdated, [updatedComment]] = await Comment.update(updatedCommentData, {
      where: { id: commentId },
      returning: true,
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: 'Comment not found',
        data: null,
      });
    }

    res.json({
      message: 'Comment updated successfully',
      data: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while updating the Comment.',
      data: null,
    });
  }
};

exports.getCommentsByRecipeId = async (req, res) => {
  try {
    const recipeId = req.params.recipe_id; // Ambil ID resep dari parameter URL

    const comments = await Comment.findAll({
      where: { recipe_id: recipeId },
    });

    if (comments.length === 0) {
      return res.status(404).json({
        message: 'No comments found for the given recipe ID',
        data: null,
      });
    }

    res.json({
      message: 'Comments found successfully',
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while fetching comments.',
      data: null,
    });
  }
};

