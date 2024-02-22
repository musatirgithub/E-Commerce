import { useState } from "react";
import useProductCalls from "../hooks/useProductCalls";

const category = ['office', 'kitchen', 'bedroom', 'electronics', 'accessories'];

const company = ['ikea', 'maiden', 'eternity', 'lumens', 'sony', 'bose', 'kitchenaid'];


const CreateProduct = () => {
  const {createProduct} = useProductCalls();
  const [userInfo, setUserInfo] = useState({name:'', price:0, description:'', image:'', category:'', company:'', inventory:0, featured:false, freeShipping:false});
  const [file, setFile] = useState(null);

  const handleChange = (e)=>{
    setUserInfo({...userInfo, [e.target.name]:e.target.value})

  }

  const handleFileChange = (e)=>{
    setFile(e.target.files[0])
    
  }
  console.log(file);
  const handleSubmit = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    createProduct(userInfo);
    // setUserInfo({name:'', price:0, description:'', image:'', category:'', company:'', inventory:0, featured:false, freeShipping:false});
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
      <input type="text" name="description" id="description" required value={userInfo.description} onChange={handleChange} placeholder="Enter description..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="image" className="text-[#EEEDE8]">Image</label>
      <input type="file" name="image" id="image" required onChange={handleFileChange} placeholder="Select image..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
      <div className="flex flex-col gap-3">
<label htmlFor="category" className="text-[#EEEDE8]">Category</label>
<select
        name="category"
        id="category"
        value={userInfo.category}
        onChange={handleChange}
        className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
      >
        {category.map((item, index)=>{
          return <option key={index} value={item}>{item}</option>
        })}
      </select>
      </div>
      <div className="flex flex-col gap-3">
<label htmlFor="company" className="text-[#EEEDE8]">Company</label>
<select
        name="company"
        id="company"
        value={userInfo.company}
        onChange={handleChange}
        className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
      >
        {company.map((item, index)=>{
          return <option key={index} value={item}>{item}</option>
        })}
      </select>
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
      <button type="submit" className={`btn bg-[#F8B664] hover:bg-[#C6A779] text-[#0D1732] w-full`} >Add Product</button>
    </form>
    </main>
  )
}

export default CreateProduct