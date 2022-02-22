import 'babel-polyfill';
// import dependencies
import React from 'react';

import {
  describe, expect, test, beforeAll, afterAll, afterEach,
} from '@jest/globals';
// import react-testing methods
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import RARApp from './RARApp.jsx';

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
  //fireEvent.click(screen.getByText('Ratings and Reviews'));

  // await waitFor(() => screen.getByRole('heading'));
  // Assert
  expect(screen.getByRole('heading')).toHaveTextContent('Ratings and Reviews');
});

test('displays 2 reviews on page load', async () => {
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
  render(<RARApp product={product} />);
  // Act
  fireEvent.click(screen.getByText('Leave a Review'));
  await waitFor(() => screen.getByRole('heading'));

  // await waitFor(() => screen.getByRole('button', { name: /more reviews/i }));
  // Assert
  // expect(screen.getByRole('heading')).toHaveTextContent('Ratings and Reviews');

  expect(screen.getByRole('heading').toHaveTextContent('Write your Review'));
  // expect(screen.getByRole('button')).toBeDisabled()
});
