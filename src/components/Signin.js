import React from 'react'
import front from '../images/front.jpg'
import logo from '../images/logo.jpg'
import signin from './signin.css'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {googleProvider , auth} from "../firebase/setup"
import { useNavigate } from 'react-router-dom'

const Signin = () => {


   const navigate = useNavigate() ;

  const googleSignin = async()=>{
    try{
    await signInWithPopup(auth , googleProvider)
    auth.currentUser && navigate("/")
    }catch(err){
     console.log(err)
    }
  }



  return (
    <div className='grid grid-cols-2 bg-black h-screen'>
       <div className='text-center flex  justify-center items-center row flex-col'>
      <img src={logo} className='hh-13 ml-20'/>
     <h1 className='text-white text-5xl font-semibold'>Sign in </h1>
     <button onClick={googleSignin} class="mt-14 h-14 w-96  hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
     Sign in
     </button>
     <h2 className='text-blue-500 underline mt-3'> Need Some help to get in </h2>


       </div>
       <div >
        <img src={front} className='h-screen'/>
       </div>
    </div>
  )
}

export default Signin