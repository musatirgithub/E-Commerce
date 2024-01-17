const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    title:{
        type:String,
        minLength:[3, 'Title should be at least 3 characters.'],
        maxLength:[100, 'Title cannot be longer than 100 characters.'],
    },
    comment:{
        type:String,
        minLength:[3, 'Comment should be at least 3 characters.'],
        maxLength:[1000, 'Comment cannot be longer than 1000 characters.'],
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true, 'Please provide product rating'],
        default:5,
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
}, {timeStamps:true})

ReviewSchema.statics.calculateAverageRating = async function (productId) {

    }

    ReviewSchema.post('save', async function(){
        await this.constructor.calculateAverageRating(this.product);
    })

    ReviewSchema.post('remove', async function(){
        await this.constructor.calculateAverageRating(this.product);
    })