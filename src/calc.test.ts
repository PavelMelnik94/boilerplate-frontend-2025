import { describe, expect, it } from 'vitest';

import { calc } from './main';

describe('calc function', () => {
  it('should correctly add two positive numbers', () => {
    const a = 5;
    const b = 3;
    const expected = 8;

    const result = calc(a, b);

    expect(result).toBe(expected);
  });

  it('should correctly add a positive and a negative number', () => {
    const a = 5;
    const b = -3;
    const expected = 2;

    const result = calc(a, b);

    expect(result).toBe(expected);
  });

  it('should correctly add two negative numbers', () => {
    const a = -5;
    const b = -3;
    const expected = -8;

    const result = calc(a, b);

    expect(result).toBe(expected);
  });

  it('should correctly add zero to a number', () => {
    const a = 5;
    const b = 0;
    const expected = 5;

    const result = calc(a, b);

    expect(result).toBe(expected);
  });

  it('should correctly add decimal numbers', () => {
    const a = 0.1;
    const b = 0.2;
    const expected = 0.3;

    const result = calc(a, b);

    expect(result).toBeCloseTo(expected); // Используем toBeCloseTo для чисел с плавающей точкой
  });

  it('should correctly add large numbers', () => {
    const a = Number.MAX_SAFE_INTEGER;
    const b = 1;
    const expected = Number.MAX_SAFE_INTEGER + 1;

    const result = calc(a, b);

    expect(result).toBe(expected);
  });

  it('should handle Number.MAX_VALUE correctly', () => {
    const a = Number.MAX_VALUE;
    const b = Number.MAX_VALUE;
    const expected = Infinity;

    const result = calc(a, b);

    expect(result).toBe(expected);
  });
});
