import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from './page/Home/Home'
import Auth from './page/Auth/Auth'
import Buyer from "./page/Buyer/Buyer";
import Profile from "./page/Profile/Profile";
import PropertyDetail from "./page/propertyDetails/propertyDetails";
const AllRoutes= ()=>{
    return(
        <Routes>
            
            <Route exact path='/seller-dashboard' element={<Home/>}/>
            <Route exact path='/' element={<Buyer/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route path="/property/:id" element={<PropertyDetail />} />
            
        </Routes>
    )
}
export default AllRoutes;
