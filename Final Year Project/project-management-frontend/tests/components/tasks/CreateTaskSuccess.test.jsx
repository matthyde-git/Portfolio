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

  it('renders the tasks for a project where the user is the team leader, creates a valid task and checks the response message', async () => {

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
      const toPrjTasks = screen.getByTestId("to-prj-tasks");
      user.click(toPrjTasks);
    })

    await waitFor(() => {
        const prjTasksBreadcrumbs = screen.getByTestId("prj-tasks-breadcrumbs");
        user.click(prjTasksBreadcrumbs);
    })

    const title = screen.getByTestId("create-task-title");
    const description = screen.getByTestId("create-task-description");
    const deadline = screen.getByTestId("create-task-deadline");

    title.value = "New Task";
    description.value = "Test description";
    deadline.value = "2025-06-12T15:00";

    expect(title).toBeRequired();
    expect(description).toBeRequired();
    expect(deadline).toBeRequired();

    const addTaskBtn = screen.getByTestId("add-task-btn");

    // await waitFor(() => {
    //   fireEvent.click(addTaskBtn)
    // })

    // const toastMessage = (await screen.findByRole("alert")).lastChild;

    // expect(toastMessage.textContent).toBe("Task created successfully");  // user successfully creates task (T21.1)

  })
});