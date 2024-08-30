import { useState, useEffect } from "react";
import useProductCalls from "../hooks/useProductCalls";
import { useSelector } from "react-redux";

const categories = ['office', 'kitchen', 'bedroom', 'electronics', 'accessories'];

const companies = ['ikea', 'maiden', 'eternity', 'lumens', 'sony', 'bose', 'kitchenaid'];


const EditProduct = () => {
  const {imageAddress} = useSelector((state)=>state.product);
  const {product, loading} = useSelector((state)=>state.product);
  console.log("product", product);
  // const {_id:productId, name, price, description, image, category, company, inventory, featured, freeShipping}=product;
  const {uploadImage, updateProduct} = useProductCalls();
  const [userInfo, setUserInfo] = useState({name:"", price:0, description:"", image:"", category:"", company:"", inventory:0, featured:"", freeShipping:""});
  const [file, setFile] = useState(null);

  const handleChange = (e)=>{
    setUserInfo({...userInfo, [e.target.name]:e.target.value})
  }
  const handleFileChange = (e)=>{
    setFile(e.target.files[0])
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!file){
      updateProduct({...userInfo}, product?._id);
    }else{
      const formData = new FormData();
      formData.append('image', file);
      uploadImage(formData);
    }
    }

    useEffect(()=>{
      setUserInfo({name:product?.name, price:product?.price, description:product?.description, image:product?.image, category:product?.category, company:product?.company, inventory:product?.inventory, featured:product?.featured, freeShipping:product?.freeShipping})
    }, [loading])

    useEffect(()=>{
      if(imageAddress && !loading){
        updateProduct({...userInfo, image:imageAddress}, product?._id);
      }
    },[imageAddress])


    if(loading){
      return <div>...Loading</div>
    }
  return (
    <main className="flex justify-evenly items-center bg-[#0D1732] min-h-[calc(100vh-8rem)]">
    <div className="hidden lg:block w-[25rem] h-[25rem] object-cover object-center overflow-hidden">
        <h3 className="text-[#EEEDE8] py-2">Current Image</h3>
      <img src = {product?.image}
     alt="add new product"
     className=""/>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center min-h-[screen-10rem]" autoComplete="off">
      <section className="flex gap-12 ">
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-3">
      <label htmlFor="name" className="text-[#EEEDE8]">Name</label>
      <input type="name" name="name" id="name" required value={userInfo?.name} onChange={handleChange} placeholder="Enter name..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="price" className="text-[#EEEDE8]">Price</label>
      <input type="number" name="price" id="price" required value={userInfo?.price} onChange={handleChange} placeholder="Enter price..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="description" className="text-[#EEEDE8]">Description</label>
      <input type="text" name="description" id="description" required value={userInfo?.description} onChange={handleChange} placeholder="Enter description..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="image" className="text-[#EEEDE8]">Change Current Image</label>
      <input type="file" name="image" id="image" onChange={handleFileChange} placeholder="Select image..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
      </div>
      <div>
      <div className="flex flex-col gap-3">
<label htmlFor="category" className="text-[#EEEDE8]">Category</label>
<select
        name="category"
        id="category"
        value={userInfo?.category}
        onChange={handleChange}
        className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
      >
        {categories?.map((item, index)=>{
          return <option key={index} value={item}>{item}</option>
        })}
      </select>
      </div>
      <div className="flex flex-col gap-3">
<label htmlFor="company" className="text-[#EEEDE8]">Company</label>
<select
        name="company"
        id="company"
        value={userInfo?.company}
        onChange={handleChange}
        className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
      >
        {companies?.map((item, index)=>{
          return <option key={index} value={item}>{item}</option>
        })}
      </select>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="featured" className="text-[#EEEDE8]">Featured</label>
      <input type="text" name="featured" id="featured" required value={userInfo?.featured} onChange={handleChange} placeholder="Enter featured..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="freeShipping" className="text-[#EEEDE8]">FreeShipping</label>
      <input type="text" name="freeShipping" id="freeShipping" required value={userInfo?.freeShipping} onChange={handleChange} placeholder="Enter freeShipping..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
        <div className="flex flex-col gap-3">
      <label htmlFor="inventory" className="text-[#EEEDE8]">Inventory</label>
      <input type="number" name="inventory" id="inventory" required value={userInfo?.inventory} onChange={handleChange} placeholder="Enter inventory..."
       className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"/>
      </div>
      </div>
      </section>
      <button type="submit" className={`btn bg-[#F8B664] hover:bg-[#C6A779] text-[#0D1732] w-full`} >Edit Product</button>
    </form>
    </main>
  )
}

export default EditProduct