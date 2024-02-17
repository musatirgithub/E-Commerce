import { useNavigate, useParams } from "react-router-dom";
import useProductCalls from "../hooks/useProductCalls";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {addCartItem, removeCartItem} from "../features/orderSlice";
import { formatPrice } from "../utils/formatPrice";

const SingleProduct = () => {
    const dispatch = useDispatch();
    const {getProduct} = useProductCalls();
    const {product} = useSelector((state)=>state.product);
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(1);

    const handleIncrease = ()=>{
        if(amount<product?.inventory){
            setAmount(amount + 1);
        }
    }
    const handleDecrease = ()=>{
        if(amount>1){
            setAmount(amount - 1);
        }
    }

    const cartProduct = {
        product: product?._id,
        image: product?.image,
        name: product?.name,
        price: product?.price,
        amount: Number(amount),
      };

      const handleAddProduct = ()=>{
        dispatch(addCartItem({product: cartProduct}));
        navigate('/cart');
      }

    useEffect(() => {
        setLoading(true);
        getProduct(id);
        setLoading(false);
    }, []);
    if(loading){
        return <div>
                <div>...Loading</div>
            </div>
    }
  return (
    <main>
        <div className=" bg-amber-700 rounded-lg text-white hover:bg-amber-600 w-[15rem] uppercase text-center p-2 font-bold my-5 mx-auto" onClick={()=>navigate('/')}>Back to Products</div>
        <section>
            <div className="w-[15rem] object-cover object-center mx-auto">
                <img src={product?.image} alt={product?.name}/>
            </div>
            <p className=" text-3xl font-bold capitalize text-center py-3">{product?.name}</p>
            <div className="ps-3 flex flex-row gap-2">
            <p className=" text-md font-bold capitalize text-center py-3">Average Rating </p>
            <div className=" min-w-[2rem] bg-red-800 text-white rounded-md flex justify-center items-center">
            <p className=" font-bold text-xl ">{product?.averageRating}</p>
            </div>
            <p className=" text-md font-semibold lowercase text-center py-3">({product?.numOfReviews} customer reviews)</p>
            </div>
            <p className="ps-3 text-lg font-bold text-amber-800">{formatPrice(product?.price)}</p>
            <p className="ps-3 text-lg font-semibold underline">Description:</p>
            <p className="ps-3 text-lg">{product?.description}</p>
            <div className=" ps-3 flex ">
                <p className="w-[6rem] font-semibold">Available:</p>
                <p>{product?.inventory > 0 ? 'In Stock':'Out of Stock'}</p>
            </div>
            <div className=" ps-3 flex ">
                <p className="w-[6rem] font-semibold">Brand:</p>
                <p className="capitalize">{product?.company}</p>
            </div>
            <div className="underline w-[15rem] mx-auto"></div>
            <div className="my-[2rem] flex justify-center gap-3">
                <div className="min-w-[2rem] bg-gray-300 text-black text-center text-3xl font-bold rounded-md" onClick={handleDecrease}>-</div>
                <div className="min-w-[2rem] text-black text-center text-3xl font-bold ">{amount}</div>
                <div className="min-w-[2rem] bg-gray-300 text-black text-center text-3xl font-bold rounded-md " onClick={handleIncrease}>+</div>
            </div>
        </section>
        <div className=" bg-amber-700 rounded-lg text-white hover:bg-amber-600 w-[15rem] uppercase text-center p-2 font-bold my-5 mx-auto" onClick={handleAddProduct}>Add to Cart</div>
    </main>
  )
}

export default SingleProduct