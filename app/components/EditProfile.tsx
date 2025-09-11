'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

type User = {
    user_id: number;
    name: string;
    email: string;
    role: 'patron' | 'librarian';
    gender?: string;
    phone_number?: string;
    birth_date?: string;
    address?: string;
    created_at?: string;
};

export default function EditProfile({ userRole }: { userRole?: string }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<"success" | "error" | null>(null);

    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        email: '',
        gender: 'male',
        phone_number: '',
        birth_date: '',
        address: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/${userRole}/account`);
                const json = await res.json();
                if (!res.ok) {
                    console.error('Error fetching user:', json.error);
                    return;
                }
                // Unpack nested user for librarian endpoint, or top‐level for patron
                const payload = json.user ?? json;
                setUser(payload);
                setForm({
                    name: payload.name || '',
                    email: payload.email || '',
                    gender: payload.gender || 'male',
                    phone_number: payload.phone_number || '',
                    birth_date: payload.birth_date
                        ? new Date(payload.birth_date).toISOString().slice(0, 10)
                        : '',
                    address: payload.address || '',
                });
            } catch (err) {
                console.error('Failed to fetch user', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userRole]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const res = await fetch('/api/update-profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Profile updated successfully!');
                setStatus('success');

                setTimeout(() => {
                    router.push('/' + userRole + '/account');
                }, 2000);
            } else {
                setMessage(data.error || 'Something went wrong.');
                setStatus('error');
            }
        } catch (error) {
            setMessage('Server error. Please try again later.');
            setStatus('error');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                    <div className="animate-pulse">
                        <div className="h-6 bg-slate-300 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-slate-300 rounded w-1/2 mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-12 bg-slate-300 rounded"></div>
                            <div className="h-12 bg-slate-300 rounded"></div>
                            <div className="h-12 bg-slate-300 rounded"></div>
                        </div>
                    </div>
                    <p className="text-center mt-6 text-slate-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'librarian': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'patron': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={`/${userRole}/account`}
                        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
                    >
                        <ArrowLeft size={20} />
                        Back to Account
                    </Link>
                </div>

                {/* Main Edit Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-6">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">Edit Profile</h2>
                                <p className="text-emerald-100 mt-1">Update your account information</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Name and Email Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <label htmlFor="name" className="block text-slate-700 font-semibold mb-2 text-lg">
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
                                        className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    />
                                    <div className="absolute left-4 top-4 text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <label htmlFor="email" className="block text-slate-700 font-semibold mb-2 text-lg">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    />
                                    <div className="absolute left-4 top-4 text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="relative group">
                            <label htmlFor="phone_number" className="block text-slate-700 font-semibold mb-2 text-lg">
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
                                    className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                />
                                <div className="absolute left-4 top-4 text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Gender and Birth Date Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <label htmlFor="gender" className="block text-slate-700 font-semibold mb-2 text-lg">
                                    Gender
                                </label>
                                <div className="relative">
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 appearance-none"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <div className="absolute left-4 top-4 text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="absolute right-4 top-4 text-slate-400 pointer-events-none">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <label htmlFor="birth_date" className="block text-slate-700 font-semibold mb-2 text-lg">
                                    Birth Date
                                </label>
                                <div className="relative">
                                    <input
                                        id="birth_date"
                                        name="birth_date"
                                        type="date"
                                        value={form.birth_date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    />
                                    <div className="absolute left-4 top-4 text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="relative group">
                            <label htmlFor="address" className="block text-slate-700 font-semibold mb-2 text-lg">
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
                                    className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 resize-none"
                                />
                                <div className="absolute left-4 top-4 text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Role Display (Read-only) */}
                        <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200 rounded-xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800">Account Role</h3>
                                    <p className="text-slate-600">Your current role cannot be changed</p>
                                </div>
                                <div className="ml-auto">
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border-2 ${getRoleColor(user?.role || 'patron')}`}>
                                        {user?.role}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Status Message */}
                        {message && (
                            <div className={`
                                p-4 rounded-xl font-medium border-2 transition-all duration-300
                                ${status === "success"
                                    ? 'bg-green-50 text-green-800 border-green-200'
                                    : 'bg-red-50 text-red-800 border-red-200'
                                }
                            `}>
                                <div className="flex items-center space-x-3">
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

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Link
                                href="/account"
                                className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold text-center hover:bg-slate-200 transition-all duration-300"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={updating}
                                className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {updating ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Update Profile
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}