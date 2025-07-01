import React from 'react'
import { expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import * as auth0 from "@auth0/auth0-react";

import { router } from '../../../src/router.jsx'
import { store } from '../../../src/store.js'

import Footer from '../../../src/components/footer/Footer.jsx';

vi.mock("@auth0/auth0-react");

const user = {
    name: "test@email.com"
}

beforeEach(() => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user,
  });
})

describe('Footer', () => {

  it('renders the footer and checks that the input fields are present', () => {

    render(
      <Provider store={store}>
          <RouterProvider router={router}>
              <Footer />
          </RouterProvider>
      </Provider>
    )

    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
  })
});