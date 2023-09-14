import './Search.css';

function Search() {
    return (
        <div id="search-container" className="search-closed">
            <h2 id="search-title">Search</h2>
            <input
                id="search-input"
                type="search"
                placeholder="Search for lists, users, etc."
                onChange={() => {}}
            />
            <div id="search-results">

            </div>
        </div>
    );
}

export default Search;
