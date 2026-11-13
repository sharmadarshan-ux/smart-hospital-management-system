import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'destructive' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  let baseStyles = "inline-flex items-center justify-center font-medium rounded-[6px] border transition-qc min-h-[44px] px-4 py-2 focus-ring text-sm tabular-nums disabled:opacity-50 disabled:cursor-not-allowed";

  let variantStyles = "";
  if (variant === 'primary') {
    variantStyles = "bg-[#0B5CAD] text-white border-[#0B5CAD] hover:bg-[#094A8C] hover:border-[#094A8C] active:bg-[#083D73]";
  } else if (variant === 'destructive') {
    variantStyles = "bg-[#C62828] text-white border-[#C62828] hover:bg-[#A82222] hover:border-[#A82222] active:bg-[#8A1C1C]";
  } else if (variant === 'outline') {
    variantStyles = "bg-white text-[#14202E] border-[#D5DCE4] hover:bg-[#F5F7FA] hover:border-[#0B5CAD] hover:text-[#0B5CAD]";
  } else if (variant === 'secondary') {
    variantStyles = "bg-[#E6F0FA] text-[#0B5CAD] border-[#E6F0FA] hover:bg-[#D4E4F7] active:bg-[#C2D8F4]";
  }

  let sizeStyles = "";
  if (size === 'sm') {
    sizeStyles = "min-h-[40px] px-3 text-xs";
  } else if (size === 'lg') {
    sizeStyles = "min-h-[48px] px-6 text-base font-semibold";
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
