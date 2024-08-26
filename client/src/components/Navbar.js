import { Link } from "react-router-dom";
import useAuthCalls from "../hooks/useAuthCalls";
import { useSelector } from "react-redux";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { PiUserCirclePlusFill } from "react-icons/pi";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { BsFillKeyFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../pics/logo.jpg";

const Navbar = () => {
  const { currentUser, role } = useSelector((state) => state.auth);
  const { numItemsInCart } = useSelector((state) => state.order);
  const { logout } = useAuthCalls();
  const navigate = useNavigate();

  // this part of code works when a user has logged in

  if (currentUser) {
    return (
      <nav className="flex justify-between items-center h-[4rem] px-5  bg-[#D9C6A7] text-[#0D1732] text-[0.8rem] lg:text-[1.1rem] font-semibold">
        {/* Logo and left side of the Navbar */}
        <div className="flex items-center gap-2 lg:gap-5">
          <div>
            <Link to="/">
              <img src={logo} alt="logo" className="w-[1.5rem] lg:w-[2.5rem]" />
            </Link>
          </div>
          <h4>{`Welcome ${currentUser}`}</h4>
        </div>

        {/* Right side of the Navbar */}
        <div className="flex justify-evenly gap-6">
          <div
            className="flex flex-col justify-center items-center cursor-pointer pt-1"
            onClick={() => navigate("/")}
          >
            <FaHome size={"1.5rem"} />
            <p className="text-[0.8rem]">Home</p>
          </div>
          {role === "admin" ? (
            <div
              className="flex flex-col justify-center items-center cursor-pointer pt-1"
              onClick={() => navigate("/Dashboard")}
            >
              <MdManageAccounts size={"1.5rem"} />
              <p className="text-[0.8rem]">Dashboard</p>
            </div>
          ) : null}
          <div
            className="flex flex-col justify-center items-center cursor-pointer pt-1"
            onClick={() => navigate("/change-password")}
          >
            <BsFillKeyFill size={"1.5rem"} />
            <p className="text-[0.8rem]">Change Password</p>
          </div>
          <div
            className=" relative w-[2rem] cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <div className="absolute top-0 right-0 w-[1.3rem] h-[1.3rem] bg-orange-600 rounded-full flex justify-center align-center">
              <p className="text-[0.8rem] text-center  text-white font-semibold">
                {numItemsInCart}
              </p>
            </div>
            <div className="pt-1">
              <PiShoppingCartSimpleBold size={"1.5rem"} />
              <p className="text-[0.8rem]">Cart</p>
            </div>
          </div>
          <div
            onClick={logout}
            className="flex flex-col justify-center items-center cursor-pointer pt-1"
          >
            <FiLogOut size={"1.5rem"} />
            <h4 className="text-[0.8rem]">Logout</h4>
          </div>
        </div>
      </nav>
    );
  }

  // this part of code works when an unauthenticated person visits the site

  return (
    <nav className="flex justify-between items-center h-[4rem] px-5  bg-[#D9C6A7] text-[#0D1732] text-[0.8rem] lg:text-[1.1rem] font-semibold">
      <div className="flex items-center gap-2 lg:gap-5">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="w-[1.5rem] lg:w-[2.5rem]" />
          </Link>
        </div>
        <h4>Welcome visitor</h4>
      </div>
      <div className="flex justify-evenly gap-6">
      <div
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaHome size={"1.5rem"} />
            <p className="text-[0.8rem]">Home</p>
          </div>
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => navigate("/register")}
        >
          <PiUserCirclePlusFill size={"1.5rem"} />
          <p className="text-[0.8rem]">Register</p>
        </div>
        <div className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => navigate("/login")}>
          <FiLogIn size={"1.5rem"}/>
          <p className="text-[0.8rem]">Login</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
