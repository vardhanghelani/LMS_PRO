export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 relative overflow-hidden">
      {/* Animated background elements - responsive */}
      <div className="absolute inset-0 opacity-15 sm:opacity-20">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-20 w-48 h-48 sm:w-64 md:w-72 sm:h-64 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-5 sm:right-20 w-48 h-48 sm:w-64 md:w-72 sm:h-64 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-4 sm:-bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-64 md:w-72 sm:h-64 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl w-full text-center relative z-10">
        {/* Glassmorphism card - responsive */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-3xl">
          {/* Floating book icon - responsive */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 sm:w-18 md:w-20 sm:h-18 md:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                <svg className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 sm:mb-6 drop-shadow-2xl animate-pulse leading-tight">
            Empower Your Library Digitally
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed font-medium max-w-4xl mx-auto px-2 sm:px-0">
            Welcome to the <span className="text-yellow-300 font-bold animate-pulse">Library Management System</span> — your all-in-one platform to manage books, users, and transactions with ease and efficiency.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-0">
            <a
              href="/login"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 sm:hover:scale-110 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
              href="/about"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-base sm:text-lg hover:bg-white/20 hover:border-white/50 transform hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
            </a>
          </div>

          {/* Feature highlights - responsive grid */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105 lg:hover:scale-110">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Easy Management</h3>
              <p className="text-white/70 text-xs sm:text-sm">Streamlined book and user management</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105 lg:hover:scale-110">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">User Friendly</h3>
              <p className="text-white/70 text-xs sm:text-sm">Intuitive interface for all users</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105 lg:hover:scale-110 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Real-time Tracking</h3>
              <p className="text-white/70 text-xs sm:text-sm">Monitor transactions instantly</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}