const express = require('express');

const categoriesRouter = express.Router()



const {
    getAllCategories,
    getSingleCategorie,
    createNewCategorie,
    updateCategorie,
    deleteCategorie
} = require('../controller/Categories.controler')

categoriesRouter.route('/')
                .get(getAllCategories)
                .post(createNewCategorie)

categoriesRouter.route('/:categoriesId')
                .get( getSingleCategorie)
                .patch(updateCategorie)
                .delete(deleteCategorie)


module.exports = {categoriesRouter}