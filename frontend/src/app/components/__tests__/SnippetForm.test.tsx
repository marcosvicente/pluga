import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SnippetForm from '../SnippetForm';

describe('SnippetForm', () => {
  test('calls the oSnippetForm prop with the input value upon form submission', () => {
    const mockOnAddSnippet = jest.fn();

    render(<SnippetForm onAddSnippet={mockOnAddSnippet} />);

    const inputElement = screen.getByPlaceholderText('Add a new snippet...');
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(inputElement, { target: { value: 'What is love?' } });
    fireEvent.click(addButton);

    expect(mockOnAddSnippet).toHaveBeenCalledTimes(1);
    expect(mockOnAddSnippet).toHaveBeenCalledWith('What is love?');
    expect(inputElement).toHaveValue('');
  });

  test('does not call onAddTodo if the input is empty', () => {
    const mockOnAddSnippet = jest.fn();

    render(<SnippetForm onAddSnippet={mockOnAddSnippet} />);

    const addButton = screen.getByRole('button', { name: /Add/i });

    expect(addButton).toBeDisabled();
    fireEvent.click(addButton);

    expect(mockOnAddSnippet).not.toHaveBeenCalled();

  });
});
