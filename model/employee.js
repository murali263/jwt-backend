

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const employeSchema = new Schema({
    username:String,
    department:String,
    phonenumber:String
})
module.exports = mongoose.model('employe',employeSchema,'employe')








