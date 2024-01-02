import { useState } from "react";
import useUserCalls from "../hooks/useUserCalls";


const ChangePassword = () => {
  const {updatePassword} = useUserCalls();
  const [userInfo, setUserInfo] = useState({oldPassword:'', newPassword:''})

  const handleChange = (e)=>{
    setUserInfo({...userInfo, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    updatePassword(userInfo);
    }

  return (
    <main className="flex justify-evenly items-center bg-[#0D1732] min-h-[calc(100vh-8rem)]">
    <div className="hidden lg:block w-[45rem] ">
      <img src = "https://img.freepik.com/free-photo/flat-lay-notebook-with-password-laptop_23-2148578078.jpg?size=626&ext=jpg&ga=GA1.2.191462041.1688302724&semt=sph"
     alt="login"
     className="object-cover"/>
    </div>
    

  <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center min-h-[screen-10rem]" autoComplete="off">
    <section className="flex flex-col gap-3 mb-5">
      <div className="flex flex-col gap-3">
    <label htmlFor="oldPassword" className="text-[#EEEDE8]">oldPassword</label>
    <input type="password" name="oldPassword" id="oldPassword" required value={userInfo.email} onChange={handleChange} placeholder="Enter email address..."
    className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
    </div>
    <div className="flex  flex-col gap-3">
    <label htmlFor="newPassword" className="text-[#EEEDE8]">newPassword</label>
    <input type="password" name="newPassword" id="newPassword" required value={userInfo.password} onChange={handleChange} placeholder="Enter password..."
    className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
    </div>
    </section>
    <button type="submit" className={`btn bg-[#F8B664] hover:bg-[#C6A779] text-[#0D1732] w-full`}>Change Password</button>
  </form>
  </main>
  )
}

export default ChangePassword;