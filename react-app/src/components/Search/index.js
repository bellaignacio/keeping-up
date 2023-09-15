import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './Search.css';

function Search() {
    const dispatch = useDispatch();
    const history = useHistory();
    const items = useSelector((state) => [...Object.values(state.session.lists), ...Object.values(state.session.users)])
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        dispatch(sessionActions.getAllLists());
        dispatch(sessionActions.getAllUsers());
    }, [dispatch]);

    const searchResults = items?.filter((obj) => {
        return (
            obj.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
            obj.caption?.toLowerCase().includes(searchInput.toLowerCase()) ||
            obj.username?.toLowerCase().includes(searchInput.toLowerCase()) ||
            obj.name?.toLowerCase().includes(searchInput.toLowerCase())
        );
    });

    const levenshteinDistance = (a, b) => {
        // Create a 2D array to store the distances
        let distances = new Array(a.length + 1);
        for (let i = 0; i <= a.length; i++) {
            distances[i] = new Array(b.length + 1);
        }

        // Initialize the first row and column
        for (let i = 0; i <= a.length; i++) {
            distances[i][0] = i;
        }
        for (let j = 0; j <= b.length; j++) {
            distances[0][j] = j;
        }

        // Fill in the rest of the array
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                if (a[i - 1] === b[j - 1]) {
                    distances[i][j] = distances[i - 1][j - 1];
                } else {
                    distances[i][j] = Math.min(distances[i - 1][j], distances[i][j - 1], distances[i - 1][j - 1]) + 1;
                }
            }
        }

        // Return the final distance
        return distances[a.length][b.length];
    };

    const sortBySimilarity = (objList, singleWord) => {
        // Create an array of objects to store the words and their distances
        let wordDistances = objList.map((obj) => ({
            object: obj,
            distance: levenshteinDistance(obj.username || obj.name || obj.title || obj.caption, singleWord)
        }));

        // Sort the array by distance
        wordDistances.sort((a, b) => a.distance - b.distance);

        // Return the sorted list of words
        return wordDistances.map((obj) => obj.object);
    };

    return (
        <div id="search-container" className="search-closed">
            <h2 id="search-title">Search</h2>
            <input
                id="search-input"
                type="search"
                value={searchInput}
                placeholder="Search for users or lists"
                onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput.length > 0 && <div id="search-result-container">
                {sortBySimilarity(searchResults, searchInput).map((obj, idx) => {
                    return (
                        <div key={idx} className="search-result" onClick={() => {
                            if (obj.username) history.push(`/${obj.id}`);
                            else history.push(`/lists/${obj.id}`);
                            document.getElementById("search-container").classList.add("search-closed");
                            document.getElementById("search-container").classList.remove("search-open");
                            document.querySelectorAll(".nav-icon").forEach((el) => el.classList.remove("search-open"));
                            document.querySelectorAll(".nav-icon-label").forEach((el) => el.classList.remove("search-open"));
                            document.getElementById("profile-dropdown").classList.remove("search-open");
                            document.querySelector("#keeping-up-icon img").classList.remove("search-open");
                        }}>
                            <div className="search-result-image">
                                <img
                                    src={obj.image_url || obj.list_style.image_url}
                                    alt="search-result"
                                />
                            </div>
                            <div className="search-result-info">
                                <div className="search-result-heading">
                                    {obj.username || obj.title}
                                </div>
                                <div className="search-result-subheading">
                                    {obj.name || obj.caption}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>}
        </div>
    );
}

export default Search;
