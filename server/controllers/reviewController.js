const Review = require("../models/review");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const checkPermissions = require("../utils/checkPermissions");

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).select("-user").sort("");
  res.status(StatusCodes.OK).json({ reviews });
};
const getUserReviews = async (req, res) => {
  const reviews = await Review.find({ user: req.user.userId })
    .populate({ path: "product", select: "name company price" })
    .populate({ path: "user", select: "name" });
  res.status(StatusCodes.OK).json({ reviews });
};
const createReview = async (req, res) => {
  const { title, comment, rating, product } = req.body;
  if (!title || !comment || !rating || !product) {
    throw new CustomError.BadRequestError("Please provide all data!");
  }
  const alreadyExists = await Review.findOne({
    product,
    user: req.user.userId,
  });
  if (alreadyExists) {
    throw new CustomError.BadRequestError(
      "Users can write only one review per product!"
    );
  }
  const review = await Review.create({
    title,
    comment,
    rating,
    product,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Success! Review created" });
};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOneAndDelete({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${orderId}`);
  }
  checkPermissions(req.user, review.user);
  res.status(StatusCodes.OK).json({ msg: "Review deleted successfully" });
};
const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment, product } = req.body;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with ID: ${reviewId}`);
  }
  checkPermissions(req.user, review.user);
  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Review updated." });
};
const getReview = async (req, res) => {
  const { id: productId } = req.params;
  const review = await Review.findOne({
    user: req.user.userId,
    product: productId,
  });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with ID: ${productId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};
const getProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId }).populate({
    path: "user",
    select: "name",
  });
  if (!reviews) {
    throw new CustomError.NotFoundError(`No review with ID: ${productId}`);
  }
  console.log(reviews)
  res.status(StatusCodes.OK).json({ reviews });
};

module.exports = {
  getAllReviews,
  getUserReviews,
  createReview,
  deleteReview,
  updateReview,
  getReview,
  getProductReviews,
};
