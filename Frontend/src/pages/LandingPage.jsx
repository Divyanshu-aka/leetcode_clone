import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Code, Brain, Zap, Trophy, Users, CheckCircle } from 'lucide-react'

const LandingPage = () => {
    const [scrollY, setScrollY] = useState(0)
    const heroRef = useRef(null)
    const exploreRef = useRef(null)
    const questionsRef = useRef(null)
    const developersRef = useRef(null)
    const companiesRef = useRef(null)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Smooth scroll to section
    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="bg-white text-gray-900">
            {/* Navigation */}
            <header className="py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex items-center text-2xl font-bold text-white">
                        <Code className="mr-2 text-yellow-500" />
                        <span>LeetCode</span>
                    </div>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/premium" className="text-amber-500 hover:text-amber-400">Premium</Link>
                    <Link to="/explore" className="text-gray-300 hover:text-white">Explore</Link>
                    <Link to="/products" className="text-gray-300 hover:text-white">Product</Link>
                    <Link to="/developer" className="text-gray-300 hover:text-white">Developer</Link>
                    <Link to="/login" className="text-gray-300 hover:text-white">Sign in</Link>
                </nav>
                <button className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </header>

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="py-20 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between"
            >
                <div className="lg:w-1/2 mb-12 lg:mb-0 order-2 lg:order-1">
                    <img
                        src="/images/leetcode-hero-tablet.png"
                        alt="LeetCode Dashboard"
                        className="w-full max-w-lg mx-auto transform rotate-3 shadow-2xl rounded-lg"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/600x400?text=LeetCode+Dashboard';
                        }}
                    />
                </div>

                <div className="lg:w-1/2 text-center lg:text-left order-1 lg:order-2">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        A New Way to Learn
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
                        LeetCode is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.
                    </p>
                    <Link to="/signup" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold inline-flex items-center">
                        Create Account <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>

            {/* Explore Section */}
            <section
                ref={exploreRef}
                className="py-20 px-6 md:px-12 lg:px-24 bg-gray-800"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
                                Start Exploring
                            </h2>
                            <p className="text-lg text-gray-300 mb-8 text-center md:text-left">
                                Explore is a well-organized tool that helps you get the most out of LeetCode by providing structure to guide your progress towards the next step in your programming career.
                            </p>
                            <div className="text-center md:text-left">
                                <Link to="/explore" className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center">
                                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="md:w-1/2">
                            <img
                                src="/images/leetcode-explore.png"
                                alt="LeetCode Explore"
                                className="w-full max-w-md mx-auto shadow-xl rounded-lg"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/600x400?text=LeetCode+Explore';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Questions, Community & Contests Section */}
            <section
                ref={questionsRef}
                className="py-20 px-6 md:px-12 lg:px-24 bg-gray-900"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2 order-2 md:order-1">
                            <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
                                <div className="bg-blue-500 rounded-full p-3">
                                    <span className="text-white font-bold">8800</span>
                                </div>
                                <div className="bg-green-500 rounded-full p-3">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <div className="bg-yellow-500 rounded-full p-3">
                                    <Trophy className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
                                Questions, Community & Contests
                            </h2>
                            <p className="text-lg text-gray-300 mb-8 text-center md:text-left">
                                Over 3800 questions for you to practice. Come and join one of the largest tech communities with hundreds of thousands of active users and participate in our contests to challenge yourself and earn rewards.
                            </p>
                            <div className="text-center md:text-left">
                                <Link to="/problems" className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center">
                                    View Questions <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Developer Section */}
            <section
                ref={developersRef}
                className="py-20 px-6 md:px-12 lg:px-24 bg-gray-800"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Developer</h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            We now support 14 popular coding languages. At our core, LeetCode is about developers. Our powerful development tools such as Playground help you test, debug and even write your own projects online.
                        </p>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-4 max-w-5xl mx-auto shadow-2xl">
                        <div className="flex border-b border-gray-700 mb-4">
                            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-t-md mr-1">C++</button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">Java</button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">Python</button>
                        </div>
                        <div className="bg-gray-800 rounded-md p-4 overflow-auto text-left h-64">
                            <pre className="text-gray-300 text-sm">
                                <code>
                                    {`/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
void trimLeftTrailingSpaces(string &input) {
    input.erase(input.begin(), find_if(input.begin(), input.end(), [](int ch) {
        return !isspace(ch);
    }));
}

void trimRightTrailingSpaces(string &input) {
    input.erase(find_if(input.rbegin(), input.rend(), [](int ch) {
        return !isspace(ch);
    }).base(), input.end());
}`}
                                </code>
                            </pre>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex space-x-4">
                                <Link to="/playground/linked-list" className="text-blue-500 hover:text-blue-400 text-sm">Linked List</Link>
                                <Link to="/playground/binary-tree" className="text-blue-500 hover:text-blue-400 text-sm">Binary Tree</Link>
                                <Link to="/playground/fibonacci" className="text-blue-500 hover:text-blue-400 text-sm">Fibonacci</Link>
                            </div>
                            <Link to="/playground" className="text-teal-400 hover:text-teal-300 text-sm font-semibold inline-flex items-center">
                                Create Playground <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Companies Section */}
            <section
                ref={companiesRef}
                className="py-20 px-6 md:px-12 lg:px-24 bg-gray-900"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
                                <div className="bg-amber-500 rounded-full p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                    </svg>
                                </div>
                                <div className="bg-gray-400 rounded-full p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
                                Companies & Candidates
                            </h2>
                            <p className="text-lg text-gray-300 mb-8 text-center md:text-left">
                                Not only does LeetCode prepare candidates for technical interviews, we also help companies identify top technical talent. From sponsoring contests to providing online assessments and training, we offer numerous services to businesses.
                            </p>
                            <div className="text-center md:text-left">
                                <Link to="/business" className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center">
                                    Business Opportunities <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="md:w-1/2">
                            <div className="grid grid-cols-4 gap-8 opacity-70">
                                {['facebook', 'leap-motion', 'apple', 'uber', 'adobe', 'jet', 'intel', 'amazon', 'bank-of-america', 'pinterest', 'cisco', 'stripe'].map((company, index) => (
                                    <div key={index} className="flex items-center justify-center">
                                        <div className="h-12 w-24 bg-gray-600 rounded-md"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="py-8 px-6 md:px-12 lg:px-24 bg-gray-800 text-sm text-gray-400 border-t border-gray-700">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <p>Made with ❤️ in SF</p>
                        <p className="mt-2">
                            At LeetCode, our mission is to help you improve yourself and land your dream job. We have a sizable repository of interview resources for many companies. In the past few years, our users have landed jobs at top companies around the world.
                        </p>
                    </div>

                    <div className="mt-8 md:mt-0">
                        <p>
                            If you are passionate about tackling some of the most interesting problems around, we would love to hear from you.
                        </p>
                        <div className="mt-4 text-center">
                            <Link to="/careers" className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center">
                                Join Our Team <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center">
                    <p>Copyright © 2025 LeetCode</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link to="/help" className="hover:text-white">Help Center</Link>
                        <span>|</span>
                        <Link to="/jobs" className="hover:text-white">Jobs</Link>
                        <span>|</span>
                        <Link to="/bug-bounty" className="hover:text-white">Bug Bounty</Link>
                        <span>|</span>
                        <Link to="/students" className="hover:text-white">Students</Link>
                        <span>|</span>
                        <Link to="/terms" className="hover:text-white">Terms</Link>
                        <span>|</span>
                        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
