import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { axiosPublic } from "../utils/axiosPublic";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useOrderCalls from "../hooks/useOrderCalls";

const Payment = () => {
  const { cartTotal, cartItems, shipping, tax, orderTotal, address, clientSecret } = useSelector(
    (state) => state.order
  );
  const {createOrder} = useOrderCalls();
  const [stripePromise, setStripePromise] = useState(null);

  const orderInfo = {subtotal:cartTotal, cartItems, shipping, tax, total:orderTotal, address};
  const getPK = async () => {
    const { data } = await axiosPublic.get("/api/v1/order/config", {
      withCredentials: "include",
    });
    setStripePromise(loadStripe(data.publishableKey));
  };

  useEffect(() => {
    getPK();
  }, []);

  useEffect(() => {
    createOrder(orderInfo);
  }, []);
  return (
    <main className="">

    <div className="min-h-[calc(100vh-8rem)] flex justify-center items-center">
      {stripePromise && clientSecret && (
              <div>
              <h4 className="text-center font-semibold">Following Payment System is Connected to a Fake Account. You will not be charged anyway!</h4>
              <h4 className="text-center font-semibold">For Testing Purposes Please Use Following Card Number</h4>
              <h4 className="text-center text-red-800 font-bold p-4 border border-solid border-orange-800 my-2">4242 4242 4242 4242</h4>
        <Elements stripe={stripePromise} options={{clientSecret}}>
          <CheckoutForm />
        </Elements>
        </div>
      )}
    </div>
    </main>
  );
};

export default Payment;
