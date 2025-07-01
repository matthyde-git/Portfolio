import React from 'react'
import { expect, vi, it, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import * as auth0 from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";

import { router } from '../../../src/router.jsx'
import { store } from '../../../src/store.js'

import NavBar from '../../../src/components/navbar/NavBar.jsx'

vi.mock("@auth0/auth0-react");

const user = {
    name: "test@email.com",
    nickname: "test"
}

beforeEach(() => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user,
  });
})

describe('NavBar', () => {

  it('renders the nav bar and checks that the user welcome message and logout button are shown', () => {

    render(
      <Provider store={store}>
            <ToastContainer position="top-center" />
            <RouterProvider router={router}>
              <NavBar />
            </RouterProvider>
      </Provider>
    )

    expect(screen.getByTestId("user").textContent).toBe("Welcome test");
    expect(screen.getByTestId("logout")).toBeInTheDocument();
  })
});