import React from 'react'
import { expect, vi, it, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import * as auth0 from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify'

import { router } from '../../../src/router.jsx'
import { store } from '../../../src/store.js'

import App from '../../../src/App.jsx';

// NOTE: This was validated with data from my local database so the results may be different for you

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

describe('Settings', async () => {

  it('renders the settings page, updates the font and checks it has been applied', async () => {

    sessionStorage.setItem("username", "test@email.com");

    const user = userEvent.setup();

    await render(
      <Provider store={store}>
            <ToastContainer position="top-center" />
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
      </Provider>
    )

    const toSettingsBtn = screen.getByTestId("to-settings");
    await user.click(toSettingsBtn);

    const settingsBreadcrumbs = screen.getByTestId("settings-breadcrumbs");
    await user.click(settingsBreadcrumbs);

    const changeToLargerFontSize = screen.getByTestId("font-change");
    await user.click(changeToLargerFontSize);

    const root = document.getElementsByTagName("html")[0];

    expect(root.style.fontSize).toBe("larger"); // user updates their preferences (T7.1)

  })
});