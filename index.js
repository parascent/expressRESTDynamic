import express from 'express'
import mongoose from 'mongoose'
import * as models from './models/index'
import { retrieve } from './controllers/baseController'
import env from './env.json'
const app = express();


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
app.get('/api/:type/*', async (req, res) => {
  retrieve(req.params['type'], req.params[0], res)
})

app.post('/api/:type/*',  async (req, res) => {
  res.send(type)
})

app.put('/api/:type/*',  async (req, res) =>{
  res.send(type)
})

app.delete('/api/:type/*', async (req, res) =>{
  res.send(type)
})


app.listen(3000, function () {
 console.log('Example app listening on port 3000!')
});
