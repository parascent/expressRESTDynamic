import * as models from '../models/index'
import { stat } from 'fs';
let type = ''
let id = ''
let query = {}
let model = {} 
let queryObject = {}
let items = []
let message = ''
let status = ''

var processRequest = async (req, res) => {
  type = req.params.type
  query = req.query
  model = models[type]
  //check model
  if (model == undefined) {
    res.status(404).send('No model by the name:' + type)
    return
  }
  //set id
  let id = req.params[0] ? req.params[0].substring(1) : null
  if (id) queryObject["_id"] = id

  if (req.method == 'GET') {
    let result = await retrieve()
    if (result) {
      res.status(status).send(items)            
    } else {
      res.status(status).send({
        'message': message,
        'queryObject': queryObject
      })
    }
  }
  

}

var retrieve = async () => {
  
  try { 
    items = await models[type].find(queryObject) 
    status = 200
  } catch (e) {
    message = 'No items that fit the query:'
    status = 404
    return false
  }

  return true
}

var create = async (type, params) => { 
  
}

var update = async (type, params) => {

}

var remove = async (type, params) => {
  
}


module.exports = {
  processRequest: processRequest,
  retrieve: retrieve,
  create: create,
  update: update,
  remove: remove,
}