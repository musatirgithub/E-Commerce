import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useProductCalls from "../hooks/useProductCalls";
// import { FaPencilAlt } from "react-icons/fa";
// import { FaRegTrashCan } from "react-icons/fa6";
// import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../features/productSlice";
import {formatPrice} from "../utils/formatPrice";

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);

  const [loading, setLoading] = useState(true);
  const { getProducts, deleteProduct, getProduct } = useProductCalls();

  useEffect(() => {
    setLoading(true);
    getProducts();
    setLoading(false);
  }, []);

  const handleClick = (id) => {
    getProduct(id);
    navigate(`/single-product/${id}`);
    // dispatch(openModal());
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (products && products.length === 0) {
    return (
      <section className="text-center pt-5 text-[#EEEDE8]">
        No products to show...
      </section>
    );
  }
  return (
    <div className="flex flex-wrap gap-5 px-16 ">
      {products?.map((product, index) => {
        return (
          <div
            key={index}
            className={""}
            onClick={() => handleClick(product._id)}
          >
            <div className="w-[21rem] h-[21rem] object-cover object-center rounded-t-lg ">
              <img src={product.image} className="" />
            </div>
            <div className="text-white rounded-b-lg">
              <div className="flex justify-between w-[21rem] ">
                <p>{product.name}</p>
                <p>{formatPrice(product.price)}</p>
              </div>
              <p className="line-clamp-3">{product.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
