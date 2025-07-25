import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from '../store/useAuthStore';

const LoginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    fullname: z.string().min(3, "Name must be at least 3 characters"),
    username: z.string().min(3, "Username must be at least 3 characters")
});

const AuthModal = ({ isOpen, onClose, mode: initialMode = 'login' }) => {
    const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
    const [showPassword, setShowPassword] = useState(false);
    const { login, signup, isLoggingIn, isSigninUp } = useAuthStore();

    const loginForm = useForm({
        resolver: zodResolver(LoginSchema)
    });

    const signupForm = useForm({
        resolver: zodResolver(SignUpSchema)
    });

    if (!isOpen) return null;

    const onLoginSubmit = async (data) => {
        try {
            await login(data);
            onClose();
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const onSignupSubmit = async (data) => {
        try {
            await signup(data);
            onClose();
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl h-96 overflow-hidden z-50">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Sign Up Container */}
                <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ease-in-out ${isSignUp ? 'translate-x-full opacity-100 z-20' : 'translate-x-0 opacity-0 z-10'
                    }`}>
                    <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="bg-white flex flex-col items-center justify-center h-full px-12 text-center">
                        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

                        <div className="w-full mb-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    {...signupForm.register("fullname")}
                                    className="w-full bg-gray-100 border-none py-3 px-12 rounded-none"
                                    placeholder="Name"
                                />
                            </div>
                            {signupForm.formState.errors.fullname && (
                                <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.fullname.message}</p>
                            )}
                        </div>

                        <div className="w-full mb-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    {...signupForm.register("username")}
                                    className="w-full bg-gray-100 border-none py-3 px-12 rounded-none"
                                    placeholder="Username"
                                />
                            </div>
                            {signupForm.formState.errors.username && (
                                <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.username.message}</p>
                            )}
                        </div>

                        <div className="w-full mb-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    {...signupForm.register("email")}
                                    className="w-full bg-gray-100 border-none py-3 px-12 rounded-none"
                                    placeholder="Email"
                                />
                            </div>
                            {signupForm.formState.errors.email && (
                                <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.email.message}</p>
                            )}
                        </div>

                        <div className="w-full mb-6">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...signupForm.register("password")}
                                    className="w-full bg-gray-100 border-none py-3 px-12 pr-12 rounded-none"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                            {signupForm.formState.errors.password && (
                                <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSigninUp}
                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-11 rounded-full text-xs uppercase tracking-wider transition-transform duration-200 hover:scale-95 focus:outline-none disabled:opacity-50"
                        >
                            {isSigninUp ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                                    Creating...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>
                </div>

                {/* Sign In Container */}
                <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ease-in-out z-20 ${isSignUp ? 'translate-x-full' : 'translate-x-0'
                    }`}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="bg-white flex flex-col items-center justify-center h-full px-12 text-center">
                        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

                        <div className="w-full mb-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    {...loginForm.register("email")}
                                    className="w-full bg-gray-100 border-none py-3 px-12 rounded-none"
                                    placeholder="Email"
                                />
                            </div>
                            {loginForm.formState.errors.email && (
                                <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.email.message}</p>
                            )}
                        </div>

                        <div className="w-full mb-4">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...loginForm.register("password")}
                                    className="w-full bg-gray-100 border-none py-3 px-12 pr-12 rounded-none"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                            {loginForm.formState.errors.password && (
                                <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                            )}
                        </div>

                        <a href="#" className="text-gray-600 text-sm mb-6 hover:underline">
                            Forgot your password?
                        </a>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-11 rounded-full text-xs uppercase tracking-wider transition-transform duration-200 hover:scale-95 focus:outline-none disabled:opacity-50"
                        >
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${isSignUp ? '-translate-x-full' : 'translate-x-0'
                    }`}>
                    <div className={`bg-gradient-to-r from-red-500 to-pink-500 text-white relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'
                        }`}>
                        {/* Left Overlay Panel */}
                        <div className={`absolute flex flex-col items-center justify-center px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-1/5'
                            }`}>
                            <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
                            <p className="text-sm font-light leading-5 tracking-wide mb-8">
                                To keep connected with us please login with your personal info
                            </p>
                            <button
                                onClick={() => setIsSignUp(false)}
                                className="bg-transparent border border-white text-white font-bold py-3 px-11 rounded-full text-xs uppercase tracking-wider transition-transform duration-200 hover:scale-95 focus:outline-none"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Right Overlay Panel */}
                        <div className={`absolute right-0 flex flex-col items-center justify-center px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-1/5' : 'translate-x-0'
                            }`}>
                            <h1 className="text-2xl font-bold mb-4">Hello, Friend!</h1>
                            <p className="text-sm font-light leading-5 tracking-wide mb-8">
                                Enter your personal details and start journey with us
                            </p>
                            <button
                                onClick={() => setIsSignUp(true)}
                                className="bg-transparent border border-white text-white font-bold py-3 px-11 rounded-full text-xs uppercase tracking-wider transition-transform duration-200 hover:scale-95 focus:outline-none"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
