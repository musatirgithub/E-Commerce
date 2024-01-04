const Order = require('../models/order');
const CustomError = require('../errors')
const {StatusCodes} = require('http-status-codes');
const checkPermissions = require('../utils/checkPermissions');

const getAllOrders = async (req, res)=>{
    const orders = await Order.find({}).select('-user').sort('')
    res.status(StatusCodes.OK).json({orders})
}
const getUserOrders = async (req, res)=>{
    const orders = await Order.find({user:req.user.userId}).select('-user').sort('')
    res.status(StatusCodes.OK).json({orders})
}
const createOrder = async (req, res)=>{
    const {tax, shippingFee, item:cartItems} = req.body;
    if(!cartItems || cartItems.length < 1){
        throw new CustomError.BadRequestError('No cart items provided!')
    }
    if(!tax || !shippingFee){
        throw new CustomError.BadRequestError('Please provide tax and shipping fee!')
    }


    // Order create logic will be provided here


    res.status(StatusCodes.CREATED).json({msg:'Success! Order created'})
}
const deleteOrder = async (req, res)=>{
    const {id:orderId} = req.params;
    const order = await Order.findOneAndDelete({_id:orderId});
    if(!order){
        throw new CustomError.NotFoundError(`No order with id: ${orderId}`)
    }
    checkPermissions(req.user, order.user)
    res.status(StatusCodes.OK).json({msg:'Order deleted successfully'})
}
const updateOrder = async (req, res)=>{
    const {id:orderId} = req.params;
    const order = await Order.findOneAndUpdate({_id:orderId}, req.body, {new:true, runValidators:true})
    if(!order){
        throw new CustomError.NotFoundError(`No order with ID: ${orderId}`);
    }

    checkPermissions(req.user, order.user);
    res.status(StatusCodes.OK).json({msg:'Success! Order updated.'});
}
const getOrder = async (req, res)=>{
    const {id:orderId} = req.params;
    const order = await Order.findOne({_id:orderId});
    if(!order){
        throw new CustomError.NotFoundError(`No order with ID: ${orderId}`);
    }
    checkPermissions(req.user, order.user)
    res.status(StatusCodes.OK).json({order})
}

module.exports = {getAllOrders, getUserOrders, createOrder, deleteOrder, updateOrder, getOrder};