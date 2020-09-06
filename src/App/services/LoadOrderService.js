const Order = require('../models/Order')
const User = require('../models/User')
const LoadProductService = require('./LoadProductService')

const { formatPrice, date } = require('../../lib/utils')



async function format(order) {
    // product details
    order.product = await LoadProductService.load('productWithDeleted', {
        where: {id: order.product.id}
    })
    // buyer details
    order.buyer = await User.findOne({
        where: {id: order.buyer_id}
    })
    // seller details
    order.seller = await User.findOne({
        where: {id: order.seller_id}
    })
    // price formating
    order.formatedPrice = formatPrice(order.price)
    order.formatedTotal = formatPrice(order.total)
    // status formating
    const statuses = {
        open: 'Aberto',
        sold: 'Vendido',
        canceled: 'Cancelado'
    }

    order.formatedStatus = statuses[order.status]
    // updated at formating
    const updatedAt = date(order.updated_at)
    order.formatedUpdatedAt = `${order.formatedStatus} em ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} às ${updatedAt.hour}h${updatedAt.minutes}`

    return order
}

const LoadService = {
    load(service, filter) {
        this.filter = filter
        return this[service]()
    },
    async order(){
        try {            
            const order = await Order.findOne(this.filter)
            return format(order)
        } catch (error) {
            console.error(error);
        }
    },
    async orders(){
        try {
            let orders = await Order.findAll(this.filter)

            const ordersPromise = orders.map(format)  
            
            return Promise.all(ordersPromise)

        } catch (error) {
            console.error(error);
        }
    },
    format,
}

module.exports = LoadService