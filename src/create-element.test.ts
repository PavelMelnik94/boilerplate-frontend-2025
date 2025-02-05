import { describe, expect, it } from 'vitest';

import { createEl as createElement } from './main';

describe('createEl function', () => {
  it('should create element with given tag', () => {
    const element = createElement('div', '');
    expect(element.tagName.toLowerCase()).toBe('div');
  });

  it('should create element with given text content', () => {
    const element = createElement('span', 'Hello');
    expect(element.textContent).toBe('Hello');
  });

  it('should create element with empty text content', () => {
    const element = createElement('p', '');
    expect(element.textContent).toBe('');
  });

  it('should create different types of HTML elements', () => {
    const tags = ['div', 'span', 'p', 'h1', 'button'];
    tags.forEach((tag) => {
      const element = createElement(tag, '');
      expect(element.tagName.toLowerCase()).toBe(tag);
    });
  });

  it('should handle special characters in text content', () => {
    const element = createElement('div', '<>&"\'');
    expect(element.textContent).toBe('<>&"\'');
  });

  it('should create element with unicode characters', () => {
    const element = createElement('div', '你好世界');
    expect(element.textContent).toBe('你好世界');
  });
});
