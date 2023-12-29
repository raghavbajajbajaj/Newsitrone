import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, database } from '../firebase/setup'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Comments = (prop) => {

  const [comments, setComments] = useState("")
  const [newsComments, setNewsComments] = useState([]);

  const addComments = async () => {
    const newsDoc = doc(database, "News", `${prop.url.substr(-10, 10)}`)
    const commentsRef = collection(newsDoc, "Comments")
    auth.currentUser == null && toast.warning("Please login")

    try {
     auth.currentUser && await addDoc(commentsRef, {
        comments: comments,
        name :auth.currentUser.displayName ,
        profileimage : auth.currentUser.photoURL
      })
      auth.currentUser &&  toast.success("Comment added succesfully")
    } catch (err) {
      console.error(err)
    }
  }

  const showComments = async () => {
    const newsDoc = doc(database, "News", `${prop.url.substr(-10, 10)}`)
    const commentsRef = collection(newsDoc, "Comments")

    try {
      const data = await getDocs(commentsRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setNewsComments(filteredData)
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
  showComments()
  }, [newsComments])


  return (
    <div className='flex flex-col' >


      <div class="w-70 p-5 flex ">
        <div class="relative w-full min-w-[200px] h-10">
          <input onChange={(e) => setComments(e.target.value)}
            class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            placeholder="Add Comments" /><label
              class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Add Comments
          </label>

        </div>
        <button onClick={addComments} class=" ml-3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          ADD
        </button>
      </div>
      
      <div className='ml-6'>
        <div className='text-3xl'>Comments</div>
        {
          newsComments.map((data)=>{
            return<>
           <div className='flex flex-wrap'>
            <div className='flex flex-wrap'>
           <img src={data.profileimage} className='rounded-full w-6 h-6         '/>
           <h3 className='ml-2 font-bold'>{data.name}</h3>  
            </div>
            <h3 className='ml-3'>{data.comments}</h3>
           </div>
            </>
          })
        }
      </div>
      <ToastContainer autoClose={3000}/>
    </div>
  )
}

export default Comments
