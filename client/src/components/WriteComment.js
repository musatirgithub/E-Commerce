import { useState } from "react";


const WriteComment = () => {
  const [commentData, setCommentData] = useState({rating:5, });
  const handleChange = (e)=>{
    setCommentData({...commentData, [e.target.name]:e.target.value})
  }
  return (
    <section>
    <form>
    <select
            name="rating"
            id="rating"
            value={commentData.rating}
            onChange={handleChange}
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[10.5rem] appearance-none placeholder-[#3A3B3C]"
          >
                <option value="5">
                  5
                </option>
                <option value="4">
                  4
                </option>
                <option value="3">
                  3
                </option>
                <option value="2">
                  2
                </option>
                <option value="1">
                  1
                </option>
          </select>
    </form>
    </section>
  )
}

export default WriteComment