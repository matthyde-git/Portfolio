import React from "react";

const Assistant = () => {

    // an machine learning-powered assistant that can answer the user's questions

    // a passage of information related to the website
    const passage = "This website is for project management. The things that users can do includes creating, managing and collaborating on projects. Project management is important for successfully delivering projects on time, on budget to a high quality. Risk management is important for identifing risks that may negatively impact your projects and creating plans to deal with them. Communication is important within a project to ensure that everyone is on the same page and understands what is required of them. You can return to the home page by clicking the title. You can access the menu by clicking the icon in the top left of the page. You can logout by clicking the logout button in the top right of the page. You can access the user guide by clicking the information icon at the top of the page. Content that you have deleted cannot be recovered. You will be logged out after ten minutes of inactivity. You can request help by entering your email address at the bottom right of the screen. You can create a project by going to the projects page and clicking the create project button. The deadline of a project cannot be in the past. You can access the projects page through the menu in the top left. You can access the invites page through the invites button within the projects page. You can join a project through the invites page and clicking the accept button on the project you would like to join. You can reject a project invite through the invites page by clicking on the reject button on the project you do not want to join. If you successfully create a project you will be shown a green success message if you successfully create a project. If you fail to create a project you will be shown a red error message. Projects that are due within a week have their deadlines highlighted in yellow. Projects that are overdue have their deadlines highlighted in red. When you create a project you will asigned as its team leader. You can see your notifications by clicking the bell icon at the top of the page. You can remove a notification by clicking the X button on the notification you would like to remove. You can remove all notifications by clicking the clear all button at the top of the notifications list. You can access the tasks page through the menu in the top left. Your tasks on the tasks page are listed by the closest date. Tasks that are due within a week have their deadlines highlighted in yellow. Tasks that are overdue have their deadlines highlighted in red. You can mark a task as done through the tasks page by clicking the mark as done button on a task. You can access the settings page through the menu in the top left. The settings you can update include your theme and font settings. The font settings available include small, medium, large and larger. The theme settings available include light, dark, tol and wong. Colour-blind themes are available. Your preferences will be automatically applied when you sign in. You can view a project by clicking the view project button a project. You can update a project by clicking the update button in a project where you are the team leader. You can delete a project by clicking the delete button in a project where you are the team leader. You can invite users to a project by clicking the add member button within the project if you are the team leader and entering the email address of the user they wish to invite. Users that you invite to your projects will not be team leaders. You can remove users from a project by clicking the email address within the projects team members list if you are the team leader and clicking the remove user button. You can view the progress of a project by the percentage bar in the project info section. You can leave a project by clicking the leave project button within a project. You can view the project tasks by clicking the tasks button within a project. You can create tasks in the project tasks page by clicking the add task button  if you are the team leader. The deadline of a task cannot be in the past. You can update a task in the project tasks page by clicking on the task if you are the team leader and clicking the update task button. You can update the status of a task in the project tasks page by clicking on the task and clicking the update task button. You can delete a task in the project tasks page by clicking on the task if you are the team leader and clicking the delete task button. You can join a task in the project tasks page by clicking on the task and clicking the join task button. You can leave a task in the project tasks page by clicking on the task and clicking the leave task button if you are not the team leader. You can view the project messages by clicking the messages button within a project. You can send messages to the project team in the project messages page by typing a message in the message bar and clicking the send message button. You can update a message in the project messages page by clicking on the message and clicking the update button. You can delete a message in the project messages page by clicking on the message and clicking the delete button. You can reply to a message in the project messages page by clicking on the message and clicking the reply button. You can only update your own messages unless you are the team leader. You can only delete your own messages unless you are the team leader. You can view the project files by clicking the files button within a project. You can upload files in the project files page by clicking the choose file button, selecting a file and clicking the upload button. You can download a file in the project files page by clicking the download button on the file you wish to download. You can delete a file in the project files page by clicking the delete file button on file you wish to delete  if you are the team leader. You can view the project risks by clicking the risks button within a project. You can create a risk in the project risks page by clicking the add risk button if you are the team leader. You can update a risk in the project risks page by clicking on the risk if you are the team leader and clicking the update button. You can delete a risk in the project risks page by clicking on the risk if you are the team leader and clicking the delete button.";

    const answerQuestion = async () => {
        // calls the TensorFlowJS qna model to answer user queries based on the passage

        const answer = document.getElementById("answer");

        answer.classList.remove("text-success");
        answer.classList.add("text-warning");

        answer.textContent = "Loading...";

        const model = await qna.load();
            
        const question = document.getElementById("question").value;

        const answers = await model.findAnswers(question, passage);

        if (answers.length > 0)
        {
            answer.classList.remove("text-warning");
            answer.classList.add("text-success");

            answer.textContent = "Answer: " + answers[0].text;
        }
        else 
        {
            answer.classList.remove("text-warning");
            answer.classList.add("text-error");

            answer.textContent = "Failed to find answer, please try another question";
        }
    }
    
    return (
        <div>
            <h3 className="font-bold text-xl search-title">Have a question about the app? Ask below.</h3>

            <input className="form-section input input-success w-full" type="text" id="question" data-testid="question" placeholder="How can i ..." required>

            </input>
            <button className="btn btn-success question-btn" id="question-send" data-testid="question-btn" onClick={answerQuestion}>Send</button>

            <p className="font-bold text-xl search-answer" id="answer" data-testid="answer"></p>
        </div>
    );
};

export default Assistant;