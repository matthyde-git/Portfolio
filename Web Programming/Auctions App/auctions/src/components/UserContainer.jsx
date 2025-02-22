import React from "react";

const UserContainer = ({user, login, logout}) => {
    return (
        <ul className="logins">
            {user ? (
                <li>
                    <p id="user"> Welcome {user?.nickname?.toUpperCase()} </p>
                    <img id="userPicture" src={user?.picture}></img>
                    <button id="logoutBtn" onClick={logout} className="btn">
                        logout
                    </button>
                </li>
            ) : (
                <li>
                    {" Please "}
                    <button onClick={login} className="btn">
                        login or sign up
                    </button>
                </li>
            )}
        </ul>
    );
};

export default UserContainer;