const Order = require("../models/order");
const Product = require("../models/product");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const checkPermissions = require("../utils/checkPermissions");
const stripe = require("stripe")(process.env.STRIPE_KEY, {
  apiVersion: "2023-10-16",
});

// const fakeStripeAPI = async ({ amount, currency }) => {
//   const client_secret = "someRandomValue";
//   return { client_secret, amount };
// };

const config = (req, res) => {
  res.send({ publishableKey: process.env.PUBLISHABLE_KEY });
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).select("-user").sort("");
  res.status(StatusCodes.OK).json({ orders });
};
const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId })
    .select("-user")
    .sort("");
  res.status(StatusCodes.OK).json({ orders });
};

const createOrder = async (req, res) => {
  const { tax, shipping: shippingFee, cartItems, address } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided!");
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "Please provide tax and shipping fee!"
    );
  }

  let orderItems = [];
  let subTotal = 0;
  
  for (let item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id: ${item.product}`
      );
    }

    const { name, price, amount, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
    subTotal += item.amount * price;
  }

  const total = tax + shippingFee + subTotal;

  //   // Stripe payment intent
  
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: total,
    automatic_payment_methods: { enabled: true },
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal:subTotal,
    tax,
    shippingFee,
    address,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "Order Created", clientSecret: paymentIntent.client_secret });
};
const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOneAndDelete({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ msg: "Order deleted successfully" });
};
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOneAndUpdate({ _id: orderId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with ID: ${orderId}`);
  }

  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ msg: "Success! Order updated." });
};
const getOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with ID: ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const createPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });
    return res
      .status(StatusCodes.OK)
      .json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: { message: error.message } });
  }
};

const checkIfUserOrderedProduct = async (req,res)=>{
  const {id} = req.params;
  const orders = await Order.find({ user: req.user.userId })
  let ordered = false;
  orders.forEach((item)=>{
    const {orderItems} = item;
    orderItems.forEach((orderItem)=>{
      if(orderItem.product === id){
        ordered = true;
        res.status(StatusCodes.OK).json({ordered});
      }
    })
  })
  res.status(StatusCodes.OK).json({ordered});
}

module.exports = {
  getAllOrders,
  getUserOrders,
  createOrder,
  deleteOrder,
  updateOrder,
  getOrder,
  config,
  createPaymentIntent,
};
