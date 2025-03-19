import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';

describe('Dialog Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('does not render when open is false', () => {
    render(
      <Dialog open={false}>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open is true', () => {
    render(
      <Dialog open={true}>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders with all subcomponents', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
          <div>Dialog content</div>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('calls onOpenChange when overlay is clicked', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open={true} onOpenChange={onOpenChange}>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    const overlay = screen.getByRole('dialog').firstElementChild;
    fireEvent.click(overlay!);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Dialog open={true}>
        <DialogContent onClose={onClose}>Content</DialogContent>
      </Dialog>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders with correct CSS classes', () => {
    render(
      <Dialog open={true}>
        <DialogContent className="custom-content">
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toHaveClass('dialog-root');
    expect(screen.getByRole('dialog').firstElementChild).toHaveClass('dialog-overlay');
    expect(screen.getByRole('dialog').lastElementChild).toHaveClass('dialog-content', 'custom-content');
    expect(screen.getByText('Test Dialog').parentElement).toHaveClass('dialog-header', 'custom-header');
    expect(screen.getByText('Test Dialog')).toHaveClass('dialog-title', 'custom-title');
  });

  it('renders close button with correct icon', () => {
    render(
      <Dialog open={true}>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toHaveClass('dialog-close');
    expect(closeButton.querySelector('svg')).toHaveClass('dialog-close-icon');
  });

  it('forwards additional props to DialogContent', () => {
    render(
      <Dialog open={true}>
        <DialogContent
          aria-label="Test dialog"
        >
          Content
        </DialogContent>
      </Dialog>
    );

    const content = screen.getByRole('dialog').lastElementChild;
    expect(content).toHaveAttribute('aria-label', 'Test dialog');
  });
}); 