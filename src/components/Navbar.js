import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import Login from "./Login";
import SignUp from "./SignUp";
import { useContext } from "react";
import { AuthContext } from "./auth";
import { auth } from "../firebase";

const IsLoggedIn = ({}) => {
    const currentUser = auth.currentUser;

    return (
        <div className="primary-navigation-logged-in grid">
            <div className="userBlock">
                <p className="userLogo">{currentUser?.displayName[0].toUpperCase()}</p>
                <Logout className="primary-navigation-logout" />
            </div>
            <ul className="primary-navigation-routes">
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/contacts">Contacts</NavLink>
                <NavLink to="/addcontact">Add Contact</NavLink>
            </ul>
        </div>
    );
};

const IsLoggedOut = () => {
    return (
        <>
            <div className="primary-navigation-logged-out primary-navigation-routes">
                <button onClick={() => document.getElementById("login-popup").showModal()}>
                    Log In
                </button>
                <button onClick={() => document.getElementById("signup-popup").showModal()}>
                    Sign Up
                </button>
            </div>
            <dialog id="login-popup">
                <Login />
                <span
                    className="modal-close"
                    onClick={() => document.getElementById("login-popup").close()}
                >
                    X
                </span>
            </dialog>
            <dialog id="signup-popup">
                <SignUp />
                <span
                    className="modal-close"
                    onClick={() => document.getElementById("signup-popup").close()}
                >
                    X
                </span>
            </dialog>
        </>
    );
};

const Navbar = ({ loggedIn = true }) => {
    return (
        <nav className="primary-navigation">
            <h2 className="primary-navigation-logo">LOGO</h2>
            {loggedIn ? <IsLoggedIn /> : <IsLoggedOut />}
        </nav>
    );
};

export default Navbar;
