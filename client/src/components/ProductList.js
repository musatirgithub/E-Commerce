import { useSelector } from "react-redux";
import {useEffect, useState} from "react";
import useProductCalls from "../hooks/useProductCalls";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { openModal } from "../features/productSlice";
import dateTimeConverter from "../utils/dateTimeConverter";
import remainingDays from "../utils/remainingDays";

const TaskList = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state)=>state.product);

    const [loading, setLoading] = useState(true)
    const {getProducts, deleteProduct, getProduct} = useProductCalls();
  
    useEffect(() => {
        setLoading(true);
        getProducts();
        setLoading(false);
    }, [])

    const handleClick = (id)=>{
        getProduct(id);
        dispatch(openModal());
    }
    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    if(products && products.length === 0){
        return <section className="text-center pt-5 text-[#EEEDE8]">No products to show...</section>
    }
  return (
    
    <div className="1 text-[#EEEDE8]">
        {/* <h3 className="text-center text-2xl">Tasks</h3> */}
        <section className="flex justify-center items-center">
        <table>
            <thead>
        <tr className="lg:w-[64rem]">
            <th className="w-[14rem] lg:w-[35rem] text-center">Name</th>
            <th className="w-[3rem] lg:w-[19rem] text-center">Price</th>
            <th className="w-[2.5rem] lg:w-[5rem] text-center">Edit</th>
            <th className="w-[2.5rem] lg:w-[5rem] text-center">Del</th>
        </tr>
        </thead>
       <tbody> 
        {products?.map((product, index)=>{
            return(
                <tr key={index} className={"lg:w-[64rem] even:bg-[#252E46]"}>
                    <td className="flex items-center w-[14rem] lg:w-[35rem]">
                        <div className="w-[1.5rem]">
                            <div className="w-[1.1rem]"></div>
                        </div>
                    <h4 className="w-[33.5rem] line-clamp-2 lg:line-clamp-1">{product.name}</h4>
                    </td>
                    <td className="w-[3rem] lg:w-[19rem] text-center">{product.price}</td>
                    <td className="w-[2.5rem] lg:w-[5rem]"><FaPencilAlt onClick={()=>handleClick(product._id)} className="cursor-pointer w-[1.5rem] mx-auto text-blue-700"/></td>
                    <td className="w-[2.5rem] lg:w-[5rem]"><FaRegTrashCan onClick={()=>deleteProduct(product._id)} className="cursor-pointer w-[1.5rem] mx-auto text-red-700"/></td>
                </tr>
            )
        })}
        </tbody>
        </table>
        </section>
    </div>
    
  )
}

export default TaskList