import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import UserListModal from "../UserListModal";
import * as listActions from "../../store/list";
import './ListTile.css';

function ListTile({ listObj, listOnly }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState((listObj.likes.filter(likeObj => likeObj.user_id === sessionUser.id)).length > 0);
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
            textDecoration: `solid line-through ${list_style.li_completed_decoration} 3px`
        };
    }

    const handleLike = async () => {
        let data;
        if (isLiked) {
            data = await dispatch(listActions.unlikeList(listObj.id));
            setIsLiked(false)
        } else {
            data = await dispatch(listActions.likeList(listObj.id));
            setIsLiked(true)
        }
        if (data) {
            setErrors(data);
        }
    };

    const handleComment = async (e) => {
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
                    <img className="list-tile-user-image" src={listObj.user.image_url} alt={listObj.user.username}
                        onError={(e) => {
                            e.target.src = "https://i.ibb.co/jTrn4Vc/default.png";
                            e.onerror = null;
                        }}
                    />
                    <div className="list-tile-user-name" onClick={() => history.push(`/${listObj.user.id}`)}>{listObj.user.username}</div>
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
                        <span className={isLiked ? "red-like-icon" : ""}>
                            <i className={isLiked ? "fas fa-heart" : "far fa-heart"} onClick={handleLike}></i>
                        </span>
                        <span>
                            <i className="far fa-comment" onClick={() => history.push(`/lists/${listObj.id}`)} ></i>
                        </span>
                    </div>
                    {listObj.total_likes > 0 && <OpenModalButton
                        buttonText={`${listObj.total_likes} like${listObj.total_likes > 1 ? 's' : ''}`}
                        modalComponent={<UserListModal isSessionUser={false} title="Likes" users={listObj.likes.map(like => like.user)} />}
                    />}
                    <div className="list-tile-caption"><span className="list-tile-user-name" onClick={() => history.push(`/${listObj.user.id}`)}>{listObj.user.username}</span> {listObj.caption}</div>
                    {listObj.total_comments > 0 && <NavLink className="list-tile-view-comments" to={`/lists/${listObj.id}`}>View {listObj.total_comments > 1 && 'all'} {listObj.total_comments} comment{listObj.total_comments > 1 && 's'}</NavLink>}
                    <div>
                        <form className="list-tile-comment-form" onSubmit={handleComment}>
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                                required
                            />
                            <button className={`primary ${comment.length < 1 ? 'invisible' : ''}`} type="submit">Post</button>
                        </form>
                        {errors.length > 0 && <ul className="error-message-container">
                                {errors.map((error, idx) => (
                                    <li className="error-message" key={idx}>{error}</li>
                                ))}
                            </ul>}
                    </div>
                </div>
            </div>
        );
    }
}

export default ListTile;
