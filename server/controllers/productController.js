const Product = require('../models/product');
const CustomError = require('../errors')
const {StatusCodes} = require('http-status-codes');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const checkPermissions = require('../utils/checkPermissions');

const getAllProducts = async (req,res)=>{
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({products, nbItems:products.length});
}

const getProducts = async (req, res)=>{
    const {featured, company, search:name, sort, fields, minprice:minPrice, maxprice:maxPrice, minrating:minRating, maxrating:maxRating} = req.query;

    const queryObject = {};

    if (featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company){
        queryObject.company = company;
    }
    if (name){
        queryObject.name = {$regex:name, $options:'i'};
    }
    // if(numericFilters){
    //     const operatorMap = {
    //         '>':'$gt',
    //         '>=':'$gte',
    //         '=':'$eq',
    //         '<':'$lt',
    //         '<=':'$lte',
    //     }
    //     const regEx = /\b(<|<=|=|>|>=)\b/g
    //     let filter = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
    //     const options = ['price', 'rating'];
    //     filter.split(',').forEach((item)=>{
    //         const [field , operator, value] = item.split('-');
    //         if(options.includes(field)){
    //         const [field , operator, value] = item.split('-');
    //             queryObject[field] = {[operator]:Number(value)}
    //         }
    //     }) 
    //     };
    if(minPrice && maxPrice){
        queryObject.price={$gte: Number(minPrice*100), $lte: Number(maxPrice*100)}
    }
    // if(minRating && maxRating){
    //     queryObject.rating={$gte: Number(minRating), $lte: Number(maxRating)}
    // }
        console.log(queryObject);
    let result = Product.find(queryObject);

    // if (sort){
    //     const sortList = sort.split(',').join(' ');
    //     result = result.sort(sortList);
    // }else{
    //     result = result.sort('createdAt')
    // }
    if (sort){
        result = result.sort(sort);
    }else{
        result = result.sort('createdAt')
    }

    // if(fields){
    //     const fieldsList = fields.split(',').join(' ');
    //     result = result.select(fieldsList);
    // }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;
    console.log(products);
    res.status(StatusCodes.OK).json({products, nbItems:products.length})
}
const createProduct = async (req, res)=>{
    req.body.user = req.user.userId;
    // const {name, price, description, images, category, company, colors, featured, freeShipping, inventory} = req.body;
    // if(!name || !price || !description || !category || !company || !colors || !inventory){
    //     throw new CustomError.BadRequestError('Please provide all required data!')
    // }
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:'Success! Product created'})
}
const deleteProduct = async (req, res)=>{
    const {id:productId} = req.params;
    const product = await Product.findOne({_id:productId});
    if(!product){
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }
    await product.remove();
    res.status(StatusCodes.OK).json({msg:'Product deleted successfully'})
}
const updateProduct = async (req, res)=>{
    const {id:productId} = req.params;
    const product = await Product.findOneAndUpdate({_id:productId}, req.body, {new:true, runValidators:true})
    if(!product){
        throw new CustomError.NotFoundError(`No product with ID: ${productId}`);
    }
    res.status(StatusCodes.OK).json({msg:'Success! Product updated.'});
}
const getProduct = async (req, res)=>{
    const {id:productId} = req.params;
    const product = await Product.findOne({_id:productId}).populate('reviews');
    if(!product){
        throw new CustomError.NotFoundError(`No product with ID: ${productId}`);
    }
    res.status(StatusCodes.OK).json({product})
}

const uploadProductImage = async(req,res)=>{
    if(!req.files){
        throw new CustomError.BadRequestError('No file uploaded!');
    }
    const productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please upload an image!');
    }

    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('Image should be smaller than 1MB');
    }

    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {use_filename:true, folder:"node-e-commerce",})
    fs.unlinkSync(req.files.image.tempFilePath)
    return res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
}

module.exports = {getAllProducts, getProducts, createProduct, deleteProduct, updateProduct, getProduct, uploadProductImage};