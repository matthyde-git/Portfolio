import React from 'react'
import { expect, vi, it, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import * as auth0 from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";

import { router } from '../../../src/router.jsx'
import { store } from '../../../src/store.js'

import NavBar from '../../../src/components/navbar/NavBar.jsx'

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

describe('NavBar', async () => {

  it('renders the nav bar and checks that the menu links work', async () => {

    sessionStorage.setItem("username", "test@email.com");

    const user = userEvent.setup();

    await render(
      <Provider store={store}>
            <ToastContainer position="top-center" />
            <RouterProvider router={router}>
              <NavBar />
            </RouterProvider>
      </Provider>
    )

    await waitFor(() => {
        const projectsMenuLink = screen.getByTestId("projects-menu-link");
        expect(projectsMenuLink).toBeInTheDocument();
        fireEvent.click(projectsMenuLink);  // navigates the user to the projects page (T4.1)
    })
  
    await waitFor(() => {
        const prjBreadcrumbs = screen.getByTestId("prj-breadcrumbs");
        expect(prjBreadcrumbs).toBeInTheDocument(); // checks that the projects page breadcrumbs have loaded (T4.2)
        user.click(prjBreadcrumbs);
    })

    await waitFor(() => {
        const projectsList = screen.getByTestId("projects-list");
        expect(projectsList).toBeInTheDocument(); // checks that the projects page content has loaded (T10.1)
    })
    
  })
});