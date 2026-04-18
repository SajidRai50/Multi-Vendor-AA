import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage ,SignupPage,ActivationPage} from './Routes.js'
export const App = () => {
  return (

    <BrowserRouter>
    <Routes>
      <Route path ='/login' element= {<LoginPage/>}/>
      <Route path ='/sign-up' element= {<SignupPage/>}/>
      <Route path ='/activation/:token' element= {<ActivationPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

