import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsProcessing(true);
        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:`${window.location.origin}/completion`,
            },
            // redirect: "if_required",
        })

        if(error){
            setMessage(error.message)
            } else if(paymentIntent && paymentIntent.status==="succeeded"){
                setMessage("Payment Status: " + paymentIntent.status + "🎉")
            } else(
                setMessage("Unexpected state")
            )

        setIsProcessing(false);
    }

  return (
    <div className="w-[20rem] lg:w-[45rem] mx-auto">
    <form id="payment-form" onSubmit={handleSubmit} >
        <PaymentElement />
        <div className="flex justify-center">
        <button disabled={isProcessing} id="submit" className="btn btn-wide my-4 bg-amber-700 rounded-lg hover:bg-amber-600">
            <span id="button-text">
                {isProcessing ? "Processing...":"Pay now"}
            </span>
        </button>
        </div>
        {message && <div id="payment-message">{message}</div>}
    </form>
    </div>
  )
}

export default CheckoutForm