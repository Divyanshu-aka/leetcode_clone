import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Code, Brain, Zap, Trophy, Users, CheckCircle } from 'lucide-react'

const LandingPage = () => {
    const [scrollY, setScrollY] = useState(0)
    const heroRef = useRef(null)
    const featuresRef = useRef(null)
    const statsRef = useRef(null)
    const testimonialsRef = useRef(null)

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
        <div className="min-h-screen overflow-hidden bg-gradient-to-b from-base-100 to-base-300">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8"
            >
                <div
                    className="absolute inset-0 overflow-hidden opacity-10"
                    style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                    }}
                />

                <div className="text-center max-w-4xl z-10">
                    <div
                        className="mb-6 inline-block p-2 bg-primary/10 rounded-full"
                        style={{
                            transform: `scale(${1 + scrollY * 0.0005})`,
                            opacity: 1 - scrollY * 0.001,
                            transition: 'transform 0.2s ease-out'
                        }}
                    >
                        <Code size={40} className="text-primary" />
                    </div>

                    <h1
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                        style={{
                            transform: `translateY(${scrollY * 0.2}px)`,
                            opacity: 1 - scrollY * 0.001,
                            transition: 'transform 0.2s ease-out'
                        }}
                    >
                        Master Coding Challenges with LeetLab
                    </h1>

                    <p
                        className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-base-content/70"
                        style={{
                            transform: `translateY(${scrollY * 0.1}px)`,
                            opacity: 1 - scrollY * 0.002,
                            transition: 'transform 0.2s ease-out'
                        }}
                    >
                        Elevate your coding skills with our interactive platform. Practice with real-world problems, track your progress, and join a community of developers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup" className="btn btn-primary btn-lg">
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link to="/login" className="btn btn-outline btn-lg">
                            Sign In
                        </Link>
                    </div>
                </div>

                <button
                    onClick={() => scrollToSection(featuresRef)}
                    className="absolute bottom-10 animate-bounce"
                >
                    <ChevronDown className="h-10 w-10 text-primary opacity-70" />
                </button>
            </section>

            {/* Features Section */}
            <section
                ref={featuresRef}
                className="py-20 px-4 md:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose LeetLab?</h2>
                        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                            Our platform is designed to help you excel in coding interviews and become a better programmer
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Code className="h-8 w-8" />,
                                title: "Interactive Coding Environment",
                                description: "Write, run, and test your code directly in the browser with support for multiple programming languages."
                            },
                            {
                                icon: <Brain className="h-8 w-8" />,
                                title: "Algorithm Mastery",
                                description: "Learn essential algorithms and data structures through carefully crafted problem sets."
                            },
                            {
                                icon: <Zap className="h-8 w-8" />,
                                title: "Real-time Feedback",
                                description: "Get immediate feedback on your solutions with detailed performance metrics."
                            },
                            {
                                icon: <Trophy className="h-8 w-8" />,
                                title: "Competitive Challenges",
                                description: "Participate in contests and challenges to test your skills against others."
                            },
                            {
                                icon: <Users className="h-8 w-8" />,
                                title: "Community Learning",
                                description: "Share solutions, learn from others, and grow together with our collaborative community."
                            },
                            {
                                icon: <CheckCircle className="h-8 w-8" />,
                                title: "Progress Tracking",
                                description: "Monitor your progress with detailed statistics and insights on your performance."
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="card bg-base-100 hover:shadow-lg transition-all duration-300 hover:shadow-primary/10 hover:-translate-y-2"
                            >
                                <div className="card-body">
                                    <div className="text-primary mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="card-title text-xl font-bold">{feature.title}</h3>
                                    <p className="text-base-content/70">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section with Parallax */}
            <section
                ref={statsRef}
                className="py-20 px-4 md:px-8 relative overflow-hidden"
                style={{
                    background: 'linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.05), rgba(var(--secondary-rgb), 0.05))'
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='currentColor' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E')",
                        transform: `translateY(${scrollY * 0.05}px)`
                    }}
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact</h2>
                        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                            Join thousands of developers who are already enhancing their coding skills with LeetLab
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "10K+", label: "Active Users" },
                            { number: "500+", label: "Coding Problems" },
                            { number: "50K+", label: "Solutions Submitted" },
                            { number: "95%", label: "Success Rate" }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center"
                                style={{
                                    transform: `translateY(${scrollY * 0.03}px)`,
                                    opacity: Math.min(1, (scrollY - 500) * 0.002),
                                    transition: 'transform 0.2s ease-out'
                                }}
                            >
                                <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-lg text-base-content/80">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Begin Your Coding Journey?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Start solving problems, track your progress, and join a community of passionate developers today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup" className="btn btn-lg bg-white text-primary hover:bg-white/90">
                            Create Account <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link to="/login" className="btn btn-lg btn-outline border-white text-white hover:bg-white/10">
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
