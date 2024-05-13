const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Route/index");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieSession = require("cookie-session");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const PORT = 5500;
// const HOSTNAME = "localhost";
const paymentRoute = require("./Controller/payment");
const authRoute = require("./Controller/auth");
const passportSetup = require("./Controller/passport");

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

dotenv.config();

// Request Management
const app = express();

app.use(cookieSession({ name: "session", keys:["edureka"], maxAge: 24*60*60*1000 }))

app.use(express.json());        // A body Parser Required to post a data
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use('/', route);
app.use('/api/payment/', paymentRoute);
app.use('/auth', authRoute);

// DB
const MongoAtlas = "mongodb+srv://rohithry11:R4jX00ATc31O4vQy@cluster0.otztd3w.mongodb.net/Zomato?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MongoAtlas, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then(res => {
        app.listen(PORT, () => {        // Remove HOSTNAME
            console.log(`Server is running at ${PORT}`)
        });
    })
    .catch(err => console.log(err));
