import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


function CreateListPage() {
    const dispatch = useDispatch();
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

    //   if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(listItems.toString());
        // const response = await fetch("/api/lists", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         title,
        //         caption,
        //         list_items: listItems,
        //         image_url: imgUrl,
        //         title_font: titleFont,
        //         title_size: titleSize,
        //         title_style: titleStyle,
        //         title_weight: titleWeight,
        //         title_color: titleColor,
        //         title_align: titleAlign,
        //         li_font: liFont,
        //         li_size: liSize,
        //         li_style: liStyle,
        //         li_weight: liWeight,
        //         li_color: liColor,
        //         li_marker: liMarker,
        //         li_completed_style: liCompStyle,
        //         li_completed_weight: liCompWeight,
        //         li_completed_color: liCompColor,
        //         li_completed_decoration: liCompDecor
        //     }),
        // });

        // if (response.ok) {
        //     const data = await response.json();
        //     return data;
        // } else if (response.status < 500) {
        //     const data = await response.json();
        //     if (data.errors) {
        //         setErrors(data.errors);
        //     }
        // } else {
        //     return ["An error occurred. Please try again."];
        // }
    };

    return (
        <>
            <h1>CreateListPage</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
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
        </>
    );
}

export default CreateListPage;
