import { useState, useEffect } from "react";
import useProductCalls from "../hooks/useProductCalls";
import { useSelector } from "react-redux";
import { closeModal } from "../features/productSlice";
import { useDispatch } from "react-redux";

const category = ["office", "kitchen", "bedroom", "electronics", "accessories"];

const company = [
  "ikea",
  "maiden",
  "eternity",
  "lumens",
  "sony",
  "bose",
  "kitchenaid",
];

const UpdateProductModal = () => {
  const dispatch = useDispatch();
  const { updateProduct } = useProductCalls();
  const { product } = useSelector((state) => state.product);
  // const [checkData, setCheckData] = useState(product ? product.completed : false)
  const [formData, setFormData] = useState({
    name: product?.name,
    price: product?.price,
    description: product?.description,
    image: product?.image,
    category: product?.category,
    company: product?.company,
    inventory: product?.inventory,
    featured: product?.featured,
    freeShipping: product?.freeShipping,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(formData, product._id);
    dispatch(closeModal());
    console.log(formData);
  };

  useEffect(() => {
    setFormData({
      name: product?.name,
      price: product?.price,
      description: product?.description,
      image: product?.image,
      category: product?.category,
      company: product?.company,
      inventory: product?.inventory,
      featured: product?.featured,
      freeShipping: product?.freeShipping,
    });
  }, [product]);

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10  bg-[#D9C6A7] rounded-xl p-3 w-[21rem]"
    >
      <div
        className="text-end text-[#2B3440]  text-[1.2rem] font-extrabold cursor-pointer"
        onClick={() => dispatch(closeModal())}
      >
        X
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <section className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-[#EEEDE8]">
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name..."
              className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="price" className="text-[#EEEDE8]">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price..."
              className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="description" className="text-[#EEEDE8]">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description..."
              className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="image" className="text-[#EEEDE8]">
              Image
            </label>
            <input
              type="text"
              name="image"
              id="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image..."
              className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="category" className="text-[#EEEDE8]">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
            >
              {category.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
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
            <label htmlFor="featured" className="text-[#EEEDE8]">
              Featured
            </label>
            <select
              name="featured"
              id="featured"
              value={formData.featured}
              onChange={handleChange}
              className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
            >
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="freeShipping" className="text-[#EEEDE8]">
              FreeShipping
            </label>
            <select
              name="freeShipping"
              id="freeShipping"
              value={formData.freeShipping}
              onChange={handleChange}
              className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
            >
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="inventory" className="text-[#EEEDE8]">
              Inventory
            </label>
            <input
              type="number"
              name="inventory"
              id="inventory"
              required
              value={formData.inventory}
              onChange={handleChange}
              placeholder="Enter inventory..."
              className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none placeholder-[#3A3B3C]"
            />
          </div>
        </section>

        <button type="submit" className="btn btn-neutral">
          Update Product
        </button>
      </div>
    </form>
  );
};

export default UpdateProductModal;
