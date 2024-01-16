const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, 'Please provide product name'],
        minLength:[3, 'Product name cannot be shorter then 3 characters'],
        maxLength:[100, 'Product name cannot excess 100 characters'],
    },
    price:{
        type:Number, 
        required:true,
        default:0,
    },
    description:{
        type:String,
        trim:true,
        required:[true, 'Please provide product name'],
        minLength:[3, 'Description cannot be shorter then 3 characters'],
        maxLength:[1000, 'Description cannot excess 100 characters'],
    },
    image:{
        type:String,
    },
    category:{
        type:String,
        required:[true, 'Please provide product category'],
        enum:['office', 'kitchen', 'bedroom', 'electronics', 'accessories'],
    },
    company:{
        type:String, 
        required:[true, 'Please provide company'], 
        enum:{
            values:['ikea', 'maiden', 'eternity', 'lumens', 'sony', 'bose', 'kitchenaid'],
            message:'{VALUE} is not supported',
        },
    },
    colors:{
        type:[String], 
        default:['#222'],
        required:true, 
    },
    featured:{
        type:Boolean,
        default:false, 
    },
    freeShipping:{
        type:Boolean,
        default:false, 
    },
    inventory:{
        type:Number,
        required:true,
        default:15, 
    },
    averageRating:{
        type:Number,
        default:0,
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
}, {timestamps:true, toJSON:{virtuals:true}, toObject:{virtuals:true}})

ProductSchema.virtual('reviews', {
    ref:'Review',
    localField:'_id',
    foreignField:'product',
    justOne:false,
    // match:{rating:3},
    })

module.exports = mongoose.model('Product', ProductSchema)