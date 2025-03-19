import * as React from "react"
import "./badge.css"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

function Badge({
  className = '',
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`badge badge-${variant} ${className}`}
      {...props}
    />
  )
}

export { Badge }
