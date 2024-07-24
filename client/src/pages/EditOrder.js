import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useOrderCalls from "../hooks/useOrderCalls";
import { formatPrice } from "../utils/formatPrice";
import { formatDate } from "../utils/formatDate";

const statusList = ["pending", "failed", "paid", "delivered", "canceled"];

const EditOrder = () => {
  const dispatch = useDispatch();
  const { getOrder } = useOrderCalls();
  const { order, loading } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState({ status: "" });

  useEffect(() => {
    setOrderInfo({ status: order?.status });
  }, []);

  const handleSubmit = () => {};
  const handleChange = (e) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: [e.target.value] });
  };
  if (loading) {
    return (
      <div>
        <div>...Loading</div>
      </div>
    );
  }
  return (
    <main>
        <h2 className="text-center text-[1.5rem] font-bold">Order Details</h2>
      <div className="flex p-2 w-[30rem] mx-auto">
        <p className="w-[10rem]">Order Created At: </p>
        <p className="px-2">
          : {formatDate(order.createdAt)}
        </p>
      </div>
      <div className="flex p-2 w-[30rem] mx-auto">
        <p className="w-[10rem]">Order Updated At </p>
        <p className="px-2">
          : {formatDate(order.updatedAt)}
        </p>
      </div>
      <div className="flex p-2 w-[30rem] mx-auto">
        <p className="w-[10rem]">Order Id </p>
        <p className="px-2">: {order._id}</p>
      </div>
      <div className="flex p-2 w-[30rem] mx-auto">
        <p className="w-[10rem]">Order Total </p>
        <p className="px-2">: {formatPrice(order.total)}</p>
      </div>
      <div className="flex p-2 w-[30rem] mx-auto">
        <p className="w-[10rem]">Address </p>
        <p className="px-2">: {order.address}</p>
      </div>

      <div className="flex flex-col gap-3 w-[15rem]">
        <p>Order Items: </p>
        {order?.orderItems?.map((item, index) => {
          return (
            <div key={index}>
              <p className="w-[14.5rem]">{item.name}</p>
              <p className="w-[14.5rem]">{formatPrice(item.price)}</p>
              <p className="w-[14.5rem]">{item.amount}</p>
              <p className="w-[14.5rem]">{item.product}</p>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 justify-center items-center min-h-[screen-10rem]"
        autoComplete="off"
      >
        <section className="flex gap-12 ">
          <div className="flex flex-col gap-3">
            <label htmlFor="status" className="text-[#EEEDE8]">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={orderInfo?.status}
              onChange={handleChange}
              className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
            >
              {statusList?.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </section>
        <div className="w-[20rem]">
        <button
          type="submit"
          className={`btn bg-[#F8B664] hover:bg-[#C6A779] text-[#0D1732] w-full`}
        >
          Edit Order
        </button>
        </div>
      </form>
    </main>
  );
};

export default EditOrder;
