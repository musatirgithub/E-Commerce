import { useNavigate, useParams } from "react-router-dom";
import useProductCalls from "../hooks/useProductCalls";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/orderSlice";
import { formatPrice } from "../utils/formatPrice";
import useOrderCalls from "../hooks/useOrderCalls";
import WriteComment from "../components/WriteComment";
import useReviewCalls from "../hooks/useReviewCalls";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { getProduct } = useProductCalls();
  const { getReview, getProductReviews } = useReviewCalls();
  // isProductOrdered function checks whether user ordered this product or not
  const { isProductOrdered } = useOrderCalls();
  const { product, loading } = useSelector((state) => state.product);
  const { isOrderedByUser } = useSelector((state) => state.order);
  const { review, reviews } = useSelector((state) => state.review);
  const navigate = useNavigate();
  const { id } = useParams();
  // adjusts products amount
  const [amount, setAmount] = useState(0);
  // opens and closes comments
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleIncrease = () => {
    if (amount < product?.inventory) {
      setAmount(amount + 1);
    }
  };
  const handleDecrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const cartProduct = {
    product: product?._id,
    image: product?.image,
    name: product?.name,
    price: product?.price,
    amount: Number(amount),
  };

  const handleAddProduct = () => {
    dispatch(addCartItem({ product: cartProduct }));
    navigate("/cart");
  };

  useEffect(() => {
    // setLoading(true);
    getProduct(id);
    isProductOrdered(id);
    getProductReviews(id);
    getReview(id);
    // setLoading(false);
  }, [isOrderedByUser]);

  useEffect(() => {
    setAmount(product?.inventory === 0 ? 0 : 1);
  }, [product]);

  if (loading) {
    return (
      <div>
        <div>...Loading</div>
      </div>
    );
  }
  return (
    <main className="min-h-[calc(100vh-8rem)]">
      <div
        className=" bg-amber-700 rounded-lg text-white hover:bg-amber-600 w-[15rem] uppercase text-center p-2 font-bold my-5 mx-auto cursor-pointer"
        onClick={() => navigate("/")}
      >
        Back to Products
      </div>
      <section>
        <div className="flex gap-12 justify-center">
          <div>
            <div className="w-[15rem] object-cover object-center mx-auto">
              <img src={product?.image} alt={product?.name} />
            </div>
            <div>
              <p className=" text-3xl font-bold capitalize text-center py-3">
                {product?.name}
              </p>
            </div>
          </div>
          <div className="w-[35rem]">
            <p className="ps-3 text-lg font-bold text-amber-800">
              {formatPrice(product?.price)}
            </p>
            <p className="ps-3 text-lg font-semibold underline">Description:</p>
            <p className="ps-3">{product?.description}</p>
            <div className=" ps-3 flex ">
              <p className="w-[6rem] font-semibold underline">Available</p>
              <p>{product?.inventory > 0 ? ": In Stock" : ": Out of Stock"}</p>
            </div>
            <div className=" ps-3 flex pb-3">
              <p className="w-[6rem] font-semibold underline">Brand</p>
              <p className="capitalize">: {product?.company}</p>
            </div>
            <div className="ps-3 flex flex-row gap-2">
              <p className=" text-md font-bold capitalize text-center py-1">
                Average Rating{" "}
              </p>
              <div className=" min-w-[2rem] bg-red-800 text-white rounded-md flex justify-center items-center">
                <p className=" font-bold text-xl ">{product?.averageRating}</p>
              </div>
              <p className=" text-md font-semibold lowercase text-center py-1">
                {product?.numOfReviews == 1
                  ? `${product?.numOfReviews} customer review`
                  : `${product?.numOfReviews} customer reviews`}
              </p>
            </div>
          </div>
        </div>
        {/* This part is dealing with reviews */}
        <div className="mx-auto flex flex-col items-center">
          {reviews?.length > 0 ? (
            <p
              className=" text-md font-semibold text-blue-400 py-3 ps-3 cursor-pointer"
              onClick={() => navigate(`/single-product-reviews/${id}`)}
            >
              See customer reviews...
            </p>
          ) : (
            <p
              className=" text-md font-semibold text-blue-400 py-3 ps-3"
          
            >
              No customer reviews...
            </p>
          )}
          {/* This part  checks whether the user ordered the product. If user already ordered the product and wrote a review, 
          can Update teh review. If ordered but did not write a review yet, can write a review. */}
          {isOrderedByUser && (
            <button
              className="btn btn-warning "
              onClick={() => setIsCommentOpen(!isCommentOpen)}
            >
              {review ? "Update review" : "Write review"}
            </button>
          )}
          {isCommentOpen && (
            <WriteComment
              id={id}
              setIsCommentOpen={setIsCommentOpen}
              className="mx-auto"
            />
          )}
        </div>
        {/* This part controls the product amount */}
        <div className="my-[2rem] flex justify-center gap-3">
          <div
            className="min-w-[2rem] bg-gray-300 text-black text-center text-3xl font-bold rounded-md cursor-pointer"
            onClick={handleDecrease}
          >
            -
          </div>
          <div className="min-w-[2rem]  text-center text-3xl font-bold ">
            {amount}
          </div>
          <div
            className="min-w-[2rem] bg-gray-300 text-black text-center text-3xl font-bold rounded-md cursor-pointer"
            onClick={handleIncrease}
          >
            +
          </div>
        </div>
      </section>
      {/* If there is enough inventory, clicking button adds given number of products into the shopping cart.
      If the product is out of stock, button is disabled, amount is set to 0 and user can't change the amount. */}
      <div className="flex justify-center">
        <button
          className={
            product?.inventory === 0
              ? "bg-amber-700 rounded-lg text-white  w-[15rem] uppercase text-center p-2 font-bold my-5 mx-auto"
              : "bg-amber-700 rounded-lg text-white hover:bg-amber-600 w-[15rem] uppercase text-center p-2 font-bold my-5 mx-auto cursor-pointer"
          }
          onClick={handleAddProduct}
          disabled={!product?.inventory}
        >
          {product?.inventory === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </main>
  );
};

export default SingleProduct;
