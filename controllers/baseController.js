import * as models from '../models/index'
import { stat } from 'fs';

let type = ''
let id = ''
let query = {}
let model = {} 
let modelProps = {}
let queryObject = {}
let populateQuery = ['']
let items = []
let failedItems = []
let message = ''
let status = ''
let reqData = {}

var processRequest = async (req, res) => {

  type = req.params.type
  query = req.query
  model = models[type]['model']
  modelProps = models[type]['modelProps']

  //addDefaultPopulateData
  populateQuery = modelProps.defaultPopulateQuery ? modelProps.defaultPopulateQuery : ''  


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
        let sendObject = {
          'message': message,
          'items': items,
        }
        if (failedItems) {
          sendObject['failedItems'] = failedItems
        }
        return res.status(status).send(failedItems)
      }
      break
    }
      
    
    case 'PUT': {
      let result = await update()
      if (result) {
        return res.status(status).send(items)
      } else {
        let sendObject = {
          'message': message,
          'items': items,
        }
        if (failedItems) {
          sendObject['failedItems'] = failedItems
        }
        return res.status(status).send(failedItems)
      }
      break
    }
    
    case 'DELETE': {
      let result = await remove()
      if (result) {
        return res.status(status).send({'deleted':items})
      } else {
        let sendObject = {
          'message': message,
          'deleted': items,
        }
        if (failedItems) {
          sendObject['failedItems'] = failedItems
        }
        return res.status(status).send(sendObject)
      }
      break        
    }
  }


}

var retrieve = async () => {
  
  try { 
    items = await model.find(queryObject ? queryObject : {})
      .populate(populateQuery)
      .exec()
    status = 200
  } catch (e) {
    message = 'No items that fit the query:' + e
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
  if (Array.isArray(reqData)) {
    //multicreate
  } else {
    //single create
    try {
      // await model
      items.push(await model.findByIdAndUpdate(reqData._id, reqData,{new:true,}))
      return status = 200
    } catch (e) {

    }
  }
}

var remove = async () => {
  if (Array.isArray(reqData)) {
    //multicreate
  } else {
    //single create
    try {
      // await model
      items.push(await model.findOneAndRemove({"_id":reqData._id}))
      return status = 410
    } catch (e) {
      console.log(e)
    }
  }
}


module.exports = {
  processRequest: processRequest
}