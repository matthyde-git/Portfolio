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

describe('Messages', () => {

  it('renders the message board for a project, checks that the content has loaded and the input field and buttons are present', async () => {

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
      const toPrjMessages = screen.getByTestId("to-prj-msgs");
      user.click(toPrjMessages);
    })

    await waitFor(() => {
        const prjMessagesBreadcrumbs = screen.getByTestId("prj-msgs-breadcrumbs");
        user.click(prjMessagesBreadcrumbs);
    })
    
    await waitFor(() => {

        const messageInput = screen.getByTestId("message-input");
        expect(messageInput).toBeInTheDocument(); // user views the project message board (T35.1)

        const sendMessageBtn = screen.getByTestId("send-message-btn");
        expect(sendMessageBtn).toBeInTheDocument();

        const messageReplyingTo = screen.getByTestId(8 + "message-replying-to");
        expect(messageReplyingTo.textContent).toBe("Replying to: Message");

        const messageReply = screen.getByTestId(8 + "message-reply");
        expect(messageReply.textContent).toBe("New message");

        const replyBtn = screen.getByTestId(8 + "msg-reply-btn");
        expect(replyBtn).toBeInTheDocument();

        const updateBtn = screen.getByTestId(8 + "msg-update-btn");
        expect(updateBtn).toBeInTheDocument();

        const deleteBtn = screen.getByTestId(8 + "msg-delete-btn");
        expect(deleteBtn).toBeInTheDocument();
    })

  })
});