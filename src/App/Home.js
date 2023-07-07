import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { auth } from "../firebase";

const Home = () => {
    const navigatePages = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) navigatePages("/dashboard");
        });
    }, []);

    return (
        <>
            <Navbar loggedIn={false} />
            <div>
                <h1>Home</h1>
                <h2>Thanks for visiting my contact app.</h2>
                <p>
                    This app is for storing your contacts. This is a specialised contact app and if
                    you have reason to use this application than you are making good moves in life.
                </p>
            </div>
        </>
    );
};

export default Home;
