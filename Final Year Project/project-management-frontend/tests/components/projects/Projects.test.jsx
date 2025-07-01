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

  it('renders the projects page, checks for the breadcrumbs, create project form, invite button and a specific project', async () => {

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

    await waitFor(() => {
      const toPrjBtn = document.getElementById("to-prj-btn");
      user.click(toPrjBtn);
    })

    await waitFor(() => {
      const prjBreadcrumbs = screen.getByTestId("prj-breadcrumbs");
      expect(prjBreadcrumbs).toBeInTheDocument();
      user.click(prjBreadcrumbs);
    })

    await waitFor(() => {
      const projectTitle = screen.getByTestId(9 + "title");
      expect(projectTitle.textContent).toBe("Test project");
    })

    const invitesBtn = screen.getByTestId("invites-btn");
    expect(invitesBtn).toBeInTheDocument();

    const title = screen.getByTestId("title");
    const teamLeader = screen.getByTestId("teamleader")
    const description = screen.getByTestId("description");
    const status = screen.getByTestId("status");
    const deadline = screen.getByTestId("deadline");
    const createPrjBtn = document.getElementById("submit-btn");

    expect(title).toBeRequired();
    expect(teamLeader).toBeRequired();
    expect(teamLeader.value).toEqual("test@email.com"); // user is the team leader of their new project (T11.2)
    expect(description).toBeRequired();
    expect(status).toBeRequired();
    expect(status.value).toEqual("In progress");
    expect(deadline).toBeRequired();
    expect(createPrjBtn).toBeInTheDocument(); 

  })
});