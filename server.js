const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

const passport = require("./passport/setup");
const auth = require("./routes/auth");

const app = express();

const accountRoutes = require('./routes/api/accounts');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));




app.use('/api/accounts', accountRoutes);

const PORT = process.env.PORT || 5000;

// Express Session
app.use(
    session({
        secret: "very secret this is",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", auth);
app.get("/", (req, res) => res.send("Good monring sunshine!"));

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));

