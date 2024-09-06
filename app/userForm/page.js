
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTimes, faKey } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

const User = () => {
    const [companies, setCompanies] = useState([]);
    const [jwtToken, setJwtToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [newCompany, setNewCompany] = useState('');
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [mobile, setMobile] = useState('');
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [keyModalOpen, setKeyModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCompanyKey, setSelectedCompanyKey] = useState(''); // New state for the key

    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem("OnlineAuthToken");
        if (!authToken) {
            router.push("/login");
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // API call to list all registered tokens with remaining days
                const companyResponse = await axios.get('https://token-backend-beta.vercel.app/api/token/listTokens');

                // Set the data to the state
                setCompanies(companyResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this useEffect runs once on component mount


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // First, deactivate the existing token if it exists
            const deactivateResponse = await axios.patch('https://token-backend-beta.vercel.app/api/token/deactivateTokenByMobileAndToken', {
                mobileNumber: mobile,
                jwtToken: jwtToken,
            });
    
            if (deactivateResponse.data.message) {
                console.log('Token deactivated:', deactivateResponse.data.message);
            }
    
    
            
                // Add the new company to the list
                setCompanies([...companies, { name: newCompany, mobile }]);
                setNewCompany('');
                setMobile('');
                setJwtToken(''); // Update the token in the state
    
                setIsSuccessPopupOpen(true);

                // Close the error modal after 2 seconds
            setTimeout(() => {
                setIsSuccessPopupOpen(false);
            }, 2000);
    
        } catch (error) {
            console.error('Error submitting form:', error.message);
    
    
            setErrorModalOpen(true);
    
            // Close the error modal after 2 seconds
            setTimeout(() => {
                setErrorModalOpen(false);
            }, 2000);
        }
    };

    return (
      <>
      <Navbar/>
        <div className="max-w-5xl mx-auto bg-white p-4 rounded-lg shadow-md mt-12 lg:mt-28 font-sans">
            <h1 className="text-xl font-bold font-sans md:mb-0 text-orange-500">User Validate Key</h1>
            <form onSubmit={handleSubmit} className="mb-4">
  <div className="flex justify-between space-x-4 mb-4 mt-4">
  <div className="w-1/2">
    <label htmlFor="newCompany" className="block text-sm font-bold text-gray-600">
       Hotel Name
    </label>
    <input
      type="text"
      id="newCompany"
      name="newCompany"
      value={newCompany}
      onChange={(e) => setNewCompany(e.target.value)}
      className="mt-1 p-1 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
      required
    />
  </div>

  <div className="w-1/2">
    <label htmlFor="mobile" className="block text-sm font-bold text-gray-600">
      Mobile No.
    </label>
    <input
      type="text"
      id="mobile"
      name="mobile"
      value={mobile}
      onChange={(e) => setMobile(e.target.value)}
      className="mt-1 p-1 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
      required
    />
  </div>
</div>
<div className="flex justify-between space-x-4 mb-4 mt-4">
  <div className="w-1/2">
    <label htmlFor="jwtToken" className="block text-sm font-bold text-gray-600">
      JWT Token
    </label>
    <input
      type="text"
      id="jwtToken"
      name="jwtToken"
      value={jwtToken}
      onChange={(e) => setJwtToken(e.target.value)}
      className="mt-1 p-1 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
    />
  </div>
</div>
    <div className="col-span-2 flex justify-center mt-1">
      <button
        type="submit"
        className="bg-orange-100 text-orange-600 hover:bg-orange-200 text-gray font-semibold p-2 px-4 rounded-full lg:w-60 mx-auto"
      >
        Validate
      </button>
    </div>
  </form>

  {isSuccessPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="relative z-50 bg-white p-6 rounded-md shadow-lg">
                        <h4 className="text-xl font-bold mb-4 text-green-600">Subscription Added Successfully!</h4>
                       
                    </div>
                </div>
            )}

            {errorModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="relative z-50 bg-white p-6 rounded-md shadow-lg text-center">
                        <p className="text-red-600 mb-6">{errorMessage}</p>
                    </div>
                </div>
            )}           



           
        </div>
        </>
    );
};

export default User;