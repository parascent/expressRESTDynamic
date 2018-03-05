import * as models from '../models/index'


var retrieve = async (type, params) => {
  console.log('type', type)
  let model =  models[type]
  console.log('model',model)
    return await models[type].find({})
    // return  await models.testModel.find({})

  
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