import { useSelector } from "react-redux";
import { useEffect } from "react";
import useOrderCalls from "../hooks/useOrderCalls";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
// import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../features/productSlice";
import {formatPrice} from "../utils/formatPrice";

const OrderListAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.order);

  // const [loading, setLoading] = useState(true);
  const { getOrders, deleteOrder, getOrder, updateOrder } = useOrderCalls();

  useEffect(() => {
    // setLoading(true);
    getOrders();
    // setLoading(false);
  }, []);

  const handleEdit = (id) => {
    getOrder(id);
    navigate(`/edit-product`);
    // dispatch(openModal());
  };
  const handleDelete = (id) => {
    deleteOrder(id);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (orders && orders.length === 0) {
    return (
      <section className="text-center pt-5 text-[#EEEDE8]">
        No orders to show...
      </section>
    );
  }
  return (
    <main className="min-h-[calc(100vh-8rem)]">
        <h2 className="text-center text-[1.5rem] font-bold">All Orders (Alphabetical Order)</h2>
    <div className="">
      {orders?.map((order, index) => {
        return (
          <div
            key={index}
            className=" p-[1rem] flex items-center"
          >
            <div className="w-[5rem] h-[5rem] object-cover object-center rounded-sm overflow-hidden px-2">
              <img src={order.image} className="" />
            </div>
                <p className="w-[13rem] line-clamp-3 items-center">{order.name}</p>
                <p className="w-[13rem]">{order._id}</p>
                <p className="w-[6rem]">{formatPrice(order.subtotal)}</p>
              <p className="line-clamp-3 w-[20rem]">{order.status}</p>
              <p className="line-clamp-3 w-[20rem]">{order.address}</p>
              {order.orderItems?.map((item, index)=>{
                return (
                    <div key={index}>
                        <p className="w-[6rem]">{formatPrice(item.name)}</p>
                        <p className="w-[6rem]">{formatPrice(item.price)}</p>
                        <p className="w-[6rem]">{formatPrice(item.amount)}</p>
                        <p className="w-[6rem]">{formatPrice(item.product)}</p>
                    </div>
                )
              })}
              <div className="text-[#1E40AF] px-3 cursor-pointer" onClick={()=>handleEdit(order._id)}><FaPencilAlt/></div>
              <div className="text-[#991B1B] cursor-pointer" onClick={()=>handleDelete(order._id)}><FaRegTrashCan/></div>
          </div>
        );
      })}
    </div>
    </main>
  );
};

export default OrderListAdmin;
