import mongoose from 'mongoose'
import testModel from './testModel'
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    name: 'string',
    size: 'string',
    testModel: [{ type: Schema.Types.ObjectId, ref: 'testModel' }]
})

var TestModelTwo = mongoose.model('TankTwo', schema)

var TestModelProps = {
  defaultWiths: {
    testModelTwo: ['size'],
  },
  defaultSelects: {},
}

module.exports = TestModelTwo