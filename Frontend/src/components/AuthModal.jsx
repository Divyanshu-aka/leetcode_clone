import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from './AuthImagePattern';

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
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[550px] overflow-hidden z-50 flex">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors z-40 bg-white/90 backdrop-blur-sm shadow-md"
                >
                    <X className="h-5 w-5 text-gray-700" />
                </button>

                {/* Left Side - AuthImagePattern */}
                <div className="hidden md:block md:w-1/3 h-full bg-slate-900">
                    <AuthImagePattern
                        title={isSignUp ? "Join our community!" : "Welcome back!"}
                        subtitle={isSignUp ? "Start your coding journey with thousands of problems and challenges." : "Continue your coding journey where you left off."}
                    />
                </div>

                {/* Right Side - Animated Forms */}
                <div className="relative w-full md:w-2/3 h-full">
                    {/* Sign Up Container */}
                    <div className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${isSignUp ? 'translate-x-full opacity-100 z-20' : 'translate-x-0 opacity-0 z-10'
                        }`}>
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="bg-white flex flex-col items-center justify-center h-full px-10 text-center">
                            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Account</h1>

                            <div className="w-full mb-4">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        {...signupForm.register("fullname")}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full p-1 transition-colors"
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
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-11 rounded-lg text-sm transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:outline-none disabled:opacity-50"
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

                            <p className="mt-6 text-gray-600 text-sm">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSignUp(false);
                                        loginForm.reset();
                                    }}
                                    className="text-blue-600 font-semibold hover:underline focus:outline-none"
                                >
                                    Sign in
                                </button>
                            </p>
                        </form>
                    </div>

                    {/* Sign In Container */}
                    <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ease-in-out z-20 ${isSignUp ? 'translate-x-full' : 'translate-x-0'
                        }`}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="bg-white flex flex-col items-center justify-center h-full px-10 text-center">
                            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sign In</h1>

                            <div className="w-full mb-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        {...loginForm.register("email")}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full p-1 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                    </button>
                                </div>
                                {loginForm.formState.errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between w-full mb-6">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoggingIn}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-11 rounded-lg text-sm transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:outline-none disabled:opacity-50"
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

                            <p className="mt-6 text-gray-600 text-sm">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSignUp(true);
                                        signupForm.reset();
                                    }}
                                    className="text-blue-600 font-semibold hover:underline focus:outline-none"
                                >
                                    Sign up now
                                </button>
                            </p>
                        </form>
                    </div>

                    {/* Overlay Container */}
                    <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${isSignUp ? '-translate-x-full' : 'translate-x-0'
                        }`}>
                        <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'
                            }`}>
                            {/* Left Overlay Panel */}
                            <div className={`absolute flex flex-col items-center justify-center px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-1/5'
                                }`}>
                                <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                                <p className="text-sm font-light leading-5 tracking-wide mb-8">
                                    Ready to continue your coding journey? Sign in to track your progress and access your saved problems
                                </p>
                                <button
                                    onClick={() => setIsSignUp(false)}
                                    className="bg-transparent border-2 border-white text-white font-semibold py-3 px-11 rounded-lg text-sm transition-all duration-200 hover:bg-white hover:bg-opacity-10 focus:outline-none"
                                >
                                    Sign In
                                </button>
                            </div>

                            {/* Right Overlay Panel */}
                            <div className={`absolute right-0 flex flex-col items-center justify-center px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-1/5' : 'translate-x-0'
                                }`}>
                                <h1 className="text-3xl font-bold mb-4">Hello, Coder!</h1>
                                <p className="text-sm font-light leading-5 tracking-wide mb-8">
                                    Join our community of developers, solve challenging problems, and track your coding progress
                                </p>
                                <button
                                    onClick={() => setIsSignUp(true)}
                                    className="bg-transparent border-2 border-white text-white font-semibold py-3 px-11 rounded-lg text-sm transition-all duration-200 hover:bg-white hover:bg-opacity-10 focus:outline-none"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
