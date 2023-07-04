import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigatePages = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("log in success");
            navigatePages("/");
        } catch (err) {
            console.error(err);
            setError("User email/password is incorrect.");
        }
    };

    const logInWithGoogle = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("google sign in success");
            navigatePages("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <label htmlFor="login_email">Email</label>
                <input
                    type="email"
                    name="login_email"
                    id="login_email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="login_password">Password</label>
                <input
                    type="password"
                    name="login_password"
                    id="login_password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={login}>Log In</button>
                <button onClick={logInWithGoogle}>Log in with Google</button>
            </form>
            <p>
                <small className="switch-signup-and-login">
                    Don't have an account?{" "}
                    <button
                        onClick={() => {
                            document.getElementById("login-popup").close();
                            document.getElementById("signup-popup").showModal();
                        }}
                    >
                        Sign Up
                    </button>
                </small>
            </p>
        </>
    );
}
