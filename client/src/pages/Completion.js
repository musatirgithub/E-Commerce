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
      <section>
        <div className="text-[1.5rem] font-semibold  text-center py-4">Thank you for the payment!</div>
        <div className="text-[1.5rem] font-semibold  text-center py-4">You will be directed to Home Page in 5 seconds!</div>
      </section>
    </main>
  );
};

export default Completion;
