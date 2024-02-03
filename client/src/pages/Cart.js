import { useSelector } from "react-redux";
import { formatPrice } from "../utils/formatPrice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  increaseCartItem,
  decreaseCartItem,
} from "../features/orderSlice";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const { cartTotal, cartItems, shipping, tax, orderTotal } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  return (
    <main>
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
                <h5 className=" text-amber-900 font-semibold">{formatPrice(item.price * item.amount)}</h5>
              </div>
              <div className="flex justify-between w-[5rem] gap-2">
                <p className="text-2xl text-center font-bold bg-slate-200 w-[2rem] rounded-lg " onClick={()=>dispatch(decreaseCartItem(item.productId))}>
                  -
                </p>
                <p className="text-2xl font-bold">{item.amount}</p>
                <p className="text-2xl text-center font-bold  bg-slate-200 w-[2rem] rounded-lg " onClick={()=>dispatch(increaseCartItem(item.productId))}>
                  +
                </p>
              </div>
              <div >
              <MdDelete className="text-amber-900 text-3xl" onClick={()=>dispatch(removeCartItem(item.productId))}/>
              </div>
            </article>
          );
        })}
      </section>
      
      <section className="w-[20rem] bg-slate-400 ">

      </section>
    </main>
  );
};

export default Cart;
