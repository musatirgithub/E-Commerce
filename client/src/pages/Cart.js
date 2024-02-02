import { useSelector } from "react-redux";

const Cart = () => {
    const {cartTotal, cartItems, shipping, tax, orderTotal} = useSelector((state) => state.order);
  return (
    <main>
        <section className="text-3xl text-center mx-auto underline p-2">Shopping Cart</section>
        <section>
            {cartItems.map((item)=>{
                
            })}
        </section>
    </main>
  )
}

export default Cart