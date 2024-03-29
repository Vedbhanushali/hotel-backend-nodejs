const mongoose = require('mongoose')

//MENU items schema
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: { //based on orders made
        type: Number,
        default: 0
    },
})

//Menu model
const MenuItem = mongoose.model('MenuItem', menuItemSchema)
module.exports = MenuItem