import { useState } from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../utils/formatPrice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeCartItem,
  increaseCartItem,
  decreaseCartItem,
  addAddress,
} from "../features/orderSlice";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const { cartTotal, cartItems, shipping, tax, orderTotal } = useSelector(
    (state) => state.order
  );
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState({street:"", number:"", postal:"", country:""});
  const handleChange= (e)=>{
    setAddress({...address, [e.target.name]:e.target.value})
  }

  const handleProceed = ()=>{
    const orderAddress = address.street + " " +  String(address.number) + " " + String(address.postal) + " " + address.country;
    dispatch(addAddress(orderAddress))
  }
  return (
    <main className="min-h-[calc(100vh-8rem)]">
      {/* This section lists the cart items */}
      <section className="text-3xl text-center mx-auto underline p-2">
        Shopping Cart
      </section>
      <section>
        {cartItems.map((item) => {
          return (
            <article
              className="flex justify-evenly items-center"
              key={item.productId}
            >
              <div className="w-[5rem] object-cover">
                <img src={item.image} alt="item.name" />
              </div>
              <div>
                <h5 className="font-semibold">{item.name}</h5>
                <h5 className=" text-amber-900 font-semibold">
                  {formatPrice(item.price * item.amount)}
                </h5>
              </div>
              <div className="flex justify-between w-[5rem] gap-2">
                <p
                  className="text-2xl text-center font-bold bg-slate-200 w-[2rem] rounded-lg "
                  onClick={() => dispatch(decreaseCartItem(item.productId))}
                >
                  -
                </p>
                <p className="text-2xl font-bold">{item.amount}</p>
                <p
                  className="text-2xl text-center font-bold  bg-slate-200 w-[2rem] rounded-lg "
                  onClick={() => dispatch(increaseCartItem(item.productId))}
                >
                  +
                </p>
              </div>
              <div>
                <MdDelete
                  className="text-amber-700 text-3xl"
                  onClick={() => dispatch(removeCartItem(item.productId))}
                />
              </div>
            </article>
          );
        })}
      </section>

      <section className="w-[20rem] bg-slate-200 mx-auto rounded-lg my-2">
        <div>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" name="street" value={address.street} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <input type="number" id="number" name="number" value={address.number} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="postal">Postal Code</label>
          <input type="number" id="postal" name="postal" value={address.postal} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="postal">Country</label>
          <input type="text" id="country" name="country" value={address.country} onChange={handleChange}/>
        </div>
      </section>

      {/* This section shows payment details */}
      <section className="w-[20rem] bg-slate-200 mx-auto rounded-lg my-2">
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
      </section>
      <section className="flex justify-center">
        {currentUser ? (
          <button className="bg-amber-700 rounded-lg text-white hover:bg-amber-600 w-[16rem] uppercase p-2 font-bold my-5" onClick={handleProceed}>
            Proceed to Checkout
          </button>
        ) : (
          <button
            className="bg-amber-700 rounded-lg text-white hover:bg-amber-600 w-[16rem] uppercase p-2 font-bold my-5"
            onClick={() => navigate("/login")}
          >
            Please Login
          </button>
        )}
      </section>
    </main>
  );
};

export default Cart;
