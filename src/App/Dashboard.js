import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [peoplesContacts, setPeoplesContacts] = useState([]);
    const [clientCount, setClientCount] = useState(0);
    const [builderCount, setBuilderCount] = useState(0);
    const [clientPercentage, setClientPercentage] = useState(0);
    const [builderPercentage, setBuilderPercentage] = useState(0);
    const [loadingContacts, setLoadingContacts] = useState(false);
    const navigatePages = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigatePages("/");
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
        setClientPercentage(Math.round((prospectCount[0] / peoplesContacts.length) * 100));
        setBuilderPercentage(Math.round((prospectCount[1] / peoplesContacts.length) * 100));
    }, [peoplesContacts]);

    const getContactsFromDB = async () => {
        setLoadingContacts(true);
        try {
            const data = await getDocs(
                collection(db, `${auth.currentUser.displayName}${auth.currentUser.uid}`)
            );
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
                <Navbar />
                <div>
                    <h1>Dashboard</h1>
                    {loadingContacts ? (
                        <h4>Loading...</h4>
                    ) : (
                        <>
                            <p>You have {peoplesContacts.length} contacts.</p>
                            {peoplesContacts.length > 0 && (
                                <div>
                                    <p>
                                        <b>
                                            <span style={{ backgroundColor: "lightgreen" }}>
                                                {clientCount} ({clientPercentage}%) is{" "}
                                                {clientCount !== 1 ? "Clients" : "a Client"}
                                            </span>{" "}
                                        </b>
                                        and
                                        <b>
                                            {" "}
                                            <span style={{ backgroundColor: "lightblue" }}>
                                                {builderCount} ({builderPercentage}%) is{" "}
                                                {builderCount !== 1
                                                    ? "Business Builders"
                                                    : "a Business Builder"}
                                            </span>
                                            .
                                        </b>
                                    </p>
                                    <div
                                        style={{
                                            backgroundImage: `linear-gradient(90deg, green ${clientPercentage}%, blue ${builderPercentage}%)`,
                                            height: "1rem",
                                        }}
                                    ></div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </>
        );
    }
}
