'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../components/Navbar';

const Support = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [supportUsers, setSupportUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const authToken = localStorage.getItem("OnlineAuthToken");
      if (!authToken) {
          router.push("/login");
      }
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const fetchSupportUsers = async () => {
    setLoading(true);
    try {
        // Fetch support users from the API
        const supportResponse = await axios.get('https://token-backend-beta.vercel.app/api/support/support-users');
        setSupportUsers(supportResponse.data);
    } catch (error) {
        console.error('Error fetching support users:', error);
        setErrorMessage('Error fetching support users');
        setErrorModalOpen(true);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchSupportUsers();
}, []);

const handleDelete = async (username) => {
    try {
        const response = await axios.delete(`https://token-backend-beta.vercel.app/api/support/support-user/${username}`);
        if (response.status === 200) {
            // Remove the deleted user from the state
            setSupportUsers(supportUsers.filter(user => user.username !== username));
            alert('Support user successfully deleted');
        }
    } catch (error) {
        console.error('Error deleting support user:', error);
        alert('Error deleting support user');
    }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect data from the form state
    const { username, password } = formData;

    try {
      // Make the POST request to the /barSetup API
      const response = await axios.post('https://token-backend-beta.vercel.app/api/support/support-setup', { username, password });

      if (response.status === 201) {
        alert(response.data.message); // Success message
        // Clear the form
        setFormData({
          username: '',
          password: '',
        });
      } else {
        alert(response.data.message); // Error message from the server
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Something Went Wrong!');
    }
  };
 
  return (
    <>
    <Navbar/>
    <div className="font-[sans-serif] bg-white max-w-4xl mx-auto p-4">
      <div className="flex justify-center items-center h-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
      <form className="w-full max-w-lg py-6 px-1">
  <div className="flex justify-center mb-6">
    {/* Add your logo here */}
    <div className="lg:w-44 text-center">
      <Image src="/ab.png" alt="logo" height={100} width={100} />
    </div>
  </div>
  <div className="mb-6">
             <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
           </div>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm font-semibold mb-2 block">Username</label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  value={formData.username}  
                  onChange={handleInputChange}  
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-2 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm font-semibold mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={formData.password} 
                  onChange={handleInputChange}  
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    d="M0 0h24v24H0z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M17 8V6c0-2.757-2.243-5-5-5S7 3.243 7 6v2H5v14h14V8h-2zm-2 0H9V6c0-1.654 1.346-3 3-3s3 1.346 3 3v2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex space-x-4">
            <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white text-sm font-bold uppercase rounded-md flex-1 py-2.5 hover:bg-blue-600 transition duration-300"
      >
        Sign Up
      </button>
</div>
          </div>
        </form>
      </div>
      {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-auto max-h-full">
                    <table className="min-w-full border-gray-300">
                    <thead className="text-base bg-zinc-100 text-yellow-700 border">
    <tr>
        <th className="p-2 text-left text-gray lg:pl-30 pl-4">SR No.</th>
        <th className="p-2 text-left text-gray lg:pl-30">Username</th>
        <th className="p-2 text-left text-gray lg:pl-30 pl-4">Password</th>
        <th className="p-2 text-left text-gray lg:pl-30 pl-4">Actions</th>
    </tr>
</thead>
<tbody className="text-md font-sans font-semibold text-sm">
                    {supportUsers.map((user, index) => (
                        <tr key={user._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                            <td className="p-1 text-left text-gray lg:pl-30 pl-4">{index + 1}</td>
                            <td className="p-1 text-left text-gray lg:pl-30 pl-4">{user.username}</td>
                            <td className="p-1 text-left text-gray lg:pl-30 pl-2">{user.password}</td>
                            <td className="p-1 text-left text-gray lg:pl-30 pl-8">
                            <button
                    className="text-red-600 focus:outline-none font-sans font-medium p-1 rounded-full px-2 text-sm shadow-md"
                    style={{ background: "#ffff" }}
                    onClick={() => handleDelete(user.username)}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
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

export default Support;