import * as React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import '@testing-library/jest-dom/extend-expect'
import ProductDetail from './ProductDetail.jsx'
// import {expect} from 'jest'
// import RelatedList from './RelatedList.jsx'
import '@testing-library/jest-dom'

test('expect ProductDetail to render', () => {
  const testMessage = 'this is a test';
  render(<ProductDetail>{testMessage}</ProductDetail>)
  expect(screen.getByText('Overview')).toBeInTheDocument()
})