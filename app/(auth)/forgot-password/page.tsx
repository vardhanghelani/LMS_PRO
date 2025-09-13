'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function generateCaptcha(length = 6): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaText, setCaptchaText] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<'success' | 'error' | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const router = useRouter();

    const drawCaptcha = (text: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#F3F4F6";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "28px Verdana";
        ctx.fillStyle = "#1F2937";

        // Draw CAPTCHA text with a little random rotation
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            const angle = (Math.random() - 0.5) * 0.4;
            ctx.save();
            ctx.translate(20 + i * 25, 30);
            ctx.rotate(angle);
            ctx.fillText(char, 0, 0);
            ctx.restore();
        }

        // Add noise lines
        for (let i = 0; i < 3; i++) {
            ctx.strokeStyle = "#9CA3AF";
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }
    };

    const regenerateCaptcha = () => {
        const newCaptcha = generateCaptcha();
        setCaptchaText(newCaptcha);
        drawCaptcha(newCaptcha);
        setCaptchaInput("");
    };

    useEffect(() => {
        regenerateCaptcha();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
            setMessage("❌ CAPTCHA does not match. Please try again.");
            setStatus("error");
            regenerateCaptcha();
            return;
        }

        try {
            const res = await fetch('/api/auth/check-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setMessage("✅ User found. Redirecting to reset page...");
                setTimeout(() => {
                    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
                }, 1500);
            } else {
                setStatus('error');
                setMessage(data.error || "User not found.");
            }
        } catch {
            setStatus('error');
            setMessage("Something went wrong. Try again.");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
            </div>


            <div className="relative z-10 w-full max-w-md">
                {/* Header card */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Forgot Password
                    </h1>
                    <p className="text-gray-600">Don&apos;t worry, we&apos;ll help you reset it</p>
                </div>

                {/* Main form card */}
                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 space-y-6 border border-white/20">
                    {/* Email field */}
                    <div className="space-y-2">
                        <label className="flex items-center text-slate-700 font-semibold text-sm">
                            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 text-gray-800 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 bg-gray-50/50 hover:bg-white/70 focus:bg-white"
                                placeholder="Enter your email address"
                            />
                        </div>
                    </div>

                    {/* CAPTCHA field */}
                    <div className="space-y-3">
                        <label className="flex items-center text-slate-700 font-semibold text-sm">
                            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Verification Code
                        </label>

                        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                            <canvas
                                ref={canvasRef}
                                width={200}
                                height={50}
                                className="rounded-lg border-2 border-white shadow-sm bg-white"
                            />
                            <button
                                type="button"
                                onClick={regenerateCaptcha}
                                className="flex-shrink-0 p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
                                title="Regenerate CAPTCHA"
                            >
                                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>

                        <input
                            type="text"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            required
                            className="w-full px-4 py-3 text-gray-800 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 bg-gray-50/50 hover:bg-white/70 focus:bg-white"
                            placeholder="Enter the verification code"
                        />
                    </div>

                    {/* Message display */}
                    {message && (
                        <div className={`p-4 rounded-xl font-medium text-sm transition-all duration-300 ${status === 'success'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            <div className="flex items-center">
                                {status === 'success' ? (
                                    <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                {message}
                            </div>
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                        <span className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Reset Password
                        </span>
                    </button>

                    {/* Back to login */}
                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Remember your password?{" "}
                            <Link
                                href="/login"
                                className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors duration-200"
                            >
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}