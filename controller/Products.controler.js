const {prodects} = require('../data/Prodect');


const getAllProdects = (req, res) => {
    res.json({ status: 200, data: prodects });
};

const getSingleProdect = (req, res) => {
    const prodectId = +req.params.prodectId;
    const prodect = prodects.find((prodect) => prodect.prodect_id === prodectId)
    if (isNaN(prodectId)) {
        return res.status(400).json({ msg: "Invalid Prodect id" });
    }
    if (!prodect) {
        return res.status(404).json({ status: 404, msg: "Prodect Not Found" })
    }
    res.status(200).json({
        status: 200, data: {
            id: prodect.prodect_id,
            name: prodect.name,
            email: prodect.description,
            phone: prodect.price,
            category: prodect.category_id
        }
    });
}

const createNewProdect = (req,res)=>{
    const newProdect = {prodect_id : prodects.length + 1 , ...req.body}
    prodects.push(newProdect);
    res.status(201).json({status:201,data: newProdect});
}

const updateProdect = (req,res)=>{
    const prodectId = +req.params.prodectId;
    let prodect = prodects.find((prodect)=> prodect.prodect_id === prodectId)
    prodect = {...prodect, ...req.body}
    res.status(200).json({status:200,data:prodect})
}

const deleteProdect = (req,res)=>{
    const prodectId = +req.params.prodectId
    const Prodects = prodects.filter((prodect)=> prodect.prodect_id !== prodectId)
    res.json(Prodects)
}


module.exports = {
    getAllProdects,
    getSingleProdect,
    createNewProdect,
    updateProdect,
    deleteProdect
}