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

describe('Files', () => {

  it('renders the files for a project where the user is the team leader, checks that the content has loaded and the buttons are present', async () => {

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
      const toPrjFiles = screen.getByTestId("to-prj-files");
      user.click(toPrjFiles); // user views project files (T27.1)
    })

    await waitFor(() => {
        const prjFilesBreadcrumbs = screen.getByTestId("prj-files-breadcrumbs");
        user.click(prjFilesBreadcrumbs);
    })

    await waitFor(() => {
        const uploadBTn = screen.getByTestId("upload-btn");
        expect(uploadBTn).toBeInTheDocument();

        const selectFile = screen.getByTestId("select-file-input");
        expect(selectFile).toBeRequired();  // user must select a file to upload (29.1)

        const deleteFileBtn = screen.getByTestId("test.txt-delete-btn");
        expect(deleteFileBtn).toBeInTheDocument();

        const downloadBtn = screen.getByTestId("test.txt-download-btn");
        expect(downloadBtn).toBeInTheDocument();  // button for T28.1
    })

  })
});