const {Orders} = require('../data/Orders');


const getAllOrders = (req, res) => {
    res.json({ status: 200, data: Orders });
};

const getSingleOrder = (req, res) => {
    const orderId = +req.params.orderId;
    const order = Orders.find((order) => order.order_id === orderId)
    if (isNaN(orderId)) {
        return res.status(400).json({ msg: "Invalid Order id" });
    }
    if (!orderId) {
        return res.status(404).json({ status: 404, msg: "Order Not Found" })
    }
    res.status(200).json({
        status: 200, data: order
    });
}

const createNewOrder = (req,res)=>{
    const newOrder = {order_id : Orders.length + 1 , ...req.body}
    Orders.push(newOrder);
    res.status(201).json({status:201,data: newOrder});
}

const updateOrder = (req,res)=>{
    const orderId = +req.params.orderId;
    let order =Orders.find((order)=> order.order_id === orderId)
    order = {...order, ...req.body}
    res.status(200).json({status:200,data:order})
}

const deleteOrder = (req,res)=>{
    const orderId = +req.params.orderId
    const orders = Orders.filter((order)=> order.order_id !== orderId)
    res.json(orders)
}


module.exports = {
    getAllOrders,
    getSingleOrder,
    createNewOrder,
    updateOrder,
    deleteOrder
}