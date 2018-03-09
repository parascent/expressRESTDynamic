import * as models from '../models/index'
import { stat } from 'fs';

let type = ''
let id = ''
let query = {}
let model = {} 
let queryObject = {}
let items = []
let failedItems = []
let message = ''
let status = ''
let reqData = {}

var processRequest = async (req, res) => {

  type = req.params.type
  query = req.query
  model = models[type]
  //check model
  if (model == undefined) {
    return res.status(404).send('No model by the name:' + type)
  }
  //set id
  let id = req.params[0] ? req.params[0].substring(1) : null
  if (id) queryObject["_id"] = id

  //set request data for POST and PUT
  if (req.body) reqData = req.body
  
  //finally query from database and show result

  switch (req.method) {
    case 'GET': {
      let result = await retrieve()
      if (result) {
        return res.status(status).send(items)
      } else {
        return res.status(status).send({
          'message': message,
          'queryObject': queryObject
        })
      }
      break
    }
      
  
    case 'POST': { 
      let result = await create()
      if (result) {
        return res.status(status).send(items)
      } else {
        return res.status(status).send({
          'message': message,
          'items': items,
          'failedItems': failedItems
        })
      }
      break
    }
      
    
    case 'PUT': { 
      break
    }
    
    case 'DELETE': {
      break        
    }
  }


}

var retrieve = async () => {
  
  try { 
    items = await model.find(queryObject ? queryObject : {}) 
    status = 200
  } catch (e) {
    message = 'No items that fit the query:'
    status = 404
    return false
  }

  return true
}

var create = async () => { 
  if (Array.isArray(reqData)) { 
    //multicreate
  } else {
    //single create
    try {
      // await model
      items.push(await model.create(reqData))
      return status = 201
    } catch (e) {

    }  
  }
  
  
}

var update = async () => {

}

var remove = async () => {
  
}


module.exports = {
  processRequest: processRequest
}