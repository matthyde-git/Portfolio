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
import DetailedProjects from '../../../src/components/projects/DetailedProjects.jsx';

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

describe('Tasks', () => {

  it('renders the tasks for a project where the user is not the team leader, selects a task the user is assigned to, updates the status and checks the response message', async () => {

    sessionStorage.setItem("username", "test@email.com");
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
      const toPrjTasks = screen.getByTestId("to-prj-tasks");
      user.click(toPrjTasks);
    })

    await waitFor(() => {
        const prjTasksBreadcrumbs = screen.getByTestId("prj-tasks-breadcrumbs");
        user.click(prjTasksBreadcrumbs);
    })

    await waitFor(() => {
        const updateStatusBtn = screen.getByTestId(12 + "update-status-btn");
        fireEvent.click(updateStatusBtn);
    })
    
    await waitFor(() => {
        const selectStatus = screen.getByTestId(12 + "update-status-selection");
        selectStatus.value = "Doing";
        const confirmBtn = screen.getByTestId(12 + "confirm-status-btn");
        fireEvent.click(confirmBtn);
    })
    
    const toastMessage = (await screen.findByRole("alert")).lastChild;
    
    expect(toastMessage.textContent).toBe("Status updated successfully"); // user successfully updates task status (T26.1)

  })
});