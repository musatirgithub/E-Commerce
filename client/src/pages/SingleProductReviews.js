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
              console.log(review);
              return<div className="mx-auto w-[32rem] p-2" key={review._id}>
                <div className=" flex justify-between">
                <p className="text-[#1E4CB7] font-bold">{review.user.name}</p>
                <p className="text-[#991B1B] font-bold">Rating: {review.rating}</p>
                </div>
                <p className="font-bold">{review.title}</p>
                <p>{review.comment}</p>
                <p className="border-b-2"></p>
              </div>
            })}
    </main>
  )
}

export default SingleProductReviews