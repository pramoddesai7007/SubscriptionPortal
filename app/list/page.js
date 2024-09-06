
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTimes, faKey } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

const List = () => {
    const [companies, setCompanies] = useState([]);
    const [token, setToken] = useState([]);
    const [jwtToken, setJwtToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [newCompany, setNewCompany] = useState('');
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
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

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const companyResponse = await axios.get('https://token-backend-beta.vercel.app/api/token/listTokens');
            setCompanies(companyResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Error fetching data');
            setErrorModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleFirst = async (_id) => {
        if (!_id) {
            console.error('Invalid company ID');
            return;
        }
        try {
            // Fetch the specific company details using the GET API
            const response = await axios.get(`https://token-backend-beta.vercel.app/api/token/getToken/${_id}`);
            const companyData = response.data;
            console.log(companyData);
    
            // Update the token for 15 days using the PATCH API
            const updateResponse = await axios.patch(`https://token-backend-beta.vercel.app/api/token/updateToken15Days/${_id}`, {
                companyName: companyData.companyName,  // Adjust if your field name is different
                mobileNumber: companyData.mobileNumber  // Adjust if your field name is different
            });
    
            console.log('Token updated:', updateResponse.data);
    
            // Fetch the updated token details
            const updatedTokenResponse = await axios.get(`https://token-backend-beta.vercel.app/api/token/getToken/${_id}`);
            const updatedTokenData = updatedTokenResponse.data;
    
            // Set the company key (JWT token) in the state
            setSelectedCompanyKey(updatedTokenData.jwtToken);
    
            // Open the modal
            setKeyModalOpen(true);
            // Refetch companies to update the list
            fetchCompanies();
        } catch (error) {
            console.error('Error updating company token:', error);
            setErrorMessage('Failed to update company key.');
            setErrorModalOpen(true);
        }
    };

    const handleSecond = async (_id) => {
        if (!_id) {
            console.error('Invalid company ID');
            return;
        }
        try {
             // Fetch the specific company details using the GET API
             const response = await axios.get(`https://token-backend-beta.vercel.app/api/token/getToken/${_id}`);
             const companyData = response.data;
             console.log(companyData);
    
            // Update the company key for 1 month using the PATCH API
            const updateResponse = await axios.patch(`https://token-backend-beta.vercel.app/api/token/updateToken30Days/${_id}`, {
                key1month: companyData.key1month, // Assuming you are updating the key1month field
                companyName: companyData.companyName,  // Adjust if your field name is different
                mobileNumber: companyData.mobileNumber  // Adjust if your field name is different
            });
    
            console.log('Key updated:', updateResponse.data);
    
             // Fetch the updated token details
             const updatedTokenResponse = await axios.get(`https://token-backend-beta.vercel.app/api/token/getToken/${_id}`);
             const updatedTokenData = updatedTokenResponse.data;

            // Set the company key (JWT token) in the state
            setSelectedCompanyKey(updatedTokenData.jwtToken);
    
            // Open the modal
            setKeyModalOpen(true);
            // Refetch companies to update the list
            fetchCompanies();
        } catch (error) {
            console.error('Error updating company key:', error);
            setErrorMessage('Failed to update company key.');
            setErrorModalOpen(true);
        }
    };

    const handleThird = async (_id) => {
        if (!_id) {
            console.error('Invalid company ID');
            return;
        }
        try {
             // Fetch the specific company details using the GET API
             const response = await axios.get(`https://token-backend-beta.vercel.app/api/token/getToken/${_id}`);
             const companyData = response.data;
             console.log(companyData);
    
            // Update the company key for 1 month using the PATCH API
            const updateResponse = await axios.patch(`https://token-backend-beta.vercel.app/api/token/updateToken365Days/${_id}`, {
                key365Days: companyData.key365Days, // Assuming you are updating the key1month field
                companyName: companyData.companyName,  // Adjust if your field name is different
                mobileNumber: companyData.mobileNumber
            });
    
            console.log('Key updated:', updateResponse.data);
    
             // Fetch the updated token details
             const updatedTokenResponse = await axios.get(`https://token-backend-beta.vercel.app/api/token/getToken/${_id}`);
             const updatedTokenData = updatedTokenResponse.data;

            // Set the company key (JWT token) in the state
            setSelectedCompanyKey(updatedTokenData.jwtToken);
    
            // Open the modal
            setKeyModalOpen(true);
            // Refetch companies to update the list
            fetchCompanies();
        } catch (error) {
            console.error('Error updating company key:', error);
            setErrorMessage('Failed to update company key.');
            setErrorModalOpen(true);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (mobile.length !== 10) {
            setErrorMessage('Mobile Number must be 10 digits!!');
            setErrorModalOpen(true); // Open error modal
            // Close error modal after 2 seconds
            setTimeout(() => {
              setErrorModalOpen(false);
            }, 2000);
            return;
          }
        try {
            // Make a request to generate a 15-day JWT token and create a company
            const response = await axios.post('https://token-backend-beta.vercel.app/api/token/createToken15Days', {
                companyName: newCompany,
                mobileNumber: mobile,
            });
    
            const newCompanyData = response.data;
    
            // Assuming the response contains the company details and token
            if (newCompanyData.token && newCompanyData.message) {
                // Add the new company to the list
                setCompanies([...companies, { name: newCompany, mobile, address }]);
                setNewCompany('');
                setMobile('');
                setAddress('');
    
                console.log('Token generated:', newCompanyData.token);

          // Set the token in the state
           setJwtToken(newCompanyData.token);
    
                setIsSuccessPopupOpen(true);

                // Refetch companies to update the list
                fetchCompanies();

                // setTimeout(() => {
                //     setIsSuccessPopupOpen(false);
                // }, 1000);
            }
    
        } catch (error) {
            console.error('Error submitting form:', error.message);
                // Check for conflict (mobile number already exists)
       
            setErrorMessage('Mobile Number already exists.');
            setErrorModalOpen(true);

             // Close the error modal after 2 seconds
        setTimeout(() => {
            setErrorModalOpen(false);
        }, 2000);
            return;
        
        }
    };

    return (
        <>
        <Navbar/>
        <div className="max-w-5xl mx-auto bg-white p-4 rounded-lg shadow-md mt-12 lg:mt-28 font-sans">
            <h1 className="text-xl font-bold font-sans md:mb-0 text-orange-500">Hotel List</h1>
              
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-auto max-h-full">
                    <table className="min-w-full border-gray-300">
                    <thead className="text-base bg-zinc-100 text-yellow-700 border">
    <tr>
        <th className="p-2 text-left text-gray lg:pl-30 pl-4">SR No.</th>
        <th className="p-2 text-left text-gray lg:pl-30">Hotel Name</th>
        <th className="p-2 text-left text-gray lg:pl-30 pl-4">Mobile</th>
        <th className="p-2 text-left text-gray lg:pl-30">Validity</th>
        <th className="p-2 text-left text-gray lg:pl-30">Days Remaining</th>
        <th className="p-2 text-left text-gray lg:pl-30">Key For 15 Days</th>
        <th className="p-2 text-left text-gray lg:pl-30">Key For 1 Month</th>
        <th className="p-2 text-left text-gray lg:pl-30">Key For 1 Year</th>
    </tr>
</thead>
<tbody className="text-md font-sans font-semibold text-sm">
                {companies.map((company, index) => (
                    <tr key={company._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="p-1 text-left text-gray lg:pl-30 pl-4">{index + 1}</td>
                        <td className="p-1 text-left text-gray lg:pl-30 pl-4">{company.companyName}</td>
                        <td className="p-1 text-left text-gray lg:pl-30 pl-2">{company.mobileNumber}</td>
                        <td className="p-1 text-left text-gray lg:pl-30 pl-2">{company.validity}</td>
                        <td className="p-1 text-left text-gray lg:pl-30 pl-2">{company.daysRemaining}</td>
                        <td className="p-1 text-left text-gray lg:pl-30 pl-8">
                            <button
                                className="text-gray-600 mr-3 focus:outline-none font-sans font-medium p-1 rounded-full px-2 text-sm shadow-md"
                                style={{ background: "#ffff" }}
                                onClick={() => handleFirst(company._id)}
                            >
                                <FontAwesomeIcon
                                    icon={faKey}
                                    color="orange"
                                    className="cursor-pointer"
                                />
                            </button>
                        </td>
            <td className="p-1 text-left text-gray lg:pl-30 pl-8">
                <button
                    className="text-gray-600 mr-3 focus:outline-none font-sans font-medium p-1 rounded-full px-2 text-sm shadow-md"
                    style={{ background: "#ffff" }}
                    onClick={() => handleSecond(company._id)}
                >
                    <FontAwesomeIcon
                        icon={faKey}
                        color="blue"
                        className="cursor-pointer"
                    />
                </button>
            </td>
            <td className="p-1 text-left text-gray lg:pl-30 pl-8">
                <button
                    className="text-gray-600 mr-3 focus:outline-none font-sans font-medium p-1 rounded-full px-2 text-sm shadow-md"
                    style={{ background: "#ffff" }}
                    onClick={() => handleThird(company._id)}
                >
                    <FontAwesomeIcon
                        icon={faKey}
                        color="red"
                        className="cursor-pointer"
                    />
                </button>
            </td>
        </tr>
    ))}
</tbody>
                    </table>
                </div>
            )}
        </div>
        </>
    );
};

export default List;