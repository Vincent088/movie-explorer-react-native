import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ErrorMessage } from '../../components/common/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the error message', async () => {
    const { getByText } = await render(
      <ErrorMessage message="Network error" />
    );
    expect(getByText('Network error')).toBeTruthy();
  });

  it('renders retry button when onRetry is provided', async () => {
    const onRetry = jest.fn();
    const { getByText } = await render(
      <ErrorMessage message="Network error" onRetry={onRetry} />
    );
    expect(getByText('Retry')).toBeTruthy();
  });

  it('calls onRetry when retry button is pressed', async () => {
    const onRetry = jest.fn();
    const { getByText } = await render(
      <ErrorMessage message="Network error" onRetry={onRetry} />
    );
    fireEvent.press(getByText('Retry'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render retry button when onRetry is not provided', async () => {
    const { queryByText } = await render(
      <ErrorMessage message="Network error" />
    );
    expect(queryByText('Retry')).toBeNull();
  });
});
