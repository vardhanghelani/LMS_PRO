/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordStrengthChecker from "@/app/components/PasswordStrengthChecker";
import { Eye, EyeOff } from "lucide-react";

export default function RegistrationForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "patron",
        gender: "",
        address: "",
        birth_date: "",
        phone_number: "",
    });

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const [message, setMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<"success" | "error" | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    password,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message || "Registration successful!");
                setStatus("success");

                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            } else {
                setMessage(data.error || "Something went wrong.");
                setStatus("error");
            }
        } catch (error) {
            setMessage("Server error. Please try again later.");
            setStatus("error");
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
                {/* Main registration card */}
                <div className="bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 hover:bg-white/20 transition-all duration-500 hover:scale-[1.02]">
                    {/* Header with icon */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 mb-2">
                            Join Our Library
                        </h2>
                        <p className="text-white/80">Create your patron account to start exploring</p>
                    </div>

                    <div onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div className="relative group">
                            <label htmlFor="name" className="block text-white font-semibold mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 pl-12 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                                />
                                <div className="absolute left-4 top-4 text-white/60">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
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

                        {/* Phone Number Field */}
                        <div className="relative group">
                            <label htmlFor="phone_number" className="block text-white font-semibold mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 pl-12 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                                />
                                <div className="absolute left-4 top-4 text-white/60">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Gender and Birth Date Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Gender Field */}
                            <div className="relative group">
                                <label htmlFor="gender" className="block text-white font-semibold mb-2">
                                    Gender
                                </label>
                                <div className="relative">
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 pl-12 pr-10 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 appearance-none"
                                    >
                                        <option value="male" className="bg-slate-800">Male</option>
                                        <option value="female" className="bg-slate-800">Female</option>
                                        <option value="other" className="bg-slate-800">Other</option>
                                    </select>
                                    <div className="absolute left-4 top-4 text-white/60">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="absolute right-4 top-4 text-white/60 pointer-events-none">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Birth Date Field */}
                            <div className="relative group">
                                <label htmlFor="birth_date" className="block text-white font-semibold mb-2">
                                    Birth Date
                                </label>
                                <div className="relative">
                                    <input
                                        id="birth_date"
                                        name="birth_date"
                                        type="date"
                                        value={form.birth_date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 pl-12 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                                    />
                                    <div className="absolute left-4 top-4 text-white/60">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="relative group">
                            <label htmlFor="address" className="block text-white font-semibold mb-2">
                                Address
                            </label>
                            <div className="relative">
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    placeholder="Enter your address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 pl-12 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 resize-none"
                                />
                                <div className="absolute left-4 top-4 text-white/60">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
                                    required
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-4 pl-12 pr-12 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                                />
                                <div className="absolute left-4 top-4 text-white/60">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors duration-300"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                            <div className="mt-2">
                                <PasswordStrengthChecker password={password} />
                            </div>
                        </div>

                        {/* Patron Account Info */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-xl">📚</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Patron Account</h3>
                                    <p className="text-white/80 text-sm">Browse and borrow books from our collection</p>
                                </div>
                            </div>
                        </div>

                        {/* Status Message */}
                        {message && (
                            <div className={`
                                p-4 rounded-xl font-medium border backdrop-blur-sm transition-all duration-300
                                ${status === "success"
                                    ? 'bg-green-500/20 text-green-300 border-green-400/50'
                                    : 'bg-red-500/20 text-red-300 border-red-400/50'
                                }
                            `}>
                                <div className="flex items-center space-x-2">
                                    {status === "success" ? (
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="group relative w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                <span>Create Patron Account</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-white/80">
                                Already have an account?{" "}
                                <Link href="/login" className="text-green-300 font-semibold hover:text-green-200 hover:underline transition-colors duration-300">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Benefits cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="text-2xl mb-2">📖</div>
                        <p className="text-white/80 text-sm">Thousands of books</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="text-2xl mb-2">📱</div>
                        <p className="text-white/80 text-sm">Digital access</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="text-2xl mb-2">🏆</div>
                        <p className="text-white/80 text-sm">Reading rewards</p>
                    </div>
                </div>
            </div>
        </main>
    );
}