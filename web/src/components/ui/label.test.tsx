import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Label } from './label';

describe('Label Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders with default props', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('label');
  });

  it('renders with custom className', () => {
    render(<Label className="custom-label">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('label', 'custom-label');
  });

  it('forwards additional props to label element', () => {
    render(
      <Label
        htmlFor="test-input"
        aria-label="Test label"
        data-testid="test-label"
      >
        Test Label
      </Label>
    );
    const label = screen.getByTestId('test-label');
    expect(label).toHaveAttribute('for', 'test-input');
    expect(label).toHaveAttribute('aria-label', 'Test label');
  });

  it('renders with custom styles', () => {
    render(
      <Label style={{ color: 'red', fontWeight: 'bold' }}>
        Test Label
      </Label>
    );
    const label = screen.getByText('Test Label');
    expect(label).toHaveStyle({
      color: 'rgb(255, 0, 0)',
      fontWeight: 'bold'
    });
  });

  it('renders with children elements', () => {
    render(
      <Label data-testid="test-label">
        <span>Test</span>
        <span>Label</span>
      </Label>
    );
    const label = screen.getByTestId('test-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('label');
    expect(label.children).toHaveLength(2);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
}); 