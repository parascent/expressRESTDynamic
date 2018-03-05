import * as models from '../models/index'


var retrieve = async (type, params, res) => {
  
  let model = models[type]
  
  if (model == undefined) {
    res.status(404).send('No model by the name:'+type)
    return 0
  }

  let items = await models[type].find({})
  res.status(200).send(items)
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