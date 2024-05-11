const express = require('express');

const restaurantController = require("../Controller/restaurant");

const route = express.Router();

//https:
// //Parameters can be used in the body of Postman are as follows:
//    1. "location": any one number from 1 to 5 representing 5 city names
//    2. "mealtype": any number from 1 to 6 representing mealtype
//    3. "lcost": lowest price in range
//    4. "hcost": highest price in range
//    5. "cuisine":[number] number should be given in square brackets for filtering cuisine 
//    6. "sort": 1 for Ascending order and -1 for Descending order
//    7. "page": page number is given as input, 2 restaurants are visible per page

route.get('/restaurant', restaurantController.getRestaurant);  //To fetch restaurant Data
route.post('/filter', restaurantController.filteredRestaurant); //To apply filter, sort, pagination on restaurant Data

module.exports = route;