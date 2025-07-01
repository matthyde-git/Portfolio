import React from 'react'
import { expect, vi, it, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import * as auth0 from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify'

import { router } from '../../src/router.jsx'
import { store } from '../../src/store.js'

import App from '../../src/App.jsx'

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

describe('User Guide', () => {

  it('renders the user guide page, checks that the content has loaded', async () => {

    const userClick = userEvent.setup();

    await render(
      <Provider store={store}>
            <ToastContainer position="top-center" />
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
      </Provider>
    )

    const userGuideBtn = screen.getByTestId("user-guide-btn");

    await userClick.click(userGuideBtn);

    const userGuideBreadcrumbs = screen.getByTestId("user-guide-breadcrumbs");
    const userGuide = screen.getByTestId("user-guide");

    expect(userGuideBreadcrumbs).toBeInTheDocument();
    expect(userGuide).toBeInTheDocument();  // user navigates to the user guide (T5.1)

  })
});