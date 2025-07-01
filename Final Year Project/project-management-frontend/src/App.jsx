import React, { useState, useEffect } from "react"
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useIdleTimer } from "react-idle-timer";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const [state, setState] = useState("Active");
  const [count, setCount] = useState(0)
  const [remaining, setRemaining] = useState(0)

  const onIdle = () => {
    setState('Idle')
  }

  const onActive = () => {
    setState('Active')
  }

  const onAction = () => {
    setCount(count + 1)
  }

  // react-idle-timer used to countdown users inactivity time and resets when they interact with the app
  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 600000,
    throttle: 500
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  })

  const { logout } = useAuth0();

  const handleExpiredSession = () => {
    // logs the user out and clears the session storage when the user has been inactive for 10 minutes
    logout();
    sessionStorage.clear();
  }

  if (sessionStorage.getItem("username") === null)
  {
    return (
      /* Displays the app with default preferences */
  
      <div className="app" data-theme="dark">
        <RouterProvider router={router} />
      </div>
    );
  }
  else
  {

    if (state === "Idle")
    {
      handleExpiredSession();
    }

    if (sessionStorage.getItem("theme") !== null)
    {
      const root = document.getElementsByTagName("html")[0];
        
      root.style.fontSize = sessionStorage.getItem("font");
    }

    return (
      /* Displays the app with the users preferences applied */
  
      <div className="app" data-theme={sessionStorage.getItem("theme")}>
        <RouterProvider router={router} />
      </div>
    );
  }
  
};

export default App;
