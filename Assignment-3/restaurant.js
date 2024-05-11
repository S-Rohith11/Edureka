//1st question
class restaurantManager{
    restaurantList=[{
        id: 1,
        name: "Subway",
        address: "T Nagar",
        city: "Chennai",
    },
    {
        id: 2 ,
        name: "Burger King",
        address: "Hitec City",
        city: "Hyderabad",
    },
    {
        id: 3,
        name:"Mc Donald",
        address: "Bannerghatta Road ",
        city: "Bangalore",
    },
    {   id: 4,
        name:"Pista House",
        address: "Auto Nagar",
        city:"Vijayawada",
    },
    {
        id: 5,
        name: "Dominos",
        address: "Marine Lines",
        city:"Mumbai",
    },
    {
        id: 6,
        name: "Paradise",
        address:"Necklace Road",
        city:"Hyderabad",
    }];

    printrestaurantList = () => {
        return this.restaurantList;
    }

    printAllRestaurantNames = () => {
        return this.restaurantList.map(a=>a.name);
    }

    filterRestaurantByCity = (cityName) =>{
        return this.restaurantList.filter(a=>a.city == cityName)
    }

}
var restaurantObject=new restaurantManager();

function first_a() {
    var output1=restaurantObject.printrestaurantList();
    console.log(output1);
}

function first_b() {
    var output2=restaurantObject.printAllRestaurantNames();
    console.log(output2);
}

function first_c() {
    var cityName=document.getElementById("cn").value;
    var output3=restaurantObject.filterRestaurantByCity(cityName);
    console.log(output3);
}

//  2nd Question

orderData = { 
    'Below 500': 20,
    '500-1000': 29,
    '1000-1500': 30, 
    '1500-2000': 44, 
    'Above 2000': 76 
};

var a = Object.values(orderData);
var sum=a.reduce((a,b)=>a+b);
function second_a() {
    console.log("Total number of orders placed = "+ sum);
}

var b = Object.keys(orderData);
var count=b.length;
function second_b() {
    console.log("Total number of order proportions = "+ count);
}


var ar=[];
function second_c(){
    var restaurant_name="Punjabi Thadka";
    b.map((items,index) => {
    var result={
        "id": index+1,
        "order": items,
        "order percentage": ((orderData[items] / sum)*100).toFixed(2),
        "restaurant": restaurant_name,
    };
    ar.push(result);
    }
) 
    ar.length=5;
    console.log(ar);
}