import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = ({ className = "" }) => {
    const navigatePages = useNavigate();
    const logout = async () => {
        try {
            await signOut(auth);
            console.log("signed out");
            navigatePages("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <button className={className} onClick={logout}>
                Log Out
            </button>
        </>
    );
};

export default Logout;
