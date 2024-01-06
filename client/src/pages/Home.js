import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
import UpdateTaskModal from "../components/UpdateTaskModal";

const Home = () => {
  const {isModalOpen} = useSelector((state)=>state.product);
const [loading, setLoading] = useState(true)

useEffect(() => {
  setLoading(false)
}, [])

if(loading){
  return <div>Loading...</div>
}

  return (
    <div className="relative min-h-[calc(100vh-8rem)] bg-[#0D1732]">
      <ProductList/>
      {isModalOpen && <UpdateTaskModal/>}
    </div>
  )
}

export default Home