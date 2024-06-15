import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'react-toastify';
import { useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import house from '../../assets/house.jpg'
import Contact from '../contact/contact';

const Seller = () => {

    const {user}=useClerk();
    
    const userId= user?.id;

    const token = JSON.parse(localStorage.getItem('clerk_telemetry_throttler'));

    const [properties, setProperties] = useState([]);
    const [propertyName,setPropertyName]=useState('');
    const [propertyDescription,setPropertyDescription]=useState('');
    const [propertyLocation,setPropertyLocation]=useState('');
    const [propertyArea,setPropertyArea]=useState('');
    const [propertyBedrooms,setPropertyBedRooms]=useState('');
    const [propertyBathrooms,setPropertyBathRooms]=useState('');
    const [propertyNearby,setPropertyNearby]=useState('');
    const [propertyPrice,setPropertyPrice]=useState('');
    const [propertyType,setPropertyType]=useState('');
    
   const [isLoading,setIsloading]=useState();
    
    const fetchProperties = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/property/${userId}`, {
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
    
      
    const handleSubmit = async (e) => {
        console.log(propertyName, propertyDescription,propertyLocation,propertyArea,propertyBedrooms,propertyBathrooms,propertyNearby,propertyPrice,propertyType ,userId)
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/property', { propertyName, propertyDescription,propertyLocation,propertyArea,propertyBedrooms,propertyBathrooms,propertyNearby,propertyPrice,propertyType ,userId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Created Successfully");
        
        } catch (error) {
            console.error('Property Add Error:', error.response || error);
            toast.error("Error: " + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = (propertyId) => {
        axios.delete(`http://localhost:5000/property/${propertyId}`, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        }).then(response => {
            toast.success("Property deleted successfully");
            setProperties(properties.filter(property => property.id !== propertyId));
        }).catch(error => {
            console.error("Error deleting property:", error);
            toast.error("Error deleting property");
        });
    };

    return (
        <div className="">
        {isLoading && <p>Loading</p> }
        

        <div className='py-16 max-h-screen  bg-slate-800'>            
                <h1 class="mt-16 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Secure Your </span>Home Sale.</h1>
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        </div>
        
            
            <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        
                        <div class="mt-6 flex flex-col items-center">
                            <h1 class="text-2xl xl:text-3xl font-extrabold">
                                Sell Your Home Now !
                            </h1>
                            <div class="w-full flex-1 mt-8">
                                

                                
                            <form onSubmit={handleSubmit}>
                                <div class="mx-auto max-w-xs">
                                    <input
                                        class="w-full mt-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text" name="propertyName" placeholder="Property Name" onChange={(e) => { setPropertyName(e.target.value) }}/>
                                    <input
                                        class="w-full mt-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text" name="description" placeholder="Description" onChange={(e) => { setPropertyDescription(e.target.value) } }/>
                                    <input
                                        class="w-full mt-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text" name="location" placeholder="Location" onChange={(e) => { setPropertyLocation(e.target.value) }}/>
                                    <input
                                        class="w-full mt-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="number" name="area" placeholder="Area (Square footage)" onChange={(e) => { setPropertyArea(e.target.value) }} />
                                    <input
                                        class="w-full mt-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="number" name="bedrooms" placeholder="Number of Bedrooms" onChange={(e) => {setPropertyBedRooms(e.target.value) }} />
                                    <input
                                        class="w-full mt-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="number" name="bathrooms" placeholder="Number of Bathrooms" onChange={(e) => { setPropertyBathRooms(e.target.value) }}/>
                                    <input
                                        class="w-full mt-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text" name="amenities" placeholder="Nearby Amenities" onChange={(e) => {setPropertyNearby(e.target.value) }}/>
                                    
                                    <input
                                        class="w-full mt-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                        type="number" name="price" placeholder="Price" onChange={(e) => { setPropertyPrice(e.target.value) }} />
                                    <select name="propertyType" onChange={(e) => { setPropertyType(e.target.value) }} className="w-full mt-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ">
                                        <option value="">Property Type</option>
                                        <option value="House">House</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Apartment">Land</option>
                                    </select>
                                    {user?
                                    <button  type="submit"
                                        class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        
                                        <span class="ml-3">
                                            Sell Now
                                        </span>
                                    </button>
                                    :
                                    <p  type="submit"
                                        class="mt-5 tracking-wide font-semibold bg-indigo-300 text-gray-100 w-full py-4 rounded-lg  transition-all duration-300 ease-in-out flex items-center cursor-default justify-center focus:shadow-outline focus:outline-none">
                                        
                                        <span class="ml-3">
                                            Sign In Now
                                        </span>
                                    </p>
}
                                    <p class="mt-6 text-xs text-gray-600 text-center">
                                        I agree to abide by templatana's
                                        <a href="#" class="border-b border-gray-500 border-dotted">
                                            Terms of Service
                                        </a>
                                        and its
                                        <a href="#" class="border-b border-gray-500 border-dotted">
                                            Privacy Policy
                                        </a>
                                    </p>
                                
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div 
                    className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}>
                </div>
            </div>
                </div>
            </div>



            {user?<h2 className="text-2xl font-bold mt-6 mb-4">Posted Properties</h2>:<h2 className="text-2xl font-bold mt-6 mb-4">Sign In Now</h2>}
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {properties.map(property => (
                <div key={property.id} className="mx-16 my-10">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-400">
                    <Link to={`/property/${property.id}`}>
                        <img className="rounded-t-lg object-contain" src={house} alt="" />
                    </Link>
                    <div className="p-5">
                        <Link to={`/property/${property.id}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{property.name}</h5>
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
            
                    

        </div>
    );
};

export default Seller;
