import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import img1 from '../../assets/11.png';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/property/${id}`);
        setProperty(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleBookNow = async () => {
    console.log("Booking Now","Booking now,",id,property.userID)  
    try {
      const response = await axios.post('https://rentify-vd6k.onrender.com/send-message', {
        propertyId: id,
        userId: property.userID, // Assuming the property object has a userId field
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error sending booking message:', error);
      alert('Failed to send booking message');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 md:p-8 pt-16">
      {property ? (
        <div className="max-w-4xl mx-auto mt-20 bg-slate-100 border border-black/20 shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full h-full md:w-1/2 md:mb-0">
                <img className="w-full h-full rounded" src={img1} alt="Property" />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <h2 className="text-2xl font-bold text-gray-900">{property.name}</h2>
                <p className="text-gray-700">{property.description}</p>
                <div className="mt-4">
                  <p className="text-gray-700"><strong>Location:</strong> {property.location}</p>
                  <p className="text-gray-700"><strong>Price:</strong> ${property.price}</p>
                  <p className="text-gray-700"><strong>Area:</strong> {property.area} sq ft</p>
                  <p className="text-gray-700"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                  <p className="text-gray-700"><strong>Bathrooms:</strong> {property.bathrooms}</p>
                  <p className="text-gray-700"><strong>Nearby:</strong> {property.nearby}</p>
                  <p className="text-gray-700"><strong>Type:</strong> {property.type}</p>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <button  type='button' onClick={handleBookNow} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-800">Book Now</button>
                  <button className="text-red-500 px-4 py-2 rounded-full border border-red-500 hover:bg-white">Make Offer</button>
                </div>  
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900">More Details</h3>
                  <p className="text-gray-700">Detailed description and additional information about the property.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Property not found</p>
      )}
    </div>
  );
};

export default PropertyDetail;
