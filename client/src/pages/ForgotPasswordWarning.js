// import { Link } from "react-router-dom"

const ForgotPasswordWarning = () => {
  return (
    <main className="max-w-xl mx-auto p-5 min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center gap-5">
        <h3 className="text-xl ">Reset Password link has been sent to your E-mail Address.</h3>
        <h5 className="text-lg text-red-700 font-bold">Please renew your password within 10 minutes!</h5>
        {/* <Link to='/login'>
        <button className="btn btn-accent">Login Page</button>
        </Link> */}
    </main>
  )
}

export default ForgotPasswordWarning