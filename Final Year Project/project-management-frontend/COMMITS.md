# Commit Notes

# 71st Commit
- fixed issues in the features
- commented out logs

# 70th Commit
- test commenting and improvements

# 69th Commit
- made css changes for the laptop
- fixed the file upload delay
- updated the test data

# 68th Commit
- added additional tests
- fixed the beforeEach calls in the tests
- added READMEs to the repo

# 67th Commit
- added the tensflowjs qna assistant
- improved the update task status ui
- added a back button to the settings page
- added a button for the user guide to the nav bar
- linked the error page to the user guide

# 66th Commit
- added the back button to the invites page
- made it so that logouts clear the session storage
- used the react-idle-time package to log the users out and clear session storage after ten minutes of inactivity

# 65th Commit
- finished the front-end tests

# 64th Commit
- improved the update task feature
- added back buttons to previous pages
- fixed the kanban board on smaller screens
- hid components on smaller screens to improve styling

# 63rd Commit
- set up a persistor to maintain redux states on refresh
- added testids for the deletion tests
- made changes based on user testing
    - fixed an issue with the preferences
    - fixed the date issue
    - improved risk styling
    - pointer shown when hovering over messages
    - update message stores original message as default value
    - changed the file text to be consistent with the rest of the app
    - capitalised the username in the navbar
    - added a button to the nav that navigates to the user guide

# 62nd Commit
- added the messages tests

# 61st Commit
- added the risks tests

# 60th Commit
- added the files tests
- replaced the p elements in the tables

# 59th Commit
- added most of the tasks tests

# 58th Commit
- added the team member tests

# 57th Commit
- finished the tests for project features

# 56th Commit
- added tests for project creation success/failure
- added tests for the user guide
- updated for to htmlFor in the forms

# 55th Commit
- finished the user guide
- fixed the notifactions issue
- setup automatic notif refreshes
- fixed the settings issues
- added a test for the projects page

## 54th Commit
- added more to the user guide
- fixed an issue with project task creation

## 53rd Commit
- added unit tests for the footer and navabar
- added more to the user guide

## 52nd Commit
- set up vitest and react testing library
- began the component unit testing

## 51st Commit
- added a feature that allows users to update their tasks to done in the tasks page

# 50th Commit
- add indicators when projects and tasks are upcomming or overdue
- displayed user messages when there are no projects/notifs/tasks/risks/files/messages
- fixed the refresh issues in the tasks page
- finished the code commenting

## 49th Commit
- made it so that the user cannot invite themselves to their project
- set up the user guide page
- created team notifications for project features

## 48th Commit
- added the delete single notification feature
- cleared the console logs
- improved the messages styling on small screens

## 47th Commit
- improved the styling of detailed projects
- made the app work on smaller screens
- added the project progress monitoring

## 46th Commit
- finished the files feature
- minor style changes to the detailed projects component

## 45th Commit
- added the styling for the upload/download files feature
- added comments up to the tasks section
- improved the styling of the detailed projects

## 44th Commit
- added comments up to the projects components
- set up the frontend for uploading and downloading files

## 43rd Commit
- added comments throughout the app upto the messages components

## 42nd Commit
- added the update message feature
- added the delete message feature
- made it so messages are highlighted if they're replying to the user

## 41st Commit
- added new indiciators for the notifs and invites
- added breadcrumbs to project tasks, messages and risks

## 40th Commit
- added the reply to user feature
- added a message to the landing page to tell the user about 3rd party cookies

## 39th Commit
- made it so that the app works on smaller screens
- improved the messages styling

## 38th Commit
- added automatic fetching to the message boards

## 37th Commit
- switched from local storage to session storage so it doesn't persist
- added a feature to show the message being replied to
- added the send message feature

## 36th Commit
- set up the messages fetching
- began working on the UI for sending messages

## 35th Commit
- created the add risk UI
- created the update risk UI
- created the delete risk UI

## 34th Commit
- set up the project risk fetching
- created the risks page
- checked the email's in the invite form are valid

## 33rd Commit
- fixed the font size issues
- made it so that team members are notified when tasks are updated
- updated the datetime string in the project tasks

## 32nd Commit
- added the clear user notifs feature
- added the indicator to the notifications icon

## 31st Commit
- finished the update settings feature
- fixed the refresh bug on the settings page

## 30th Commit
- finished the leave project feature
- made it so that modals automatically close when users perform cetain actions

## 29th Commit
- finished the user views of the tasks
- added the leave task feature for normal users

## 28th Commit
- changed the cursor to pointers where relevant
- added the remove user feature

## 27th Commit
- added the invite accpet/reject features
- fixed an issue with the notifications
    - and identified another in the backend that is an easy fix

## 26th Commit
- added the invite user feature
- rendered user invites to a new page

## 25th Commit
- added the join and leave task features

## 24th Commit
- added the delete project feature
- added the delete task feature
- improved the task modals

## 23rd Commit
- made it so that team leader features only load if the user is the team leader
- added the create task feature
- added an invites button to projects
- added a remove user button to team members

## 22nd Commit
- created the update status UI
- updated the user tasks table
- made it so that team leaders and normal users have different permissions when interacting with tasks

## 21st Commit
- set up the structure for the Kanban board and tasks

## 20th Commit
- added a tasks card to the landing page
- moved the breadcrumbs on top of the nav bar
- fixed the detailed projects styling

## 19th Commit
- set up the project files routing
- created the create projects feature

## 18th Commit
- set up the UI for updating projects
- validated the deadline input field

## 17th Commit
- set up the project task fetching
- styled the detailed projects some more

## 16th Commit
- set up the project file fetching
- somehow fixed the notifs refresh issue by moving the Notifications.jsx file
- updated the axios requests to get

## 15th Commit
- restructured the app to tidy it up
- set up the team member fetching
- used the validator package to check that user inputs in the contact form are emails

## 14th Commit
- added the recent project task fetching to the projects page

## 13th Commit:
- improved the styling of the detailed projects page

## 12th Commit
- created a new page to store user tasks
- set up user tasks fetching and styling

## 11th Commit
- reorganised the component folder structure
- updated the breadcrumbs in the projects components
- styled the notifications
- made it so that the clicking the bell navigates the user to the notifs page
- updated the hover feature so that it's readable in Wong mode

## 10th Commit
- set up the fetching and routing for a single project

## 9th Commit
- set up the reducer for the notifications
- reformatted the dates in the projects page

## 8th Commit
- improved the styling of the errors page
- added a UI component to the projects page
- fixed the refreshing bug in the breadcrumbs component

## 7th Commit
- finished setting up the redux store
- created a slice for fetching user's projects

## 6th Commit
- finished the contact feature
- installed axios
- added a .env file

## 5th Commit
- created the change font feature

## 4th Commit
- created the change theme feature

## 3rd Commit
- replaced the messages page with the notifications page
- made it so that the footer only appears when the user is logged in
- added more styling