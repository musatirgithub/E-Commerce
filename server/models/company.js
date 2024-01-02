const { boolean } = require('joi');
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a task']
    },
}, {timestamps:true})

module.exports = mongoose.model('Product', ProductSchema)