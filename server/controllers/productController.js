const Product = require('../models/product');
const CustomError = require('../errors')
const {StatusCodes} = require('http-status-codes');
const checkPermissions = require('../utils/checkPermissions');

const getProducts = async (req, res)=>{
    // const {featured, company, name, sort, fields, numericFilters} = req.query;

    // const queryObject = {};

    // if (featured){
    //     queryObject.featured = featured === 'true' ? true : false;
    // }
    // if (company){
    //     queryObject.company = company;
    // }
    // if (name){
    //     queryObject.name = {$regex:name, $options:'i'};
    // }
    // if(numericFilters){
    //     const operatorMap = {
    //         '>':'$gt',
    //         '>=':'$gte',
    //         'e':'$eq',
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
    

    // let result = Product.find(queryObject);

    // if (sort){
    //     const sortList = sort.split(',').join(' ');
    //     result = result.sort(sortList);
    // }else{
    //     result = result.sort('createdAt')
    // }

    // if(fields){
    //     const fieldsList = fields.split(',').join(' ');
    //     result = result.select(fieldsList);
    // }

    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1) * limit;
    // result = result.skip(skip).limit(limit);

    // const products = await result;
    const products = await Product.find({});
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

module.exports = {getProducts, createProduct, deleteProduct, updateProduct, getProduct};