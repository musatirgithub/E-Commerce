import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRouter = ()=>{
    const {role} = useSelector((state)=>state.auth);
    return role === "admin" ? <Outlet /> : <Navigate to='/' />
}

export default AdminRouter;