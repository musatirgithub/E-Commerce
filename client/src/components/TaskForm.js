import { useState } from "react";
// import { Link } from "react-router-dom";
import useTaskCalls from "../hooks/useTaskCalls";

const TaskForm = () => {
    const {createTask} = useTaskCalls();
    const [formData, setFormData] = useState({name:'', deadline:''})

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        createTask(formData);
        setFormData({name:'', deadline:''});
    }

  return (
    <section className="p-5 mx-auto lg:max-w-5xl ">
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-3 border-2 rounded-3xl mt-3 pb-3" autoComplete="off">
      
        <div className="flex flex-col items-center gap-3 mt-4 lg:mt-9 lg:ms-[5rem]">
      {/* <label htmlFor="name" className="text-[#EEEDE8]">Task</label> */}
      <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} placeholder="Enter task here.."
      className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded py-2 px-4 block appearance-none placeholder-[#3A3B3C] h-[2.5rem] w-[19rem] lg:w-[30rem]"/>
      </div>
      <section className="flex justify-center gap-5 px-3">
      <div className="flex  flex-col gap-3">
      <label htmlFor="deadline" className="text-[#EEEDE8] text-center">Deadline</label>
      <input type="datetime-local" name="deadline" id="deadline" required value={formData.deadline} onChange={handleChange} placeholder="Change deadline..."
      className="bg-[#D9C6A7] text-[#0D1732] focus:outline-none border border-gray-300 rounded px-4 block appearance-none placeholder-[#3A3B3C] h-[2.5rem] w-[12rem]"/>
      </div>
      <button type="submit" className="btn btn-danger mt-9">Add Task</button>
      </section>
    </form>
    </section>
  )
}

export default TaskForm