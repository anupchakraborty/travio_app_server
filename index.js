const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.93dpr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        // console.log('Client to Connected');

        const database = client.db('tourAgent');
        const destinationCollection = database.collection('destinations');

        //Get API
        app.get('/destinations', async (req, res) => {
            const cursor = destinationCollection.find({});
            const destinations = await cursor.limit(10).toArray();
            res.send(destinations);
            // res.send('destinations');
        })

        //Get API
        app.get('/destinations/:id', async (req, res) => {
            const id = req.params.id;
            const qurey = {_id: ObjectId(id)};
            const destionation = await destinationCollection.findOne(qurey);
            res.json(destionation);
        })

        //POST API
        app.post('/destinations', async (req, res)=>{
            const destionation = req.body;
            console.log('post is conntecd', destionation);

            const result = await destinationCollection.insertOne(destionation);
            console.log(result);
            res.json(result);
        })

        //Delete API
        app.delete('/destinations/:id', async (req, res)=>{
            const id = req.params.id;
            const qurey = {_id: ObjectId(id)};
            const result = await destinationCollection.deleteOne(qurey);
            res.json(result);
        })

    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Travel Agent Server Running !');
})

app.listen(port, ()=>{
    console.log('Travel Agent Server is Running !', port);
})