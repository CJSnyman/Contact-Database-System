import { useState } from "react";

const ExpandedInfo = (props) => {
    const item = props.item;

    const renderMotivation = (motivationItems) => {
        return (
            <p key={motivationItems[1].label + motivationItems[1].rank}>
                {motivationItems[1].label + ": " + motivationItems[1].rank}
            </p>
        );
    };

    return (
        <>
            <div className="display_grid_item">
                <p>
                    {item.name + " (" + item.age + ") "}
                    <span className="light_grey">~ {item.occupation}</span>
                </p>
                <p>{item.town}</p>
                <div>
                    <h4>Motivation</h4>
                    {Object.entries(item.motivation)
                        .sort((a, b) => a[1] - b[1])
                        .map((motivationItems) => renderMotivation(motivationItems))}
                </div>
                <div>
                    <h4>Comment</h4>
                    <p>{item.comment}</p>
                </div>
            </div>
            <div className="display_grid_item">
                <button type="submit" onClick={() => props.deletePerson(item.id)}>
                    {item.id === props.deletingContact[1] ? "DELETING" : "DELETE"}
                </button>
                <button type="submit" onClick={() => props.removeExpansion(item)}>
                    LESS
                </button>
            </div>
        </>
    );
};

const CompactInfo = (props) => {
    const item = props.item;
    return (
        <>
            <div className="display_grid_item">
                <p>
                    {item.name + " (" + item.age + ") "}
                    <span className="light_grey">~ {item.occupation}</span>
                </p>
                <p>{item.town}</p>
            </div>
            <div className="display_grid_item">
                <button type="submit" onClick={() => props.deletePerson(item.id)}>
                    {item.id === props.deletingContact[1] ? "DELETING" : "DELETE"}
                </button>
                <button type="submit" onClick={() => props.addExpansion(item)}>
                    MORE
                </button>
            </div>
        </>
    );
};

const PeopleToRender = (props) => {
    const [expanded, setExpanded] = useState([]);

    const addExpansion = (item) => {
        setExpanded([...expanded, item]);
    };

    const removeExpansion = (item) => {
        setExpanded(expanded.filter((listItem) => listItem !== item));
    };

    const people = props.people;
    if (people.length === 0) {
        return <h4 style={{ textAlign: "center" }}>Please add someone.</h4>;
    }
    return people.map((item) => {
        return (
            <div className="display_grid_wrapper grid" id={"person" + item.id} key={item.id}>
                <div>
                    <p className="display_grid_item">{item.prospect}</p>
                </div>
                {expanded.includes(item) ? (
                    <ExpandedInfo
                        deletePerson={props.deletePerson}
                        item={item}
                        removeExpansion={removeExpansion}
                        deletingContact={props.deletingContact}
                    />
                ) : (
                    <CompactInfo
                        deletePerson={props.deletePerson}
                        item={item}
                        addExpansion={addExpansion}
                        deletingContact={props.deletingContact}
                    />
                )}
            </div>
        );
    });
};

export default PeopleToRender;
