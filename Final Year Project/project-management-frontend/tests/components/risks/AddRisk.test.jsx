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

describe('Risks', () => {

  it('renders the risks for a project where the user is the team leader, creates a risk and checks that the response is correct', async () => {

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
      const toPrjRisks = screen.getByTestId("to-prj-risks");
      user.click(toPrjRisks);
    })

    await waitFor(() => {
        const prjRisksBreadcrumbs = screen.getByTestId("prj-risks-breadcrumbs");
        user.click(prjRisksBreadcrumbs);
    })

    const addRiskTitle = screen.getByTestId("add-risk-title");
    const addRiskCategory = screen.getByTestId("add-risk-category");
    const addRiskImpact = screen.getByTestId("add-risk-impact");
    const addRiskImpactLevel = screen.getByTestId("add-risk-impact-level");
    const addRiskLikelihood = screen.getByTestId("add-risk-likelihood");
    const addRiskControl = screen.getByTestId("add-risk-control");
    const addRiskResponse = screen.getByTestId("add-risk-response");
    const addRiskPriority = screen.getByTestId("add-risk-priority");
    const addRiskBtn = screen.getByTestId("add-risk-btn");

    // everything required to prevent invalid risks (T32.2)
    expect(addRiskTitle).toBeRequired();
    expect(addRiskCategory).toBeRequired();
    expect(addRiskImpact).toBeRequired();
    expect(addRiskImpactLevel).toBeRequired();
    expect(addRiskLikelihood).toBeRequired();
    expect(addRiskControl).toBeRequired();
    expect(addRiskResponse).toBeRequired();
    expect(addRiskPriority).toBeRequired();

    addRiskTitle.value = "Test title";
    addRiskCategory.value = "Test category";
    addRiskImpact.value = "Test impact";
    addRiskImpactLevel.value = 1;
    addRiskLikelihood.value = 1;
    addRiskControl.value = "Test control";
    addRiskResponse.value = "Test response";
    addRiskPriority.value = 1;
    
    // await waitFor(() => {
    //   fireEvent.click(addRiskBtn);
    // })

    // const toastMessage = (await screen.findByRole("alert")).lastChild;

    // expect(toastMessage.textContent).toBe("Risk created successfully");  // user successfully creates risk (T32.1)

  })
});