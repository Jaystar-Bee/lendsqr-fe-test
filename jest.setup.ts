import "@testing-library/jest-dom";

// Polyfill fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

// Mock scroll methods that aren't available in jsdom
Element.prototype.scroll = jest.fn();
Element.prototype.scrollTo = jest.fn();
window.scroll = jest.fn();
window.scrollTo = jest.fn();

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (typeof args[0] === "string" && args[0].includes("not wrapped in act")) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
