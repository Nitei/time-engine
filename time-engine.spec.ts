import { time } from 'src/time-engine';

describe('time-engine', () => {
  it('should change the date 2029/09/07 -> 2029-09-07', () => {
    expect(time('2029/09/07').toYYYYMMDD('-')).toBe('2029-09-07');
  });

  it('should change the date 2029-09-07 -> 07/09/2029', () => {
    expect(time('2029-09-07').toDDMMYYYY('/')).toBe('07/09/2029');
  });

  it('should change the date 07/09/2029 -> 2029-09-07', () => {
    expect(time('07/09/2029').toYYYYMMDD('-')).toBe('2029-09-07');
  });

  it('should return an instance', () => {
    expect(time('07/09/2029').getAsDate()).toBeInstanceOf(Date);
  });

  it('should get an instance of Date from 2029-09-07', () => {
    expect(time('2029-09-07').getAsDate().getDate()).toBe(7);
  });

  it('should return data from 2029-09-07', () => {
    expect(time('2029/09/07').getDayMonthYear()).toEqual({
      day: '07',
      month: '09',
      year: '2029',
    });
  });
});
