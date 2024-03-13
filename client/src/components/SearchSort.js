import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useProductCalls from "../hooks/useProductCalls";

const SearchSort = () => {
  const {getProducts} = useProductCalls();
  const {minPrice, maxPrice} = useSelector((state)=>state.product);
  const [formData, setFormData] = useState({search:"", minprice:minPrice/100, maxprice:maxPrice/100, minrating:1, maxrating:5, company:"ikea", sort:"price"});
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    getProducts(formData);
  };
  
  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      minprice: minPrice / 100,
      maxprice: maxPrice / 100
    }));
  }, [minPrice, maxPrice]);
  
  const company = [
    "ikea",
    "maiden",
    "eternity",
    "lumens",
    "sony",
    "bose",
    "kitchenaid",
  ];
  return (
    <section className="flex justify-center py-5">
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="search" className="text-[#EEEDE8]">
            Search
          </label>
          <input
            type="text"
            name="search"
            id="search"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name..."
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[21rem] appearance-none placeholder-[#3A3B3C]"
          />
        </div>
        <div className="flex flex-col gap-3"> 
          <label htmlFor="minprice" className="text-[#EEEDE8]">
            Min Price
          </label>
          <input
            type="number"
            name="minprice"
            id="minprice"
            required
            value={formData.minprice}
            onChange={handleChange}
            placeholder="Enter price..."
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[10.5rem] appearance-none placeholder-[#3A3B3C]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="maxprice" className="text-[#EEEDE8]">
            Max Price
          </label>
          <input
            type="number"
            name="maxprice"
            id="maxprice"
            required
            value={formData.maxprice}
            onChange={handleChange}
            placeholder="Enter price..."
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[10.5rem] appearance-none placeholder-[#3A3B3C]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="minrating" className="text-[#EEEDE8]">
            Min Rating
          </label>
          <input
            type="number"
            name="minrating"
            id="minrating"
            required
            value={formData.minrating}
            onChange={handleChange}
            placeholder="Enter price..."
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[10.5rem] appearance-none placeholder-[#3A3B3C]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="maxrating" className="text-[#EEEDE8]">
            Max Rating
          </label>
          <input
            type="number"
            name="maxrating"
            id="maxrating"
            required
            value={formData.maxrating}
            onChange={handleChange}
            placeholder="Enter price..."
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[10.5rem] appearance-none placeholder-[#3A3B3C]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="company" className="text-[#EEEDE8]">
            Company
          </label>
          <select
            name="company"
            id="company"
            value={formData.company}
            onChange={handleChange}
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[10.5rem] appearance-none placeholder-[#3A3B3C]"
          >
            {company.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="sort" className="text-[#EEEDE8]">
            Sort
          </label>
          <select
            name="sort"
            id="sort"
            value={formData.sort}
            onChange={handleChange}
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-[10.5rem] appearance-none placeholder-[#3A3B3C]"
          >
            <option value={"price"}>
              Price Ascending
            </option>
            <option value={"-price"}>
              Price Descending
            </option>
            <option value={"rating"}>
              Rating Ascending
            </option>
            <option value={"-rating"}>
              Rating Descending
            </option>
          </select>
        </div>
        <div className="">
          <button type="submit" className="btn">Search</button>
        </div>
      </form>
    </section>
  );
};

export default SearchSort;
