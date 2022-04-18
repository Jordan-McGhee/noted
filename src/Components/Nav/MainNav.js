import React from 'react';
import { NavLink } from 'react-router-dom';

import "./MainNav.css"
import userIcon from "../../Icons/user-placeholder.png"

const MainNav = () => {
    return (
        <header className="nav-header">

            <div className="nav-content">

                <h1>
                    Noted
                </h1>

                <nav>

                    <ul>

                        <li className="nav-content-li">
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </li>

                        <li className="user-nav">
                            <NavLink to ="profile">
                                <img src={ userIcon } alt="user icon" />
                                <p>User</p>
                            </NavLink>
                        </li>

                        <li className="nav-content-li">
                            <NavLink to="friends">
                                <p>Friends</p>
                            </NavLink>
                        </li>

                        <li className="nav-content-li">
                            <p>Logout</p>
                        </li>

                    </ul>

                </nav>

            </div>
        </header>
    )
}

export default MainNav