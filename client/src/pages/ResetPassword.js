import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuthCalls from "../hooks/useAuthCalls";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const {resetPassword} = useAuthCalls();

  const handleChange = (e)=>{
    setPassword(e.target.value)
  }
  
  const query = useQuery();
  
  const userInfo = {
    email: query.get("email"),
    token: query.get("token"),
    password: password,
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    resetPassword(userInfo);

  }

  return (
    <main className="flex justify-evenly items-center bg-[#0D1732] min-h-[calc(100vh-8rem)]">
      <div className="hidden lg:block w-[45rem] ">
        <img src = "https://images.pexels.com/photos/17155842/pexels-photo-17155842/free-photo-of-finger-scan.jpeg?auto=compress&cs=tinysrgb&w=600"
       alt="login"
       className="object-cover"/>
      </div>
      

    <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center min-h-[screen-10rem]" autoComplete="off">
      <section className="flex flex-col gap-3 mb-5">
      <div className="flex  flex-col gap-3">
      <label htmlFor="password" className="text-[#EEEDE8]">New Password</label>
      <input type="password" name="password" id="password" required value={password} onChange={handleChange} placeholder="Enter new password..."
      className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
      </section>
      <button type="submit" className={`btn bg-[#F8B664] hover:bg-[#C6A779] text-[#0D1732] w-full`}>Submit New Password</button>
    </form>
    </main>
  )
}

export default ResetPassword