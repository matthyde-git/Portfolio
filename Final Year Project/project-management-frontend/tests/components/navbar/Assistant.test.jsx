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

describe('NavBar', () => {

  it('renders the nav bar and checks that the assistant content is present', async () => {

    // Note: It was not possible to test the answer outputs as the testing library does not recognise the tensorflowjs qna method

    render(
      <Provider store={store}>
            <ToastContainer position="top-center" />
            <RouterProvider router={router}>
              <NavBar />
            </RouterProvider>
      </Provider>
    )

    const question = screen.getByTestId("question");
    const questionBtn = screen.getByTestId("question-btn");
    const answer = screen.getByTestId("answer");

    // fields for T42.1
    expect(question).toBeInTheDocument();
    expect(question).toBeRequired();
    expect(questionBtn).toBeInTheDocument();
    expect(answer).toBeInTheDocument();
  })
});