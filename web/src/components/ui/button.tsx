import * as React from "react";
import "./button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    'button',
    `button-${variant}`,
    size !== 'md' && `button-${size}`,
    fullWidth && 'button-full',
    isLoading && 'button-loading',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          role="img"
          className="spinner"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8V2z"
            fill="currentColor"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

export { Button };
