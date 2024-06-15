import React,{useState,useEffect,useRef} from "react";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import Head from "../../components/head/head";
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import house from '../../assets/house.jpg'
import bg3 from '../../assets/house.jpg'
import Contact from "../../components/contact/contact";
import Footer from "../../components/footer/footer";
const Buyer = () =>{

    const propertyRef = useRef(null);
    const {user}=useClerk();
    
    const userId= user?.id;

    const [properties,setProperties]=useState();

    const token = JSON.parse(localStorage.getItem('clerk_telemetry_throttler'));



    const fetchProperties = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Allproperty`, {
                headers: { Authorization: `Bearer ${token.token}` }
            });
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };
    
    useEffect(() => {
        fetchProperties();
      }, []);


      const scrollToSection = (sectionId) => {
        if (sectionId === 'property' && propertyRef.current) {
          propertyRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
      console.log(properties,1)
    return(
        <div>
            
            <div >
                <Head className="relative -z-0" scrollToSection={scrollToSection}/>
                
                
            </div>
            <div>
            <img src={bg3} alt="img " className="opacity-65 mt-16 h-[50vh] relative -z-10  object-cover lg:object-center object-bottom w-screen "/>
            </div>

            <div className=" -mt-[347px] bg-black/70 z-40 backdrop-blur-sm  h-[50vh]" >
                <p className="text-4xl pt-28 px-5 text-h leading-normal tracking-[0.35rem] mx-20font-normal uppercase text-white  ">Start your search today or list your property to find the perfect tenant.</p>
            </div>
            <div id="about" className="mt-20">
                <p className=" text-[3.5rem] font-extrabold text-slate-800/90 ">How can we help you?</p>
                <div className="flex mx-60 my-16 gap-20  ">
                    <div className="flex flex-col items-center text-center gap-5">
                        <img className="justify-center items-center " width="50" height="50" src="https://img.icons8.com/material/50/iphone-x.png" alt="iphone-x"/>
                        <p className="font-semibold text-[1.1rem] text-slate-800/90">An easy online renting experience for you to spend time on what really is important</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-5">
                        <img width="50" height="50" src="https://img.icons8.com/material/50/user-shield.png" alt="user-shield"/>
                        <p className="font-semibold text-[1.1rem] text-slate-800/90">We verify the properties, you spot them online</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-5">
                        <img width="50" height="50" src="https://img.icons8.com/material/50/google-images.png" alt="google-images"/>
                        <p className="font-semibold text-[1.1rem] text-slate-800/90">Honest photographs, videos and descriptions for you to make safe decisions</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-5">
                        <img width="50" height="50" src="https://img.icons8.com/material/50/smart-home-checked.png" alt="smart-home-checked"/>
                        <p className="font-semibold text-[1.1rem] text-slate-800/90">We put all our hearts in solving problems for you not to worry</p>
                    </div>

                </div>
                


            </div>
            {user ? <h2 className="text-2xl font-bold mt-6 mb-4">Posted Properties</h2> : <h2 className="text-2xl font-bold mt-6 mb-4">Sign In Now</h2>}

            <div className="flex overflow-x-auto py-4 px-10 space-x-4">
                {properties?.map(property => (
                <div key={property.id} className="min-w-[300px] px-1" >
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-400">
                    <Link to={`/property/${property.id}`}>
                        <img className="rounded-t-lg object-contain" src={house} alt="" />
                    </Link>
                        <div className="p-5">
                            <Link to={`/property/${property.id}`}>
                            <h5 className="mb-2  text-2xl font-bold tracking-tight  text-gray-900 dark:text-white">{property.name}</h5>
                            <h6 className="-mt-2 mb-2 text-sm text-gray-900 dark:text-white/70">{property.type}</h6>
                            </Link>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{property.description} is the Description. Which is located near to the {property.nearby}</p>
                            <Link to={`/property/${property.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                            </Link>
                            <p className="my-3 font-light text-gray-700 dark:text-gray-400">Buy now ${property.price}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            
            <Contact />
            <Footer />
    </div>
  );
};

export default Buyer;





// {<h2 className="text-2xl font-bold mt-6 mb-4">All Properties</h2>
// <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 bg-slate-200">
//     {properties.map(property => (
//         <div key={property.id} className="p-4 border rounded">
//             <h3 className="text-xl font-bold">{property.name}</h3>
//             <p>{property.description}</p>
//             <p>{property.location}</p>
//             <p>{property.area} sq ft</p>
//             <p>{property.bedrooms} Bedrooms</p>
//             <p>{property.bathrooms} Bathrooms</p>
//             <p>Amenities: {property.nearby}</p>
//             <p>${property.price}</p>
//             <p>Type: {property.type}</p>
            
            
            
//         </div>
//     ))}
// </div>}