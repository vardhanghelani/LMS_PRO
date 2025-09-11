/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/app/utils/authClient";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [role, setRole] = useState("patron");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const getDashboardPath = (role: string) => {
        if (role === "patron") return "/patron/items";
        if (role === "admin") return "/admin";
        if (role === "librarian") return "/librarian";
        return "/";
    };

    const router = useRouter();

    const [message, setMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<'success' | 'error' | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        setStatus(null);

        try {
            console.log('Attempting login with:', { email, role });
            const { user, token } = await login(email, password, role);

            console.log('Login successful:', { user, token: token ? 'exists' : 'missing' });
            setMessage('Login successful! Redirecting...');
            setStatus('success');

            // Store token in localStorage for client-side access (optional)
            if (rememberMe) {
                localStorage.setItem('authToken', token);
            }

            // Redirect after a short delay to show success message
            setTimeout(() => {
                console.log('Redirecting to:', `/${role}`);
                router.push(`http://localhost:3000/${getDashboardPath(role)}`);
            }, 1000);

        } catch (error: unknown) {
            console.error('Login error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
            setMessage(errorMessage);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
            </div>

            <div className="w-full max-w-lg relative z-10">
                {/* Main login card */}
                <div className="bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 hover:bg-white/20 transition-all duration-500 hover:scale-[1.02]">
                    {/* Header with icon */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-2">
                            Library Login
                        </h1>
                        <p className="text-white/80">Welcome back! Please sign in to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-white font-semibold mb-4 text-lg">Select Your Role</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { value: "patron", icon: "👤", label: "Patron" },
                                    { value: "librarian", icon: "📚", label: "Librarian" },
                                    { value: "admin", icon: "⚙️", label: "Admin" }
                                ].map((r) => (
                                    <label
                                        key={r.value}
                                        className={`relative cursor-pointer group`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={r.value}
                                            checked={role === r.value}
                                            onChange={() => setRole(r.value)}
                                            className="sr-only"
                                        />
                                        <div className={`
                                            flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300
                                            ${role === r.value
                                                ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-blue-400 shadow-lg shadow-blue-500/25'
                                                : 'bg-white/10 border-white/30 hover:bg-white/15 hover:border-white/50'
                                            }
                                        `}>
                                            <span className="text-2xl mb-1">{r.icon}</span>
                                            <span className={`text-sm font-medium ${role === r.value ? 'text-white' : 'text-white/80'}`}>
                                                {r.label}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="relative group">
                            <label htmlFor="email" className="block text-white font-semibold mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-4 pl-12 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                />
                                <div className="absolute left-4 top-4 text-white/60">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <label htmlFor="password" className="block text-white font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-4 pl-12 pr-12 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                />
                                <div className="absolute left-4 top-4 text-white/60">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors duration-300"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Status Message */}
                        {message && (
                            <div className={`
                                p-4 rounded-xl font-medium border backdrop-blur-sm transition-all duration-300
                                ${status === 'success'
                                    ? 'bg-green-500/20 text-green-300 border-green-400/50'
                                    : 'bg-red-500/20 text-red-300 border-red-400/50'
                                }
                            `}>
                                <div className="flex items-center space-x-2">
                                    {status === 'success' ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                    <span>{message}</span>
                                </div>
                            </div>
                        )}

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="sr-only"
                                />
                                <div className={`
                                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300
                                    ${rememberMe
                                        ? 'bg-blue-500 border-blue-500'
                                        : 'border-white/40 group-hover:border-white/60'
                                    }
                                `}>
                                    {rememberMe && (
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-white/80 group-hover:text-white transition-colors duration-300">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-blue-300 hover:text-blue-200 font-medium hover:underline transition-colors duration-300">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                        >
                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Signing In...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-white/80">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="text-blue-300 font-semibold hover:text-blue-200 hover:underline transition-colors duration-300">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Additional info cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="text-2xl mb-2">🔒</div>
                        <p className="text-white/80 text-sm">Secure Login</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="text-2xl mb-2">⚡</div>
                        <p className="text-white/80 text-sm">Fast Access</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="text-2xl mb-2">📱</div>
                        <p className="text-white/80 text-sm">Mobile Ready</p>
                    </div>
                </div>
            </div>
        </main>
    );
}