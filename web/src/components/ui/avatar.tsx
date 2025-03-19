import * as React from "react";
import "./avatar.css";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-testid="avatar-container"
        className={`avatar avatar-${size} ${className || ""}`}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="avatar-image"
          />
        ) : fallback ? (
          <div className="avatar-fallback">
            {fallback}
          </div>
        ) : null}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar }; 