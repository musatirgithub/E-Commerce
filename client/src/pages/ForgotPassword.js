import { useState } from "react";
import useAuthCalls from "../hooks/useAuthCalls";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const {forgotPassword} = useAuthCalls();
    const handleChange= (e)=>{
        setEmail(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        forgotPassword({email});
    }


    
  return (
    <main className="flex justify-evenly items-center bg-[#0D1732] min-h-[calc(100vh-8rem)]">
      <div className="hidden lg:block w-[45rem] ">
        <img src = "https://img.freepik.com/free-photo/handsome-middle-age-man-wearing-call-center-agent-headset-office-surprised-with-hand-head-mistake-remember-error-forgot-bad-memory-concept_839833-34030.jpg?size=626&ext=jpg&ga=GA1.2.191462041.1688302724&semt=sph"
       alt="login"
       className="object-cover"/>
      </div>
      

    <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center min-h-[screen-10rem]" autoComplete="off">
      <section className="flex flex-col gap-3 mb-5">
        <div className="flex flex-col gap-3">
      <label htmlFor="email" className="text-[#EEEDE8]">Email</label>
      <input type="email" name="email" id="email" required value={email} onChange={handleChange} placeholder="Enter email address..."
      className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
      </section>
      <button type="submit" className={`btn bg-[#F8B664] hover:bg-[#C6A779] text-[#0D1732] w-full`}>Send Reset Password Link</button>
    </form>
    </main>
  )
}

export default ForgotPassword