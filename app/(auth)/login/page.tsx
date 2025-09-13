'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Library, Sparkles, Shield, Zap } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import ClientOnly from "@/app/components/ClientOnly";
import { login } from "@/app/utils/authClient";
import { 
  fadeIn, 
  scaleIn, 
  staggerContainer, 
  staggerItem 
} from "@/app/lib/motion";

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

            if (rememberMe) {
                localStorage.setItem('authToken', token);
            }

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

    const roleOptions = [
        { value: "patron", icon: "👤", label: "Patron", color: "from-green-500 to-emerald-500" },
        { value: "librarian", icon: "📚", label: "Librarian", color: "from-blue-500 to-cyan-500" },
        { value: "admin", icon: "⚙️", label: "Admin", color: "from-red-500 to-pink-500" }
    ];

    return (
        <ClientOnly 
            fallback={
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                    <div className="w-full max-w-md relative z-10">
                        <div className="nova-glass rounded-2xl p-8 backdrop-blur-xl border border-white/20">
                            <div className="text-center">
                                <div className="w-20 h-20 nova-gradient rounded-2xl flex items-center justify-center shadow-nova-lg mx-auto mb-6">
                                    <Library className="w-10 h-10 text-white" />
                                </div>
                                <h1 className="text-4xl font-bold font-heading gradient-text mb-2">Loading...</h1>
                                <p className="text-white/80 font-medium">Preparing your login experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nova-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float"></div>
                    <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-nova-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-nova-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float" style={{ animationDelay: '4s' }}></div>
                </div>

                <motion.div 
                    className="w-full max-w-lg relative z-10"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                {/* Main Login Card */}
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
                                    <Library className="w-10 h-10 text-white" />
                                </div>
                            </motion.div>
                            
                            <motion.h1 
                                className="text-4xl font-bold font-heading gradient-text mb-2"
                                variants={fadeIn}
                            >
                                <TypeAnimation
                                    sequence={[
                                        'Welcome Back',
                                        1000,
                                        'Nova Library',
                                        1000,
                                        'Future is Here',
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
                                Sign in to access your digital library
                            </motion.p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Role Selection */}
                            <motion.div variants={staggerItem} className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-white font-semibold text-lg mb-2">Choose Your Role</h3>
                                    <p className="text-white/70 text-sm">Select the role that matches your access level</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {roleOptions.map((option, index) => (
                                        <motion.label
                                            key={option.value}
                                            className="relative cursor-pointer group"
                                            variants={staggerItem}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={option.value}
                                                checked={role === option.value}
                                                onChange={() => setRole(option.value)}
                                                className="sr-only"
                                            />
                                            <div className={`
                                                relative flex flex-col items-center p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden
                                                ${role === option.value
                                                    ? `bg-gradient-to-br ${option.color} border-white/60 shadow-xl shadow-${option.color.split(' ')[1]}/25`
                                                    : 'bg-white/8 border-white/25 hover:bg-white/12 hover:border-white/40 hover:shadow-lg'
                                                }
                                            `}>
                                                {/* Selection indicator */}
                                                {role === option.value && (
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                                                    >
                                                        <Zap className="w-3 h-3 text-indigo-600" />
                                                    </motion.div>
                                                )}
                                                
                                                <div className={`text-3xl mb-3 transition-all duration-300 ${
                                                    role === option.value ? 'scale-110' : 'group-hover:scale-105'
                                                }`}>
                                                    {option.icon}
                                                </div>
                                                <span className={`text-sm font-semibold transition-all duration-300 ${
                                                    role === option.value ? 'text-white' : 'text-white/85 group-hover:text-white'
                                                }`}>
                                                    {option.label}
                                                </span>
                                                
                                                {/* Subtle background pattern */}
                                                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                            </div>
                                        </motion.label>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Email Field */}
                            <motion.div variants={staggerItem}>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    variant="nova"
                                    size="lg"
                                    icon={<Sparkles className="w-5 h-5" />}
                                    iconPosition="left"
                                />
                            </motion.div>

                            {/* Password Field */}
                            <motion.div variants={staggerItem}>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
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

                            {/* Remember Me & Forgot Password */}
                            <motion.div 
                                className="flex items-center justify-between pt-2"
                                variants={staggerItem}
                            >
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        className="sr-only"
                                    />
                                    <div className={`
                                        w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                                        ${rememberMe
                                            ? 'bg-gradient-to-br from-indigo-500 to-blue-500 border-indigo-400 shadow-lg shadow-indigo-500/25'
                                            : 'border-white/40 group-hover:border-white/60 group-hover:bg-white/5'
                                        }
                                    `}>
                                        {rememberMe && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                <Zap className="w-3 h-3 text-white" />
                                            </motion.div>
                                        )}
                                    </div>
                                    <span className="text-white/80 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                                        Remember me
                                    </span>
                                </label>
                                <Link 
                                    href="/forgot-password" 
                                    className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition-all duration-300 text-sm"
                                >
                                    Forgot password?
                                </Link>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div variants={staggerItem} className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading || !email || !password}
                                    variant="nova"
                                    size="xl"
                                    className="w-full relative group overflow-hidden shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    animated={true}
                                >
                                    {/* Button gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    <div className="relative flex items-center justify-center">
                                        {isLoading ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="mr-3"
                                                >
                                                    <Zap className="w-5 h-5" />
                                                </motion.div>
                                                <span className="font-semibold">Signing In...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-semibold text-lg">Sign In</span>
                                                <motion.div
                                                    className="ml-3"
                                                    whileHover={{ x: 2 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                >
                                                    <Zap className="w-5 h-5" />
                                                </motion.div>
                                            </>
                                        )}
                                    </div>
                                </Button>
                            </motion.div>

                            {/* Register Link */}
                            <motion.div 
                                className="text-center"
                                variants={staggerItem}
                            >
                                <p className="text-white/80">
                                    Don&apos;t have an account?{" "}
                                    <Link 
                                        href="/register" 
                                        className="text-nova-secondary font-semibold hover:text-nova-primary hover:underline transition-colors duration-300"
                                    >
                                        Register here
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
                        { icon: Shield, title: "Secure", desc: "Enterprise-grade security" },
                        { icon: Zap, title: "Fast", desc: "Lightning-fast performance" },
                        { icon: Library, title: "Smart", desc: "AI-powered features" }
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
        </ClientOnly>
    );
}