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
        const data = await dispatch(listActions.createList(title, caption, listItems, imgUrl, titleFont, titleSize, titleStyle, titleWeight, titleColor, titleAlign, liFont, liSize, liStyle, liWeight, liColor, liMarker, liCompStyle, liCompWeight, liCompColor, liCompDecor));
        if (data.id) {
            history.push(`/lists/${data.id}`);
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
                    <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Enter caption here"
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        placeholder="Enter background image URL here"
                    />
                </label>

                <div id="title-settings-container">
                    <select
                        value={titleFont}
                        onChange={(e) => {
                            document.getElementById("title-input").style.fontFamily = e.target.value;
                            setTitleFont(e.target.value);
                        }}
                        defaultValue="Arial"
                        style={{ fontFamily: titleFont }}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Cambria">Cambria</option>
                        <option value="Comic Sans MS">Comic Sans MS</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                    </select>
                    <select
                        value={titleSize}
                        onChange={(e) => {
                            document.getElementById("title-input").style.fontSize = e.target.value;
                            setTitleSize(e.target.value);
                        }}
                        defaultValue="14pt"
                    >
                        <option value="12pt">12</option>
                        <option value="14pt">14</option>
                        <option value="18pt">18</option>
                        <option value="24pt">24</option>
                        <option value="36pt">36</option>
                    </select>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("title-input").style.fontWeight = ((titleWeight !== "normal" ? "normal" : "bold"));
                            setTitleWeight((titleWeight !== "normal" ? "normal" : "bold"));
                        }}
                        style={{ fontWeight: "bold" }}
                    >B
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("title-input").style.fontStyle = ((titleStyle !== "normal" ? "normal" : "italic"));
                            setTitleStyle((titleStyle !== "normal" ? "normal" : "italic"));
                        }}
                        style={{ fontStyle: "italic" }}
                    >I
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
                        }}
                    ><i className="fas fa-align-center"></i>
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("title-input").style.textAlign = "right";
                            setTitleAlign("right");
                        }}
                    ><i className="fas fa-align-right"></i>
                    </button>
                    <input
                        type="color"
                        value={titleColor}
                        onChange={(e) => {
                            document.getElementById("title-input").style.color = e.target.value;
                            setTitleColor(e.target.value);
                        }}
                    />
                </div>

                <div id="title-input-container">
                    <input
                        id="title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter list title here"
                        required
                    />
                </div>

                <div id="list-settings-container">
                    <select
                        value={liFont}
                        onChange={(e) => {
                            document.getElementById("list-text-area").style.fontFamily = e.target.value;
                            setLiFont(e.target.value);
                        }}
                        defaultValue="Arial"
                        style={{ fontFamily: liFont }}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Cambria">Cambria</option>
                        <option value="Comic Sans MS">Comic Sans MS</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                    </select>
                    <select
                        value={liSize}
                        onChange={(e) => {
                            document.getElementById("list-text-area").style.fontSize = e.target.value;
                            setLiSize(e.target.value);
                        }}
                        defaultValue="14pt"
                    >
                        <option value="12pt">12</option>
                        <option value="14pt">14</option>
                        <option value="18pt">18</option>
                        <option value="24pt">24</option>
                        <option value="36pt">36</option>
                    </select>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("list-text-area").style.fontWeight = ((liWeight !== "normal" ? "normal" : "bold"));
                            setLiWeight((liWeight !== "normal" ? "normal" : "bold"));
                        }}
                        style={{ fontWeight: "bold" }}
                    >B
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("list-text-area").style.fontStyle = ((liStyle !== "normal" ? "normal" : "italic"));
                            setLiStyle((liStyle !== "normal" ? "normal" : "italic"));
                        }}
                        style={{ fontStyle: "italic" }}
                    >I
                    </button>
                    <input
                        type="color"
                        value={liColor}
                        onChange={(e) => {
                            document.getElementById("list-text-area").style.color = e.target.value;
                            setLiColor(e.target.value);
                        }}
                    />
                </div>

                <div id="list-text-area-container">
                    <textarea
                        id="list-text-area"
                        wrap="hard"
                        value={listItems}
                        onChange={(e) => setListItems(e.target.value)}
                        placeholder="Enter list here"
                        required
                    />
                </div>

                <div id="list-completed-settings-container">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("list-completed-input").style.fontWeight = ((liCompWeight !== "normal" ? "normal" : "bold"));
                            setLiCompWeight((liCompWeight !== "normal" ? "normal" : "bold"));
                        }}
                        style={{ fontWeight: "bold" }}
                    >B
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("list-completed-input").style.fontStyle = ((liCompStyle !== "normal" ? "normal" : "italic"));
                            setLiCompStyle((liCompStyle !== "normal" ? "normal" : "italic"));
                        }}
                        style={{ fontStyle: "italic" }}
                    >I
                    </button>
                    <input
                        type="color"
                        value={liCompColor}
                        onChange={(e) => {
                            document.getElementById("list-completed-input").style.color = e.target.value;
                            setLiCompColor(e.target.value);
                        }}
                    />
                    <input
                        type="color"
                        onChange={(e) => {
                            document.getElementById("list-completed-input").style.textDecoration = `solid line-through ${e.target.value} 3px`
                            setLiCompDecor(`solid line-through ${e.target.value} 3px`);
                        }}
                    />
                </div>

                <div id="list-completed-input-container">
                    <input
                        id="list-completed-input"
                        readOnly={true}
                        value="Set your completed style here"
                        style={{fontFamily: liFont, fontSize: liSize, color: "gray"}}
                    />
                </div>

                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default CreateListPage;
