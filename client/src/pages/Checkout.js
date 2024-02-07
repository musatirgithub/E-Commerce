import { useSelector } from 'react-redux';
import SectionTitle from '../components/SectionTitle';


// import { toast } from 'react-toastify';
// import { redirect } from 'react-router-dom';


const Checkout = () => {
  const {cartTotal, cartItems, shipping, tax, orderTotal} = useSelector((state) => state.order);
  if (cartTotal === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }
  return (
    <>
      <SectionTitle text='place your order' />
      <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
        {/* <CheckoutForm />
        <CartTotals /> */}
      </div>
    </>
  );
};
export default Checkout;