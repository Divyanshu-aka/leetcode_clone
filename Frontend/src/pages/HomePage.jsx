import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Loader, Code, Brain, Search, Filter } from "lucide-react";
import ProblemTable from "../components/ProblemTable";
import { BackgroundElements } from "../components/Background";

const HomePage = () => {
    const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

    useEffect(() => {
        getAllProblems();
    }, [getAllProblems]);

    if (isProblemsLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <div className="fixed z-0 inset-0 overflow-hidden">
                    <BackgroundElements
                        elements={['grid']}
                        intensity="low"
                    />
                </div>

                <div className="z-10 flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <Loader className="h-8 w-8 text-primary animate-spin" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Loading problems...</h2>
                    <p className="text-gray-500 mt-2 text-center">Please wait while we fetch the coding challenges</p>

                    {/* Loading indicator */}
                    <div className="w-full mt-6">
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center w-full relative overflow-hidden bg-white text-black">
            {/* Background elements */}
            <div className="fixed z-0 inset-0 overflow-hidden">
                <BackgroundElements
                    elements={['grid', 'code', 'shapes', 'icons']}
                    intensity="low"
                />
            </div>

            {/* Header Section */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 z-10 relative">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl mb-4">
                        <Code className="w-6 h-6 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">Coding Problems</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold z-10">
                        Welcome to <span className="text-primary">LeetLab</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        A platform inspired by Leetcode to help you prepare for coding interviews
                        and improve your coding skills through practice
                    </p>
                    <div className="flex flex-row gap-4 mt-6 justify-center">
                        <div className="flex items-center justify-center bg-indigo-100 px-4 py-2 rounded-lg">
                            <Brain className="h-5 w-5 text-indigo-600 mr-2" />
                            <span className="text-sm font-medium text-indigo-800">Enhance Problem Solving</span>
                        </div>
                        <div className="flex items-center justify-center bg-purple-100 px-4 py-2 rounded-lg">
                            <Code className="h-5 w-5 text-purple-600 mr-2" />
                            <span className="text-sm font-medium text-purple-800">Master Algorithms</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full max-w-6xl mx-auto">
                    {/* Top decorative elements */}
                    <div className="flex justify-between items-center mb-4 px-2">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-sm text-gray-400 font-mono">problems.js</div>
                    </div>

                    {/* Main content card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 relative z-10 overflow-hidden">
                        {/* Decorative blurs */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-300 rounded-full opacity-20 blur-2xl"></div>
                        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>

                        {/* Content */}
                        {
                            problems.length > 0 ? <ProblemTable problems={problems} /> : (
                                <div className="py-16 flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                        <Brain className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">No problems found</h3>
                                    <p className="text-gray-500 text-center max-w-md">
                                        Looks like there are no coding problems available at the moment.
                                        Check back later or contact an administrator.
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;