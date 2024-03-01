import Login from './login';
import { useState } from 'react';
import Signup from './signup';
import Home from './Home'
import Main_Page from './main_page';
import {Route,Routes} from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route  path="/login" element={<Login/>} > 
        </Route>
        <Route  path="/signup" element={<Signup/>} > 
        </Route>
        <Route  path="/main" element={<Main_Page/>} > 
        </Route>
        </Routes>
    </>
  )
}

export default App
