var ratingData = [
    { restaurant: "KFC", rating: 5 },
    { restaurant: "Burger King", rating: 4 },
    { restaurant: "KFC", rating: 3 },
    { restaurant: "Domino", rating: 2 },
    { restaurant: "Subway", rating: 3 },
    { restaurant: "Domino", rating: 1 },
    { restaurant: "Subway", rating: 4 },
    { restaurant: "Pizza Hut", rating: 5 },
];
  
    var restaurantratings = {};
    for (var i of ratingData) {
      var restaurantname = i.restaurant;
      var rating = i.rating;

      if (restaurantratings[restaurantname]) {
        restaurantratings[restaurantname].sum += rating;
        restaurantratings[restaurantname].count++;
      } else {
        restaurantratings[restaurantname] = { sum: rating, count: 1 };
      }
    }
    var averagedata = [];
    for (var restaurantname in restaurantratings) {
      var ratings = restaurantratings[restaurantname];
      var average = ratings.sum / ratings.count;
      averagedata.push({ restaurant: restaurantname, averageRating : average });
    }
  
    function first(){
   console.log(averagedata);
  }
  var filteredratings = averagedata.filter(d=>d.averageRating>=4);
  function second(){
    console.log(filteredratings);
  }