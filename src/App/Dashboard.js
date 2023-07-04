import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [peoplesContacts, setPeoplesContacts] = useState([]);
    const [clientCount, setClientCount] = useState(0);
    const [builderCount, setBuilderCount] = useState(0);
    const [loadingContacts, setLoadingContacts] = useState(false);
    const navigatePages = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigatePages("/home");
            } else {
                getContactsFromDB();
            }
        });
    }, []);

    useEffect(() => {
        let prospectCount = [0, 0];
        peoplesContacts.map((person) => {
            if (person.prospect === "Client") {
                prospectCount[0] += 1;
            } else {
                prospectCount[1] += 1;
            }
        });
        setClientCount(prospectCount[0]);
        setBuilderCount(prospectCount[1]);
    }, [peoplesContacts]);

    const getContactsFromDB = async () => {
        setLoadingContacts(true);
        try {
            const data = await getDocs(collection(db, `${auth.currentUser.uid}contacts`));
            const contactPeople = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPeoplesContacts(contactPeople);
            sessionStorage.setItem("contactAppContacts", JSON.stringify(contactPeople));
            console.log("Get contacts completed");
            return contactPeople;
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingContacts(false);
        }
    };

    if (auth.currentUser) {
        return (
            <>
                <Navbar page="dashboard" />
                <div>
                    <h1>Dashboard</h1>
                    {loadingContacts ? (
                        <h4>Loading...</h4>
                    ) : (
                        <>
                            <p>You have {peoplesContacts.length} contacts.</p>
                            <p>
                                {clientCount} is Client{clientCount !== 1 && "s"} and {builderCount}{" "}
                                is Business Builder{builderCount !== 1 && "s"}.
                            </p>
                        </>
                    )}
                </div>
            </>
        );
    }
}
