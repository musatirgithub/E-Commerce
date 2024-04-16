import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="min-h-[calc(100vh-8rem)]">
      <div>
        <Link to="/create-product">Create New Product</Link>
      </div>
      <div>Product List</div>
      <div>Order List</div>
    </main>
  );
};

export default Dashboard;
