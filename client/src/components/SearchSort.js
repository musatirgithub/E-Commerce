import { useState } from "react";

const SearchSort = () => {
  const [formData, setFormData] = useState();
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
    <section>
      <form>
        <div className="flex flex-col gap-3">
          <label htmlFor="search" className="text-[#EEEDE8]">
            Search
          </label>
          <input
            type="text"
            name="search"
            id="search"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name..."
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
          />
        </div>
        <div>
          <label htmlFor="minprice" className="text-[#EEEDE8]">
            Price
          </label>
          <input
            type="number"
            name="minprice"
            id="minprice"
            required
            value={formData.minprice}
            onChange={handleChange}
            placeholder="Enter price..."
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
          />
        </div>
        <div>
          <label htmlFor="maxprice" className="text-[#EEEDE8]">
            Price
          </label>
          <input
            type="number"
            name="maxprice"
            id="maxprice"
            required
            value={formData.maxprice}
            onChange={handleChange}
            placeholder="Enter price..."
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
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
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
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
            Company
          </label>
          <select
            name="sort"
            id="sort"
            value={formData.sort}
            onChange={handleChange}
            className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
          >
            <option value={item}>
              Price Ascending
            </option>
            <option value={item}>
              Price Descending
            </option>
            <option value={item}>
              Brand Ascending
            </option>
            <option value={item}>
              Brand Descending
            </option>
          </select>
        </div>
        <div>
          <button type="submit"></button>
        </div>
      </form>
    </section>
  );
};

export default SearchSort;
