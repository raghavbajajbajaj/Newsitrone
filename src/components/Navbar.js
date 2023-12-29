import React from 'react'
import logo from "../images/logo.jpg"
import user from "../images/user.png"
import search from "../images/search.png"
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setup';
import { signOut } from 'firebase/auth';


const Navbar = (props) => {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }


    return (// grid grid-cols-3
        <div className=' w-full fixed grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  bg-black text-white'>
            <div className='flex items-center justify-center'>
                <img src={logo} className='h-14' />

            </div  >

            <div className='text-white flex items-center justify-center flex-wrap' >
                <button  onClick={() => props.setMenu("All")} className='hover:text-gray-500 hover:font-bold font-semibold text-sm'>Home</button>
                <button onClick={() => props.setMenu("Science")} className='hover:text-gray-500 hover:font-bold ml-7 font-semibold text-sm'>Science</button>
                <button onClick={() => props.setMenu("Sport")} className='hover:text-gray-500 hover:font-bold ml-7 font-semibold text-sm'>Sport</button>
                <button onClick={() => props.setMenu("Technologie")} className='hover:text-gray-500 hover:font-bold ml-7 font-semibold text-sm'>Tech</button>
                <button onClick={() => props.setMenu("Movies")} className='hover:text-gray-500 hover:font-bold ml-7 font-semibold text-sm'>Movies</button>
                <button onClick={() => props.setMenu("Food")} className='hover:text-gray-500 hover:font-bold ml-7 font-semibold text-sm'>Food</button>
                <button onClick={() => props.setMenu("Culture")} className='hover:text-gray-500 ml-7 hover:font-bold font-semibold text-sm'>Culture</button>

            </div>

            <div className='flex ml-20 text-white items-center justify-center flex-wrap'>
            
                <div className='flex justify-center items-center'>   <img src={search} className='h-7 m-2' />
                <input onChange={(e) => props.setSearch(e.target.value)} placeholder='search' className="bg-black "></input></div>
                
                {auth.currentUser ? <button onClick={logout} className='hover:text-blue-500 text-white flex hover:border border-white p-2 items-center ml-2 border rounded border-white'>
                    Logout
                </button> : <Link to="/signin">
                    <button className='hover:text-blue-500 text-white flex overflow-hidden hover:border border-white p-2 items-center mr-2 border rounded border-white'>
                        <img src={user} className='h-9' />
                        <div>Sign in</div>
                    </button>
                </Link>
                }

            </div>

        </div>

    )
}

export default Navbar