import { useSelector } from "react-redux";
import { formatPrice } from "../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Completion = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.order
  );
  const navigate = useNavigate();
  useEffect(()=>{
    setTimeout(() => {
      navigate('/');
    }, 5000);
  },[])
  return (
    <main className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center">
      {/* <section className=" w-[20rem] bg-slate-200 mx-auto rounded-lg my-4">
        <div className="flex justify-between border-b-2 border-slate-300 w-[80%] mx-auto pt-4">
          <h5>Cart Total </h5>
          <h5>{formatPrice(cartTotal)} </h5>
        </div>
        <div className="flex justify-between border-b-2 border-slate-300 w-[80%] mx-auto pt-2">
          <h5>Shipping </h5>
          <h5>{formatPrice(shipping)} </h5>
        </div>
        <div className="flex justify-between border-b-2 border-slate-300 w-[80%] mx-auto pt-2">
          <h5>Tax </h5>
          <h5>{formatPrice(tax)} </h5>
        </div>
        <div className="flex justify-between w-[80%] mx-auto pb-4 pt-2">
          <h5 className="font-semibold">Order Total </h5>
          <h5 className="font-semibold">{formatPrice(orderTotal)} </h5>
        </div>
      </section> */}
      <section>
        <div className="text-[1.5rem] font-semibold text-orange-800 text-center py-4">Thank you for the payment!</div>
        <div className="text-[1.5rem] font-semibold text-blue-800 text-center py-4">You will be directed to Home Page in 5 seconds!</div>
      </section>
    </main>
  );
};

export default Completion;
