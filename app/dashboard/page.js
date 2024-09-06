"use client";
import { useRouter } from "next/navigation";
import {
  faLayerGroup,
  faObjectGroup,
  faBellConcierge,
  faEye,
  faEyeSlash,
  faReceipt,
  faListUl,
  faTableCellsLarge,
  faTableList,
  faSignOutAlt,
  faFileLines,
  faUsersCog,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("OnlineAuthToken");
    if (!authToken) {
      router.push("/login");
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("OnlineAuthToken");
    router.push("/login");
  };


  return (
    <>
    <Navbar/>
      <div>
        <section className="text-gray-600 body-font m-5 p-5 font-sans relative">
          <div className="flex items-center justify-end mb-5 mt-5">
           
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center  md:fixed lg:fixed fixed ml-3 ">
           

            <div className="lg:ml-10">
              {/*  */}

              <div className="sm:w-1/2">
                <div className=" px-5 py-20 mx-auto ">
                  <div className="mx-auto">
                    <div className="lg:flex">
                     
                        <>
                          <div className="sm:w-1/2 md:w-full sm:h-1/2 p-4 md:ml-10 lg:mr-4">
                            <Link href="/listCompany">
                              <div className="relative h-32 rounded-md overflow-hidden bg-gray-100 border-2 flex flex-col items-center justify-center text-center lg:w-56 md:w-48 w-48">
                                <div className="bg-violet-200 p-3.5 px-5 rounded-full border-2">
                                  <FontAwesomeIcon
                                    icon={faBellConcierge}
                                    size="2xl"
                                    color="blue"
                                  />
                                </div>
                                <div className="mt-4">
                                  <h3 className="text-gray-900 font-semibold mb-1 text-base">
                                    Hotel Master
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="sm:w-1/2 md:w-full sm:h-1/2 p-4 md:ml-10">
                            <Link href="/list">
                              <div className="relative h-32 rounded-md overflow-hidden bg-gray-100 border-2 flex flex-col items-center justify-center text-center lg:w-56 md:w-48 w-48">
                                <div className="bg-violet-200 p-3 px-6 rounded-full border-2">
                                  <FontAwesomeIcon
                                    icon={faFileLines}
                                    size="2xl"
                                    color="blue"
                                  />
                                </div>
                                <div className="mt-4">
                                  <h3 className="text-gray-900 font-semibold mb-1 text-base">
                                    Hotel List
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="sm:w-1/2 md:w-full sm:h-1/2 p-4 md:ml-10">
                            <Link href="/support">
                              <div className="relative h-32 rounded-md overflow-hidden bg-gray-100 border-2 flex flex-col items-center justify-center text-center lg:w-56 md:w-48 w-48">
                                <div className="bg-violet-200 p-3 px-6 rounded-full border-2">
                                  <FontAwesomeIcon
                                    icon={faUsersCog}
                                    size="2xl"
                                    color="blue"
                                  />
                                </div>
                                <div className="mt-4">
                                  <h3 className="text-gray-900 font-semibold mb-1 text-base">
                                    Technical Support Login
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="sm:w-1/2 md:w-full sm:h-1/2 p-4 md:ml-10">
                            <Link href="/userForm">
                              <div className="relative h-32 rounded-md overflow-hidden bg-gray-100 border-2 flex flex-col items-center justify-center text-center lg:w-56 md:w-48 w-48">
                                <div className="bg-violet-200 p-3 px-6 rounded-full border-2">
                                  <FontAwesomeIcon
                                    icon={faMoneyCheckAlt}
                                    size="2xl"
                                    color="blue"
                                  />
                                </div>
                                <div className="mt-4">
                                  <h3 className="text-gray-900 font-semibold mb-1 text-base">
                                    User Form
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add your logout button here */}
        {/* <div className="fixed bottom-3 right-4 z-30 fony-sans">
          <button
            onClick={handleLogout}
            className="bg-red-100 hover:bg-red-200 text-red-600 py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-red font-bold"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            LogOut
          </button>
        </div> */}
      </div>
    </>
  );
};
export default Dashboard;
