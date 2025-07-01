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

  it('renders the detailed project page where the user is the team leader, checks that the content has loaded and the delete button is present', async () => {

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
      const viewPrjBtn = screen.getByTestId(9 + "view-btn");
      user.click(viewPrjBtn);
    })
    
    await waitFor(() => {
      const detailedPrj = screen.getByTestId("detailed-prj"); // user views the detailed project view (T12.1)
      const detailedPrjBreadcrumbs = screen.getByTestId("detailed-prjs-breadcrumbs");
      const deleteBtn = screen.getByTestId("project-delete-btn");
      const deadline = screen.getByTestId("prj-deadline");
      expect(detailedPrj).toBeInTheDocument();
      expect(detailedPrjBreadcrumbs).toBeInTheDocument();
      expect(deleteBtn).toBeInTheDocument();
      expect(deadline.classList.contains("text-error")).toBe(false); // project is not overdue
    })

  })
});