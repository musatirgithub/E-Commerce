import { useSelector } from "react-redux";
import {useEffect, useState} from "react";
import useTaskCalls from "../hooks/useTaskCalls";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { openModal } from "../features/taskSlice";
import dateTimeConverter from "../utils/dateTimeConverter";
import remainingDays from "../utils/remainingDays";

const TaskList = () => {
    const dispatch = useDispatch();
    const {tasks} = useSelector((state)=>state.task);

    const [loading, setLoading] = useState(true)
    const {getTasks, deleteTask, getTask} = useTaskCalls();
  
    useEffect(() => {
        setLoading(true);
            getTasks();
        setLoading(false);
    }, [])

    const handleClick = (id)=>{
        getTask(id);
        dispatch(openModal());
    }
    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    if(tasks && tasks.length === 0){
        return <section className="text-center pt-5 text-[#EEEDE8]">No tasks to show...</section>
    }
  return (
    
    <div className="1 text-[#EEEDE8]">
        {/* <h3 className="text-center text-2xl">Tasks</h3> */}
        <section className="flex justify-center items-center">
        <table>
            <thead>
        <tr className="lg:w-[64rem]">
            <th className="w-[14rem] lg:w-[35rem] text-center">Task</th>
            <th className="w-[3rem] lg:w-[19rem] text-center">Dline</th>
            <th className="w-[2.5rem] lg:w-[5rem] text-center">Edit</th>
            <th className="w-[2.5rem] lg:w-[5rem] text-center">Del</th>
        </tr>
        </thead>
       <tbody> 
        {tasks?.map((task, index)=>{
            const remainder = remainingDays(task.deadline)
            return(
                <tr key={index} className={`${task.completed ? "lg:w-[64rem] even:bg-[#252E46] line-through":"lg:w-[64rem] even:bg-[#252E46]"}`}>
                    <td className="flex items-center w-[14rem] lg:w-[35rem]">
                        <div className="w-[1.5rem]">
                    {remainder ? <IoWarning color={remainder} className="w-[1.1rem]"/> : <div className="w-[1.1rem]"></div>}
                    </div>
                    <h4 className="w-[33.5rem] line-clamp-2 lg:line-clamp-1">{task.name}</h4>
                    </td>
                    <td className="w-[3rem] lg:w-[19rem] text-center">{dateTimeConverter(new Date(task.deadline))}</td>
                    <td className="w-[2.5rem] lg:w-[5rem]"><FaPencilAlt onClick={()=>handleClick(task._id)} className="cursor-pointer w-[1.5rem] mx-auto text-blue-700"/></td>
                    <td className="w-[2.5rem] lg:w-[5rem]"><FaRegTrashCan onClick={()=>deleteTask(task._id)} className="cursor-pointer w-[1.5rem] mx-auto text-red-700"/></td>
                </tr>
            )
        })}
        </tbody>
        </table>
        </section>
    </div>
    
  )
}

export default TaskList