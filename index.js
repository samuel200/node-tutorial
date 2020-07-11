const express = require('express');
const path = require("path");
const exphbs = require("express-handlebars")
const apiRouter = require('./routes/api/members');
const members = require('./Members');

const app = express();

// Setting up handle bars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// creating a middleware
// const logger = (req, res, next)=>{
    
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// }

// init middleware
// app.use(logger);

// displaying a static file
// app.get("/", (req, res)=>{
//     res.sendFile(path.join(__dirname, "public/index.html"))
// })

// adding body parsers
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// adding router
app.use("/api/members", apiRouter);

// Homepage Route
app.get('/', (req, res)=>res.render('index', {
    "title": "Member App",
    members
}));

// set static folder
app.use(express.static(path.join(__dirname, "public")))


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log("Server running on port 5000"));