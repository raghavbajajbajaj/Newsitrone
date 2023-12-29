import React from 'react'
import Signin from './components/Signin'
import Navbar from './components/Navbar'
import Main from './components/Main'
import {Route , Routes} from 'react-router-dom'
import Newsdetails from './components/NewsDetails'

const App = () => {
  return (
    <>
    {/* <Signin/> */}
    {/* <Navbar/> */}
 
    <Routes>
    
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/' element={<Main/>}/>
    <Route path='/details' element={<Newsdetails/>}/>
    </Routes>

    </>
  )
}

export default App