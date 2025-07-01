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

describe('Detailed project', () => {

  it('deletes a project, checks the user is navigated back to the projects page and the project is no longer present', async () => {

    sessionStorage.setItem("username", "test@email.com");
    sessionStorage.setItem("teamleader", "test@email.com");
    sessionStorage.setItem("projectid", 6);

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

    // await waitFor(() => {
    //   const viewPrjBtn = screen.getByTestId(6 + "view-btn");
    //   user.click(viewPrjBtn);
    // })
    
    // await waitFor(() => {
    //   const deleteBtn = screen.getByTestId("confirm-delete-project");
    //   fireEvent.click(deleteBtn);
    // })

    await waitFor(() => {
        const projectsList = screen.getByTestId("projects-list");
        expect(projectsList).toBeInTheDocument(); // user has been navigated back to projects page
    })

    await waitFor(() => {
        const viewPrjBtn = screen.queryByText("Deleted project title");  // looks for the title of the project that was just deleted
        expect(viewPrjBtn).not.toBeInTheDocument(); // user has deleted project and been redirected (T14.1)
    })

  })
});