import { useSelector } from "react-redux";

const SingleProductReviews = () => {
  const {reviews} = useSelector((state)=>state.review);
  const {product} = useSelector((state)=>state.product);
  return (
    <main className="min-h-[calc(100vh-8rem)]">
      <p className="text-3xl font-bold capitalize text-center py-3">{product.name}</p>
            <div className="w-[10rem] object-cover object-center mx-auto">
                <img src={product?.image} alt={product?.name}/>
            </div>
            {reviews.map((review)=>{
              return<div className="border">
                <p>Rating: {review.rating}</p>
                <p>Title: {review.title}</p>
                <p>Review: {review.comment}</p>
              </div>
            })}
    </main>
  )
}

export default SingleProductReviews