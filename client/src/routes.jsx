import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from './page/Home/Home'
import Auth from './page/Auth/Auth'
import Buyer from "./page/Buyer/Buyer";

const AllRoutes= ()=>{
    return(
        <Routes>
            <Route exact path='/Login' element={<Auth/>}/>
            <Route exact path='/seller-dashboard' element={<Home/>}/>
            <Route exact path='/buyer-dashboard' element={<Buyer/>}/>
            
        </Routes>
    )
}
export default AllRoutes;