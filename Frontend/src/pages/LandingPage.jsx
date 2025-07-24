import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Code, Brain, Zap, Trophy, Users, CheckCircle, Play, CirclePlay, Circle, Terminal, GitBranch, Database, Hash, CornerDownRight, Heart, ExternalLink } from 'lucide-react'
import Editor from '@monaco-editor/react'
import { BackgroundElements } from '../components/Background'

const LandingPage = () => {
    // Removed scroll and mouse position state
    const heroRef = useRef(null)
    const exploreRef = useRef(null)
    const questionsRef = useRef(null)
    const developersRef = useRef(null)
    const companiesRef = useRef(null)

    // Code samples for different languages in the Developer section
    const [selectedLanguage, setSelectedLanguage] = useState('cpp')
    const codeSamples = {
        cpp: `/**
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
}`,
        java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        
        return prev;
    }
}`,
        python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        prev = None
        curr = head
        
        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp
            
        return prev`
    }

    // Smooth scroll to section
    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="bg-white text-black pt-10 w-full relative overflow-hidden">

            {/* Background elements */}
            <div className="fixed z-0 inset-0 overflow-hidden">
                <BackgroundElements
                    elements={['grid', 'code', 'shapes', 'icons', 'codeBlocks']}
                    intensity="high"
                />
            </div>

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative px-[10%] min-h-[90vh] pt-10 flex items-center"
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10 relative">
                    <div className="w-full md:w-1/2 order-2 md:order-1 animate-fade-in">
                        <h1 className="text-6xl md:text-7xl font-black mb-8 text-gray-800 leading-tight">
                            <span>Code.</span>
                            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient"> Solve.</span>
                            <span> Excel.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-xl leading-relaxed">
                            <span className='font-semibold'>CODE.exe</span> is your platform to master algorithms, ace technical interviews, and join a community of problem solvers pushing the boundaries of what's possible.
                        </p>
                        <div className="flex flex-wrap gap-5">
                            <Link to="/signup" className="inline-flex items-center px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-lg">
                                Create Account
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>

                        </div>
                    </div>

                    <div className="w-full md:w-120  order-1 md:order-2 animate-float">

                        <div className="relative">

                            <div className="absolute -top-10 -right-14 w-36 h-36 bg-magenta-500 rounded-full opacity-80 animate-pulse"></div>
                            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cyan-300 rounded-lg transform rotate-45 animate-float-slow"></div>

                            {/* Main image with code editor mockup */}
                            <div className="bg-white rounded-2xl shadow-2xl p-6 relative backdrop-blur-sm bg-opacity-90">
                                <div className="bg-gray-900 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <div className="ml-2 text-gray-400 text-sm">CODE.exe.js</div>
                                    </div>
                                    <div className="text-sm font-mono">
                                        <div className="text-green-400 mb-2">// A solution to a coding problem</div>
                                        <div><span className="text-purple-400">function</span> <span className="text-yellow-400">twoSum</span><span className="text-white">(nums, target) {"{"}</span></div>
                                        <div><span className="text-white">&nbsp;&nbsp;const map = { };</span></div>
                                        <div><span className="text-white">&nbsp;&nbsp;</span><span className="text-blue-400">for</span><span className="text-white">{" (let i = 0; i < nums.length; i++) {"}</span></div>
                                        <div><span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;const complement = target - nums[i];</span></div>
                                        <div><span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-blue-400">if</span><span className="text-white">{" (map[complement] !== undefined) {"}</span></div>
                                        <div><span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-blue-400">return</span><span className="text-white"> [map[complement], i];</span></div>
                                        <div><span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</span></div>
                                        <div><span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;map[nums[i]] = i;</span></div>
                                        <div><span className="text-white">&nbsp;&nbsp;{"}"}</span></div>
                                        <div><span className="text-white">{"}"}</span></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-purple-600">8,800+</div>
                                        <div className="text-sm text-purple-600">Problems</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-blue-600">15M+</div>
                                        <div className="text-sm text-blue-600">Users</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Section */}
            <section
                ref={exploreRef}
                className="py-20 md:py-32 px-6 z-10 bg-white/50 backdrop-blur-sm relative"
            >
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2 animate-fade-in">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
                                Start <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent animate-gradient">Exploring</span>
                            </h2>
                            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                                Explore is a well-organized tool that helps you get the most out of CODE.exe by providing structure to guide your progress towards the next step in your programming career.
                            </p>
                            <div className="mt-6">
                                <Link to="/explore" className="inline-flex items-center px-4 py-4 gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg group hover:shadow-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300  ease-in-out hover:scale-105">
                                    <span className=" group-hover ">Get Started</span>
                                    <ArrowRight className=" m-0 w-0 h-0  group-hover:w-5 group-hover:h-5  transition-all duration-200 ease-in-out" />
                                </Link>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 animate-float-slow">
                            <div className="relative">
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
                                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-green-300 rounded-lg transform rotate-45 opacity-70 animate-float"></div>

                                {/* Exploration Visual */}
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
                                    <div className="grid grid-cols-2 gap-6 mb-6">
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl text-center hover:scale-105 transition-all duration-300">
                                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Brain className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="text-sm font-semibold text-blue-700">Problem Solving</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-6 rounded-xl text-center hover:scale-105 transition-all duration-300">
                                            <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Code className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="text-sm font-semibold text-cyan-700">Code Practice</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl text-center hover:scale-105 transition-all duration-300">
                                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Zap className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="text-sm font-semibold text-green-700">Fast Learning</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-xl text-center hover:scale-105 transition-all duration-300">
                                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Trophy className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="text-sm font-semibold text-purple-700">Achievement</div>
                                        </div>
                                    </div>
                                    
                                    {/* Progress Chart Visual */}
                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-medium">Learning Progress</span>
                                            <span className="text-2xl font-bold">78%</span>
                                        </div>
                                        <div className="w-full bg-blue-400/30 rounded-full h-3">
                                            <div className="bg-white rounded-full h-3 w-3/4 flex items-center justify-end">
                                                <div className="w-4 h-4 bg-white rounded-full -mr-2 shadow-lg"></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-3 text-sm opacity-90">
                                            <span>Beginner</span>
                                            <span>Advanced</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Questions, Community & Contests Section */}
            <section
                ref={questionsRef}
                className="py-20 md:py-32 z-10 px-6 bg-gradient-to-br from-gray-50 to-indigo-50 relative"
            >
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col-reverse md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2 flex justify-center animate-fade-in">
                            <div className="grid grid-cols-2 gap-6 max-w-lg">
                                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center border border-white/50">
                                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mb-3 animate-gradient">8800+</span>
                                    <span className="text-gray-700 text-lg font-medium">Questions</span>
                                </div>
                                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center border border-white/50">
                                    <Users className="h-12 w-12 text-purple-600 mb-3" />
                                    <span className="text-gray-700 text-lg font-medium">Community</span>
                                </div>
                                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center col-span-2 border border-white/50">
                                    <Trophy className="h-12 w-12 text-yellow-500 mb-3" />
                                    <span className="text-gray-700 text-lg font-medium">Weekly Contests</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 animate-fade-in">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
                                <span className="bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent animate-gradient">Questions</span>, Community & Contests
                            </h2>
                            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                                Over 3800 questions for you to practice. Come and join one of the largest tech communities with hundreds of thousands of active users and participate in our contests to challenge yourself and earn rewards.
                            </p>
                            <div className="mt-6">
                                <Link to="/problems" className="inline-flex items-center px-4 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-lg hover:shadow-xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 ease-in-out group hover:scale-105">
                                    <span className="">View Questions</span>
                                    <ArrowRight className="ml-0 h-0 w-0 group-hover:ml-3 group-hover:h-5 group-hover:w-5 transition-all duration-200 ease-in-out" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Developer Section */}
            <section
                ref={developersRef}
                className="py-20 md:py-32 px-6 z-10 bg-white/50 backdrop-blur-sm relative"
            >
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12 animate-fade-in">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">Developer</span> Experience
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            We now support 14 popular coding languages. At our core, CODE.exe is about developers. Our powerful development tools such as Playground help you test, debug and even write your own projects online.
                        </p>
                    </div>

                    <div className="flex flex-col xl:px-24 lg:flex-row items-center justify-center gap-8 xl:gap-16 ">
                        <div className="relative w-full  lg:w-3/4 ">

                            <div className="absolute -top-6 -left-6 w-20 h-20 bg-purple-300 rounded-lg transform rotate-45 opacity-70"></div>
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-300 rounded-full opacity-70"></div>

                            <div className="flex flex-col  bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                                <div className="flex whitespace-nowrap items-center justify-between bg-gray-50 border-b border-gray-200">
                                    <div className=" px-4 pt-3 w-full">
                                        <button
                                            className={`border-1 border-gray-200 bg-white00 rounded-none  ${selectedLanguage === 'cpp' ? 'bg-white text-gray-900 shadow-sm border-t-2 border-t-indigo-600 px-6 py-3 rounded-t-lg font-medium' : 'px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200'}`}
                                            onClick={() => setSelectedLanguage('cpp')}
                                        >
                                            C++
                                        </button>
                                        <button
                                            className={`border-1 border-gray-200 bg-white00 rounded-none   ${selectedLanguage === 'java' ? 'bg-white text-gray-900 shadow-sm border-t-2 border-t-indigo-600 px-6 py-3 rounded-t-lg font-medium' : 'px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200'}`}
                                            onClick={() => setSelectedLanguage('java')}
                                        >
                                            Java
                                        </button>
                                        <button
                                            className={`border-1 border-gray-200 bg-white00 rounded-none ${selectedLanguage === 'python' ? 'bg-white text-gray-900 shadow-sm border-t-2 border-t-indigo-600 px-6 py-3 rounded-t-lg font-medium' : 'px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200'}`}
                                            onClick={() => setSelectedLanguage('python')}
                                        >
                                            Python
                                        </button>
                                    </div>
                                    <button className="group mr-4 px-4 py-2 bg-gradient-to-r not-xs:px-2 gap-2 justify-center from-green-500 to-teal-500 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center">
                                        <CirclePlay className="h-5 w-5  transform group-hover:scale-110 transition-all duration-200" />
                                        <span className="not-xs:hidden">Run</span>
                                    </button>
                                </div>

                                <div className="rounded-b-2xl overflow-hidden" style={{ height: '400px' }}>
                                    <Editor
                                        height="100%"
                                        width="100%"
                                        language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
                                        theme="vs-light"
                                        value={codeSamples[selectedLanguage]}
                                        options={{
                                            readOnly: false,
                                            minimap: { enabled: false },
                                            scrollBeyondLastLine: false,
                                            fontSize: 14,
                                            wordWrap: 'on',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/4 flex flex-col justify-between items-center mt-8 lg:mt-0 space-y-6 animate-fade-in">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Example Problems</h3>
                            <div className="flex flex-col space-y-4 w-full">
                                <Link to="/playground/linked-list" className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-indigo-100 hover:to-blue-100">
                                    Linked List
                                </Link>
                                <Link to="/playground/binary-tree" className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-100 hover:to-indigo-100">
                                    Binary Tree
                                </Link>
                                <Link to="/playground/fibonacci" className="px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-100 hover:to-cyan-100">
                                    Fibonacci
                                </Link>
                            </div>
                            <Link to="/playground" className="inline-flex items-center px-6 py-3 mt-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                                Create Playground
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Companies Section */}
            <section
                ref={companiesRef}
                className="py-20 md:py-32 px-6 z-10 bg-gradient-to-br from-indigo-50 to-purple-50 relative"
            >
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2 animate-fade-in">
                            <div className="flex gap-8 mb-10">
                                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-2xl shadow-lg transform hover:scale-110 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                    </svg>
                                </div>
                                <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-2xl shadow-lg transform hover:scale-110 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">Companies</span> & Candidates
                            </h2>
                            <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
                                Not only does CODE.exe prepare candidates for technical interviews, we also help companies identify top technical talent. From sponsoring contests to providing online assessments and training, we offer numerous services to businesses.
                            </p>
                            <div className="mt-6">
                                <Link to="/business" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                                    Business Opportunities
                                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 mt-8 md:mt-0 animate-fade-in">
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                {['Facebook', 'Apple', 'Amazon', 'Netflix', 'Google', 'Microsoft', 'Uber', 'Adobe', 'Intel', 'Pinterest', 'Cisco', 'Stripe'].map((company, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/80 backdrop-blur-sm rounded-xl p-5 aspect-square flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all duration-300 border border-white/50"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="text-gray-700 font-medium">{company}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="py-20 bg-gray-900 z-10 text-white px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 mb-16 relative z-10">
                    <div className="animate-fade-in">
                        <div className="flex items-center mb-6">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mr-3">
                                <Code className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CODE.exe</h3>
                        </div>
                        <p className="text-indigo-400 font-medium mb-6 inline-flex items-center">
                            <Heart className="h-5 w-5 mr-2 text-pink-500 animate-pulse" fill="#EC4899" />
                            Made with love for developers
                        </p>
                        <p className="text-gray-300 max-w-lg text-lg leading-relaxed mb-8">
                            At CODE.exe, our mission is to help you improve yourself and land your dream job. We have a sizable repository of interview resources for many companies. In the past few years, our users have landed jobs at top companies around the world.
                        </p>
                        <div className="flex space-x-5">
                            <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all">
                                <div className="h-10 w-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </div>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all">
                                <div className="h-10 w-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </div>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all">
                                <div className="h-10 w-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                            If you are passionate about tackling some of the most interesting problems around, we would love to hear from you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/careers" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                                Join Our Team
                                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                            <Link to="/about" className="inline-flex items-center px-8 py-4 bg-gray-800 border border-indigo-500/30 text-white font-medium rounded-lg hover:bg-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                Learn About Us
                                <ExternalLink className="ml-3 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center relative z-10">
                    <p className="text-gray-500 mb-6 md:mb-0">
                        Copyright © {new Date().getFullYear()} CODE.exe. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                        {['Help Center', 'Jobs', 'Bug Bounty', 'Students', 'Terms', 'Privacy Policy'].map((item, index) => (
                            <Link
                                key={index}
                                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                            >
                                <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
