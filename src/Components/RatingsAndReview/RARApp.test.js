import 'babel-polyfill';
// import dependencies
import React from 'react';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  describe, expect, test, beforeAll, afterAll, afterEach,
} from '@jest/globals';
// import react-testing methods
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
// // add custom jest matchers from jest-dom
// import {
//   test, beforeAll, afterEach, afterAll,
// } from '@testing-library/jest-dom';
// the component to test
import RARApp from './RARApp.jsx';

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/reviews/meta/*', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({ greeting: 'hello there' }),
  )),
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test('displays widget title on page load', async () => {
  // Fake Product
  const product = {
    id: 40344,
    campus: 'hr-rfp',
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: '140.00',
    created_at: '2021-08-13T14:38:44.509Z',
    updated_at: '2021-08-13T14:38:44.509Z',
  };

  // Arrange
  render(<RARApp product={product}/>);
  // Act
  fireEvent.click(screen.getByText('Ratings and Reviews'));

  await waitFor(() => screen.getByRole('heading'));
  // Assert
});

// ...

// test('handlers server error', async () => {
//   server.use(
//     // override the initial 'GET /reviews" request handler
//     // to return a 500 Server Error
//     rest.get('/reviews', (req, res, ctx) => res(ctx.status(500))),
//   );

//   // ...
// });
