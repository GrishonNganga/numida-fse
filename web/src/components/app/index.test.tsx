import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import App from './index';

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Mock child components
vi.mock('./app-container', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-container">{children}</div>
  )
}));

vi.mock('./header', () => ({
  default: () => <div data-testid="header">Header</div>
}));

vi.mock('../loan', () => ({
  default: () => <div data-testid="loans">Loans</div>
}));

vi.mock('../error-boundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  )
}));

describe('App Component', () => {
  it('renders with all required components', () => {
    render(<App />);

    expect(screen.getByTestId('app-container')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('loans')).toBeInTheDocument();
  });

  it('maintains correct component hierarchy', () => {
    render(<App />);

    const container = screen.getByTestId('app-container');
    const errorBoundary = screen.getByTestId('error-boundary');

    expect(container).toContainElement(errorBoundary);
    expect(errorBoundary).toContainElement(screen.getByTestId('header'));
    expect(errorBoundary).toContainElement(screen.getByTestId('loans'));
  });
}); 