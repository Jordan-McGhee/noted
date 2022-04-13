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

                        <li className="user-nav">
                            <img src = { userIcon } alt="user icon" />
                            <p>User</p>
                        </li>

                        <li className="nav-content-li">
                            Friends
                        </li>

                        <li className="nav-content-li">
                            Logout
                        </li>

                    </ul>

                </nav>

            </div>
        </header>
    )
}

export default MainNav