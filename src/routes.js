const express = require('express')
const routes = express.Router()
const multer = require('./App/middlewares/multer')

const ProductController = require('./App/controllers/ProductController')
const HomeController = require('./App/controllers/HomeController')
const SearchController = require('./App/controllers/SearchController')


// Home
routes.get('/', HomeController.index)

//Search
routes.get('/products/search', SearchController.index)

// Products
routes.get('/products/create', ProductController.create)
routes.get('/products/:id/edit', ProductController.edit)
routes.get('/products/:id', ProductController.show)

routes.post('/products', multer.array("photos", 6), ProductController.post)
routes.put('/products', multer.array("photos", 6), ProductController.put)

//Alias
routes.delete('/products', ProductController.delete)





routes.get('/ads/create', function(req, res){
    return res.redirect("/products/create")
})

module.exports = routes