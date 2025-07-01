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
    name: "test@email.com",
    nickname: "test"
}

beforeEach(() => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user,
  });
})

describe('Team members', () => {

  it('renders the invites page, checks that the accept and reject buttons are present', async () => {

    sessionStorage.setItem("username", "test@email.com");
    sessionStorage.setItem("teamleader", "test@email.com");
    sessionStorage.setItem("projectid", 9);

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
      const invitesBtn = screen.getByTestId("invites-btn");
      fireEvent.click(invitesBtn);  
    })
    
    await waitFor(() => {
        const invitesBreadcrumbs = screen.getByTestId("invites-breadcrumbs");
        user.click(invitesBreadcrumbs);
    })

    await waitFor(() => {
        const acceptBtn = screen.getByTestId(8 + "accept-btn"); // user views project invites (T17.1)
        const rejectBtn = screen.getByTestId(8 + "reject-btn");
        expect(acceptBtn).toBeInTheDocument();
        expect(rejectBtn).toBeInTheDocument();
    })

    await waitFor(() => {
        const confirmBtn = screen.getByTestId(8 + "confirm-accept-btn");
        expect(confirmBtn).toBeInTheDocument();
        // fireEvent.click(confirmBtn);
    })
    
    // const toastMessage = (await screen.findByRole("alert")).lastChild;
    
    // expect(toastMessage.textContent).toBe("Invite accepted successfully");  // user successfully accepts invite (T17.2)

    await waitFor(() => {
        const confirmBtn = screen.getByTestId(8 + "confirm-reject-btn");
        expect(confirmBtn).toBeInTheDocument();
        // fireEvent.click(confirmBtn);
    })
    
    // const toastMessage = (await screen.findByRole("alert")).lastChild;
    
    // expect(toastMessage.textContent).toBe("Invite rejected successfully");  // user successfully rejects invite (T13.2)

  })
});