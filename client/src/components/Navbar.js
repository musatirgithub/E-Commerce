import { Link } from "react-router-dom";
import useAuthCalls from "../hooks/useAuthCalls";
import { useSelector } from "react-redux";
import logo from "../pics/logo.jpg";


const Navbar = () => {
  const {currentUser} = useSelector((state)=>state.auth)
  const {logout} = useAuthCalls();
  if(currentUser){
    return (
      <nav className="flex justify-between items-center h-[4rem] px-5  bg-[#D9C6A7] text-[#0D1732] text-[0.8rem] lg:text-[1.1rem] font-semibold">
        <div className="flex items-center gap-2 lg:gap-5">
        <div>
          <Link to='/'>
          <img src={logo} alt='logo' className="w-[1.5rem] lg:w-[2.5rem]"/>
          </Link>
        </div>
        <h4>{`Welcome ${currentUser}`}</h4>
        </div>
        <div className="flex justify-evenly gap-3">
          <Link to='/change-password'>Change Password</Link>
        <h4 onClick={logout} className="cursor-pointer">Logout</h4>
        </div>
  
      </nav>
    )
  }
  return (
    <nav className="flex justify-between items-center h-[4rem] px-5  bg-[#D9C6A7] text-[#0D1732] text-[0.8rem] lg:text-[1.1rem] font-semibold">
      <div className="flex items-center gap-2 lg:gap-5">
      <div>
        <Link to='/'>
        <img src={logo} alt='logo' className="w-[1.5rem] lg:w-[2.5rem]"/>
        </Link>
      </div>
      <h4>Welcome visitor</h4>
      </div>
      <div className="flex justify-evenly gap-3">
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
      </div>

    </nav>
  )
}

export default Navbar