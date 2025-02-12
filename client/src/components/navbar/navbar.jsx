import React,{useState,useEffect} from "react";
import axios from "axios";
import { UserButton,SignInButton,SignOutButton,useClerk } from "@clerk/clerk-react";
const Navbar = () =>{

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const {user}=useClerk();
    console.log(user);
  return(
      <nav class="fixed z-10 w-screen bg-white border-gray-200 dark:bg-gray-900/65 backdrop-blur-[7px]">
        <div class=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Rentify</span>
        </a>
        <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        {user ? (
          <>
          <UserButton />
          <p  className="pl-4 text-white cursor-pointer md:hover:text-blue-500">
            {user.fullName}
          </p>
          
        </>
      ) : (
        <SignInButton  className="text-white  md:hover:text-blue-500"/>
      )}


            
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   ">
            <li>
              <a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/#about" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="/seller-dashboard" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-90 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sell Now </a>
            </li>
            <li>
              <a href="/profile" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</a>
            </li>
            <li>
              <a href="/#contact" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div>
        </div>
      </nav>

          )
      }

export default Navbar;


