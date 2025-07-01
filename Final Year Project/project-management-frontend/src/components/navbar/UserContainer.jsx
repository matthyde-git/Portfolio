import React from "react";

const UserContainer = ({ user, logout }) => {

    // component that welcomes the user and informs them that they are signed in, also displays the logout button

    const handleLogout = () => {
        logout();
        sessionStorage.clear();
    }
    
    return (
        <ul>
            <li>
                <p data-testid="user" id="user-welcome">Welcome <p className="user-name">{user?.nickname}</p></p>
                <img id="user-picture" src={user?.picture}></img>
                <button data-testid="logout" id="logout-btn" onClick={handleLogout} className="btn btn-sm btn-error">Logout</button>
            </li>
        </ul>
    );
};

export default UserContainer;