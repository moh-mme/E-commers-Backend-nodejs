const express = require('express');

const prodectsRouter = express.Router()



const {getAllProdects,getSingleProdect,createNewProdect,updateProdect,deleteProdect} = require('../controller/Products.controler')

prodectsRouter.route('/')
                .get(getAllProdects)
                .post(createNewProdect)

prodectsRouter.route('/:prodectId')
                .get( getSingleProdect)
                .patch(updateProdect)
                .delete(deleteProdect)


module.exports = {prodectsRouter}