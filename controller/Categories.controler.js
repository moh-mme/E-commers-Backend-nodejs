const { Categories } = require('../data/Categories');


const getAllCategories = (req, res) => {
    res.json({ status: 200, data: Categories });
};

const getSingleCategorie = (req, res) => {
    const categoriesId = +req.params.categoriesId;
    const categorie = Categories.find((categorie) => categorie.categorie_id === categoriesId)
    if (isNaN(categoriesId)) {
        return res.status(400).json({ msg: "Invalid Categorie id" });
    }
    if (!categoriesId) {
        return res.status(404).json({ status: 404, msg: "Categorie Not Found" })
    }
    res.status(200).json({
        status: 200, data: {
            id: categorie.categorie_id,
            name: categorie.name,
        }
    });
}

const createNewCategorie = (req, res) => {
    const newCategorie = { categorie_id: Categories.length + 1, ...req.body }
    Categories.push(newCategorie);
    res.status(201).json({ status: 201, data: newCategorie });
}

const updateCategorie = (req, res) => {
    const categoriesId = +req.params.categoriesId;
    let Categorie = Categories.find((Categorie) => Categorie.categorie_id === categoriesId)
    Categorie = { ...Categorie, ...req.body }
    res.status(200).json({ status: 200, data: Categorie })
}

const deleteCategorie = (req, res) => {
    const categoriesId = +req.params.categoriesId
    const categories = Categories.filter((categorie) => categorie.categorie_id !== categoriesId)
    res.json(categories)
}


module.exports = {
    getAllCategories,
    getSingleCategorie,
    createNewCategorie,
    updateCategorie,
    deleteCategorie
}