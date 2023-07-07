import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar.js";
import PeopleToRender from "../components/PeopleToRender.js";
import SearchPeople from "../components/SearchPeople.js";
import { auth, db } from "../firebase.js";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { SearchContext } from "../App.js";
import { useNavigate } from "react-router-dom";

function DisplayPeople() {
    const [search, setSearch] = useContext(SearchContext);
    const [peoplesContacts, setPeoplesContacts] = useState([]);
    const [deletingContact, setDeletingContact] = useState([false, ""]);
    const navigatePages = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigatePages("/");
            } else {
                setPeoplesContacts(JSON.parse(sessionStorage.getItem("contactAppContacts")));
            }
        });
    }, []);

    const getContactsFromDB = async () => {
        try {
            const data = await getDocs(
                collection(db, `${auth.currentUser.displayName}${auth.currentUser.uid}`)
            );
            const contactPeople = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPeoplesContacts(contactPeople);
            sessionStorage.setItem("contactAppContacts", JSON.stringify(contactPeople));
            console.log("Get contacts completed");
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingContact([false, ""]);
        }
    };

    const deleteItem = async (id) => {
        setDeletingContact([true, id]);
        try {
            deleteDoc(doc(db, `${auth.currentUser.displayName}${auth.currentUser.uid}`, id));
            getContactsFromDB();
            console.log("success");
        } catch (err) {
            setDeletingContact([false, ""]);
            console.error(err);
        }
    };

    let finalList = peoplesContacts;
    Object.entries(search).map((searchItem) => {
        let temporaryList = [];
        const peopleThatPass = peoplesContacts.filter((person) => {
            return person[searchItem[0]].toLowerCase().includes(searchItem[1]);
        });
        peopleThatPass.map((passingPerson) => {
            if (finalList.includes(passingPerson)) {
                temporaryList.push(passingPerson);
            }
        });
        finalList = temporaryList;
    });

    if (auth.currentUser) {
        return (
            <>
                <Navbar />
                <main>
                    <h2>Contacts</h2>
                    <SearchPeople handleSearch={setSearch} />
                    <p>
                        Showing {finalList.length} of {peoplesContacts.length}
                    </p>
                    <div className="display_grid_wrapper grid">
                        <h3 className="display_grid_item">Type</h3>
                        <h3 className="display_grid_item">Info</h3>
                    </div>
                    <PeopleToRender
                        deletePerson={deleteItem}
                        people={finalList}
                        deletingContact={deletingContact}
                    />
                </main>
            </>
        );
    }
}

export default DisplayPeople;
