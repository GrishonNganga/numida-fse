import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import AppContainer from './app-container';

expect.extend(matchers);

vi.mock('@/assets/logo.numida.png', () => ({
  default: 'mocked-logo.png'
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick} data-testid="loan-calculator-button">
      {children}
    </button>
  )
}));

vi.mock('./loan-calculator-modal', () => ({
  default: ({ open, onClose }: { open: boolean; onClose: () => void }) => (
    <div data-testid="loan-calculator-modal">
      {open && (
        <div>
          <button onClick={onClose} data-testid="close-modal">Close</button>
        </div>
      )}
    </div>
  )
}));

describe('AppContainer Component', () => {
  it('renders with all required elements', () => {
    render(
      <AppContainer>
        <div data-testid="test-child">Test Content</div>
      </AppContainer>
    );

    expect(screen.getByTestId('app-container')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByTestId('loan-calculator-button')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('opens loan calculator modal when button is clicked', () => {
    render(
      <AppContainer>
        <div>Test Content</div>
      </AppContainer>
    );

    expect(screen.queryByTestId('close-modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('loan-calculator-button'));
    expect(screen.getByTestId('close-modal')).toBeInTheDocument();
  });

  it('closes loan calculator modal when close button is clicked', () => {
    render(
      <AppContainer>
        <div>Test Content</div>
      </AppContainer>
    );

    fireEvent.click(screen.getByTestId('loan-calculator-button'));
    expect(screen.getByTestId('close-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('close-modal'));
    expect(screen.queryByTestId('close-modal')).not.toBeInTheDocument();
  });
}); 