import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar } from './avatar';

describe('Avatar Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders with image when src is provided', () => {
    render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="User avatar"
      />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(img).toHaveAttribute('alt', 'User avatar');
    expect(img).toHaveClass('avatar-image');
  });

  it('renders with fallback text when no src is provided', () => {
    render(
      <Avatar
        fallback="JD"
        alt="John Doe"
      />
    );

    const fallback = screen.getByText('JD');
    expect(fallback).toHaveClass('avatar-fallback');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders with default size when not specified', () => {
    render(<Avatar fallback="JD" />);
    
    const container = screen.getByText('JD').parentElement;
    expect(container).toHaveClass('avatar', 'avatar-md');
  });

  it('renders with specified size', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach(size => {
      cleanup();
      render(<Avatar fallback="JD" size={size} />);
      
      const container = screen.getByText('JD').parentElement;
      expect(container).toHaveClass('avatar', `avatar-${size}`);
    });
  });

  it('renders with custom className', () => {
    render(
      <Avatar
        fallback="JD"
        className="custom-class"
      />
    );

    const container = screen.getByText('JD').parentElement;
    expect(container).toHaveClass('avatar', 'avatar-md', 'custom-class');
  });

  it('renders empty when no src or fallback is provided', () => {
    render(<Avatar />);
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    const container = screen.getByTestId('avatar-container');
    expect(container).toBeEmptyDOMElement();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(
      <Avatar
        ref={ref}
        fallback="JD"
      />
    );

    const container = screen.getByText('JD').parentElement;
    expect(ref.current).toBe(container);
  });
}); 