export default function About() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 relative overflow-hidden">
            {/* Animated background elements - adjusted for mobile */}
            <div className="absolute inset-0 opacity-20 sm:opacity-30">
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 md:w-96 sm:h-72 md:h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse"></div>
                <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-48 h-48 sm:w-72 md:w-96 sm:h-72 md:h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-10 sm:bottom-20 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-72 md:w-96 sm:h-72 md:h-96 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl w-full relative z-10">
                {/* Main content card */}
                <div className="bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 hover:bg-white/20 transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-3xl">
                    {/* Header section with icon */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 sm:mb-8 text-center sm:text-left">
                        <div className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0 sm:mr-4 md:mr-6 animate-bounce">
                            <svg className="w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-xl leading-tight">
                            About This Project
                        </h2>
                    </div>

                    {/* Content sections */}
                    <div className="space-y-6 sm:space-y-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 sm:mt-1">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Comprehensive Platform</h3>
                                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                        The <span className="text-yellow-300 font-bold">Library Management System</span> is a comprehensive full-stack web platform developed to automate and streamline library operations.
                                        It simplifies tasks for both librarians and patrons, offering robust tools for managing collections, lending, returns, and reports.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 sm:mt-1">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Modern Technology Stack</h3>
                                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                        Built using <span className="text-blue-300 font-bold">Next.js</span> (frontend + backend), and <span className="text-yellow-300 font-bold">MySQL</span> (database),
                                        the system supports role-based access, real-time notifications, and an intuitive UI for seamless interaction.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 sm:mt-1">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Universal Solution</h3>
                                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                        Whether you&apos;re running a <span className="text-pink-300 font-bold italic">school, college, or public library</span>, this system empowers you to go digital with ease, improving efficiency and accessibility for all users.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features grid - fully responsive */}
                    <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105 sm:hover:scale-110">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h4 className="text-white font-bold text-base sm:text-lg mb-2">Secure Access</h4>
                            <p className="text-white/70 text-sm sm:text-base">Role-based authentication and secure data management</p>
                        </div>

                        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105 sm:hover:scale-110">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h4 className="text-white font-bold text-base sm:text-lg mb-2">Real-time Updates</h4>
                            <p className="text-white/70 text-sm sm:text-base">Instant notifications and live data synchronization</p>
                        </div>

                        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105 sm:hover:scale-110 sm:col-span-2 lg:col-span-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h4 className="text-white font-bold text-base sm:text-lg mb-2">Analytics & Reports</h4>
                            <p className="text-white/70 text-sm sm:text-base">Comprehensive reporting and data visualization</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}