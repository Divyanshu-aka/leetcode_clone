import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import { useProblemStore } from '../hooks/useProblemStore';
import { usePlaylistStore } from '../hooks/usePlaylistStore';
import { useSubmissionStore } from '../hooks/useSubmissionStore';
import { axiosInstance } from '../lib/axios';
import { Link } from 'react-router-dom';
import {
    User,
    CalendarDays,
    Award,
    CheckCircle,
    X,
    Code,
    List,
    Folder,
    Activity,
    ChevronRight,
    ChevronDown,
    Edit2,
    Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const { authUser } = useAuthStore();
    const { getAllProblems } = useProblemStore();
    const { playlists, getAllPlaylists } = usePlaylistStore();
    const { getAllSubmissions, submissions } = useSubmissionStore();

    const [loading, setLoading] = useState(true);
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [stats, setStats] = useState({
        easy: 0,
        medium: 0,
        hard: 0,
        totalSolved: 0,
        totalSubmissions: 0,
        acceptedSubmissions: 0,
        streak: 0,
    });
    const [activeTab, setActiveTab] = useState('overview');
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [expandedPlaylist, setExpandedPlaylist] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch problems solved by user
                const solvedRes = await axiosInstance.get('/problems/get-solved-problems');
                setSolvedProblems(solvedRes.data.problems || []);

                // Fetch submissions
                await getAllSubmissions();

                // Fetch playlists
                await getAllPlaylists();

            } catch (error) {
                console.error('Error fetching profile data:', error);
                toast.error('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        if (authUser) {
            fetchData();
        }
    }, [authUser]);

    // Compute statistics once data is loaded
    useEffect(() => {
        if (solvedProblems.length > 0) {
            const easy = solvedProblems.filter(p => p.difficulty === 'EASY').length;
            const medium = solvedProblems.filter(p => p.difficulty === 'MEDIUM').length;
            const hard = solvedProblems.filter(p => p.difficulty === 'HARD').length;

            const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted').length;

            setStats({
                easy,
                medium,
                hard,
                totalSolved: solvedProblems.length,
                totalSubmissions: submissions.length,
                acceptedSubmissions,
                streak: calculateStreak(submissions)
            });
        }
    }, [solvedProblems, submissions]);

    // Filter playlists for this user
    useEffect(() => {
        if (playlists.length > 0 && authUser) {
            const userPlaylistsData = playlists.filter(playlist => playlist.userId === authUser.id);
            setUserPlaylists(userPlaylistsData);
        }
    }, [playlists, authUser]);

    // Calculate streak based on daily submissions
    const calculateStreak = (submissions) => {
        if (!submissions.length) return 0;

        const dates = submissions
            .map(submission => new Date(submission.createdAt).toISOString().split('T')[0])
            .sort()
            .reverse();

        // Remove duplicates (only count one submission per day)
        const uniqueDates = [...new Set(dates)];

        if (uniqueDates.length === 0) return 0;

        // Check if there's a submission today
        const today = new Date().toISOString().split('T')[0];
        const hasSubmissionToday = uniqueDates[0] === today;

        if (!hasSubmissionToday) return 0;

        // Count consecutive days
        let streak = 1;
        for (let i = 0; i < uniqueDates.length - 1; i++) {
            const currentDate = new Date(uniqueDates[i]);
            const nextDate = new Date(uniqueDates[i + 1]);

            // Check if dates are consecutive
            const diffTime = Math.abs(currentDate - nextDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    };

    const togglePlaylistExpand = (id) => {
        if (expandedPlaylist === id) {
            setExpandedPlaylist(null);
        } else {
            setExpandedPlaylist(id);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!authUser) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4">
                <h2 className="text-2xl font-bold">Please log in to view your profile</h2>
                <Link to="/login" className="btn btn-primary">
                    Log In
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Profile Header */}
            <div className="bg-base-200 rounded-xl p-6 mb-8 shadow-md">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={authUser.image || 'https://ui-avatars.com/api/?name=' + authUser.username} alt="Profile" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-1">{authUser.fullname || authUser.username}</h2>
                                <div className="text-sm text-base-content/60 mb-2">@{authUser.username}</div>
                            </div>

                            <Link to="/settings" className="btn btn-sm btn-outline gap-2">
                                <Edit2 className="w-4 h-4" />
                                Edit Profile
                            </Link>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-5 h-5 text-base-content/70" />
                                <span>Joined {new Date(authUser.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-primary" />
                                <span>{stats.streak} day streak</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-success" />
                                <span>{Math.round((stats.acceptedSubmissions / (stats.totalSubmissions || 1)) * 100)}% acceptance rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-base-100 rounded-lg p-5 shadow-md">
                    <div className="text-sm font-medium text-base-content/60">Problems Solved</div>
                    <div className="text-3xl font-bold mt-1">{stats.totalSolved}</div>
                </div>

                <div className="bg-base-100 rounded-lg p-5 shadow-md">
                    <div className="text-sm font-medium text-base-content/60">Easy</div>
                    <div className="text-3xl font-bold mt-1 text-success">{stats.easy}</div>
                </div>

                <div className="bg-base-100 rounded-lg p-5 shadow-md">
                    <div className="text-sm font-medium text-base-content/60">Medium</div>
                    <div className="text-3xl font-bold mt-1 text-warning">{stats.medium}</div>
                </div>

                <div className="bg-base-100 rounded-lg p-5 shadow-md">
                    <div className="text-sm font-medium text-base-content/60">Hard</div>
                    <div className="text-3xl font-bold mt-1 text-error">{stats.hard}</div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-base-300 mb-8">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 font-medium text-base ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-base-content/70'}`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('problems')}
                    className={`px-4 py-3 font-medium text-base ${activeTab === 'problems' ? 'border-b-2 border-primary text-primary' : 'text-base-content/70'}`}
                >
                    Solved Problems
                </button>
                <button
                    onClick={() => setActiveTab('playlists')}
                    className={`px-4 py-3 font-medium text-base ${activeTab === 'playlists' ? 'border-b-2 border-primary text-primary' : 'text-base-content/70'}`}
                >
                    Playlists
                </button>
                <button
                    onClick={() => setActiveTab('submissions')}
                    className={`px-4 py-3 font-medium text-base ${activeTab === 'submissions' ? 'border-b-2 border-primary text-primary' : 'text-base-content/70'}`}
                >
                    Submissions
                </button>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Recent Activity */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Recent Activity
                            </h3>

                            {submissions.length > 0 ? (
                                <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="table table-zebra w-full">
                                            <thead>
                                                <tr>
                                                    <th>Problem</th>
                                                    <th>Status</th>
                                                    <th>Language</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {submissions.slice(0, 5).map((submission) => (
                                                    <tr key={submission.id}>
                                                        <td>
                                                            <Link to={`/problems/${submission.problemId}`} className="font-medium hover:text-primary">
                                                                {submission.problem?.title || "Problem"}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <span className={`px-2 py-1 rounded text-xs font-medium ${submission.status === 'Accepted' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                                                                {submission.status}
                                                            </span>
                                                        </td>
                                                        <td>{submission.language}</td>
                                                        <td>{new Date(submission.createdAt).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {submissions.length > 5 && (
                                        <div className="p-4 text-center">
                                            <button
                                                onClick={() => setActiveTab('submissions')}
                                                className="btn btn-sm btn-ghost text-primary"
                                            >
                                                View all submissions
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-base-100 rounded-lg p-8 shadow-md text-center">
                                    <p className="text-base-content/70">No recent activity</p>
                                </div>
                            )}
                        </div>

                        {/* Popular Playlists */}
                        {userPlaylists.length > 0 && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Folder className="w-5 h-5" />
                                    Your Playlists
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {userPlaylists.slice(0, 4).map((playlist) => (
                                        <div key={playlist.id} className="bg-base-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                            <h4 className="font-bold">{playlist.name}</h4>
                                            <p className="text-sm text-base-content/60 mb-2">{playlist.description || 'No description'}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs">{playlist.problems?.length || 0} problems</span>
                                                <Link to={`/playlist/${playlist.id}`} className="text-primary text-sm flex items-center gap-1">
                                                    View <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {userPlaylists.length > 4 && (
                                    <div className="mt-4 text-center">
                                        <button
                                            onClick={() => setActiveTab('playlists')}
                                            className="btn btn-sm btn-ghost text-primary"
                                        >
                                            View all playlists
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Progress */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Progress
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-base-100 p-4 rounded-lg shadow-md">
                                    <div className="text-sm font-medium mb-2">Easy Problems</div>
                                    <progress
                                        className="progress progress-success w-full"
                                        value={stats.easy}
                                        max={100}
                                    ></progress>
                                    <div className="flex justify-between text-xs mt-1">
                                        <span>{stats.easy} solved</span>
                                        <span>{Math.round((stats.easy / 100) * 100)}%</span>
                                    </div>
                                </div>

                                <div className="bg-base-100 p-4 rounded-lg shadow-md">
                                    <div className="text-sm font-medium mb-2">Medium Problems</div>
                                    <progress
                                        className="progress progress-warning w-full"
                                        value={stats.medium}
                                        max={50}
                                    ></progress>
                                    <div className="flex justify-between text-xs mt-1">
                                        <span>{stats.medium} solved</span>
                                        <span>{Math.round((stats.medium / 50) * 100)}%</span>
                                    </div>
                                </div>

                                <div className="bg-base-100 p-4 rounded-lg shadow-md">
                                    <div className="text-sm font-medium mb-2">Hard Problems</div>
                                    <progress
                                        className="progress progress-error w-full"
                                        value={stats.hard}
                                        max={25}
                                    ></progress>
                                    <div className="flex justify-between text-xs mt-1">
                                        <span>{stats.hard} solved</span>
                                        <span>{Math.round((stats.hard / 25) * 100)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Solved Problems Tab */}
                {activeTab === 'problems' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Solved Problems
                            </h3>

                            <div className="flex gap-2">
                                <select className="select select-sm select-bordered">
                                    <option value="">All Difficulties</option>
                                    <option value="EASY">Easy</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HARD">Hard</option>
                                </select>

                                <select className="select select-sm select-bordered">
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>
                        </div>

                        {solvedProblems.length > 0 ? (
                            <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra w-full">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Difficulty</th>
                                                <th>Tags</th>
                                                <th>Date Solved</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {solvedProblems.map((problem) => (
                                                <tr key={problem.id}>
                                                    <td>
                                                        <Link to={`/problems/${problem.id}`} className="font-medium hover:text-primary">
                                                            {problem.title}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${problem.difficulty === 'EASY' ? 'bg-success/20 text-success' :
                                                                problem.difficulty === 'MEDIUM' ? 'bg-warning/20 text-warning' :
                                                                    'bg-error/20 text-error'
                                                            }`}>
                                                            {problem.difficulty}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="flex flex-wrap gap-1">
                                                            {problem.tags.slice(0, 2).map((tag, i) => (
                                                                <span key={i} className="badge badge-ghost badge-sm">{tag}</span>
                                                            ))}
                                                            {problem.tags.length > 2 && (
                                                                <span className="badge badge-ghost badge-sm">+{problem.tags.length - 2}</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>{new Date(problem.solvedAt || problem.createdAt).toLocaleDateString()}</td>
                                                    <td>
                                                        <Link to={`/problems/${problem.id}`} className="btn btn-xs btn-ghost">
                                                            <Code className="w-3 h-3 mr-1" />
                                                            Solve Again
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-base-100 rounded-lg p-8 shadow-md text-center">
                                <p className="text-base-content/70">You haven't solved any problems yet</p>
                                <Link to="/" className="btn btn-primary btn-sm mt-4">
                                    Start Solving
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Playlists Tab */}
                {activeTab === 'playlists' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Folder className="w-5 h-5" />
                                Your Playlists
                            </h3>

                            <Link to="/create-playlist" className="btn btn-sm btn-primary">
                                Create Playlist
                            </Link>
                        </div>

                        {userPlaylists.length > 0 ? (
                            <div className="space-y-4">
                                {userPlaylists.map((playlist) => (
                                    <div key={playlist.id} className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                                        <div
                                            className="p-4 flex justify-between items-center cursor-pointer hover:bg-base-200"
                                            onClick={() => togglePlaylistExpand(playlist.id)}
                                        >
                                            <div className="flex-1">
                                                <h4 className="font-bold">{playlist.name}</h4>
                                                <p className="text-sm text-base-content/60">{playlist.description || 'No description'}</p>
                                                <div className="text-xs mt-1">
                                                    {playlist.problems?.length || 0} problems
                                                </div>
                                            </div>
                                            <div>
                                                {expandedPlaylist === playlist.id ? (
                                                    <ChevronDown className="w-5 h-5" />
                                                ) : (
                                                    <ChevronRight className="w-5 h-5" />
                                                )}
                                            </div>
                                        </div>

                                        {expandedPlaylist === playlist.id && playlist.problems && playlist.problems.length > 0 && (
                                            <div className="border-t border-base-300">
                                                <div className="overflow-x-auto">
                                                    <table className="table table-zebra w-full">
                                                        <thead>
                                                            <tr>
                                                                <th>Problem</th>
                                                                <th>Difficulty</th>
                                                                <th>Status</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {playlist.problems.map((problem) => (
                                                                <tr key={problem.id}>
                                                                    <td>
                                                                        <Link to={`/problems/${problem.id}`} className="font-medium hover:text-primary">
                                                                            {problem.title}
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${problem.difficulty === 'EASY' ? 'bg-success/20 text-success' :
                                                                                problem.difficulty === 'MEDIUM' ? 'bg-warning/20 text-warning' :
                                                                                    'bg-error/20 text-error'
                                                                            }`}>
                                                                            {problem.difficulty}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        {solvedProblems.some(p => p.id === problem.id) ? (
                                                                            <span className="text-success flex items-center gap-1">
                                                                                <CheckCircle className="w-4 h-4" /> Solved
                                                                            </span>
                                                                        ) : (
                                                                            <span className="text-base-content/50 flex items-center gap-1">
                                                                                <X className="w-4 h-4" /> Not Solved
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <Link to={`/problems/${problem.id}`} className="btn btn-xs btn-ghost">
                                                                            Solve
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-base-100 rounded-lg p-8 shadow-md text-center">
                                <p className="text-base-content/70">You haven't created any playlists yet</p>
                                <Link to="/create-playlist" className="btn btn-primary btn-sm mt-4">
                                    Create Your First Playlist
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Submissions Tab */}
                {activeTab === 'submissions' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Code className="w-5 h-5" />
                                Your Submissions
                            </h3>

                            <div className="flex gap-2">
                                <select className="select select-sm select-bordered">
                                    <option value="">All Status</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Wrong Answer">Wrong Answer</option>
                                    <option value="Time Limit Exceeded">Time Limit Exceeded</option>
                                </select>

                                <select className="select select-sm select-bordered">
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>
                        </div>

                        {submissions.length > 0 ? (
                            <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra w-full">
                                        <thead>
                                            <tr>
                                                <th>Problem</th>
                                                <th>Status</th>
                                                <th>Language</th>
                                                <th>Runtime</th>
                                                <th>Memory</th>
                                                <th>Submitted</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {submissions.map((submission) => (
                                                <tr key={submission.id}>
                                                    <td>
                                                        <Link to={`/problems/${submission.problemId}`} className="font-medium hover:text-primary">
                                                            {submission.problem?.title || "Problem"}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${submission.status === 'Accepted' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                                                            {submission.status}
                                                        </span>
                                                    </td>
                                                    <td>{submission.language}</td>
                                                    <td>{submission.time || 'N/A'}</td>
                                                    <td>{submission.memory || 'N/A'}</td>
                                                    <td className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{new Date(submission.createdAt).toLocaleString()}</span>
                                                    </td>
                                                    <td>
                                                        <Link to={`/submission/${submission.id}`} className="btn btn-xs btn-ghost">
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-base-100 rounded-lg p-8 shadow-md text-center">
                                <p className="text-base-content/70">You haven't made any submissions yet</p>
                                <Link to="/" className="btn btn-primary btn-sm mt-4">
                                    Start Solving
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;