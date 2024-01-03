const Product = require('../models/product');
const CustomError = require('../errors')
const {StatusCodes} = require('http-status-codes');
const checkPermissions = require('../utils/checkPermissions');

const getProducts = async (req, res)=>{
    const products = await Product.find({user:req.user.userId}).select('-user').sort('')
    res.status(StatusCodes.OK).json({products})
}
const createProduct = async (req, res)=>{
    const {name, price, description, images, category, company, colors, featured, freeShipping, inventory} = req.body;
    if(!name || !price || !description || !category || !company || !colors || !inventory){
        throw new CustomError.BadRequestError('Please provide required data!')
    }
    const product = await Product.create({name, price, description, images, category, company, colors, featured, freeShipping, inventory, user:req.user.userId})
    res.status(StatusCodes.CREATED).json({msg:'Success! Product created'})
}
const deleteProduct = async (req, res)=>{
    const {id:productId} = req.params;
    const product = await Product.findOneAndDelete({_id:productId});
    if(!product){
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }
    checkPermissions(req.user, product.user)
    res.status(StatusCodes.OK).json({msg:'Product deleted successfully'})
}
const updateProduct = async (req, res)=>{
    const {id:productId} = req.params;
    const product = await Product.findOneAndUpdate({_id:productId}, req.body, {new:true, runValidators:true})
    if(!product){
        throw new CustomError.NotFoundError(`No product with ID: ${productId}`);
    }

    checkPermissions(req.user, product.user);
    res.status(StatusCodes.OK).json({msg:'Success! Product updated.'});
}
const getProduct = async (req, res)=>{
    const {id:productId} = req.params;
    const product = await Product.findOne({_id:productId});
    if(!product){
        throw new CustomError.NotFoundError(`No product with ID: ${productId}`);
    }
    checkPermissions(req.user, product.user)
    res.status(StatusCodes.OK).json({task})
}

module.exports = {getProducts, createProduct, deleteProduct, updateProduct, getProduct};