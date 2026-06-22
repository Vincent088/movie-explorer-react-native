import { getNumColumns } from '../../components/movie/MovieList';

describe('getNumColumns', () => {
  it('returns 2 columns for small phones (< 480px)', () => {
    expect(getNumColumns(375)).toBe(2);
    expect(getNumColumns(479)).toBe(2);
  });

  it('returns 3 columns for large phones (480–599px)', () => {
    expect(getNumColumns(480)).toBe(3);
    expect(getNumColumns(599)).toBe(3);
  });

  it('returns 4 columns for tablets (600–899px)', () => {
    expect(getNumColumns(600)).toBe(4);
    expect(getNumColumns(899)).toBe(4);
  });

  it('returns 5 columns for large tablets (900–1199px)', () => {
    expect(getNumColumns(900)).toBe(5);
    expect(getNumColumns(1199)).toBe(5);
  });

  it('returns 6 columns for desktop (>= 1200px)', () => {
    expect(getNumColumns(1200)).toBe(6);
    expect(getNumColumns(1920)).toBe(6);
  });
});
