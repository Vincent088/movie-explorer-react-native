import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MovieCard } from '../../components/movie/MovieCard';
import { Movie } from '../../types';

jest.mock('expo-image', () => {
  const React = require('react');
  const { View } = require('react-native');
  return { Image: (props: any) => React.createElement(View, props) };
});

const mockMovie: Movie = {
  id: 1,
  title: 'The Dark Knight',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'A great movie about a bat man.',
  release_date: '2008-07-18',
  vote_average: 9.0,
  genre_ids: [28, 80],
};

describe('MovieCard', () => {
  it('renders the movie title', async () => {
    const { getByText } = await render(<MovieCard movie={mockMovie} onPress={jest.fn()} />);
    expect(getByText('The Dark Knight')).toBeTruthy();
  });

  it('renders the release year', async () => {
    const { getByText } = await render(<MovieCard movie={mockMovie} onPress={jest.fn()} />);
    expect(getByText('2008')).toBeTruthy();
  });

  it('renders the rating', async () => {
    const { getByText } = await render(<MovieCard movie={mockMovie} onPress={jest.fn()} />);
    expect(getByText('★ 9.0')).toBeTruthy();
  });

  it('calls onPress with the movie when tapped', async () => {
    const onPress = jest.fn();
    const { getByText } = await render(<MovieCard movie={mockMovie} onPress={onPress} />);
    fireEvent.press(getByText('The Dark Knight'));
    expect(onPress).toHaveBeenCalledWith(mockMovie);
  });

  it('does not crash when poster_path is null', async () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    const { getByText } = await render(<MovieCard movie={movieWithoutPoster} onPress={jest.fn()} />);
    expect(getByText('The Dark Knight')).toBeTruthy();
  });
});
