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

describe('Detailed Project', async () => {

  it('renders the detailed project page, updates a project with invalid information and checks for the error message', async () => {

    sessionStorage.setItem("username", "test@email.com");
    sessionStorage.setItem("teamleader", "test@email.com");
    sessionStorage.setItem("projectid", 9);

    const user = userEvent.setup();

    await render(
      <Provider store={store}>
            <ToastContainer position="top-center" />
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
      </Provider>
    )

    await waitFor(() => {
      const toPrjBtn = document.getElementById("to-prj-btn");
      user.click(toPrjBtn);
    })
    
    await waitFor(() => {
      const prjBreadcrumbs = screen.getByTestId("prj-breadcrumbs");
      user.click(prjBreadcrumbs);
    })
    
    await waitFor(() => {
      const viewPrjBtn = screen.getByTestId(9 + "view-btn");
      user.click(viewPrjBtn);
    })

    await waitFor(() => {
      const detailedPrjBreadcrumbs = screen.getByTestId("detailed-prjs-breadcrumbs");
      user.click(detailedPrjBreadcrumbs);
    })

    const title = screen.getByTestId("title");
    const description = screen.getByTestId("description");
    const status = screen.getByTestId("status");
    const deadline = screen.getByTestId("deadline");
    const updateBtn = screen.getByTestId("update-btn");

    title.value = "Test title";
    description.value = "Test description";
    status.value = "In progress"
    deadline.value = "2025-01-01T15:00";

    await waitFor(() => {
      fireEvent.click(updateBtn)
    })

    const toastMessage = (await screen.findByRole("alert")).lastChild;

    expect(toastMessage.textContent).toBe("Invalid date");  // user fails to update project (T13.2)
  })
});