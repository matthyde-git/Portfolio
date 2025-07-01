import React from 'react'
import { expect, vi, it, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import * as auth0 from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify'
import { fireEvent } from '@testing-library/react';

import { router } from '../../../src/router.jsx'
import { store } from '../../../src/store.js'

import App from '../../../src/App.jsx';

// NOTE: This was validated with data from my local database so the results may be different for you

vi.mock("@auth0/auth0-react");

const user = {
    name: "matthyde@email.com",
    nickname: "matthyde"
}

beforeEach(() => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user,
  });
})

describe('Team members', () => {

  it('renders the detailed project page where the user is the team leader, checks that the remove user button is present', async () => {

    sessionStorage.setItem("username", "matthyde@email.com");
    sessionStorage.setItem("teamleader", "matthyde@email.com");
    sessionStorage.setItem("projectid", 11);

    const user = userEvent.setup();

    render(
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
      const viewPrjBtn = screen.getByTestId(11 + "view-btn");
      user.click(viewPrjBtn);
    })
    
    await waitFor(() => {
      const detailedPrjBreadcrumbs = screen.getByTestId("detailed-prjs-breadcrumbs");
      user.click(detailedPrjBreadcrumbs);
    })

    await waitFor(() => {
        const removeBtn = screen.getByTestId(10 + "remove-user-btn");
        expect(removeBtn).toBeInTheDocument();
        fireEvent.click(removeBtn);
    })

    await waitFor(() => {
        const confirmBtn = screen.getByTestId(10 + "confirm-remove-user");
        expect(confirmBtn).toBeInTheDocument();
        // fireEvent.click(confirmBtn);
    })

    // const toastMessage = (await screen.findByRole("alert")).lastChild;
    
    // expect(toastMessage.textContent).toBe("User removed successfully");  // user successfully removes a team member (T18.1)
  })
});