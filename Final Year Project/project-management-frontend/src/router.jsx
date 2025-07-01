import { createBrowserRouter } from "react-router-dom";

import {
    HomeLayoutPage,
    LandingPage,
    ErrorPage,
    ProjectsPage,
    DetailedProjectPage,
    UserTasksPage,
    ProjectsTasksPage,
    ProjectsFilesPage,
    NotificationsPage,
    SettingsPage,
    InvitesPage,
    RisksPage,
    MessagesPage,
    UserGuide
} from "./pages/index";

// react-router-dom used for client-side page routing, displays the HomeLayoutPage by default

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayoutPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: "/projects",
                element: <ProjectsPage />
            },
            {
                path: "/notifications",
                element: <NotificationsPage />
            },
            {
                path: "/settings",
                element: <SettingsPage />
            },
            {
                path: "/project/overview",
                element: <DetailedProjectPage />
            },
            {
                path: "/tasks",
                element: <UserTasksPage />
            },
            {
                path: "/project/tasks",
                element: <ProjectsTasksPage />
            },
            {
                path: "/project/files",
                element: <ProjectsFilesPage />
            },
            {
                path: "/invites",
                element: <InvitesPage />
            },
            {
                path: "/project/risks",
                element: <RisksPage />
            },
            {
                path: "/project/messages",
                element: <MessagesPage />
            },
            {
                path: "/guide",
                element: <UserGuide />
            }
        ]
    }
]);