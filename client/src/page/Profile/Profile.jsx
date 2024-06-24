import React, { useState ,useEffect}  from "react";
import { Navigate } from "react-router";
import axios from "axios";
import img1 from '../../assets/bg2.jpg'
import { useClerk } from "@clerk/clerk-react";
import { UserButton,SignInButton,SignOutButton } from "@clerk/clerk-react";
const Profile =()=>{
    const [properties,setProperties]=useState();
    const [isLoading,setIsloading]=useState();
    const {user}= useClerk();
    const userId= user?.id;

    const token = JSON.parse(localStorage.getItem('clerk_telemetry_throttler'));

    console.log(user);


    const fetchProperties = async () => {
        try {
            const response = await axios.get(`https://rentify-vd6k.onrender.com/property/${userId}`, {
                headers: { Authorization: `Bearer ${token.token}` }
            });
            setProperties(response.data);
            setIsloading(false);

        } catch (error) {
            console.error("Error fetching properties:", error);
            setIsloading(false)
            
        }
    };
    useEffect(()=>{
        fetchProperties(userId);
    })
    if (user==null){
        
          const handleBack = ()=>{
            Navigate(-1);
          }
          return(
        
            <div className=" fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-60">
                  <div className="justify-center bg-white p-16 rounded-md ">
                    <h2 className=" text-2xl font-thin  ">Log In to Continue !! </h2>
                    
                    
                    <div className="justify-center flex gap-5">
                        <SignInButton  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"/>
                      <button onClick={handleBack} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                        Close
                      </button>
        
                    </div>
                    
                  </div>
                </div>
          )
    }

    return(
        <div >
            <div className="pt-32 h-[400px] -z-10 overflow-hidden bg-cover  object-contain object-center   bg-[30%] bg-no-repeat " style={{backgroundImage:`url(${img1})`}}> 
               

                <div
                class="absolute max-w-2xl z-10 left-1/2 my-28   sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  0 bg-white shadow-xl rounded-lg text-gray-900">
                <div class="rounded-t-lg h-40 overflow-hidden ">
                    <img class="object-cover object-top w-full  "   src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                </div>
                <div class=" bg-black/70 mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    
                    <img className="   opacity-10  object-center h-36 -z-10" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                    <div className= "-mt-32 z-10   text-white justify-center items-center text-[4rem]">{user?.fullName[0]}</div>
                </div>
                <div class="text-center mt-2">
                    <h2 class="font-semibold">{user?.fullName}</h2>
                    
                </div>
               
                <div class="p-4 border-t mx-8 mt-2">
                    <button class="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Update</button>
                </div>
            </div>

            </div>
            <div className="absolute ml-40 mt-10 font-medium">
                <p className=" text-[4rem] font-extrabold text-gray-700/90">Hello <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{user.fullName}</span></p>
                <p className="text-[2rem] tracking-tight text-slate-400">Welcome Again</p>
            </div>

           
            


        </div>
    )
}
export default Profile;