### Testing Guide for Rise Above (React + Vite)

This guide explains how to set up and use Vitest, Jest, and Cypress in this project. Prefer Vitest for unit/integration tests with Vite; Cypress for E2E. Jest is also viable but overlaps with Vitest.

### Why Vitest
- Tight integration with Vite (fast, native ESM)
- Jest-compatible APIs (`describe`, `it`, `expect`)
- Works well with React Testing Library

### Tooling Overview
- **Vitest**: unit/integration tests
- **React Testing Library (RTL)**: test React components as users would use them
- **Cypress**: end-to-end tests in a real browser
- **Jest**: alternative to Vitest (use one primary runner to avoid duplication)

### Project Conventions
- Tests live next to source files: `Component.test.tsx` or `utils.test.ts`
- Mocks in `__mocks__/` when needed
- Keep tests deterministic, avoid network: mock HTTP with MSW

### 1) Vitest Setup
1. Install dev deps:
```bash
npm i -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom msw
```
2. Update `vite.config.ts` (if not present already):
```ts
// test block
test: {
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.ts'],
  globals: true
}
```
3. Create `src/test/setup.ts`:
```ts
import '@testing-library/jest-dom';
```
4. Scripts in `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

Example RTL test:
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Button from '../components/common/Button';

test('button triggers click', async () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Click me</Button>);
  await userEvent.click(screen.getByText('Click me'));
  expect(onClick).toHaveBeenCalled();
});
```

### 2) Jest (Alternative)
If you prefer Jest over Vitest:
```bash
npm i -D jest @types/jest ts-jest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```
Config:
```bash
npx ts-jest config:init
```
`jest.config.js` minimal:
```js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};
```
Scripts:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Note: Don’t run Jest and Vitest concurrently in CI. Choose one primary runner.

### 3) Cypress (E2E)
Install:
```bash
npm i -D cypress
```
Open Cypress once to scaffold:
```bash
npx cypress open
```
Add script:
```json
{
  "scripts": {
    "e2e": "cypress run",
    "e2e:open": "cypress open"
  }
}
```

Sample E2E spec (`cypress/e2e/smoke.cy.ts`):
```ts
describe('Smoke', () => {
  it('loads home page', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Rise Above');
  });
});
```

### 4) State and Network Testing
- Use MSW for API mocking in unit/integration tests
- For Zustand stores, export the store and reset helpers; mock network boundaries

Zustand example:
```ts
import { act } from 'react-dom/test-utils';
import { useAppStore } from '../stores/useAppStore';

test('store updates', () => {
  const add = useAppStore.getState().addNotification;
  act(() => add({ type: 'success', message: 'ok' }));
  expect(useAppStore.getState().notifications.length).toBe(1);
});
```

### 5) CI Notes
- Run unit tests on every PR
- Run Cypress on main or nightly to save minutes

### 6) Choosing Between Vitest and Jest
- Prefer **Vitest** with Vite projects for speed and zero-config
- If your team already uses Jest tooling, you can keep Jest; APIs are similar

### 7) Migration Tips (Jest → Vitest)
- Replace `jest.fn()` with `vi.fn()`
- Replace `jest.mock()` with `vi.mock()`
- Most RTL tests work untouched

### 8) Command Summary
```bash
# Unit/Integration (Vitest)
npm run test
npm run test:ui
npm run test:coverage

# E2E (Cypress)
npm run e2e
npm run e2e:open
```

This doc is guidance only—no testing setup has been applied to the project yet.

