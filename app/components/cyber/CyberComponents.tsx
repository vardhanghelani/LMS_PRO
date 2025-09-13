'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';

// Types
type CyberButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  glitch?: boolean;
  pulse?: boolean;
};

type CyberCardProps = {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  glowColor?: 'cyan' | 'pink' | 'green';
  bordered?: boolean;
};

type CyberStatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'cyan' | 'pink' | 'green' | 'yellow' | 'orange';
  animation?: boolean;
};

type CyberBadgeProps = {
  children: ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info';
  glow?: boolean;
  className?: string;
};

type CyberAlertProps = {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  icon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

// Components
export const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled = false,
  className = '',
  glitch = false,
  pulse = false,
}) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 to-purple-600 text-black',
    secondary: 'bg-gradient-to-r from-pink-500 to-orange-500 text-black',
    success: 'bg-gradient-to-r from-green-400 to-cyan-500 text-black',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-black',
    ghost: 'bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-900/20'
  };

  const sizeClasses = {
    sm: 'text-xs py-2 px-3',
    md: 'text-sm py-3 px-4',
    lg: 'text-base py-4 px-6'
  };
  
  const baseClasses = `
    font-mono uppercase tracking-wider font-bold rounded-md 
    flex items-center justify-center gap-2 relative overflow-hidden
    transition-all duration-300 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105 cursor-pointer'}
    ${pulse ? 'cyber-pulse' : ''}
    ${variantClasses[variant]} ${sizeClasses[size]} ${className}
  `;

  return (
    <motion.button
      className={baseClasses}
      onClick={!disabled ? onClick : undefined}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className={glitch ? 'cyber-glitch-text' : ''}>{children}</span>
      
      {/* Sheen effect */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                      transition-all duration-1000 ease-in-out group-hover:left-[100%]" />
      </div>
    </motion.button>
  );
};

export const CyberCard: React.FC<CyberCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowEffect = false,
  glowColor = 'cyan',
  bordered = true,
}) => {
  const glowClasses = {
    cyan: 'shadow-cyan-500/50',
    pink: 'shadow-pink-500/50',
    green: 'shadow-green-500/50'
  };

  return (
    <div 
      className={`
        cyber-card ${className}
        ${hoverEffect ? 'hover:transform hover:-translate-y-1 transition-all duration-300' : ''}
        ${glowEffect ? `shadow-lg ${glowClasses[glowColor]}` : ''}
        ${bordered ? 'border border-cyan-500/30' : ''}
      `}
    >
      {children}
    </div>
  );
};

export const CyberStatCard: React.FC<CyberStatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  color = 'cyan',
  animation = true,
}) => {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    pink: 'from-pink-500 to-purple-600',
    green: 'from-green-400 to-cyan-500',
    yellow: 'from-yellow-400 to-orange-500',
    orange: 'from-orange-500 to-red-500'
  };

  const trendIcon = {
    up: <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>,
    down: <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>,
    neutral: <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  };

  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  };

  return (
    <motion.div 
      className="cyber-stat-card relative p-6 rounded-lg"
      initial={animation ? { y: 20, opacity: 0 } : false}
      animate={animation ? { y: 0, opacity: 1 } : false}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
      {/* Top glowing border */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorClasses[color]} rounded-t-lg`}></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
          {icon}
        </div>
        
        {trend && trendValue && (
          <div className="flex items-center">
            {trendIcon[trend]}
            <span className={`ml-1 text-sm font-medium ${trendColors[trend]}`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">{title}</h3>
        <div className="text-3xl font-bold cyber-neon-text mb-1">{value}</div>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
      
      {/* Bottom radial gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-b-lg"></div>
    </motion.div>
  );
};

export const CyberBadge: React.FC<CyberBadgeProps> = ({
  children,
  variant = 'info',
  glow = false,
  className = '',
}) => {
  const variantClasses = {
    success: 'bg-gradient-to-r from-green-400 to-cyan-500 text-black',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-black',
    warning: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black',
    info: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black'
  };

  const glowClasses = {
    success: 'shadow-green-500/50',
    danger: 'shadow-red-500/50',
    warning: 'shadow-yellow-500/50',
    info: 'shadow-cyan-500/50'
  };

  return (
    <span 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
        ${variantClasses[variant]} 
        ${glow ? `shadow-lg ${glowClasses[variant]}` : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export const CyberAlert: React.FC<CyberAlertProps> = ({
  children,
  variant = 'info',
  title,
  icon = true,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const variantClasses = {
    info: 'border-l-cyan-500 bg-cyan-900/20',
    success: 'border-l-green-500 bg-green-900/20',
    warning: 'border-l-yellow-500 bg-yellow-900/20',
    danger: 'border-l-red-500 bg-red-900/20'
  };

  const textColors = {
    info: 'text-cyan-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-400'
  };

  const variantIcons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    danger: <AlertTriangle className="w-5 h-5" />
  };

  return (
    <motion.div
      className={`border-l-4 p-4 rounded-r-md ${variantClasses[variant]} ${className}`}
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
          <div className="text-sm text-gray-300 mt-1">{children}</div>
        </div>
        {dismissible && (
          <button 
            type="button" 
            className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-200"
            onClick={onDismiss}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const CyberLoader = () => {
  return (
    <div className="cyber-loading" />
  );
};

export const CyberTabs: React.FC<{
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (tabId: string) => void;
}> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-cyan-500/30 mb-6">
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium relative
              ${activeTab === tab.id 
                ? 'text-cyan-400 border-b-2 border-cyan-500' 
                : 'text-gray-400 hover:text-gray-300'}
              transition-all duration-200
            `}
          >
            {tab.label}
            
            {/* Glow effect for active tab */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 shadow-lg shadow-cyan-500/50"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export const CyberDivider = ({ className = '' }) => {
  return (
    <div className={`relative h-px w-full my-6 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
    </div>
  );
};

export const CyberSearchInput: React.FC<{
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
        className="cyber-input w-full pl-10 pr-4 py-2 text-sm"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-cyan-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export const CyberTooltip: React.FC<{
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
        <div className="bg-cyber-dark border border-cyan-500/30 text-xs rounded py-1 px-2 text-cyan-400 shadow-lg">
          {content}
        </div>
      </div>
    </div>
  );
};
