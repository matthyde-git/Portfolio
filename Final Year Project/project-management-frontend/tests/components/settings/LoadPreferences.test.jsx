import React from 'react'
import { expect, vi, it, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import * as auth0 from "@auth0/auth0-react";

import { router } from '../../../src/router.jsx'
import { store } from '../../../src/store.js'

import LandingPage from '../../../src/pages/LandingPage.jsx'

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

describe('LandingPage', () => {

  it('renders the landing page after authentication and checks that the user preferences has loaded', async () => {

    sessionStorage.setItem("username", "test@email.com");

    render(
        <Provider store={store}>
            <RouterProvider router={router}>
                <LandingPage />
            </RouterProvider>
        </Provider>
    )

    await waitFor(() => {
      const root = document.getElementsByTagName("html")[0];
      expect(root.style.fontSize).toBe("larger");   // user preferences are loaded on login (T7.2)
    })
  })
});