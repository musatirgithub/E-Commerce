import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { axiosPublic } from "../utils/axiosPublic";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const orderInfo = {};

  const getPK = async () => {
    const { data } = await axiosPublic.get("/api/v1/order/config", {
      withCredentials: "include",
    });
    setStripePromise(loadStripe(data.publishableKey));
  };
  const createPaymentIntent = async () => {
    const { data } = await axiosPublic.post(
      `/api/v1/order/create-payment-intent`,
      orderInfo,
      {
        withCredentials: "include",
      }
    );
    setClientSecret(data.clientSecret);
  };

  useEffect(() => {
    getPK();
  }, []);

  useEffect(() => {
    createPaymentIntent();
  }, []);
  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
