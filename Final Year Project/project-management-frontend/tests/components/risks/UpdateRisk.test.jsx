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

    await waitFor(() => {
        const showUpdateForm = screen.getByTestId(6 + "update-risk-btn");
        fireEvent.click(showUpdateForm);
    })

    const updateRiskTitle = screen.getByTestId(6 + "update-risk-title");
    const updateRiskCategory = screen.getByTestId(6 + "update-risk-category");
    const updateRiskImpact = screen.getByTestId(6 + "update-risk-impact");
    const updateRiskImpactLevel = screen.getByTestId(6 + "update-risk-impact-level");
    const updateRiskLikelihood = screen.getByTestId(6 + "update-risk-likelihood");
    const updateRiskControl = screen.getByTestId(6 + "update-risk-control");
    const updateRiskResponse = screen.getByTestId(6 + "update-risk-response");
    const updateRiskPriority = screen.getByTestId(6 + "update-risk-priority");
    const updateRiskBtn = screen.getByTestId(6 + "update-risk-form-btn");

    // everything required to prevent invalid risks (T33.2)
    expect(updateRiskTitle).toBeRequired();
    expect(updateRiskCategory).toBeRequired();
    expect(updateRiskImpact).toBeRequired();
    expect(updateRiskImpactLevel).toBeRequired();
    expect(updateRiskLikelihood).toBeRequired();
    expect(updateRiskControl).toBeRequired();
    expect(updateRiskResponse).toBeRequired();
    expect(updateRiskPriority).toBeRequired();

    updateRiskTitle.value = "New title";
    updateRiskCategory.value = "New category";
    updateRiskImpact.value = "New impact";
    updateRiskImpactLevel.value = 5;
    updateRiskLikelihood.value = 5;
    updateRiskControl.value = "New control";
    updateRiskResponse.value = "New response";
    updateRiskPriority.value = 5;
    
    await waitFor(() => {
      fireEvent.click(updateRiskBtn);
    })

    const toastMessage = (await screen.findByRole("alert")).lastChild;

    expect(toastMessage.textContent).toBe("Risk updated successfully"); // user successfully updates risk (T33.1)

  })
});