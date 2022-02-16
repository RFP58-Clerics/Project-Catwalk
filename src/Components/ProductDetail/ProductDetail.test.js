// import dependencies
import React from 'react';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
// add custom jest matchers from jest-dom
import {
  test, beforeAll, afterEach, afterAll,
} from '@testing-library/jest-dom';
// the component to test
import RARApp from './RARApp.jsx';

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/greeting', (req, res, ctx) =>
    // respond using a mocked JSON body
    res(ctx.json({ greeting: 'hello there' }))),
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test('displays widget title on page load', async () => {
  // Arrange
  render(<RARApp url="/reviews" />);
  // Act
  fireEvent.click(screen.getByText('Ratings And Reviews'));

  await waitFor(() => screen.getByRole('heading'));
  // Assert
});

// ...

test('handlers server error', async () => {
  server.use(
    // override the initial "GET /reviews" request handler
    // to return a 500 Server Error
    rest.get('/reviews', (req, res, ctx) => res(ctx.status(500))),
  );

  // ...
});
