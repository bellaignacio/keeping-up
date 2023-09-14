import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './Search.css';

function Search() {
    const dispatch = useDispatch();
    const items = useSelector((state) => [...Object.values(state.session.lists), ...Object.values(state.session.users)])
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        dispatch(sessionActions.getAllLists());
        dispatch(sessionActions.getAllUsers());
    }, [dispatch]);

    const searchResults = items?.filter(obj => {
        return (
            obj.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
            obj.caption?.toLowerCase().includes(searchInput.toLowerCase()) ||
            obj.username?.toLowerCase().includes(searchInput.toLowerCase()) ||
            obj.name?.toLowerCase().includes(searchInput.toLowerCase())
        );
    });

    return (
        <div id="search-container" className="search-closed">
            <h2 id="search-title">Search</h2>
            <input
                id="search-input"
                type="search"
                value={searchInput}
                placeholder="Search for lists, users, etc."
                onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput.length > 0 && <div id="search-result-container">
                {searchResults.map(obj => {
                    return (
                        <div className="search-result">
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
