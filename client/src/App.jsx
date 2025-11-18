import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './components/Login'
import SignUp from './components/SignUp'
import Main from './components/Main'
import AllProject from './components/AllProject'
import MostLiked from './components/MostLiked'
import MyProject from './components/MyProject'
import Upload from './components/Upload'
import Detail from './components/Detail'

const App = () => {
  return (
    <div>
<Router>
  <Routes>
    <Route path='/' element={<SignUp/>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/main' element={<Main/>} >
    <Route index element={<AllProject/>} />
    <Route path='allproject' element={<AllProject/>} />
    <Route path='mostliked' element={<MostLiked/>} />
    <Route path='myproject' element={<MyProject/>} />
    </Route>
    <Route path='/detail/:_id' element={<Detail/>} ></Route>
    <Route path='/upload' element={<Upload/>} ></Route>
    
   
  </Routes>
</Router>
    </div>
  )
}

export default App