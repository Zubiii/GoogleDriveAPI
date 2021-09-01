const express = require("express"), es6Renderer = require('express-es6-template-engine')
const app = express()
const routes = require('./routes/route')
// Templating
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

// Includes Routes
routes(app)

// Listening Server
app.listen(9090, ()=>{
    console.log("App is Listening at: http//127.0.0.1:9090")
})
