import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function SignUp() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [username, setUsername] = useState("");
    const navigatePages = useNavigate();

    const signInWithEmail = async (e) => {
        e.preventDefault();
        if (username === "") {
            return setError("Username required.");
        }
        if (password !== passwordConfirm) {
            return setError("Passwords do not match.");
        }

        try {
            setError("");
            await createUserWithEmailAndPassword(auth, email, password);
            console.log(auth.currentUser);
            await updateProfile(auth.currentUser, { displayName: username, photoURL: "" });
            console.log("sign up success");
            navigatePages("/");
        } catch (err) {
            console.error(err);
            if ({ err }.err.code === "auth/missing-email") {
                setError("Email required.");
            } else if ({ err }.err.code === "auth/weak-password") {
                setError("Minimum 6 characters required for the password.");
            }
        }
    };

    const signUpWithGoogle = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("google sign up success");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form>
                <h2>Sign Up</h2>
                {error && <p className="error">{error}</p>}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="sign_up_email">Email</label>
                <input
                    type="email"
                    name="sign_up_email"
                    id="sign_up_email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="sign_up_password">Password</label>
                <input
                    type="password"
                    name="sign_up_password"
                    id="sign_up_password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="sign_up_password-confirm">Password Confirmation</label>
                <input
                    type="password"
                    name="sign_up_password-confirmation"
                    id="sign_up_password-confirmation"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button onClick={signInWithEmail}>Sign Up</button>
                <button onClick={signUpWithGoogle}>Sign up with Google</button>
            </form>
            <p>
                <small className="switch-signup-and-login">
                    Already have an account?{" "}
                    <button
                        onClick={() => {
                            document.getElementById("signup-popup").close();
                            document.getElementById("login-popup").showModal();
                        }}
                    >
                        Log In
                    </button>
                </small>
            </p>
        </>
    );
}
