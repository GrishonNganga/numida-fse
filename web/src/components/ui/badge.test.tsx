import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './badge';

describe('Badge Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    
    const badge = screen.getByText('Default Badge');
    expect(badge).toHaveClass('badge', 'badge-default');
  });

  it('renders with different variants', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline'] as const;
    
    variants.forEach(variant => {
      cleanup();
      render(<Badge variant={variant}>Badge {variant}</Badge>);
      
      const badge = screen.getByText(`Badge ${variant}`);
      expect(badge).toHaveClass('badge', `badge-${variant}`);
    });
  });

  it('renders with custom className', () => {
    render(
      <Badge className="custom-class">
        Custom Badge
      </Badge>
    );

    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('badge', 'badge-default', 'custom-class');
  });

  it('renders with custom attributes', () => {
    render(
      <Badge
        data-testid="test-badge"
        aria-label="Test badge"
      >
        Test Badge
      </Badge>
    );

    const badge = screen.getByTestId('test-badge');
    expect(badge).toHaveAttribute('aria-label', 'Test badge');
  });

  it('renders with empty className prop', () => {
    render(<Badge className="">Empty Class Badge</Badge>);
    
    const badge = screen.getByText('Empty Class Badge');
    expect(badge).toHaveClass('badge', 'badge-default');
  });

  it('renders with children', () => {
    render(
      <Badge>
        <span data-testid="child">Child Element</span>
      </Badge>
    );

    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveClass('badge', 'badge-default');
  });
}); 