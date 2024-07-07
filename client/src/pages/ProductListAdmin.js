import { useSelector } from "react-redux";
import { useEffect } from "react";
import useProductCalls from "../hooks/useProductCalls";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
// import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../features/productSlice";
import {formatPrice} from "../utils/formatPrice";

const ProductListAdmin = () => {
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

  const handleEdit = (id) => {
    getProduct(id);
    navigate(`/edit-product`);
    // dispatch(openModal());
  };
  const handleDelete = (id) => {
    deleteProduct(id);
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
    <main className="min-h-[calc(100vh-8rem)]">
        <h2 className="text-center text-[1.5rem] font-bold">All Products (Alphabetical Order)</h2>
    <div className="">
      {products?.map((product, index) => {
        return (
          <div
            key={index}
            className=" p-[1rem] flex items-center"
          >
            <div className="w-[5rem] h-[5rem] object-cover object-center rounded-sm overflow-hidden px-2">
              <img src={product.image} className="" />
            </div>
                <p className="w-[13rem] line-clamp-3 items-center">{product.name}</p>
                <p className="w-[13rem]">{product._id}</p>
                <p className="w-[6rem]">{formatPrice(product.price)}</p>
              <p className="line-clamp-3 w-[20rem]">{product.description}</p>
              <div className="text-[#1E40AF] px-3 cursor-pointer" onClick={()=>handleEdit(product._id)}><FaPencilAlt/></div>
              <div className="text-[#991B1B] cursor-pointer" onClick={()=>handleDelete(product._id)}><FaRegTrashCan/></div>
          </div>
        );
      })}
    </div>
    </main>
  );
};

export default ProductListAdmin;
