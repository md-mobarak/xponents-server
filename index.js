
// ripon
// nLPWZ5DmtyrmtYsL


const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vt3wen9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const DataCollection = client.db('xponent').collection('data')


        app.get('/allData', async (req, res) => {
            const product = await DataCollection.find().toArray()
            res.send(product)

        })

        app.post('/AddData', async (req, res) => {
            const data = req.body;
            const result = await DataCollection.insertOne(data)
            res.send(result)
        })

        app.delete('/DataDelete/:id', async (req, res) => {
            const { id } = req.params;
            const query = { _id: ObjectId(id) }
            const result = await DataCollection.deleteOne(query)
            res.send(result)
        })


        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            const updateInfo = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }
            const updateDoc = {
                $set: updateInfo

            }
            const result = await DataCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })


    }

    finally {


    }
}

run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})