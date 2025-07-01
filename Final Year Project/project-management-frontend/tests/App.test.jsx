import React from 'react'
import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from '../src/router.jsx'

import { store } from '../src/store.js'

import App from '../src/App.jsx'

describe('App', () => {

  it('renders the app component and checks that login button is present', () => {

    render(
        <Provider store={store}>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </Provider>
    )

    const loginBtn = document.getElementById("welcome-btn");

    expect(loginBtn).toBeInTheDocument();

    // screen.debug(); 
  })

});