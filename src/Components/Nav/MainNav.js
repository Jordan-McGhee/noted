import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/auth-context';

import "./MainNav.css"
import userIcon from "../../Icons/user-placeholder.png"

const MainNav = () => {

    const auth = useContext(AuthContext)

    const logoutHandler = () => {
        auth.logout()
    }

    let navLinks

    if (auth.isLoggedIn) {
        navLinks = 

            <header className="nav-header">

                <div className="nav-content">

                    <h1>
                        Noted
                    </h1>

                    <nav>

                        <ul>

                            <li className="nav-content-li">
                                <NavLink to="/" className="navLink">
                                    <p>Home</p>
                                </NavLink>
                            </li>

                            <li className="user-nav">
                                <NavLink to ="user/me" className = "user-nav navLink">
                                    <img src={ userIcon } alt="user icon" />
                                    <p>User</p>
                                </NavLink>
                            </li>

                            <li className="nav-content-li">
                                <NavLink to="user/me/friends"  className="navLink">
                                    <p>Friends</p>
                                </NavLink>
                            </li>

                            <li className="nav-content-li">
                                <NavLink to="auth"  className="navLink" onClick={ logoutHandler }>
                                    <p>Logout</p>
                                </NavLink>
                            </li>

                        </ul>

                    </nav>

                </div>
            </header>

    } else {
        navLinks = 
            <header className="nav-header">

                <div className="nav-content">

                    <h1>
                        Noted
                    </h1>

                    <nav>

                        <ul>

                            <li className="nav-content-li">
                                <NavLink to="/" className="navLink">
                                    <p>Home</p>
                                </NavLink>
                            </li>

                            <li className="nav-content-li">
                                <NavLink to="auth"  className="navLink">
                                    <p>Login</p>
                                </NavLink>
                            </li>

                        </ul>

                    </nav>

                </div>
            </header>
    }

    return (
        <div>
            { navLinks }
        </div>
    )
}

export default MainNav