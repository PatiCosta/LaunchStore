const express = require('express')
const routes = express.Router()
const multer = require('../App/middlewares/multer')

const { onlyUsers } = require('../App/middlewares/session')

const SearchController = require('../App/controllers/SearchController')
const ProductController = require('../App/controllers/ProductController')


//Search
routes.get('/search', SearchController.index)

// Products
routes.get('/create', onlyUsers , ProductController.create)
routes.get('/:id/edit', ProductController.edit)
routes.get('/:id', onlyUsers, ProductController.show)

routes.post('/', onlyUsers, multer.array("photos", 6), ProductController.post)
routes.put('/', onlyUsers, multer.array("photos", 6), ProductController.put)

routes.delete('/', onlyUsers, ProductController.delete)


module.exports = routes
