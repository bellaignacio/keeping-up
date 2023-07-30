import { useHistory } from "react-router";
import './ListTile.css';

function ListTile({ listObj, listOnly }) {
    const history = useHistory();

    function listStyleSettings(list_style) {
        return {
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `linear-gradient(to bottom, rgba(169, 169, 169, 0.8), rgba(211, 211, 211, 0.8)), url(${list_style.image_url})`,
        };
    }

    function titleStyleSettings(list_style) {
        return {
            padding: "5px",
            margin: "2px 0",
            fontFamily: list_style.title_font,
            fontSize: list_style.title_size,
            fontStyle: list_style.title_style,
            fontWeight: list_style.title_weight,
            color: list_style.title_color,
            textAlign: list_style.title_align
        };
    }

    function liStyleSettings(list_style) {
        return {
            height: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            fontFamily: list_style.li_font,
            fontSize: list_style.li_size,
            fontStyle: list_style.li_style,
            fontWeight: list_style.li_weight,
            color: list_style.li_color,
            textAlign: "left"
        };
    }

    function liCompStyleSettings(list_style) {
        return {
            fontStyle: list_style.li_completed_style,
            fontWeight: list_style.li_completed_weight,
            color: list_style.li_completed_color,
            textDecoration: list_style.li_completed_decoration
        };
    }

    if (listOnly) {
        return (
            <div className="list-tile" style={listStyleSettings(listObj.list_style)} onClick={() => history.push(`/lists/${listObj.id}`)} >
                <div className="list-tile-content">
                    <p style={titleStyleSettings(listObj.list_style)}>{listObj.title}</p>
                    <ul id={`list-${listObj.id}`} style={liStyleSettings(listObj.list_style)}>
                        {listObj.list_items.map(li => (
                            <li key={li.id} style={li.is_complete ? liCompStyleSettings(listObj.list_style): null}>{li.description}</li>
                        ))}
                    </ul>
                </div>
                {/* <div className="list-tile-info">
                    <span>
                    <i className="fas fa-heart"></i> {listObj.total_likes}
                    </span>
                    <span>
                    <i className="fas fa-comment"></i> {listObj.total_comments}
                    </span>
                </div> */}
            </div>
        );
    }
}

export default ListTile;
