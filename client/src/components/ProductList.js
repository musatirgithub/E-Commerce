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

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.product);

  // const [loading, setLoading] = useState(true);
  const { getAllProducts, deleteProduct, getProduct } = useProductCalls();

  useEffect(() => {
    // setLoading(true);
    getAllProducts();
    // setLoading(false);
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
    <div className="flex flex-wrap gap-16 px-20 py-5 mb-5">
      {products?.map((product, index) => {
        return (
          <div
            key={index}
            className={" cursor-pointer"}
            onClick={() => handleClick(product._id)}
          >
            <div className="w-[18rem] h-[18rem] object-cover object-center rounded-t-lg overflow-hidden">
              <img src={product.image} className="" />
            </div>
            <div className="text-white rounded-b-lg w-[18rem] bg-white ">
              <div className="flex justify-between text-[1.1rem] text-orange-900 font-semibold px-1">
                <p>{product.name}</p>
                <p>{formatPrice(product.price)}</p>
              </div>
              <p className="line-clamp-3 text-[0.8rem] text-slate-700 font-semibold text-justify pt-1 px-1 h-[4.1rem]">{product.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
