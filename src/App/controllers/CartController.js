const Cart = require('../../lib/cart')
const LoadProductsService = require('../services/LoadProductService')

module.exports = {
    async index(req, res) {
        try {
            let {cart} = req.session

            cart = Cart.init(cart)

            return res.render("cart/index", {cart})

        } catch (error) {
            console.error(error);
        }
    },
    async addOne(req, res) {
        const {id} = req.params

        const product = await LoadProductsService.load('product', {where: {id}})

        let {cart} = req.session

        cart = Cart.init(cart).addOne(product)

        req.session.cart = cart

        return res.redirect('/cart')
    },
    async removeOne(req, res) {
        // catch product id
        let { id } = req.params
        // catch cart on the session
        let { cart } = req.session
        // if not cart return
        if (!cart) return res.redirect('/cart')
        // init cart and remove
        cart = Cart.init(cart).removeOne(id)
        // att cart session removing the item
        req.session.cart = cart
        // redirect to cart page
        return res.redirect('/cart')
    },
    delete(req, res) {
        let { cart } = req.session
        let { id } = req.params

        if(!cart) return

        cart = Cart.init(cart).delete(id)

        req.session.cart = cart

        return res.redirect('./cart')
    }
}