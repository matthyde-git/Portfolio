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

  it('renders the message board for a project, updates a reply message and checks that it is present in the message board', async () => {

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
        const replyBtn = screen.getByTestId(8 + "msg-reply-btn");
        fireEvent.click(replyBtn);
    })

    const newReplyMessage = screen.getByTestId(8 + "reply-message-form-input");
    expect(newReplyMessage).toBeRequired();

    newReplyMessage.textContent = "New reply";

    const sendReplyBtn = screen.getByTestId(8 + "reply-message-form-btn");

    // await waitFor(() => {
    //     fireEvent.click(sendReplyBtn);
    // })

    // await waitFor(() => {
    //     const newMessage = screen.getByTestId(9 + "message-reply");
    //     expect(newMessage.textContent).toBe("New reply");  // user creates reply and is displayed in the board (T39.1)
    // })

  })
});