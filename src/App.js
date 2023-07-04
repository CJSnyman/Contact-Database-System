import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import DisplayPeople from "./App/DisplayPeople.js";
import AddPerson from "./App/AddPerson.js";
import Dashboard from "./App/Dashboard.js";
import SignUp from "./components/SignUp.js";
import Login from "./components/Login.js";
import Home from "./App/Home.js";

export const SearchContext = createContext({ name: "", prospect: "", town: "" });

function App() {
    const search = useState({ name: "", prospect: "", town: "" });

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/contacts"
                    element={
                        <SearchContext.Provider value={search}>
                            <DisplayPeople />
                        </SearchContext.Provider>
                    }
                />
                <Route path="/addcontact" element={<AddPerson />} />
            </Routes>
        </div>
    );
}

export default App;
