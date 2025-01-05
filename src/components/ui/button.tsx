import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "primary", isLoading, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors
            ${
              variant === "primary"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90"
                : "bg-gray-700 text-white hover:bg-gray-600"
            } 
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            ${className}`}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
