const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    city_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('restaurantData', restaurantSchema, 'restaurant');