import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import * as listActions from "../../store/list";
import './ListTile.css';

function ListTile({ listObj, listOnly }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);

    function listStyleSettings(list_style) {
        return {
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `linear-gradient(to bottom, rgba(169, 169, 169, 0.8), rgba(211, 211, 211, 0.8)), url(${list_style.image_url})`,
        };
    }

    function titleStyleSettings(list_style) {
        return {
            margin: "5px",
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
            rowGap: "10px",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(listActions.createComment(listObj.id, comment));
        if (data) {
            setErrors(data);
        } else {
            setComment("");
        }
    };

    if (listOnly) {
        return (
            <div className="list-tile" style={listStyleSettings(listObj.list_style)} onClick={() => history.push(`/lists/${listObj.id}`)} >
                <div className="list-tile-content">
                    <p style={titleStyleSettings(listObj.list_style)}>{listObj.title}</p>
                    <ul id={`list-${listObj.id}`} style={liStyleSettings(listObj.list_style)}>
                        {listObj.list_items.map(li => (
                            <li key={li.id} style={li.is_complete ? liCompStyleSettings(listObj.list_style) : null}>{li.description}</li>
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
    } else {
        return (
            <div className="list-tile-wrapper">
                <div className="list-tile-header">
                    <img className="list-tile-user-image" src={listObj.user.image_url} alt={listObj.user.username} />
                    <div className="list-tile-user-name">{listObj.user.username}</div>
                </div>
                <div className="list-tile" style={listStyleSettings(listObj.list_style)} onClick={() => history.push(`/lists/${listObj.id}`)} >
                    <div className="list-tile-content">
                        <p style={titleStyleSettings(listObj.list_style)}>{listObj.title}</p>
                        <ul id={`list-${listObj.id}`} style={liStyleSettings(listObj.list_style)}>
                            {listObj.list_items.map(li => (
                                <li key={li.id} style={li.is_complete ? liCompStyleSettings(listObj.list_style) : null}>{li.description}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="list-tile-footer">
                    <div className="list-tile-icons">
                        <span>
                            <i className="far fa-heart"></i>
                        </span>
                        <span>
                            <i className="far fa-comment"></i>
                        </span>
                    </div>
                    <div className="list-tile-likes">{listObj.total_likes} likes</div>
                    <div className="list-tile-caption"><span className="list-tile-user-name">{listObj.user.username}</span> - {listObj.caption}</div>
                    {listObj.total_comments > 0 && <NavLink className="list-tile-view-comments" to={`/lists/${listObj.id}`}>View {listObj.total_comments > 1 && 'all'} {listObj.total_comments} comment{listObj.total_comments > 1 && 's'}</NavLink>}
                    <div className="list-tile-comment-form">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                                required
                            />
                            {errors.length > 0 && <ul className="error-message-container">
                                {errors.map((error, idx) => (
                                    <li className="error-message" key={idx}>{error}</li>
                                ))}
                            </ul>}
                            {/* <button></button> */}
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default ListTile;
