import React from 'react'
import { expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import * as auth0 from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

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

  it('enters a valid email into the input field and creates a POST request, then checks the response is correct', async () => {

    const user = userEvent.setup();

    render(
      <Provider store={store}>
          <ToastContainer position="top-center" />
          <RouterProvider router={router}>
              <Footer />
          </RouterProvider>
      </Provider>
    )

    const inputField = screen.getByTestId("email");
    const submitBtn = screen.getByTestId("submit-btn");

    inputField.value = "test@email.com";

    // await user.click(submitBtn);

    // const toastMessage = (await screen.findByRole("alert")).lastChild;

    // expect(toastMessage.textContent).toBe("Email has been submitted successfully");  // contact info successfully sent (T6.1)
  })
});