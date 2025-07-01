import React from 'react'
import { expect, vi, it, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import * as auth0 from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify'

import { router } from '../../../src/router.jsx';
import { store } from '../../../src/store.js';

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

describe('Tasks', async () => {

  it('renders a list of the users tasks, then checks the content is loaded', async () => {

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

    const toTasksBtn = screen.getByTestId("to-tasks");
    
    await user.click(toTasksBtn);

    await waitFor(() => {
        const tasksBreadcrumbs = screen.getByTestId("tasks-breadcrumbs");
        user.click(tasksBreadcrumbs);
    })

    await waitFor(() => {
        const taskTitle = screen.getByTestId(12 + "title");
        expect(taskTitle.textContent).toBe("Update status test"); // user views their active tasks (T9.1)

        const deadline = screen.getByTestId(12 + "deadline");
        expect(deadline.classList.contains("text-error")).toBe(false); // task is not overdue

        const markAsDoneBtn = screen.getByTestId(12 + "mark-done-btn");
        expect(markAsDoneBtn).toBeInTheDocument();
    })

  })
});