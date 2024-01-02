import { useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthCalls from '../hooks/useAuthCalls';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const VerifyEmail = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const {error} = useSelector((state)=>state.auth)

    const {verifyEmail} = useAuthCalls();
    const query = useQuery();
    const userInfo = {
        email:query.get("email"),
        verificationToken:query.get("token")
    }
    useEffect(() => {
        setPageLoading(true);
        setTimeout(()=>{
          verifyEmail(userInfo)
        }, 5000)
        setPageLoading(false);
    }, [])

    if(pageLoading){
        return(
          <main className='flex justify-center items-center min-h-[calc(100vh-8rem)]'>
            <div className='text-2xl capitalize'>Loading...</div>
            </main>
        )
    }
    
    // if(error){
    //   return(
    //     <main className='flex justify-center items-center min-h-[calc(100vh-8rem)]'>
    //       <div className='text-2xl capitalize'>Something went wrong...</div>
    //     </main>
    //   )
    // }
  return (
    <main className='max-w-xl mx-auto p-5 min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center gap-5'>
        <h4 className='text-center text-xl'>You are being verified.</h4>
        <h4 className='text-center text-xl'>After verification you'll be redirected to Login Page.</h4>
        {/* <Link to='/login'>
        <button className='btn btn-warning'>Login</button>
        </Link> */}
    </main>

  )
}

export default VerifyEmail