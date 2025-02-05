import './style.css';

export const calc = (a: number, b: number): number => a + b;

export const createEl = (tag: string, text: string): HTMLElement => {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
};
