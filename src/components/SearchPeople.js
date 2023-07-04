import { useState } from "react";

function SearchPeople(props) {
    const [searchName, setSearchName] = useState("");
    const [searchProspect, setSearchProspect] = useState("");
    const [searchTown, setSearchTown] = useState("");

    const searchPeople = (e) => {
        e.preventDefault();
        props.handleSearch({ name: searchName, prospect: searchProspect, town: searchTown });
    };

    return (
        <form id="search_form" name="search_form">
            <div className="form_grid_wrapper search_input">
                <label className="form_grid_item">
                    Name <br />
                    <input
                        type="text"
                        id="name_search"
                        onChange={(e) => setSearchName(e.target.value.toLowerCase())}
                    />
                </label>
                <label className="form_grid_item">
                    Prospect <br />
                    <select
                        name="search option"
                        id="search_option"
                        onChange={(e) => setSearchProspect(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="client">Client</option>
                        <option value="business builder">Business Builder</option>
                    </select>
                </label>
                <label className="form_grid_item">
                    Town <br />
                    <input
                        type="text"
                        id="search_term"
                        onChange={(e) => setSearchTown(e.target.value.toLowerCase())}
                    />
                </label>
            </div>
            <button type="submit" id="search_button" onClick={searchPeople}>
                Search
            </button>
        </form>
    );
}

export default SearchPeople;
