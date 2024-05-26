import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Seller = () => {


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
    
console.log(properties);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const token = JSON.parse(localStorage.getItem('Profile'));
    const checkAuthenticationAndFetchProfile = () => {
        
        console.log(token);
        if (token) {
            axios.get('http://localhost:5000/verifyToken', {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            }).then(response => {
                // If token is valid, set isLoggedIn to true
                setIsLoggedIn(true);
                // Fetch profile data
                axios
          .get("http://localhost:5000/singleUser", {
            headers: { Authorization: `Bearer ${token.token}` },
          })

                  .then(response => {
                      // Set profile data in state
                      setProfileData(response.data);
                  }).catch(error => {
                      console.error("Error fetching profile data:", error);
                  });
            }).catch(error => {
                // If token is invalid, log out user and remove token from local storage
                setIsLoggedIn(false);
                localStorage.removeItem('Profile');
                localStorage.removeItem('UserDetails');
                // Clear profile data
                setProfileData(null);
            });
        } else {  
            // If no token found, set isLoggedIn to false and clear profile data
            setIsLoggedIn(false);
            setProfileData(null);
        }
    };

    console.log(profileData)

    

    useEffect(() => {
        
        checkAuthenticationAndFetchProfile();
    }, []);

    

    const fetchProperties = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/property/${userId}`, {
                headers: { Authorization: `Bearer ${token.token}` }
            });
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    
    

    const userId= profileData?.id;
      
    const handleSubmit = async (e) => {
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

    fetchProperties(profileData?.id);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Post Property</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <input type="text" name="propertyName" placeholder="Property Name" onChange={(e) => { setPropertyName(e.target.value) }} className="p-2 border rounded" />
                <input type="text" name="description" placeholder="Description" onChange={(e) => { setPropertyDescription(e.target.value) } }className="p-2 border rounded"/>
                <input type="text" name="location" placeholder="Location" onChange={(e) => { setPropertyLocation(e.target.value) }} className="p-2 border rounded" />
                <input type="number" name="area" placeholder="Area (Square footage)" onChange={(e) => { setPropertyArea(e.target.value) }} className="p-2 border rounded" />
                <input type="number" name="bedrooms" placeholder="Number of Bedrooms" onChange={(e) => {setPropertyBedRooms(e.target.value) }} className="p-2 border rounded" />
                <input type="number" name="bathrooms" placeholder="Number of Bathrooms" onChange={(e) => { setPropertyBathRooms(e.target.value) }} className="p-2 border rounded" />
                <input type="text" name="amenities" placeholder="Nearby Amenities" onChange={(e) => {setPropertyNearby(e.target.value) }} className="p-2 border rounded" />
                <input type="number" name="price" placeholder="Price" onChange={(e) => { setPropertyPrice(e.target.value) }} className="p-2 border rounded" />
                <select name="propertyType" onChange={(e) => { setPropertyType(e.target.value) }} className="p-2 border rounded">
                    <option value="">Property Type</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Apartment">Land</option>
                </select>
                
                <button type="submit" className="p-2 bg-blue-500 items-center justify-center text-white rounded">Post Property</button>
            </form>

            <h2 className="text-2xl font-bold mt-6 mb-4">Posted Properties</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {properties.map(property => (
                    <div key={property.id} className="p-4 border rounded">
                        <h3 className="text-xl font-bold">{property.name}</h3>
                        <p>{property.description}</p>
                        <p>{property.location}</p>
                        <p>{property.area} sq ft</p>
                        <p>{property.bedrooms} Bedrooms</p>
                        <p>{property.bathrooms} Bathrooms</p>
                        <p>Amenities: {property.nearby}</p>
                        <p>${property.price}</p>
                        <p>Type: {property.type}</p>
                        
                        <button   className="p-2 bg-yellow-500 text-white rounded mt-2">Update</button>
                        <button onClick={handleDelete}  className="p-2 bg-red-500 text-white rounded mt-2">Delete</button>
                    
                        {/* <button onClick={() => handleUpdate(property.id)} className="p-2 bg-yellow-500 text-white rounded mt-2">Update</button>
                        <button onClick={() => handleDelete(property.id)} className="p-2 bg-red-500 text-white rounded mt-2">Delete</button>
                     */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Seller;
