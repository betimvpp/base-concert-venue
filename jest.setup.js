/* eslint-disable simple-import-sort/imports */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { TextEncoder, TextDecoder } from "util";
import { server } from "./__tests__/__mocks__/msw/server";
import { resetDB } from "./__tests__/__mocks__/db/utils/reset-db";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

beforeAll(() => server.listen());

beforeEach(async () => {
  await resetDB();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
