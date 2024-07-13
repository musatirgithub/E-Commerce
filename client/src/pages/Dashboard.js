import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="min-h-[calc(100vh-8rem)] flex justify-center items-center gap-2 lg:gap-8 flex-wrap">
      {/* <div className=""> */}
      <div className=" bg-red-800 text-white rounded-md p-2 w-[7rem] lg:w-[20rem] text-center">
        <Link to="/create-product">Create Product</Link>
      </div>
      <div className=" bg-red-800 text-white rounded-md p-2 w-[7rem] lg:w-[20rem] text-center">
      <Link to="/productlist-admin">Product List</Link>
      </div>
      <div className=" bg-red-800 text-white rounded-md p-2 w-[7rem] lg:w-[20rem] text-center">
        <Link to="/order-list">Order List</Link>
      </div>
      {/* </div> */}
    </main>
  );
};

export default Dashboard;
