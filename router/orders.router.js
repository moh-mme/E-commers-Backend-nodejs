const express = require('express');

const orderRouter = express.Router()



const {
    getAllOrders,
    getSingleOrder,
    createNewOrder,
    updateOrder,
    deleteOrder
} = require('../controller/oreders.controler')

orderRouter.route('/')
                .get(getAllOrders)
                .post(createNewOrder)

orderRouter.route('/:orderId')
                .get( getSingleOrder)
                .patch(updateOrder)
                .delete(deleteOrder)


module.exports = {orderRouter}