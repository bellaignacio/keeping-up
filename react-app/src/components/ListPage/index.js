import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, useHistory } from "react-router-dom";
import Navigation from "../Navigation";
import UnavailablePage from "../UnavailablePage";
import OpenModalButton from "../OpenModalButton";
import ListSettingsModal from "../ListSettingsModal";
import CommentSettingsModal from "../CommentSettingsModal";
import UserListModal from "../UserListModal";
import * as listActions from "../../store/list";
import './List.css';

function ListPage() {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const listObj = useSelector((state) => state.list.current);
    const [isListLoaded, setIsListLoaded] = useState(false);
    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(listActions.getList(listId))
            .then(() => setIsListLoaded(true));
    }, [dispatch, listId]);

    useEffect(() => {
        setIsLiked((listObj.likes?.filter(likeObj => likeObj.user_id === sessionUser.id))?.length > 0);
    }, [listObj])

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

    const handleLiToggle = async (li) => {
        const data = await dispatch(listActions.editListItem(li.id, li.description, !li.is_complete));
        if (data) {
            setErrors(data);
        }
    };

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
            document.getElementsByClassName("list-tile-comments")[0].scrollTop = document.getElementsByClassName("list-tile-comments")[0].scrollHeight;
        }
    };

    if (!sessionUser) return <Redirect to="/about" />;

    // if (!listObj.keys) {
    //     return (
    //         <>
    //             <Navigation />
    //             <UnavailablePage />
    //         </>
    //     );
    // }

    return (
        <>
            <Navigation />
            {isListLoaded &&
                <div id="list-page-wrapper">
                    <div className="list-tile" style={listStyleSettings(listObj.list_style)}>
                        <div className="list-tile-content">
                            <p style={titleStyleSettings(listObj.list_style)}>{listObj.title}</p>
                            <ul id={`list-${listObj.id}`} style={liStyleSettings(listObj.list_style)}>
                                {listObj.list_items.map(li => (
                                    <li key={li.id} onClick={listObj.user_id === sessionUser.id ? () => handleLiToggle(li) : null} style={li.is_complete ? liCompStyleSettings(listObj.list_style) : null}>{li.description}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="list-info">
                        <div className="list-tile-header">
                            <div className="list-tile-subheader">
                                <img className="list-tile-user-image" src={listObj.user.image_url} alt={listObj.user.username}
                                    onError={(e) => {
                                        e.target.src = "https://i.ibb.co/jTrn4Vc/default.png";
                                        e.onerror = null;
                                    }}
                                />
                                <div className="list-tile-user-name" onClick={() => history.push(`/${listObj.user.id}`)}>{listObj.user.username}</div>
                            </div>
                            {listObj.user_id === sessionUser.id && <OpenModalButton
                                buttonText={<span><i className="fas fa-ellipsis-h"></i></span>}
                                modalComponent={<ListSettingsModal listObj={listObj} />}
                            />}
                        </div>
                        <div className="list-tile-comments">
                            <div className="list-tile-caption">
                                <img className="list-tile-user-image" src={listObj.user.image_url} alt={listObj.user.username}
                                    onError={(e) => {
                                        e.target.src = "https://i.ibb.co/jTrn4Vc/default.png";
                                        e.onerror = null;
                                    }}
                                />
                                <div>
                                    <span className="list-tile-user-name" onClick={() => history.push(`/${listObj.user.id}`)}>{listObj.user.username}</span> {listObj.caption}
                                </div>
                            </div>
                            {(listObj.comments.sort((e1, e2) => new Date(e1.created_at).getTime() - new Date(e2.created_at).getTime())).map(commentObj => {
                                return (
                                    <div key={commentObj.id} className="list-tile-comment">
                                        <img className="list-tile-user-image" src={commentObj.user.image_url} alt={commentObj.user.username}
                                            onError={(e) => {
                                                e.target.src = "https://i.ibb.co/jTrn4Vc/default.png";
                                                e.onerror = null;
                                            }}
                                        />
                                        <div>
                                            <span className="list-tile-user-name" onClick={() => history.push(`/${commentObj.user.id}`)}>{commentObj.user.username}</span> {commentObj.comment}
                                            {commentObj.user_id === sessionUser.id && <OpenModalButton
                                                buttonText={<span><i className="fas fa-ellipsis-h"></i></span>}
                                                modalComponent={<CommentSettingsModal commentObj={commentObj} />}
                                            />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="list-tile-footer">
                            <div className="list-tile-icons">
                                <span className={isLiked ? "red-like-icon" : ""}>
                                    <i className={isLiked ? "fas fa-heart" : "far fa-heart"} onClick={handleLike}></i>
                                </span>
                                <span>
                                    <i className="far fa-comment" onClick={() => document.getElementById("comment-input").focus()}></i>
                                </span>
                            </div>
                            {listObj.total_likes > 0 && <OpenModalButton
                                buttonText={`${listObj.total_likes} like${listObj.total_likes > 1 ? 's' : ''}`}
                                modalComponent={<UserListModal isSessionUser={false} title="Likes" users={listObj.likes.map(like => like.user)}/>}
                            />}
                            <div>
                                <form className="list-tile-comment-form" onSubmit={handleComment}>
                                    <input
                                        id="comment-input"
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ListPage;
