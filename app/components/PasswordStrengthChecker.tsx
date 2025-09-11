'use client';

import { useEffect, useState } from 'react';
import { Shield, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

interface Props {
    password: string;
}

const getStrength = (password: string) => {
    let score = 0;
    if (!password) return score;

    // Add 1 point for each condition
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
};

const strengthConfig = [
    {
        label: 'Very Weak',
        color: 'bg-red-500',
        textColor: 'text-red-600',
        borderColor: 'border-red-200',
        bgColor: 'bg-red-50',
        icon: ShieldX
    },
    {
        label: 'Weak',
        color: 'bg-orange-400',
        textColor: 'text-orange-600',
        borderColor: 'border-orange-200',
        bgColor: 'bg-orange-50',
        icon: ShieldAlert
    },
    {
        label: 'Fair',
        color: 'bg-yellow-400',
        textColor: 'text-yellow-600',
        borderColor: 'border-yellow-200',
        bgColor: 'bg-yellow-50',
        icon: Shield
    },
    {
        label: 'Good',
        color: 'bg-blue-500',
        textColor: 'text-blue-600',
        borderColor: 'border-blue-200',
        bgColor: 'bg-blue-50',
        icon: Shield
    },
    {
        label: 'Strong',
        color: 'bg-green-500',
        textColor: 'text-green-600',
        borderColor: 'border-green-200',
        bgColor: 'bg-green-50',
        icon: ShieldCheck
    },
    {
        label: 'Very Strong',
        color: 'bg-emerald-600',
        textColor: 'text-emerald-600',
        borderColor: 'border-emerald-200',
        bgColor: 'bg-emerald-50',
        icon: ShieldCheck
    }
];

const requirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'Uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'Number', test: (pwd: string) => /[0-9]/.test(pwd) },
    { label: 'Special character', test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd) }
];

export default function PasswordStrengthChecker({ password }: Props) {
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        setStrength(getStrength(password));
    }, [password]);

    const config = strengthConfig[strength];
    const IconComponent = config.icon;

    return (
        <div className="mt-4 space-y-4">
            {/* Strength Indicator */}
            <div className={`p-4 rounded-lg border-2 ${config.borderColor} ${config.bgColor} transition-all duration-300`}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <IconComponent className={`w-5 h-5 ${config.textColor}`} />
                        <span className={`font-semibold ${config.textColor}`}>
                            Password Strength: {config.label}
                        </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
                        {strength}/5
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ease-out ${config.color} relative`}
                        style={{ width: `${(strength / 5) * 100}%` }}
                    >
                        <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                    </div>
                </div>

                {/* Segment indicators */}
                <div className="flex justify-between mt-2">
                    {[1, 2, 3, 4, 5].map((segment) => (
                        <div
                            key={segment}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${segment <= strength
                                    ? config.color
                                    : 'bg-gray-200'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Requirements Checklist */}
            {password && (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Password Requirements</h4>
                    <div className="space-y-2">
                        {requirements.map((req, index) => {
                            const isMet = req.test(password);
                            return (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200 ${isMet
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        {isMet ? '✓' : '○'}
                                    </div>
                                    <span className={`text-sm transition-colors duration-200 ${isMet
                                            ? 'text-green-600 font-medium'
                                            : 'text-gray-500'
                                        }`}>
                                        {req.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}