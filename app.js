const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose') 


//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

require('dotenv/config');

const api = process.env.API_URL;

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model("Product", productSchema)

app.get(`${api}/products/`, (req, res)=> {   
    const product = {
        id: 1, 
        name: "hair dresser",
        img: 'some_url'
    }
    res.send(product)
});

app.post(`${api}/products/`, (req, res)=> {   
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((error) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
});


mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'italic-database'
})
.then(() => {
    console.log('Database connection is ready...');
})
.catch((err) => {
console.log(err);
})
// connecting database to our application 


app.listen(3500, () => {
    console.log('server is running now http://localhost:3500');
})