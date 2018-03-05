import * as models from '../models/index'


var retrieve = async (req, res) => {
  let type = req.params.type
  let query  = req.query
  let model = models[type]
  // console.log(req)
 
  if (model == undefined) {
    res.status(404).send('No model by the name:'+type)
    return 0
  }

  let id = req.params[0] ? req.params[0].substring(1) : null
  
  if (id) {
    let items = await models[type].find({ "_id": id })
    res.status(200).send(items)
    return
  }

  let items = await models[type].find({})

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