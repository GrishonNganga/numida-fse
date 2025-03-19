import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './button';

describe('Button Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('button', 'button-primary');
    expect(button).not.toBeDisabled();
  });

  it('renders with different variants', () => {
    const variants = ['primary', 'secondary', 'destructive', 'ghost'] as const;
    
    variants.forEach(variant => {
      cleanup();
      render(<Button variant={variant}>Button {variant}</Button>);
      
      const button = screen.getByRole('button', { name: `Button ${variant}` });
      expect(button).toHaveClass('button', `button-${variant}`);
    });
  });

  it('renders with different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach(size => {
      cleanup();
      render(<Button size={size}>Button {size}</Button>);
      
      const button = screen.getByRole('button', { name: `Button ${size}` });
      expect(button).toHaveClass('button', 'button-primary');
      if (size !== 'md') {
        expect(button).toHaveClass(`button-${size}`);
      }
    });
  });

  it('renders with fullWidth prop', () => {
    render(<Button fullWidth>Full Width Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Full Width Button' });
    expect(button).toHaveClass('button', 'button-primary', 'button-full');
  });

  it('renders with custom className', () => {
    render(
      <Button className="custom-class">
        Custom Button
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Custom Button' });
    expect(button).toHaveClass('button', 'button-primary', 'custom-class');
  });

  it('renders disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  it('renders loading state with spinner', () => {
    render(<Button isLoading>Loading Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Loading Button' });
    expect(button).toHaveClass('button', 'button-primary', 'button-loading');
    expect(button).toBeDisabled();
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('spinner');
  });

  it('renders with children', () => {
    render(
      <Button>
        <span data-testid="child">Child Element</span>
      </Button>
    );

    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveClass('button', 'button-primary');
  });

  it('forwards additional props', () => {
    render(
      <Button
        data-testid="test-button"
        aria-label="Test button"
        type="submit"
      >
        Test Button
      </Button>
    );

    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'Test button');
    expect(button).toHaveAttribute('type', 'submit');
  });
}); 