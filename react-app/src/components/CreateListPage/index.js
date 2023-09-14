import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Navigation from "../Navigation";
import OpenModalButton from "../OpenModalButton";
import EditListItemsModal from "../EditListItemsModal";
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
    const [isChanged, setIsChanged] = useState(false);
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/about" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data;
        const form = document.getElementById("create-list-form");
        const formData = new FormData(form);
        formData.append("is_changed", isChanged);
        formData.append("list_items", listItems);
        formData.append("title_style", titleStyle);
        formData.append("title_weight", titleWeight);
        formData.append("title_align", titleAlign);
        formData.append("li_style", liStyle);
        formData.append("li_weight", liWeight);
        formData.append("li_marker", liMarker);
        formData.append("li_completed_style", liCompStyle);
        formData.append("li_completed_weight", liCompWeight);
        if (isEdit) {
            data = await dispatch(listActions.editList(listObj.id, formData));
        } else {
            data = await dispatch(listActions.createList(formData));
        }
        if (data?.id) {
            history.push(`/lists/${data.id}`);
        } else if (data) {
            setErrors(data);
        }
    };

    const displayFile = (e) => {
        e.preventDefault();
        const img = document.getElementById("list-upload-image");
        img.src = URL.createObjectURL(e.target.files[0]);
    };

    const removeFile = (e) => {
        e.preventDefault();
        const img = document.getElementById("list-upload-image");
        img.src = "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/torn-paper.png";
        const upload = document.getElementById("list-upload");
        upload.value = "";
    };

    return (
        <>
            <Navigation />
            <div id="create-list-container">
                <form id="create-list-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div id="list-form-title">{isEdit ? "Edit this list" : "Create a list"}</div>

                    {errors.length > 0 && <ul className="error-message-container">
                        {errors.map((error, idx) => (
                            <li className="error-message" key={idx}>{error}</li>
                        ))}
                    </ul>}

                    <label>
                        Caption
                        <input
                            type="text"
                            name="caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Enter caption here"
                            required
                        />
                    </label>
                    <label>
                        Background Image
                        <input
                            id="list-upload"
                            type="file"
                            name="image_url"
                            accept=".png, .jpg, .jpeg"
                            onChange={async (e) => {
                                await setIsChanged(true);
                                await setImgUrl(e.target.files[0]);
                                await displayFile(e);
                            }}
                        />
                    </label>
                    <div>
                        <img id="list-upload-image"
                            src={isEdit ? imgUrl : "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/torn-paper.png"}
                            onError={(e) => {
                                e.target.src = "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/torn-paper.png";
                                e.onerror = null;
                            }}
                            alt="list-upload-preview"
                        />
                        <button
                            id="list-upload-remove"
                            className="delete"
                            onClick={async (e) => {
                                await setIsChanged(true);
                                await setImgUrl(null);
                                await removeFile(e);
                            }}
                        >&#x2715;</button>
                    </div>

                    <br></br>

                    <label>Title Editor</label>
                    <div id="title-settings-container">
                        <select
                            name="title_font"
                            value={titleFont}
                            onChange={(e) => {
                                document.getElementById("title-input").style.fontFamily = e.target.value;
                                setTitleFont(e.target.value);
                            }}
                            defaultValue={titleFont}
                            style={{ fontFamily: titleFont }}
                        >
                            <option value="Arial">Arial</option>
                            <option value="Arial Black">Arial Black</option>
                            <option value="American Typewriter">American Typewriter</option>
                            <option value="Baskerville">Baskerville</option>
                            <option value="Bradley Hand">Bradley Hand</option>
                            <option value="Brush Script MT">Brush Script MT</option>
                            <option value="Cambria">Cambria</option>
                            <option value="Comic Sans MS">Comic Sans MS</option>
                            <option value="Cookie">Cookie</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Didot">Didot</option>
                            <option value="Garamond">Garamond</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Gill Sans">Gill Sans</option>
                            <option value="Impact">Impact</option>
                            <option value="Luminari">Luminari</option>
                            <option value="Palatino">Palatino</option>
                            <option value="Tahoma">Tahoma</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Trebuchet MS">Trebuchet MS</option>
                            <option value="Verdana">Verdana</option>
                        </select>
                        <select
                            name="title_size"
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
                            name="title_color"
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
                            name="title"
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

                    <br></br>

                    <label>List Editor</label>
                    <div id="list-settings-container">
                        <select
                            name="li_font"
                            value={liFont}
                            onChange={(e) => {
                                document.getElementById("list-text-area").style.fontFamily = e.target.value;
                                setLiFont(e.target.value);
                            }}
                            defaultValue={liFont}
                            style={{ fontFamily: liFont }}
                        >
                            <option value="Arial">Arial</option>
                            <option value="Arial Black">Arial Black</option>
                            <option value="American Typewriter">American Typewriter</option>
                            <option value="Baskerville">Baskerville</option>
                            <option value="Bradley Hand">Bradley Hand</option>
                            <option value="Brush Script MT">Brush Script MT</option>
                            <option value="Cambria">Cambria</option>
                            <option value="Comic Sans MS">Comic Sans MS</option>
                            <option value="Cookie">Cookie</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Didot">Didot</option>
                            <option value="Garamond">Garamond</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Gill Sans">Gill Sans</option>
                            <option value="Impact">Impact</option>
                            <option value="Luminari">Luminari</option>
                            <option value="Palatino">Palatino</option>
                            <option value="Tahoma">Tahoma</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Trebuchet MS">Trebuchet MS</option>
                            <option value="Verdana">Verdana</option>
                        </select>
                        <select
                            name="li_size"
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
                            name="li_color"
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
                            name="list_items"
                            value={listItems}
                            onChange={(e) => setListItems(e.target.value)}
                            placeholder="Enter list here"
                            disabled={isEdit}
                            required
                            rows="5"
                            style={{
                                fontFamily: liFont,
                                fontSize: liSize,
                                fontStyle: liStyle,
                                fontWeight: liWeight,
                                color: liColor
                            }}
                        />
                        {isEdit && <OpenModalButton
                            buttonText="Advanced"
                            modalComponent={<EditListItemsModal listId={listObj.id} setListItems={setListItems} />}
                            className="normal"
                        />}
                    </div>

                    <br></br>

                    <label>Completed Style Editor</label>
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
                            name="li_completed_color"
                            value={liCompColor}
                            onChange={(e) => {
                                document.getElementById("list-completed-input").style.color = e.target.value;
                                setLiCompColor(e.target.value);
                            }}
                        />
                        <input
                            type="color"
                            name="li_completed_decoration"
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
                            disabled={true}
                            value="Completed Style Preview"
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

                    <button className="accent" type="submit">{isEdit ? "Save" : "Post"}</button>
                    <button className="normal" onClick={() => history.push(`/${sessionUser.id}`)}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default CreateListPage;
