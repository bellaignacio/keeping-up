import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import Navigation from "../Navigation";
import * as listActions from "../../store/list";
import './CreateList.css';

function CreateListPage({ listObj, isEdit }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState(isEdit ? listObj.title : "")
    const [caption, setCaption] = useState(isEdit ? listObj.caption : "")
    const [listItems, setListItems] = useState(isEdit ? (listObj.list_items.map(li => li.description)).join('\n') : "")
    const [imgUrl, setImgUrl] = useState(isEdit ? listObj.list_style.image_url : null);
    const [titleFont, setTitleFont] = useState(isEdit ? listObj.list_style.title_font : "Arial");
    const [titleSize, setTitleSize] = useState(isEdit ? listObj.list_style.title_size : "14pt");
    const [titleStyle, setTitleStyle] = useState(isEdit ? listObj.list_style.title_style : "normal");
    const [titleWeight, setTitleWeight] = useState(isEdit ? listObj.list_style.title_weight : "bold");
    const [titleColor, setTitleColor] = useState(isEdit ? listObj.list_style.title_color : "#000000");
    const [titleAlign, setTitleAlign] = useState(isEdit ? listObj.list_style.title_align : "center");
    const [liFont, setLiFont] = useState(isEdit ? listObj.list_style.li_font : "Arial");
    const [liSize, setLiSize] = useState(isEdit ? listObj.list_style.li_size : "12pt");
    const [liStyle, setLiStyle] = useState(isEdit ? listObj.list_style.li_style : "normal");
    const [liWeight, setLiWeight] = useState(isEdit ? listObj.list_style.li_weight : "normal");
    const [liColor, setLiColor] = useState(isEdit ? listObj.list_style.li_color : "#000000");
    const [liMarker, setLiMarker] = useState(isEdit ? listObj.list_style.li_marker : "default");
    const [liCompStyle, setLiCompStyle] = useState(isEdit ? listObj.list_style.li_completed_style : "normal");
    const [liCompWeight, setLiCompWeight] = useState(isEdit ? listObj.list_style.li_completed_weight : "normal");
    const [liCompColor, setLiCompColor] = useState(isEdit ? listObj.list_style.li_completed_color : "#000000");
    const [liCompDecor, setLiCompDecor] = useState(isEdit ? listObj.list_style.li_completed_decoration : "#FF0000");
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/about" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data;
        if (isEdit) {
            data = await dispatch(listActions.editList(listObj.id, title, caption, listItems, imgUrl, titleFont, titleSize, titleStyle, titleWeight, titleColor, titleAlign, liFont, liSize, liStyle, liWeight, liColor, liMarker, liCompStyle, liCompWeight, liCompColor, liCompDecor));
        } else {
            data = await dispatch(listActions.createList(title, caption, listItems, imgUrl, titleFont, titleSize, titleStyle, titleWeight, titleColor, titleAlign, liFont, liSize, liStyle, liWeight, liColor, liMarker, liCompStyle, liCompWeight, liCompColor, liCompDecor));
        }
        if (data.id) {
            history.push(`/lists/${data.id}`);
        } else {
            setErrors(data);
        }
    };

    return (
        <>
            <Navigation />


            <div id="create-list-container">
                <form id="create-list-form" onSubmit={handleSubmit}>
                    <div>{isEdit ? "Edit the list" : "Create a list"}</div>

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
                            defaultValue={titleFont}
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
                            defaultValue={titleSize}
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
                            style={{
                                fontFamily: titleFont,
                                fontSize: titleSize,
                                fontStyle: titleStyle,
                                fontWeight: titleWeight,
                                color: titleColor,
                                textAlign: titleAlign
                            }}
                        />
                    </div>

                    <div id="list-settings-container">
                        <select
                            value={liFont}
                            onChange={(e) => {
                                document.getElementById("list-text-area").style.fontFamily = e.target.value;
                                setLiFont(e.target.value);
                            }}
                            defaultValue={liFont}
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
                            defaultValue={liSize}
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
                            readOnly={isEdit}
                            required
                            style={{
                                fontFamily: liFont,
                                fontSize: liSize,
                                fontStyle: liStyle,
                                fontWeight: liWeight,
                                color: liColor
                            }}
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
                            value={liCompDecor}
                            onChange={(e) => {
                                document.getElementById("list-completed-input").style.textDecoration = `solid line-through ${e.target.value} 3px`
                                setLiCompDecor(e.target.value);
                            }}
                        />
                    </div>

                    <div id="list-completed-input-container">
                        <input
                            id="list-completed-input"
                            readOnly={true}
                            value="Set your completed style here"
                            style={{
                                fontFamily: liFont,
                                fontSize: liSize,
                                fontStyle: liCompStyle,
                                fontWeight: liCompWeight,
                                color: liCompColor,
                                textDecoration: `solid line-through ${liCompDecor} 3px`
                            }}
                        />
                    </div>

                    <button type="submit">{isEdit ? "Save" : "Post"}</button>
                    <button onClick={() => history.push(`/${sessionUser.id}`)}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default CreateListPage;
