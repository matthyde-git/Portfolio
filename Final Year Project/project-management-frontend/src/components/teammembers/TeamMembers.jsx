import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import TeamMember from "./TeamMember.jsx";
import AddTeamMemberForm from "./AddTeamMemberForm.jsx";

import { fetchTeamMembers } from "../../features/teammembers/teamMemberSlice.js";

const TeamMembers = ( { teamLeader, projectid }) => {

    // renders all the team members for a project

    const { team, isLoading } = useSelector((store) => store.team);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTeamMembers());
    }, []);

    const resetTeam = () => {
        dispatch(fetchTeamMembers());
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const { user } = useAuth0();
    
    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else
    {
        return (
            <>
                <table className="table overflow-y-auto">

                    {team.map((member) => {
                        return (
                            <>
                                <TeamMember teamMember={member} teamLeader={teamLeader} projectid={projectid} reset={resetTeam}/>
                            </>
                        )
                    })}
                </table>

                {
                    user.name === teamLeader ? (
                        <div className="add-btn">
                            <button 
                                className="btn btn-success"
                                onClick={() => document.getElementById("add-member-modal").showModal()}>
                                    Add Member
                            </button>
                        </div>
                    ) : (
                        <></>
                    )
                }

                <dialog id="add-member-modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                        </form>
                        
                        <AddTeamMemberForm />
    
                    </div>
                </dialog>
            </>
        );
    }
};

export default TeamMembers;