const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;


app.get('/', (req, res)=>{
    res.send('Travel Agent Server Running !');
})

app.listen(port, ()=>{
    console.log('Travel Agent Server is Running !', port);
})