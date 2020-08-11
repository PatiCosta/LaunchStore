const express = require('express')
const routes = express.Router()
const multer = require('../App/middlewares/multer')


const SearchController = require('../App/controllers/SearchController')
const ProductController = require('../App/controllers/ProductController')


//Search
routes.get('/search', SearchController.index)

// Products
routes.get('/create', ProductController.create)
routes.get('/:id/edit', ProductController.edit)
routes.get('/:id', ProductController.show)

routes.post('/', multer.array("photos", 6), ProductController.post)
routes.put('/', multer.array("photos", 6), ProductController.put)

routes.delete('/', ProductController.delete)


module.exports = routes
