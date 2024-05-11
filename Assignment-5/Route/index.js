const express = require('express');

const locationController = require("../Controller/location");
const restaurantController = require("../Controller/restaurant");
const mealtypeController = require("../Controller/mealtype");

const route = express.Router();

route.get('/location', locationController.getLocation);    //Question-1: http://localhost:5500/location

route.get('/widget', mealtypeController.getMealtype);      //Question-3: http://localhost:5500/widget

route.get('/:cityName', restaurantController.getRestaurantByCityName);  // Question-2 : http://localhost:5500/<Enter City Name>
          
module.exports = route;