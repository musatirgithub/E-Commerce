import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';

import PrivateRouter from "./PrivateRouter";

import ChangePassword from "../pages/ChangePassword";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/Home";
import VerifyEmail from "../pages/VerifyEmail";
import VerifyEmailWarning from "../pages/VerifyEmailWarning";
import ForgotPassword from "../pages/ForgotPassword";
import ForgotPasswordWarning from "../pages/ForgotPasswordWarning";

import Navbar from "../components/Navbar";
import Footbar from "../components/Footbar";

const AppRouter = ()=>{
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<PrivateRouter/>}>
                    <Route path="" element={<Home/>}/>
                </Route>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/user/reset-password" element={<ResetPassword/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/user/verify-email" element={<VerifyEmail/>}/>
                <Route path="/forgot-password-warning" element={<ForgotPasswordWarning/>}/>
                <Route path="/verify-email-warning" element={<VerifyEmailWarning/>}/>
                <Route path="/change-password" element={<PrivateRouter/>}>
                    <Route path="" element={<ChangePassword/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footbar/>
        </BrowserRouter>
    )
}

export default AppRouter;