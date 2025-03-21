
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 font-display font-bold ${sizeClasses[size]} text-primary`}
    >
      <div className="relative">
        <ShoppingBag size={iconSizes[size]} className="animate-pulse-gentle" />
        <div className="absolute inset-0 bg-primary blur-lg opacity-25 rounded-full animate-pulse-gentle" />
      </div>
      {withText && <span>DigitalMarket</span>}
    </Link>
  );
};

export default Logo;
