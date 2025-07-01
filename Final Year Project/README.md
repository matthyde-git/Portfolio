# Final Year Project

This project was to design, build and test software for project management. The aim of the project was to produce a new software system that would support project management professionals in successfully completing their projects by providing them with the tools they require to organise and collaborate on work. This project was conducted throughout September 2024 to June 2025 and involved:
- Research
    - an online survey for users of project management software to discover their requirements
    - secondary research into existing studies that have investigated project managment success factors and the tools that support project success
    - an analysis of the project managment domain to identify the mandatory features provided by similar systems such as Asana, ClickUp and Jira
- Requirements Engineering
    - the findings of the research were analysed and used to identify the features required by users such as Kanban boards, notifications and file uploads
    - also identified features such as risk management tools and group message boards that were less common but have great potential to increase project success
    - recorded all of the requirements in a table which clearly defined what the system needed to do to be considered successful
    - created a table of test cases that would be used to verify whether the finished system meets it's requirements
- Designs
    - created a UML class diagram to visualise the system's structure and the functionality that is provided by it's major classes
    - create use case diagrams to visualise how the users must be able to interact with the system
- Building
    - built the system with technologies such as React, Express, Node, PostgreSQL and Auth0 for secure authentication
    - built the system to mitigate security threats
        - Express middleware used to sanitise user inputs, mitigating injection and scripting attacks
        - Express middleware used to limit the number of requests a user can make per minute, mitigating denial of service attacks
        - Users are logged out and the session storage is cleared after ten minutes of inactivity
- Testing
    - automated unit testing to verify that the application complies with the expected outputs of the test cases
    - user testing to assess the system's usability

## Conclussions

Overall the project was a success, requirements were identified through research and used to create designs that guided the implementation of the system. The system passed the automated test cases, confirming it's compliance with the requirements. All test users completed their tasks but usability improvements were identified and later implemented.