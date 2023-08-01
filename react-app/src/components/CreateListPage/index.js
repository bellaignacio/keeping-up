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
    const [titleFont, setTitleFont] = useState("Arial");
    const [titleSize, setTitleSize] = useState("14pt");
    const [titleStyle, setTitleStyle] = useState("normal");
    const [titleWeight, setTitleWeight] = useState("bold");
    const [titleColor, setTitleColor] = useState("black");
    const [titleAlign, setTitleAlign] = useState("center");
    const [liFont, setLiFont] = useState("Arial");
    const [liSize, setLiSize] = useState("12pt");
    const [liStyle, setLiStyle] = useState("normal");
    const [liWeight, setLiWeight] = useState("normal");
    const [liColor, setLiColor] = useState("black");
    const [liMarker, setLiMarker] = useState("default");
    const [liCompStyle, setLiCompStyle] = useState("normal");
    const [liCompWeight, setLiCompWeight] = useState("normal");
    const [liCompColor, setLiCompColor] = useState("black");
    const [liCompDecor, setLiCompDecor] = useState("solid line-through red 3px");
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/about" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(titleWeight);
        console.log(titleStyle);
        console.log(titleAlign);
        console.log(titleSize);
        // const data = await dispatch(listActions.createList(title, caption, listItems, imgUrl, titleFont, titleSize, titleStyle, titleWeight, titleColor, titleAlign, liFont, liSize, liStyle, liWeight, liColor, liMarker, liCompStyle, liCompWeight, liCompColor, liCompDecor));
        // if (data.id) {
        //     history.push(`/lists/${data}`);
        // } else {
        //     setErrors(data);
        // }
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

                <div id="title-settings-container">
                    {/* Font
                        Size
                        Color */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("title-input").style.fontWeight = ((titleWeight !== "normal" ? "normal" : "bold"));
                            setTitleWeight((titleWeight !== "normal" ? "normal" : "bold"));
                        }}
                    >Bold
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("title-input").style.fontStyle = ((titleStyle !== "normal" ? "normal" : "italic"));
                            setTitleStyle((titleStyle !== "normal" ? "normal" : "italic"));
                        }}
                    >Italic
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("title-input").style.textAlign = "left";
                            setTitleAlign("left");
                        }}
                    ><i className="fas fa-align-left"></i>
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("title-input").style.textAlign = "center";
                            setTitleAlign("center");
                        }}>
                        <i className="fas fa-align-center"></i>
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("title-input").style.textAlign = "right";
                            setTitleAlign("right");
                        }}>
                        <i className="fas fa-align-right"></i>
                    </button>
                    <select value={titleSize} onChange={(e) =>setTitleSize(e.target.value)} defaultValue="14pt">
                        <option value="12pt">12</option>
                        <option value="14pt">14</option>
                        <option value="18pt">18</option>
                        <option value="24pt">24</option>
                        <option value="36pt">36</option>
                    </select>
                </div>

                <div id="title-input-container">
                    <input
                        id="title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                </div>
                <label>
                    <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Caption"
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        placeholder="Image URL"
                    />
                </label>

                <div id="list-settings-container">
                    {/* Font
                        Size
                        Style
                        Weight
                        Color
                        Marker */}
                </div>

                <div id="list-text-area-container">
                    <textarea
                        id="list-text-area"
                        wrap="hard"
                        value={listItems}
                        // rows="10"
                        // cols="50"
                        onChange={(e) => setListItems(e.target.value)}
                        required
                    />
                </div>

                <div id="list-completed-settings-container">
                    {/* Style
                        Weight
                        Color
                        Decor */}
                </div>

                {/* <label>
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
                </label> */}
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default CreateListPage;
