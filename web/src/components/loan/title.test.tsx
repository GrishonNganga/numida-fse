import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from './title';

describe('Title Component', () => {
  const mockSetSearchFilter = vi.fn();

  beforeEach(() => {
    cleanup();
    mockSetSearchFilter.mockClear();
  });

  it('renders with title and search icon', () => {
    render(<Title searchFilter="" setSearchFilter={mockSetSearchFilter} />);
    
    expect(screen.getByText('Loans')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('shows search input when search icon is clicked', () => {
    render(<Title searchFilter="" setSearchFilter={mockSetSearchFilter} />);
    
    const searchIcon = screen.getByTestId('search-icon');
    fireEvent.click(searchIcon);
    
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByTestId('clear-icon')).toBeInTheDocument();
  });

  it('allows typing in search input', () => {
    render(<Title searchFilter="" setSearchFilter={mockSetSearchFilter} />);
    
    // Enable search
    const searchIcon = screen.getByTestId('search-icon');
    fireEvent.click(searchIcon);
    
    // Type in search input
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    expect(mockSetSearchFilter).toHaveBeenCalledWith('test search');
  });

  it('clears search when clear button is clicked', () => {
    render(<Title searchFilter="test" setSearchFilter={mockSetSearchFilter} />);
    
    // Enable search
    const searchIcon = screen.getByTestId('search-icon');
    fireEvent.click(searchIcon);
    
    // Click clear button
    const clearButton = screen.getByTestId('clear-icon');
    fireEvent.click(clearButton);
    
    expect(mockSetSearchFilter).toHaveBeenCalledWith('');
    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    render(<Title searchFilter="" setSearchFilter={mockSetSearchFilter} />);
    
    // Check container class
    const container = screen.getByText('Loans').parentElement?.parentElement;
    expect(container).toHaveClass('title-container');
    
    // Check title class
    expect(screen.getByText('Loans')).toHaveClass('title');
    
    // Enable search to test search-related classes
    const searchIcon = screen.getByTestId('search-icon');
    fireEvent.click(searchIcon);
    
    // Check search container and input classes
    const searchContainer = screen.getByPlaceholderText('Search...').parentElement;
    expect(searchContainer).toHaveClass('search-container');
    expect(screen.getByPlaceholderText('Search...')).toHaveClass('search-input');
    
    // Check clear search class
    const clearSearch = screen.getByTestId('clear-icon').parentElement;
    expect(clearSearch).toHaveClass('clear-search');
  });
}); 