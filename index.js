import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import * as models from './models/index'
import { processRequest } from './controllers/baseController'
import env from './env.json'
const app = express();

app.use(bodyParser.json())
mongoose.connect(env.testDB.url)

app.get('/',  (req, res) => {
 res.send('Hello World!')
})

app.get('/api/shick', (req, res) => {
  let shaffaf = new models.testModel({
    name: 'Shaffaaf',
    size: 'small'
  })
  shaffaf.save((err) => {
    if(err){
      console.log(err)
    } else {
      console.log('meow')
    }
  })
})

//api routes
app.get('/api/:type*', async (req, res) => {
  processRequest(req , res)
})

app.post('/api/:type*',  async (req, res) => {
  processRequest(req, res)
})

app.put('/api/:type*',  async (req, res) =>{
  processRequest(req, res)
})

app.delete('/api/:type*', async (req, res) =>{
  processRequest(req, res)
})


app.listen(3000, function () {
 console.log('Example app listening on port 3000!')
});
