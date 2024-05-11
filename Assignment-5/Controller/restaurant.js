const Restaurant = require("../Model/restaurantDB.js");

exports.getRestaurant = (req, res) => {
    
    Restaurant.find()
        .then(response => {
            res.status(200).json({
                message: "Restaurant Fetched Successfully",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.getRestaurantByCityName = (req, res) => {

    const { cityName } = req.params;
    
    Restaurant.find({city_name: cityName})
        .then(response => {
            res.status(200).json({
            message: "Restaurants By City Name Fetched Successfully",
            restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
