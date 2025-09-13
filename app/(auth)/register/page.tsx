'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Library, Sparkles, Shield, Zap, User, Mail, Phone, MapPin, Calendar, UserCheck } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import PasswordStrengthChecker from "@/app/components/PasswordStrengthChecker";
import { 
  fadeIn, 
  slideInFromLeft, 
  slideInFromRight, 
  scaleIn, 
  staggerContainer, 
  staggerItem 
} from "@/app/lib/motion";

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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nova-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-nova-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-nova-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <motion.div 
                className="w-full max-w-2xl relative z-10"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {/* Main Registration Card */}
                <motion.div variants={staggerItem}>
                    <Card variant="nova" padding="xl" className="backdrop-blur-xl">
                        {/* Header */}
                        <motion.div 
                            className="text-center mb-8"
                            variants={scaleIn}
                        >
                            <motion.div 
                                className="flex justify-center mb-6"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="w-20 h-20 nova-gradient rounded-2xl flex items-center justify-center shadow-nova-lg">
                                    <UserCheck className="w-10 h-10 text-white" />
                                </div>
                            </motion.div>
                            
                            <motion.h1 
                                className="text-4xl font-bold font-heading gradient-text mb-2"
                                variants={fadeIn}
                            >
                                <TypeAnimation
                                    sequence={[
                                        'Join Nova Library',
                                        1000,
                                        'Create Account',
                                        1000,
                                        'Start Your Journey',
                                        1000,
                                    ]}
                                    wrapper="span"
                                    cursor={true}
                                    repeat={Infinity}
                                />
                            </motion.h1>
                            
                            <motion.p 
                                className="text-white/80 font-medium"
                                variants={fadeIn}
                            >
                                Create your patron account to explore our digital library
                            </motion.p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information Section */}
                            <motion.div variants={staggerItem} className="space-y-6">
                                <div className="border-b border-white/20 pb-4">
                                    <h3 className="text-white font-semibold text-lg mb-2">Personal Information</h3>
                                    <p className="text-white/70 text-sm">Tell us about yourself</p>
                                </div>
                                
                                {/* Name and Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        variant="nova"
                                        size="lg"
                                        icon={<User className="w-5 h-5" />}
                                        iconPosition="left"
                                    />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        variant="nova"
                                        size="lg"
                                        icon={<Mail className="w-5 h-5" />}
                                        iconPosition="left"
                                    />
                                </div>
                                
                                {/* Phone Field */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        id="phone_number"
                                        name="phone_number"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        value={form.phone_number}
                                        onChange={handleChange}
                                        variant="nova"
                                        size="lg"
                                        icon={<Phone className="w-5 h-5" />}
                                        iconPosition="left"
                                    />
                                    <div></div> {/* Empty div for grid alignment */}
                                </div>
                            </motion.div>

                            {/* Additional Details Section */}
                            <motion.div variants={staggerItem} className="space-y-6">
                                <div className="border-b border-white/20 pb-4">
                                    <h3 className="text-white font-semibold text-lg mb-2">Additional Details</h3>
                                    <p className="text-white/70 text-sm">Help us personalize your experience</p>
                                </div>
                                
                                {/* Gender and Birth Date Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Gender Field */}
                                    <div className="relative">
                                        <label className="block text-white font-semibold mb-3 text-sm">
                                            Gender
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="gender"
                                                value={form.gender}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 pl-10 pr-10 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer hover:border-white/50"
                                            >
                                                <option value="" className="bg-slate-800 text-white">Select Gender</option>
                                                <option value="male" className="bg-slate-800 text-white">Male</option>
                                                <option value="female" className="bg-slate-800 text-white">Female</option>
                                                <option value="other" className="bg-slate-800 text-white">Other</option>
                                            </select>
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                                            <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Birth Date Field */}
                                    <div className="relative">
                                        <label className="block text-white font-semibold mb-3 text-sm">
                                            Birth Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="birth_date"
                                                type="date"
                                                value={form.birth_date}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 pl-10 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:border-white/50 cursor-pointer"
                                            />
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                                        </div>
                                    </div>
                                </div>
                                {/* Address Field */}
                                <div className="mt-4">
                                    <label className="block text-white font-semibold mb-3 text-sm">
                                        Address
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            name="address"
                                            rows={3}
                                            placeholder="Enter your full address"
                                            value={form.address}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 pl-10 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 resize-none hover:border-white/50"
                                        />
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-white/60" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Security Section */}
                            <motion.div variants={staggerItem} className="space-y-6">
                                <div className="border-b border-white/20 pb-4">
                                    <h3 className="text-white font-semibold text-lg mb-2">Account Security</h3>
                                    <p className="text-white/70 text-sm">Choose a strong password to protect your account</p>
                                </div>
                                
                                {/* Password Field */}
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        variant="nova"
                                        size="lg"
                                        icon={<Shield className="w-5 h-5" />}
                                        iconPosition="left"
                                        className="pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300 z-10 p-1 rounded-full hover:bg-white/10"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                
                                {/* Password Strength */}
                                <div className="mt-3">
                                    <PasswordStrengthChecker password={password} />
                                </div>
                            </motion.div>

                            {/* Patron Account Info */}
                            <motion.div variants={staggerItem}>
                                <Card variant="nova" padding="lg" className="border border-white/20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 nova-gradient rounded-xl flex items-center justify-center shadow-nova">
                                            <Library className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold text-lg">Patron Account</h3>
                                            <p className="text-white/80 text-sm">Browse and borrow books from our digital collection</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Status Message */}
                            <AnimatePresence>
                                {message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`
                                            p-4 rounded-xl font-medium border backdrop-blur-sm
                                            ${status === 'success'
                                                ? 'bg-green-500/20 text-green-300 border-green-400/50'
                                                : 'bg-red-500/20 text-red-300 border-red-400/50'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center space-x-2">
                                            {status === 'success' ? (
                                                <Zap className="w-5 h-5" />
                                            ) : (
                                                <Shield className="w-5 h-5" />
                                            )}
                                            <span>{message}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <motion.div variants={staggerItem} className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={!form.name || !form.email || !password}
                                    variant="nova"
                                    size="xl"
                                    className="w-full relative group overflow-hidden shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    animated={true}
                                >
                                    {/* Button gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    <div className="relative flex items-center justify-center">
                                        <span className="font-semibold text-lg">Create Your Account</span>
                                        <motion.div
                                            className="ml-3"
                                            whileHover={{ x: 2, scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <UserCheck className="w-5 h-5" />
                                        </motion.div>
                                    </div>
                                </Button>
                            </motion.div>

                            {/* Login Link */}
                            <motion.div 
                                className="text-center"
                                variants={staggerItem}
                            >
                                <p className="text-white/80">
                                    Already have an account?{" "}
                                    <Link 
                                        href="/login" 
                                        className="text-nova-secondary font-semibold hover:text-nova-primary hover:underline transition-colors duration-300"
                                    >
                                        Sign in here
                                    </Link>
                                </p>
                            </motion.div>
                        </form>
                    </Card>
                </motion.div>

                {/* Feature Cards */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
                    variants={staggerContainer}
                >
                    {[
                        { icon: Library, title: "Vast Collection", desc: "Thousands of books & resources" },
                        { icon: Sparkles, title: "Smart Features", desc: "AI-powered recommendations" },
                        { icon: Shield, title: "Secure Access", desc: "Your data protected" }
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={staggerItem}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="nova-glass rounded-xl p-4 text-center border border-white/20 hover:border-white/40 transition-all duration-300"
                        >
                            <feature.icon className="w-8 h-8 text-nova-primary mx-auto mb-2" />
                            <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                            <p className="text-white/70 text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}