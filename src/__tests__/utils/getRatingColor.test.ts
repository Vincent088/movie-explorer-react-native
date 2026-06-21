import { getRatingColor } from '../../components/movie/MovieCard';

describe('getRatingColor', () => {
  it('returns green for rating >= 7', () => {
    expect(getRatingColor(7)).toBe('#27AE60');
    expect(getRatingColor(8.5)).toBe('#27AE60');
    expect(getRatingColor(10)).toBe('#27AE60');
  });

  it('returns amber for rating >= 5 and < 7', () => {
    expect(getRatingColor(5)).toBe('#F39C12');
    expect(getRatingColor(6.9)).toBe('#F39C12');
  });

  it('returns red for rating < 5', () => {
    expect(getRatingColor(4.9)).toBe('#E50914');
    expect(getRatingColor(0)).toBe('#E50914');
  });
});
