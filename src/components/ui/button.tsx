import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  isLoading?: boolean;
  isComplete?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      isLoading,
      isComplete = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-button2 text-white hover:opacity-90",
      secondary: "bg-gray-700 text-white hover:bg-gray-600",
      ghost:
        "bg-transparent hover:bg-slate-900 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200",
      gradient: cn(
        "relative text-white transition-all duration-300",
        isComplete
          ? "bg-button2 shadow-lg hover:shadow-cyan-500/50"
          : "bg-button text-gray-100 opacity-50"
      ),
    };

    return (
      <button
        ref={ref}
        className={cn(
          "w-full py-3 px-4 rounded-xl font-medium transition-all duration-300",
          variants[variant],
          isComplete &&
            variant === "gradient" &&
            "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r after:from-[#4599DB] after:to-[#62CDCF] after:blur-xl after:opacity-40 after:-z-10",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
