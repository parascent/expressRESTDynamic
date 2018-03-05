import * as models from '../models/index'


var retrieve = async (req, res) => {
  let type = req.params.type
  let query  = req.query
  let model = models[type]
  let queryObject = {}
  let items = []
 
  if (model == undefined) {
    res.status(404).send('No model by the name:'+type)
    return 
  }

  let id = req.params[0] ? req.params[0].substring(1) : null
  if (id) queryObject["_id"] = id
  
  try { 
    items = await models[type].find(queryObject)    
  } catch (e) {
    res.status(404).send({
      'message': 'No items that fit the query:',
      'object': queryObject
    })
    return
  }

  res.status(200).send(items)
  return
}

var create = async (type, params) => { 
  
}

var update = async (type, params) => {

}

var remove = async (type, params) => {
  
}


module.exports = {
  retrieve: retrieve,
  create: create,
  update: update,
  remove: remove,
}