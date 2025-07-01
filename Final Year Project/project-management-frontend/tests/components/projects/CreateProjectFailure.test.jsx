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

describe('Projects', async () => {

  it('renders the projects page, creates a project with invalid information and checks that the error message is displayed', async () => {

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

    const toPrjBtn = document.getElementById("to-prj-btn");

    await user.click(toPrjBtn);

    const prjBreadcrumbs = screen.getByTestId("prj-breadcrumbs");
    
    await user.click(prjBreadcrumbs);

    const title = screen.getByTestId("title");
    const description = screen.getByTestId("description");
    const deadline = screen.getByTestId("deadline");

    title.value = "Test title";
    description.value = "Test description";
    deadline.value = "2025-01-01T15:00";

    await waitFor(() => {
      fireEvent.click(screen.getByText("Create"))
    })

    const toastMessage = (await screen.findByRole("alert")).lastChild;

    expect(toastMessage.textContent).toBe("Deadline cannot be in the past");  // user fails to create project (T11.3)

  })
});