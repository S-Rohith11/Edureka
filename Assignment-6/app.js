const express = require("express");
const mongoose = require("mongoose");

const route = require("./Route/index");

const PORT = 5500;
const HOSTNAME = "localhost";

const app = express();
app.use(express.json());        

app.use('/', route);

// DB
const MongoAtlas = "mongodb+srv://rohithry11:R4jX00ATc31O4vQy@cluster0.otztd3w.mongodb.net/Zomato?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MongoAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => {
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server is running at ${HOSTNAME}: ${PORT}`)
        });
    })
    .catch(err => console.log(err));