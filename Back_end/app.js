const express = require('express');
const port = process.env.PORT || 5000; //this is the port we're using
const app = express(); //app or instance of express

//api middlewares
app.use(express.json()); //accept data in json format
app.use(express.urlencoded()); //this is to decode the data sent through the html form
app.use(express.static('PhaseI'));

//API ROUTES
app.get('/form', (req,res) => {
    res.sendFile(__dirname + '/Front_end/PhaseI/apply.html');

})
app.post('/formPost', (req,res) => {
    console.log(req.body); //the data we get in is in the body of request

})

//listening on port
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});