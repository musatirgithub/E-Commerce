import { useState } from "react";
import useAuthCalls from "../hooks/useAuthCalls";
import { Link } from "react-router-dom";


const Login = () => {
  const {login} = useAuthCalls();
  const [userInfo, setUserInfo] = useState({email:'', password:''})

  const handleChange = (e)=>{
    setUserInfo({...userInfo, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    login(userInfo);
    setUserInfo({email:'', password:''});
    }

  return (
    <main className="flex justify-evenly items-center bg-[#0D1732] min-h-[calc(100vh-8rem)]">
      <div className="hidden lg:block w-[45rem] ">
        <img src = "https://img.freepik.com/free-photo/flat-lay-notebook-with-list-desk_23-2148938725.jpg?w=996&t=st=1702818921~exp=1702819521~hmac=40acebaf881588fb69f96bda93d2ecd161769e680b9cc52eed16bebd03632876"
       alt="login"
       className="object-cover"/>
      </div>
      

    <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center min-h-[screen-10rem]" autoComplete="off">
      <section className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-3">
      <label htmlFor="email" className="text-[#EEEDE8]">Email</label>
      <input type="email" name="email" id="email" required value={userInfo.email} onChange={handleChange} placeholder="Enter email address..."
      className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
      <div className="flex  flex-col gap-3">
      <label htmlFor="password" className="text-[#EEEDE8]">Password</label>
      <input type="password" name="password" id="password" required value={userInfo.password} onChange={handleChange} placeholder="Enter password..."
      className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
      <h4 className="flex flex-col gap-3">
        <Link to='/forgot-password' className="text-[#F8B664] block text-center hover:text-[#C6A779]">Forgot Password?</Link>
        <Link to='/register' className="text-[#F8B664] block text-center hover:text-[#C6A779]">Not a member? Register!</Link>
      </h4>
      </section>
      <button type="submit" className={`btn bg-[#F8B664] hover:bg-[#C6A779] text-[#0D1732] w-full`}>Login</button>
    </form>
    </main>
  )
}

export default Login