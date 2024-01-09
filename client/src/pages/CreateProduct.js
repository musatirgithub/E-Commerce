import { useState } from "react";
import useAuthCalls from "../hooks/useAuthCalls";
import { Link } from "react-router-dom";


const CreateProduct = () => {
  const {register} = useAuthCalls();
  const [userInfo, setUserInfo] = useState({name:'', email:'', password:''})

  const handleChange = (e)=>{
    setUserInfo({...userInfo, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    register(userInfo);
    setUserInfo({email:'', password:''});
    }

  return (
    <main className="flex justify-evenly items-center bg-[#0D1732] min-h-[calc(100vh-8rem)]">
    <div className="hidden lg:block w-[45rem] ">
      <img src = "https://img.freepik.com/free-photo/male-hand-with-pen_155003-6453.jpg?w=996&t=st=1702918093~exp=1702918693~hmac=61bdd2e1e510f26eb29e0c1944649907dc0d6d7e7fd7e60c7a75d13990132d54"
     alt="add new product"
     className="object-cover"/>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center min-h-[screen-10rem]" autoComplete="off">
      <section className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-3">
      <label htmlFor="name" className="text-[#EEEDE8]">Name</label>
      <input type="name" name="name" id="name" required value={userInfo.name} onChange={handleChange} placeholder="Enter name..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="price" className="text-[#EEEDE8]">Price</label>
      <input type="number" name="price" id="price" required value={userInfo.price} onChange={handleChange} placeholder="Enter price..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="description" className="text-[#EEEDE8]">Description</label>
      <input type="number" name="description" id="description" required value={userInfo.description} onChange={handleChange} placeholder="Enter description..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="image" className="text-[#EEEDE8]">Image</label>
      <input type="text" name="image" id="image" required value={userInfo.image} onChange={handleChange} placeholder="Enter image..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="category" className="text-[#EEEDE8]">Category</label>
      <input type="text" name="category" id="category" required value={userInfo.category} onChange={handleChange} placeholder="Enter category..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="company" className="text-[#EEEDE8]">Company</label>
      <input type="text" name="company" id="company" required value={userInfo.company} onChange={handleChange} placeholder="Enter company..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="featured" className="text-[#EEEDE8]">Featured</label>
      <input type="text" name="featured" id="featured" required value={userInfo.featured} onChange={handleChange} placeholder="Enter featured..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="freeShipping" className="text-[#EEEDE8]">FreeShipping</label>
      <input type="text" name="freeShipping" id="freeShipping" required value={userInfo.freeShipping} onChange={handleChange} placeholder="Enter freeShipping..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="inventory" className="text-[#EEEDE8]">Inventory</label>
      <input type="number" name="inventory" id="inventory" required value={userInfo.inventory} onChange={handleChange} placeholder="Enter inventory..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
      </section>
      <button type="submit" className={`btn bg-[#F8B664] hover:bg-[#C6A779] text-[#0D1732] w-full`} >Register</button>
    </form>
    </main>
  )
}

export default CreateProduct