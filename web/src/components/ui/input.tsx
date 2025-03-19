import * as React from "react"
import "./input.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`input ${className}`}
      {...props}
    />
  )
}

export { Input }
