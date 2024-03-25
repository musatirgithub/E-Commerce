import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useReviewCalls from "../hooks/useReviewCalls";

const WriteComment = ({id}) => {
  const {createReview, getReview, updateReview}=useReviewCalls();
  const {review} = useSelector((state)=>state.review);
  const [commentData, setCommentData] = useState(review ? { rating: review.rating, title:review.title, comment:review.comment }:{ rating: 5, title:"", comment:"" });
  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!review){
      createReview({...commentData, product:id});
    }
    if(review){
      updateReview({...commentData}, id);
    }
  }

  useEffect(()=>{
    getReview(id);
  },[]);
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <select
          name="rating"
          id="rating"
          value={commentData.rating}
          onChange={handleChange}
          className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[10.5rem] appearance-none placeholder-[#3A3B3C]"
        >
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
        <div className="flex flex-col gap-3">
          <label htmlFor="title" className="text-[#EEEDE8]">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={commentData.title}
            onChange={handleChange}
            placeholder="Enter review title..."
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[21rem] appearance-none placeholder-[#3A3B3C]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="comment" className="text-[#EEEDE8]">
            Comment
          </label>
          <textarea
            name="comment"
            id="comment"
            value={commentData.comment}
            onChange={handleChange}
            placeholder="Enter review here..."
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[21rem] appearance-none placeholder-[#3A3B3C]"
          />
        </div>
        <div className="">
          {review? <button type="submit" className="btn">Edit Review</button>:<button type="submit" className="btn">Submit Review</button>}
        </div>
      </form>
    </section>
  );
};

export default WriteComment;
