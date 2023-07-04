import { useEffect, useState } from "react";

const Ranker = (props) => {
    const items = props.items;
    const [ranks, setRanks] = useState({
        Family: 0,
        Work: 0,
        "Time Freedom": 0,
        "Financial Freedom": 0,
        Dreams: 0,
        "Social Entrepreneurship": 0,
        Health: 0,
    });

    useEffect(() => {
        Object.entries(items).map((item) => {
            item[1].rank = ranks[item[1].label];
            return item;
        });
        props.setMotivation(sortedItems);
    }, [ranks]);

    useEffect(() => {
        if (props.clearRanks) {
            setRanks({
                Family: 0,
                Work: 0,
                "Time Freedom": 0,
                "Financial Freedom": 0,
                Dreams: 0,
                "Social Entrepreneurship": 0,
                Health: 0,
            });
            props.setClearRanks(false);
        }
    }, [props.clearRanks, props.setClearRanks]);

    const handleRankChange = (e, itemLabel) => {
        const newRank = Number(e.target.value);
        const existingItemWithRank = Object.keys(ranks).find((label) => ranks[label] === newRank);
        if (existingItemWithRank) {
            setRanks((prevRanks) => ({ ...prevRanks, [existingItemWithRank]: 0 }));
        }
        setRanks((prevRanks) => ({ ...prevRanks, [itemLabel]: newRank }));
    };

    const sortedItems = [...items].sort((a, b) => {
        if (ranks[a.label] && ranks[b.label]) {
            return ranks[a.label] - ranks[b.label];
        } else if (ranks[a.label]) {
            return -1;
        } else {
            return 1;
        }
    });

    return (
        <>
            {sortedItems.map((item) => {
                return (
                    <div className="rank-items" key={item.label}>
                        <label className="ranking-label" htmlFor={item.label}>
                            {item.label}
                        </label>
                        <select
                            className="ranking-input"
                            value={ranks[item.label] || ""}
                            onChange={(e) => handleRankChange(e, item.label)}
                        >
                            <option value=""></option>
                            {Array.from({ length: items.length }).map((_, index) => {
                                return (
                                    <option id={item.label} key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                );
            })}
        </>
    );
};

export default Ranker;
