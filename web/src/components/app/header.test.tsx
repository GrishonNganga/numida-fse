import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import Header from './header';

expect.extend(matchers);

vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ src, fallback, size }: { src: string; fallback: string; size: string }) => (
    <div data-testid="avatar" data-src={src} data-fallback={fallback} data-size={size}>
      {fallback}
    </div>
  )
}));

describe('Header Component', () => {
  it('renders with all required elements', () => {
    render(<Header />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('header-left')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.getByTestId('text-container')).toBeInTheDocument();
    
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-src', 'https://github.com/grishonnganga.png');
    expect(avatar).toHaveAttribute('data-fallback', 'GG');
    expect(avatar).toHaveAttribute('data-size', 'md');
    expect(screen.getByText('Welcome back,')).toBeInTheDocument();
    expect(screen.getByText('Grishon')).toBeInTheDocument();
  });

  it('maintains correct component hierarchy', () => {
    render(<Header />);

    const header = screen.getByTestId('header');
    
    const headerLeft = screen.getByTestId('header-left');
    expect(header).toContainElement(headerLeft);
    expect(headerLeft).toContainElement(screen.getByTestId('avatar-container'));
    expect(headerLeft).toContainElement(screen.getByTestId('text-container'));
  });
}); 