'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';

// Types
type PremiumButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

type PremiumCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
};

type PremiumStatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'danger';
  animation?: boolean;
};

type PremiumBadgeProps = {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
};

type PremiumAlertProps = {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  icon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

// Components
export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled = false,
  className = '',
}) => {
  const variantClasses = {
    primary: 'premium-button',
    secondary: 'premium-button premium-button-secondary',
    outline: 'premium-button premium-button-outline',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-0'
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'text-sm px-4 py-3',
    lg: 'text-base px-6 py-4'
  };
  
  return (
    <motion.button
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className} flex items-center justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={!disabled ? onClick : undefined}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = '',
  hover = true,
  glass = false,
}) => {
  const baseClass = glass ? 'premium-glass-card' : 'premium-card';
  
  return (
    <motion.div 
      className={`${baseClass} ${className} p-6`}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export const PremiumStatCard: React.FC<PremiumStatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  color = 'primary',
  animation = true,
}) => {
  const colorClasses = {
    primary: 'from-blue-500 to-blue-600',
    secondary: 'from-purple-500 to-purple-600',
    accent: 'from-green-500 to-green-600',
    warning: 'from-amber-500 to-orange-500',
    danger: 'from-red-500 to-red-600'
  };

  const trendIcon = {
    up: <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>,
    down: <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>,
    neutral: <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  };

  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-400'
  };

  return (
    <motion.div 
      className="premium-stat-card"
      initial={animation ? { y: 20, opacity: 0 } : false}
      animate={animation ? { y: 0, opacity: 1 } : false}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}>
          {icon}
        </div>
        
        {trend && trendValue && (
          <div className="flex items-center gap-1">
            {trendIcon[trend]}
            <span className={`text-sm font-medium ${trendColors[trend]}`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-2">{title}</h3>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </motion.div>
  );
};

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const variantClasses = {
    primary: 'premium-badge premium-badge-primary',
    success: 'premium-badge premium-badge-success',
    warning: 'premium-badge premium-badge-warning',
    danger: 'premium-badge premium-badge-danger'
  };

  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const PremiumAlert: React.FC<PremiumAlertProps> = ({
  children,
  variant = 'info',
  title,
  icon = true,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const variantClasses = {
    info: 'border-l-blue-500 bg-blue-50',
    success: 'border-l-green-500 bg-green-50',
    warning: 'border-l-amber-500 bg-amber-50',
    danger: 'border-l-red-500 bg-red-50'
  };

  const textColors = {
    info: 'text-blue-700',
    success: 'text-green-700',
    warning: 'text-amber-700',
    danger: 'text-red-700'
  };

  const variantIcons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    danger: <AlertTriangle className="w-5 h-5" />
  };

  return (
    <motion.div
      className={`border-l-4 p-4 rounded-r-lg ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <div className="flex">
        {icon && (
          <div className={`flex-shrink-0 mr-3 ${textColors[variant]}`}>
            {variantIcons[variant]}
          </div>
        )}
        <div className="flex-grow">
          {title && (
            <h3 className={`text-sm font-medium ${textColors[variant]}`}>{title}</h3>
          )}
          <div className={`text-sm ${textColors[variant]} mt-1`}>{children}</div>
        </div>
        {dismissible && (
          <button 
            type="button" 
            className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onDismiss}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const PremiumLoader = () => {
  return (
    <div className="premium-loading" />
  );
};

export const PremiumTabs: React.FC<{
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (tabId: string) => void;
}> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-1 py-3 text-sm font-medium relative border-b-2 transition-all duration-200
              ${activeTab === tab.id 
                ? 'text-blue-600 border-blue-500' 
                : 'text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export const PremiumDivider = ({ className = '' }) => {
  return (
    <div className={`premium-divider ${className}`}></div>
  );
};

export const PremiumSearchInput: React.FC<{
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}> = ({ placeholder = 'Search...', value, onChange, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="premium-input w-full pl-10 pr-4"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export const PremiumTooltip: React.FC<{
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}> = ({ content, children, position = 'top' }) => {
  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  };

  return (
    <div className="relative group">
      {children}
      <div className={`absolute ${positionClasses[position]} hidden group-hover:block z-50 whitespace-nowrap`}>
        <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg">
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 rotate-45 ${
            position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
            position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
            'right-full top-1/2 -translate-y-1/2 -mr-1'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export const PremiumProgressBar: React.FC<{
  value: number;
  max?: number;
  color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}> = ({ value, max = 100, color = 'primary', size = 'md', showLabel = false }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    primary: 'bg-blue-500',
    secondary: 'bg-purple-500',
    accent: 'bg-green-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500'
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
