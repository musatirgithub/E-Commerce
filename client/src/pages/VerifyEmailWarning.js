// import { Link } from "react-router-dom"

const VerifyEmailWarning = () => {
  return (
    <main className="max-w-xl mx-auto p-5 min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center gap-5">
        <h3 className="text-xl ">A confirmation link has been sent to your E-mail Address.</h3>
        <h3 className="text-xl ">After confirming your E-mail Address please login.</h3>
        <h5 className="text-lg text-red-700 font-bold">Please check spam, in case you don't find the mail in inbox!</h5>
        {/* <Link to='/login'>
        <button className="btn btn-accent">Login Page</button>
        </Link> */}
    </main>
  )
}

export default VerifyEmailWarning