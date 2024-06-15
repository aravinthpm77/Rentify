import React from "react";
import Navbar from "../../components/navbar/navbar";
import Seller from "../../components/seller/Seller";
import Contact from "../../components/contact/contact";
import Footer from "../../components/footer/footer";
const Home =()=>{
    return(
        <div>
            
            <Navbar/>
            <Seller/>
            <Contact/>
            <Footer/>
        </div>
    )
}
export default Home;