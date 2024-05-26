import React,{useState,useEffect} from "react";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
const Buyer = () =>{
    const [properties, setProperties] = useState([]);
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
            const response = await axios.get(`http://localhost:5000/Allproperty`, {
                headers: { Authorization: `Bearer ${token.token}` }
            });
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };
    fetchProperties();


    return(
        <div>
            <Navbar/>
            <h2 className="text-2xl font-bold mt-6 mb-4">All Properties</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 bg-slate-200">
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
                        
                        
                        
                    </div>
                ))}
            </div>


        </div>
    )
}
export default Buyer;