import { useState, useEffect } from "react";
import useTaskCalls from "../hooks/useTaskCalls";
import { useSelector } from "react-redux";
import { closeModal } from "../features/taskSlice";
import { useDispatch } from "react-redux";
import dateTimeFormatter from "../utils/dateTimeFormatter";

const UpdateTaskModal = () => {
  const dispatch = useDispatch();
    const {updateTask} = useTaskCalls();
    const {task} = useSelector((state)=>state.task);
    const [checkData, setCheckData] = useState(task ? task.completed : false)
    const [formData, setFormData] = useState({name:null, deadline:null, completed:null});

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        updateTask({name:formData.name, deadline:formData.deadline, completed:checkData}, task._id);
        dispatch(closeModal());
    }

    useEffect(() => {
      setFormData({name:task?.name, deadline:dateTimeFormatter(task?.deadline), completed:task?.completed});
    }, [task])
    

  return (
    <form onSubmit={handleSubmit} className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10  bg-[#D9C6A7] rounded-xl p-3 w-[21rem]">
      <div className="text-end text-[#2B3440]  text-[1.2rem] font-extrabold cursor-pointer" onClick={()=>dispatch(closeModal())}>X</div>
      <div className="flex flex-col justify-center items-center gap-3">
      <section className="flex flex-col gap-3">
        <div className="flex gap-3">
      {/* <label htmlFor="name">Task</label> */}
      <input type="text" name="name" id="name" required value={formData?.name} onChange={handleChange}
      className="w-[15rem] h-[2rem] rounded ps-2"/>
      </div>
      <div className="flex gap-3">
      {/* <label htmlFor="deadline">Deadline</label> */}
      <input type="datetime-local" name="deadline" id="deadline" required value={formData?.deadline} onChange={handleChange}
      className="w-[15rem] h-[2rem] rounded ps-2"/>
      </div>
      <div className="flex justify-center gap-3">
      <input type="checkbox" name="completed" checked={checkData} onChange={()=>setCheckData(!checkData)}></input>
      <label htmlFor="completed">Task completed?</label>
      </div>
      </section>

      <button type="submit" className="btn btn-neutral">Update Task</button>
      </div>
    </form>
  )
}

export default UpdateTaskModal