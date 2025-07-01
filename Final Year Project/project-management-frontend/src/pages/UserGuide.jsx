import React from "react";
import { useNavigate } from "react-router-dom";

import projectImage from "../assets/projects.jpg"

const UserGuide = () => {

    // contains the user guide

    const navigate = useNavigate();
        
    const navigateToHome = () => {
        navigate("/");
    };

    return (
        <div
            className="hero h-screen w-screen"
            style={{
                backgroundImage: `url(${projectImage})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            
            <div id="breadcrumbs" className="breadcrumbs max-w-xs text-sm" data-testid="user-guide-breadcrumbs">
                <ul>
                    <li>
                        <a onClick={navigateToHome}>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <a>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            User Guide
                        </a>
                    </li>
                </ul>
            </div>

            <span className="badge badge badge-warning indicator-item back-btn hover:cursor-pointer" onClick={navigateToHome}>

                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    className="h-5 w-5">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

                Back to home

            </span>  

            <div className="box bg-base-100 card-bordered border-primary overflow-auto" data-testid="user-guide">

                <br />
                <p className="project-text text-center text-primary">If you're having difficulties with the application, please enter your email at the bottom right of the screen and our support staff will get in touch.</p>

                <br />
                <p className="project-text text-primary">Projects- </p>

                <div className="user-guide">
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />

                        <div className="collapse-title font-semibold">How do I access my projects?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Projects" button in the home page or the "projects" button in the menu.</li>
                                </ol>
                                
                            </div>
    
                    </div>

                <div className="user-guide">
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />

                        <div className="collapse-title font-semibold">How do I create a project?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Projects" button in the home page or the "projects" button in the menu.</li>
                                    <li>2. Click the "Create Project" button and complete the form.</li>
                                    <li>3. If the project is created successfully, you'll will see a green notification at the top of the screen.</li>
                                </ol>
                                
                            </div>
    
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I update a project?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Projects" button in the home page or the "projects" button in the menu.</li>
                                    <li>2. Click the "View Project" button on a project where you are the team leader.</li>
                                    <li>3. Click the "Update Project" button and complete the form.</li>
                                    <li>4. If the project is updated successfully, you'll will see a green notification at the top of the screen.</li>
                                </ol>
                                
                            </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I delete a project?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Projects" button in the home page or the "projects" button in the menu.</li>
                                    <li>2. Click the "View Project" button on a project where you are the team leader.</li>
                                    <li>3. Click the "Delete Project" button and press "Yes" if you're certain you want to delete the project.</li>
                                    <li>4. Return to the previous page and you will see that the project is no longer in your projects list.</li>
                                </ol>
                                
                            </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I join a project?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Projects" button in the home page or the "projects" button in the menu.</li>
                                    <li>2. If you have any invitations to projects the "Invites" button will have a blue icon with the number of invites above it. Clicking on it will take you to your project invites.</li>
                                    <li>3. Click the "Accept Invite" button on a project you want to join or "Reject Invite" if you do not want to.</li>
                                    <li>4. If you join a project successfully, you'll will see a green notification at the top of the screen.</li>
                                    <li>5. Return to the previous page and you will see the project in your projects list.</li>
                                </ol>
                                
                            </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I leave a project?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Projects" button in the home page or the "projects" button in the menu.</li>
                                    <li>2. Click the "View Project" button on any project in your projects list.</li>
                                    <li>3. Click the "Leave Project" button at the bottom left of the screen and press "Yes" if you're certain you want to leave the project.</li>
                                    <li>4. Return to the previous page and you will see the project is no longer in your projects list.</li>
                                </ol>
                                
                            </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I add someone to a project?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Projects" button in the home page or the "projects" button in the menu.</li>
                                    <li>2. Click the "View Project" button on a project where you are the team leader.</li>
                                    <li>3. Click the "Add Member" button in the top middle of the screen.</li>
                                    <li>4. Enter the email address of the user you want to invite and press submit.</li>
                                    <li>5. If you invite someone successfully, you'll will see a green notification at the top of the screen.</li>
                                </ol>
                                
                            </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I remove someone from a project?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Projects" button in the home page or the "projects" button in the menu.</li>
                                    <li>2. Click the "View Project" button on a project where you are the team leader.</li>
                                    <li>3. Click on the name of the team member you want to remove in the top middle of the screen.</li>
                                    <li>4. Click the "Remove User" button, then select "Yes" if you're certain you want to remove them from the project.</li>
                                    <li>5. If you remove someone successfully, you'll will see a green notification at the top of the screen.</li>
                                    <li>6. The user will be unassigned from their tasks and will no longer be able to access or modify the project</li>
                                </ol>
                                
                            </div>
                    </div>

                    

                    <br />
                    <p className="project-text text-primary">Tasks-</p>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I create a task?</div>

                        <div className="collapse-content text-sm">
                            
                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project where you are the team leader.</li>
                                <li>2. Click the "Go To Tasks" button at the bottom of the screen.</li>
                                <li>3. Click the "Add Task" button at the bottom of the screen and complete the form.</li>
                                <li>4. If the taks is created successfully, you'll will see a green notification at the top of the screen.</li>
                                <li>5. You should now see the task in the task board.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I update a task?</div>

                        <div className="collapse-content text-sm">
                            
                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project where you are the team leader.</li>
                                <li>2. Click the "Go To Tasks" button at the bottom of the screen.</li>
                                <li>3. Click on a task.</li>
                                <li>4. Click the "Update" button and complete the form.</li>
                                <li>5. If the task is updated successfully, you'll will see a green notification at the top of the screen.</li>
                                <li>6. You should now see the updated task in the task board.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I delete a task?</div>

                        <div className="collapse-content text-sm">
                            
                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project where you are the team leader.</li>
                                <li>2. Click the "Go To Tasks" button at the bottom of the screen.</li>
                                <li>3. Click on a task.</li>
                                <li>4. Click the "Delete" button, then press the "Yes" button if you're certain you want to delete it.</li>
                                <li>5. If the task is deleted successfully, you'll will see a green notification at the top of the screen.</li>
                                <li>6. You should now no longer see the task in the task board.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I join a task?</div>

                        <div className="collapse-content text-sm">
                            
                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Tasks" button at the bottom of the screen.</li>
                                <li>3. Click on a task.</li>
                                <li>4. If the task is not already assigned to someone, click the "Join" button.</li>
                                <li>5. If the task is joined successfully, you'll will see a green notification at the top of the screen.</li>

                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I leave a task?</div>

                        <div className="collapse-content text-sm">
                            
                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Tasks" button at the bottom of the screen.</li>
                                <li>3. Click on a task that you are assigned to.</li>
                                <li>4. Click the "Leave" button.</li>
                                <li>5. If the task is left successfully, you'll will see a green notification at the top of the screen.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I update the status of a task?</div>

                        <div className="collapse-content text-sm">
                            
                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Tasks" button at the bottom of the screen.</li>
                                <li>3. Click on a task that you are assigned to.</li>
                                <li>4. Click the "Update" button, select either "To Do", "Doing" or "Done" and click "Confirm".</li>
                                <li>5. If the status is updated successfully, you'll will see a green notification at the top of the screen.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I access my tasks?</div>

                        <div className="collapse-content text-sm">
                            
                            <ol>
                                <li>1. Click the "To Tasks" button in the home page or the "tasks" button in the menu.</li>
                                <li>2. From here you can quickly update the status of a task to "Done" by pressing the "Mark as Done" button on the right of a task.</li>
                            </ol>

                        </div>
                    </div>

                    <br />
                    <p className="project-text text-primary">Messages-</p>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I access my team messages?</div>
                        <div className="collapse-content text-sm">

                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Messages" button at the bottom of the screen.</li>
                                <li>3. You should now see any messages within your project, messages you send are highlighted on the right of the screen, whereas messages from your team are on the left. Replies to your messages are highlighted.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I send my team a message?</div>
                        <div className="collapse-content text-sm">

                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Messages" button at the bottom of the screen.</li>
                                <li>3. Enter a message in the bar at the bottom of the screen and click "Send Message"</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I update a message?</div>

                        <div className="collapse-content text-sm">
                            
                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Messages" button at the bottom of the screen.</li>
                                <li>3. Click on a message that you sent.</li>
                                <li>4. Click the "Update" button and complete the form.</li>
                                <li>5. If the message is updated successfully, you'll will see a green notification at the top of the screen.</li>
                                <li>6. You should now see the updated task in the message board.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I delete a message?</div>

                        <div className="collapse-content text-sm">
                            
                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Messages" button at the bottom of the screen.</li>
                                <li>3. Click on a message that you sent, or any message if you are the team leader.</li>
                                <li>4. Click the "Delete" button, then press the "Yes" button if you're certain you want to delete it.</li>
                                <li>5. If the message is deleted successfully, you'll will see a green notification at the top of the screen.</li>
                                <li>6. You should now no longer see the task in the message board.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I reply to a message?</div>

                        <div className="collapse-content text-sm">
                            
                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Messages" button at the bottom of the screen.</li>
                                <li>3. Click on a message.</li>
                                <li>4. Click the "Reply" button, then type in your message and click "Send".</li>
                                <li>5. You should now see your message with the replied to message in the message board.</li>
                            </ol>

                        </div>
                    </div>

                    <br />
                    <p className="project-text text-primary">Files-</p>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I access my project files?</div>

                        <div className="collapse-content text-sm">

                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Files" button at the bottom left of the screen.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I upload a file?</div>

                        <div className="collapse-content text-sm">

                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Files" button at the bottom left of the screen.</li>
                                <li>3. Click the "CHOOSE FILE" button and select an image, pdf or txt file from your computer.</li>
                                <li>4. Click the "Upload" button at the bottom of the screen.</li>
                                <li>5. If the file is uploaded successfully, you'll will see a green notification at the top of the screen.</li>
                                <li>6. You should now see the file in the project files list.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I download a file?</div>

                        <div className="collapse-content text-sm">

                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project.</li>
                                <li>2. Click the "Go To Files" button at the bottom left of the screen.</li>
                                <li>3. Click the "Download" button to the right of the file you want to download.</li>
                                <li>4. If the file is downloaded successfully, you'll will see a green notification at the top of the screen.</li>
                                <li>5. The file should now be downloaded onto your computer.</li>
                            </ol>

                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I delete a file?</div>

                        <div className="collapse-content text-sm">

                            <ol>
                                <li>1. From the projects page, click the "View Project" button on a project where you are the team leader.</li>
                                <li>2. Click the "Go To Files" button at the bottom left of the screen.</li>
                                <li>3. Click the "Delete" button to the right of the file you want to delete, then click "Yes" if you're certain you want to delete the file.</li>
                                <li>4. If the file is deleted successfully, you'll will see a green notification at the top of the screen.</li>
                                <li>5. You should now no longer see the file in the project files list.</li>
                            </ol>

                        </div>
                    </div>

                    <br />
                    <p className="project-text text-primary">Risks-</p>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I access my project risks?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. From the projects page, click the "View Project" button on a project.</li>
                                    <li>2. Click the "Go To Risks" button at the bottom right of the screen.</li>
                                </ol>
                                
                            </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I add a project risk?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. From the projects page, click the "View Project" button on a project where you are the team leader.</li>
                                    <li>2. Click the "Go To Risks" button at the bottom right of the screen.</li>
                                    <li>3. Click the "Add Risk" button at the bottom of the screen and complete the form.</li>
                                    <li>4. If the risk is created successfully, you'll will see a green notification at the top of the screen.</li>
                                    <li>5. You should now see the risk in the project risks list.</li>
                                </ol>
                                
                            </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I update a project risk?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. From the projects page, click the "View Project" button on a project where you are the team leader.</li>
                                    <li>2. Click the "Go To Risks" button at the bottom right of the screen.</li>
                                    <li>3. Click on the risk that you would like to update.</li>
                                    <li>4. Click the "Update" button and complete the form</li>
                                    <li>5. If the risk is updated successfully, you'll will see a green notification at the top of the screen.</li>
                                    <li>5. You should now see the updated risk in the project risks list.</li>
                                </ol>
                                
                            </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How do I delete a project risk?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. From the projects page, click the "View Project" button on a project where you are the team leader.</li>
                                    <li>2. Click the "Go To Risks" button at the bottom right of the screen.</li>
                                    <li>3. Click on the risk that you would like to update.</li>
                                    <li>4. Click the "Delete" button, then click "Yes" if you are certain that you want to delete the risk</li>
                                    <li>5. If the risk is deleted successfully, you'll will see a green notification at the top of the screen.</li>
                                    <li>5. You should now no longer see the risk in the project risks list.</li>
                                </ol>
                                
                            </div>
                    </div>

                    <br />
                    <p className="project-text text-primary">Notifications-</p>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />

                        <div className="collapse-title font-semibold">How do I access my notifications?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Notifications" button in the home page, the "notifications" button in the menu or the bell icon at the top right of the screen.</li>
                                </ol>
                                
                            </div>
    
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />

                        <div className="collapse-title font-semibold">How do I delete a notification?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Notifications" button in the home page, the "notifications" button in the menu or the bell icon at the top right of the screen.</li>
                                    <li>2. Click the "X" button to the right of the notification that you want to delete</li>
                                    <li>3. If the notification is deleted successfully, you'll will see a green notification at the top of the screen.</li>
                                    <li>4. You should now no longer see the notification in your notifications list</li>
                                </ol>
                                
                            </div>
    
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />

                        <div className="collapse-title font-semibold">How do I delete all my notifications?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Notifications" button in the home page, the "notifications" button in the menu or the bell icon at the top right of the screen.</li>
                                    <li>2. Click the "Clear All" button at the top right of the notifications list</li>
                                    <li>3. If the notifications are deleted successfully, you'll will see a green notification at the top of the screen.</li>
                                    <li>4. You should now no longer see your notifications</li>
                                </ol>
                                
                            </div>
    
                    </div>

                    <br />
                    <p className="project-text text-primary">Settings-</p>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />

                        <div className="collapse-title font-semibold">How do I access my settings?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Settings" button in the home page o the "settings" button in the menu or the bell icon at the top right of the screen.</li>
                                </ol>
                                
                            </div>
    
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />

                        <div className="collapse-title font-semibold">How do I update my settings?</div>

                            <div className="collapse-content text-sm">

                                <ol>
                                    <li>1. Click the "To Settings" button in the home page o the "settings" button in the menu or the bell icon at the top right of the screen.</li>
                                    <li>2. Select from the list of options your preferred font and theme settings</li>
                                </ol>
                                
                            </div>
    
                    </div>

                </div>
            </div>
        </div>
        </div>
    );
};

export default UserGuide;