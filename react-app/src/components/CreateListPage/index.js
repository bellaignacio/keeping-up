import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import * as listActions from "../../store/list";
import './CreateList.css';

function CreateListPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    const [listItems, setListItems] = useState("")
    const [imgUrl, setImgUrl] = useState(null);
    const [titleFont, setTitleFont] = useState(null);
    const [titleSize, setTitleSize] = useState(null);
    const [titleStyle, setTitleStyle] = useState(null);
    const [titleWeight, setTitleWeight] = useState(null);
    const [titleColor, setTitleColor] = useState(null);
    const [titleAlign, setTitleAlign] = useState(null);
    const [liFont, setLiFont] = useState(null);
    const [liSize, setLiSize] = useState(null);
    const [liStyle, setLiStyle] = useState(null);
    const [liWeight, setLiWeight] = useState(null);
    const [liColor, setLiColor] = useState(null);
    const [liMarker, setLiMarker] = useState(null);
    const [liCompStyle, setLiCompStyle] = useState(null);
    const [liCompWeight, setLiCompWeight] = useState(null);
    const [liCompColor, setLiCompColor] = useState(null);
    const [liCompDecor, setLiCompDecor] = useState(null);
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/about" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(listActions.createList(title, caption, listItems, imgUrl, titleFont, titleSize, titleStyle, titleWeight, titleColor, titleAlign, liFont, liSize, liStyle, liWeight, liColor, liMarker, liCompStyle, liCompWeight, liCompColor, liCompDecor));
        if (data.id) {
            history.push(`/lists/${data}`);
        } else {
            setErrors(data);
        }
    };

    return (
        <div id="create-list-container">
            <form id="create-list-form" onSubmit={handleSubmit}>
                <div>Create a list</div>
                {errors.length > 0 && <ul className="error-message-container">
                    {errors.map((error, idx) => (
                        <li className="error-message" key={idx}>{error}</li>
                    ))}
                </ul>}
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Caption
                    <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    />
                </label>
                <label>
                    ListItems
                    <textarea
                        wrap="hard"
                        value={listItems}
                        onChange={(e) => setListItems(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image URL
                    <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                    />
                </label>
                <label>
                    Title Font
                    <input
                        type="text"
                        value={titleFont}
                        onChange={(e) => setTitleFont(e.target.value)}
                    />
                </label>
                <label>
                    Title Size
                    <input
                        type="text"
                        value={titleSize}
                        onChange={(e) => setTitleSize(e.target.value)}
                    />
                </label>
                <label>
                    Title Style
                    <input
                        type="text"
                        value={titleStyle}
                        onChange={(e) => setTitleStyle(e.target.value)}
                    />
                </label>
                <label>
                    Title Weight
                    <input
                        type="text"
                        value={titleWeight}
                        onChange={(e) => setTitleWeight(e.target.value)}
                    />
                </label>
                <label>
                    Title Color
                    <input
                        type="text"
                        value={titleColor}
                        onChange={(e) => setTitleColor(e.target.value)}
                    />
                </label>
                <label>
                    Title Align
                    <input
                        type="text"
                        value={titleAlign}
                        onChange={(e) => setTitleAlign(e.target.value)}
                    />
                </label>
                <label>
                    List Font
                    <input
                        type="text"
                        value={liFont}
                        onChange={(e) => setLiFont(e.target.value)}
                    />
                </label>
                <label>
                    List Size
                    <input
                        type="text"
                        value={liSize}
                        onChange={(e) => setLiSize(e.target.value)}
                    />
                </label>
                <label>
                    List Style
                    <input
                        type="text"
                        value={liStyle}
                        onChange={(e) => setLiStyle(e.target.value)}
                    />
                </label>
                <label>
                    List Weight
                    <input
                        type="text"
                        value={liWeight}
                        onChange={(e) => setLiWeight(e.target.value)}
                    />
                </label>
                <label>
                    List Color
                    <input
                        type="text"
                        value={liColor}
                        onChange={(e) => setLiColor(e.target.value)}
                    />
                </label>
                <label>
                    List Marker
                    <input
                        type="text"
                        value={liMarker}
                        onChange={(e) => setLiMarker(e.target.value)}
                    />
                </label>
                <label>
                    List Comp Style
                    <input
                        type="text"
                        value={liCompStyle}
                        onChange={(e) => setLiCompStyle(e.target.value)}
                    />
                </label>
                <label>
                    List Comp Weight
                    <input
                        type="text"
                        value={liCompWeight}
                        onChange={(e) => setLiCompWeight(e.target.value)}
                    />
                </label>
                <label>
                    List Comp Color
                    <input
                        type="text"
                        value={liCompColor}
                        onChange={(e) => setLiCompColor(e.target.value)}
                    />
                </label>
                <label>
                    List Comp Decoration
                    <input
                        type="text"
                        value={liCompDecor}
                        onChange={(e) => setLiCompDecor(e.target.value)}
                    />
                </label>
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default CreateListPage;
