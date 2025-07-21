import React from "react"
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../hooks/useAuthStore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import react from "../assets/react.svg";
import vite from "../../public/vite.svg";



const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { authUser } = useAuthStore()

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

    console.log("AUTH_USER", authUser)

    return (
        <nav className="sticky top-0 z-50 px-4 py-2">
            <div className={`flex justify-between h-16 max-w-7xl mx-auto px-6 py-3 backdrop-blur-md transition-all duration-300 ease-in-out rounded-full
                ${scrolled
                    ? 'border border-gray-500/30 shadow-lg bg-base-100/80 my-2 transform translate-y-1 hover:shadow-primary/20'
                    : 'border-transparent bg-transparent'}
            `}>
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 cursor-pointer">
                    <img src={vite} className=" box-border bg-primary/20 text-primary border-none p-1 rounded-full" />
                    <span className={`font-bold ${scrolled ? 'text-primary' : 'text-white'}`}>
                        Leetlab
                    </span>
                </Link>

                {/* User Profile and Dropdown */}
                <div className="flex items-center gap-8">
                    <div className="dropdown dropdown-end">
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
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
                        >
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
            </div>
        </nav>
    )
}


export default Navbar;