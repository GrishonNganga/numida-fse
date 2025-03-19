import * as React from "react";
import "./dialog.css";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="dialog-root" role="dialog" aria-modal="true">
      <div className="dialog-overlay" onClick={() => onOpenChange?.(false)} />
      {children}
    </div>
  );
}

function DialogContent({ children, className = "", onClose, ...props }: DialogContentProps) {
  return (
    <div className={`dialog-content ${className}`} {...props}>
      {children}
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Close dialog"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="dialog-close-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

function DialogHeader({ children, className = "" }: DialogHeaderProps) {
  return <div className={`dialog-header ${className}`}>{children}</div>;
}

function DialogTitle({ children, className = "" }: DialogTitleProps) {
  return <h2 className={`dialog-title ${className}`}>{children}</h2>;
}

export { Dialog, DialogContent, DialogHeader, DialogTitle };
