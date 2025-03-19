import * as React from "react"
import "./label.css"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
}

function Label({ className = "", ...props }: LabelProps) {
  return (
    <label
      className={`label ${className}`}
      {...props}
    />
  )
}

export { Label }
