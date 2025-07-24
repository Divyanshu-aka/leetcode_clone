import React from "react"
import { User, Code, LogOut, ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import react from "../assets/react.svg";
import logo from "../assets/logo.png";



const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { authUser } = useAuthStore();
    const location = useLocation();

    // Check if current page is profile page
    const isProfilePage = location.pathname === '/profile';
    const isLandingPage = location.pathname === '/';

    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 80, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        // Use a debounced handler to smooth out transitions
        let timeoutId;

        const handleScroll = () => {
            // Clear existing timeout
            clearTimeout(timeoutId);

            // Set a small delay before updating the state to avoid rapid changes
            timeoutId = setTimeout(() => {
                const isScrolled = window.scrollY > 20;
                if (isScrolled !== scrolled) {
                    setScrolled(isScrolled);
                }

                // Calculate scroll progress percentage (for additional animations if needed)
                const scrollTop = window.scrollY;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = scrollTop / scrollHeight;
                setScrollProgress(progress);
            }, 10); // Small delay to avoid jerky transitions
        };

        window.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, [scrolled]);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white text-black border-b border-gray-200 z-50 ">
            <div className="flex justify-between  h-20 w-full pr-[5%] pl-[2.5%] overflow-hidden transition-all duration-300 ease-in-out">

                {/* Logo Section */}
                <Link to={isLandingPage ? "/" : "/home"} className="flex items-center gap-3 cursor-pointer">
                    <img src={logo} className="h-22 w-44 ml-[5%]" />
                </Link>

                {location.pathname === '/' ? (

                    <ul className="flex items-center gap-2 ">
                        <li className="not-xl:hidden text-[18px] text-cyan-500 font-semibold px-6 cursor-pointer relative group">
                            Premium
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 bg-emerald-500 group-hover:w-18 group-hover:h-[1.2px] transition-all duration-200 ease-in-out"></span>
                        </li>
                        <li className="not-xl:hidden text-[18px] text-black px-6 cursor-pointer relative group">
                            Explore
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 bg-black group-hover:w-15 group-hover:h-[1.2px] transition-all duration-200 ease-in-out"></span>
                        </li>
                        <li className="not-xl:hidden text-[18px] text-black px-6 cursor-pointer relative group">
                            Product
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 bg-black group-hover:w-15 group-hover:h-[1.2px] transition-all duration-200 ease-in-out"></span>
                        </li>
                        <li className="not-xl:hidden text-[18px]  text-black px-6 cursor-pointer relative group">
                            Developer
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 bg-black group-hover:w-20 group-hover:h-[1.2px] transition-all duration-200 ease-in-out"></span>
                        </li>

                        <Link to="/login" className={`not-sm:hidden group btn shadow-none w-[100px]  h-[50px] bg-white text-black text-[18px] py-[12px] px-[21px] rounded-[8px] transition-all duration-200 ease-in-out hover:rounded-none ${scrolled ? ' ' : ''}`}>
                            <span className="flex items-center whitespace-nowrap transition-transform duration-300 group-hover:transform group-hover:-translate-x-2 gap-1">
                                <ArrowRight className="w-0 h-0 ml-0 opacity-0 group-hover:w-5 group-hover:h-5 group-hover:ml-2 group-hover:opacity-100 transition-all duration-200" />
                                Log in
                            </span>
                        </Link>

                        <Link to="/signup" className="group btn shadow-none text-white py-[12px] px-[21px] text-[18px] h-[50px] w-[200px] not-md:w-[130px] rounded-[8px] transition-all duration-200 ease-in-out hover:rounded-none overflow-hidden">
                            <span className="flex    transition-transform duration-300 group-hover:transform group-hover:-translate-x-2">
                                <div className="flex items-center truncate gap-1">
                                <ArrowRight className="w-0 h-0 ml-0 flex-shrink-0 opacity-0 group-hover:w-5 group-hover:h-5 group-hover:ml-2 group-hover:opacity-100 transition-all duration-200" />
                                    <span className="not-md:hidden">Get started for free</span>
                                    <span className="md:hidden">Get Started</span>
                                </div>
                            </span>
                        </Link>
                    </ul>

                ) : (

                    /* User Profile and Dropdown */
                    <div className="flex items-center gap-8">
                        <div className="dropdown dropdown-end ">
                            <label tabIndex={0} className={`btn btn-circle avatar flex flex-row transition-all duration-300 ease-in-out
                            ${scrolled ? 'btn-ghost' : 'btn-primary btn-outline'}`}>
                                <div className="w-10 rounded-full">
                                    <img
                                        src={
                                            authUser?.image ||
                                            react // Fallback image if user image is not available
                                        }
                                        alt="User Avatar"
                                        className="object-cover"
                                    />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3">
                                {/* Admin Option */}


                                {/* Common Options */}
                                <li>
                                    <p className="text-base font-semibold">

                                        {authUser?.name}

                                    </p>
                                    <hr className="border-gray-200/10" />
                                </li>
                                <li>
                                    <Link
                                        to="/profile"
                                        className="hover:bg-primary hover:text-white text-base font-semibold"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        My Profile
                                    </Link>
                                </li>
                                {authUser?.role === "ADMIN" && (
                                    <li>
                                        <Link
                                            to="/add-problem"
                                            className="hover:bg-primary hover:text-white text-base font-semibold"
                                        >
                                            <Code className="w-4 h-4 mr-1" />
                                            Add Problem
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <LogoutButton className="hover:bg-primary hover:text-white">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </LogoutButton>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}


export default Navbar;