import { useEffect, useState } from "react";
import Ranker from "../components/Ranking";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function AddPerson() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState(16);
    const [occupation, setOccupation] = useState("");
    const [town, setTown] = useState("");
    const [prospect, setProspect] = useState("Client");
    const [motivation, setMotivation] = useState([
        { label: "Family", rank: 0 },
        { label: "Work", rank: 0 },
        { label: "Time Freedom", rank: 0 },
        { label: "Financial Freedom", rank: 0 },
        { label: "Dreams", rank: 0 },
        { label: "Social Entrepreneurship", rank: 0 },
        { label: "Health", rank: 0 },
    ]);
    const [comment, setComment] = useState("");
    const [clearRanks, setClearRanks] = useState(false);
    const [nameError, setNameError] = useState(true);
    const [surnameError, setSurnameError] = useState(true);
    const [townError, setTownError] = useState(true);
    const [addingContact, setAddingContact] = useState(false);
    const navigatePages = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) navigatePages("/home");
        });
    }, [navigatePages]);

    const addContact = async (e) => {
        e.preventDefault();

        if (!nameError && !surnameError && !townError) {
            setAddingContact(true);
            try {
                await addDoc(collection(db, `${auth.currentUser.uid}contacts`), {
                    name: name + " " + surname,
                    age: age,
                    occupation: occupation,
                    town: town,
                    prospect: prospect,
                    motivation: motivation,
                    comment: comment,
                });
                const data = await getDocs(collection(db, `${auth.currentUser.uid}contacts`));
                const contactPeople = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                sessionStorage.setItem("contactAppContacts", JSON.stringify(contactPeople));
                setName("");
                setSurname("");
                setAge(16);
                setTown("");
                setOccupation("");
                setTown("");
                setProspect("Client");
                setMotivation([
                    { label: "Family", rank: 0 },
                    { label: "Work", rank: 0 },
                    { label: "Time Freedom", rank: 0 },
                    { label: "Financial Freedom", rank: 0 },
                    { label: "Dreams", rank: 0 },
                    { label: "Social Entrepreneurship", rank: 0 },
                    { label: "Health", rank: 0 },
                ]);
                setComment("");
                setClearRanks(true);
                document.getElementById("submit_error").textContent = " ";
                navigatePages("/contacts");
                console.log("added contact succesfully");
            } catch (err) {
                console.error(err);
                console.log("adding unsuccessfull");
            } finally {
                setAddingContact(false);
            }
        } else {
            document.getElementById("submit_error").textContent = "Requirements not met.";
        }
    };

    const handleMotivation = (items) => {
        setMotivation(items);
    };

    useEffect(() => {
        if (name.length < 1) {
            setNameError(true);
        } else {
            setNameError(false);
        }
        if (surname.length < 1) {
            setSurnameError(true);
        } else {
            setSurnameError(false);
        }
        if (town.length < 1) {
            setTownError(true);
        } else {
            setTownError(false);
        }
    }, [name, town, surname]);

    return (
        <>
            <Navbar page="addcontact" />
            <main>
                <h2>Add Contact</h2>
                <form id="add_form" name="add_form">
                    <div className="form_grid_wrapper add_input">
                        <h3 className="add-contact-form-heading">Primary Info</h3>
                        <label className="form_grid_item">
                            Name <br />
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <br />
                            <span className="error">{nameError ? "Required" : " "}</span>
                        </label>
                        <label className="form_grid_item">
                            Surname <br />
                            <input
                                type="text"
                                id="surname"
                                value={surname}
                                onChange={(e) => {
                                    setSurname(e.target.value);
                                }}
                            />
                            <br />
                            <span className="error">{surnameError ? "Required" : " "}</span>
                        </label>
                        <label className="form_grid_item">
                            Age <br />
                            <input
                                type="number"
                                min="16"
                                max="120"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            <br />
                        </label>
                        <label className="form_grid_item">
                            Town <br />
                            <input
                                type="text"
                                id="town"
                                value={town}
                                onChange={(e) => setTown(e.target.value)}
                            />
                            <br />
                            <span className="error">{townError ? "Required" : " "}</span>
                        </label>
                        <label className="form_grid_item">
                            Occupation <br />
                            <input
                                type="text"
                                id="occupation"
                                value={occupation}
                                onChange={(e) => {
                                    setOccupation(e.target.value);
                                }}
                            />
                        </label>
                        <label className="form_grid_item">
                            Prospect Type: <br />
                            <label className="form_grid_item" htmlFor="client"></label>
                            <input
                                className="prospect-type"
                                type="radio"
                                id="client"
                                name="prospect_type"
                                checked={prospect === "Client"}
                                value="Client"
                                onChange={(e) => setProspect(e.target.value)}
                            />
                            Client
                            <label className="form_grid_item" htmlFor="business_builder"></label>
                            <input
                                className="prospect-type"
                                type="radio"
                                id="business_builder"
                                name="prospect_type"
                                checked={prospect === "Business Builder"}
                                value="Business Builder"
                                onChange={(e) => setProspect(e.target.value)}
                            />
                            Business Builder
                        </label>
                        <h3 className="add-contact-form-heading">Ranking Motivation</h3>
                        <Ranker
                            items={motivation}
                            setMotivation={handleMotivation}
                            clearRanks={clearRanks}
                            setClearRanks={setClearRanks}
                        ></Ranker>
                        <label className="form_grid_item">
                            Comment <br />
                            <textarea
                                id="comment"
                                value={comment}
                                cols="30"
                                rows="10"
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </label>
                        <p className="error" id="submit_error"></p>
                    </div>
                    <button type="submit" id="add_button" onClick={addContact}>
                        {addingContact === true ? "Adding" : "Add"}
                    </button>
                </form>
            </main>
        </>
    );
}

export default AddPerson;
