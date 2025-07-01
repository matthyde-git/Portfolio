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

describe('Notifications', async () => {

  it('checks for the notifications indicator, then renders the notifications page and checks the content is loaded', async () => {

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

    const toNotifsBtn = screen.getByTestId("to-notifs");
    
    await user.click(toNotifsBtn);  // user accesses their notifications (T8.1)

    await waitFor(() => {
        const notifsBreadcrumbs = screen.getByTestId("notifs-breadcrumbs");
        user.click(notifsBreadcrumbs);
    })

    await waitFor(() => {
        const notifIndicator = screen.getByTestId("notif-indicator");
        expect(notifIndicator).toBeInTheDocument();
        expect(notifIndicator.textContent).toBe("4"); // user views the notification icon (T8.2)
        const notifMessage = screen.getByTestId(2 + "title");
        expect(notifMessage.textContent).toBe("Test notification");
        const clearNotifBtn = screen.getByTestId(2 + "clear-notif-btn");
        const clearAllBtn = screen.getByTestId("clear-all-btn");
        expect(clearNotifBtn).toBeInTheDocument();
        expect(clearAllBtn).toBeInTheDocument();
        expect(screen.getByText("There are new tasks in project: Building a project management system")).toBeInTheDocument(); // user notified that there is new content in a project (T40.1)
        expect(screen.getByText("You have been invited to a project")).toBeInTheDocument(); // user notified that they've been invited to a project (T16.1)
        expect(screen.getByText("You have been removed from project: Notification testing")).toBeInTheDocument(); // user notified that they've been removed from a project (T18.2)
    })

  })
});