import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import './About.css';

function AboutPage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to={`/${sessionUser.id}`} />;

    return (
        <>
            <Navigation />
            <div id="about-container">
                <div id="site-description">
                    <p>
                        Tired of seeing countless photos on social media? Tired of comparing yourself to others? Tired of feeling unproductive and lazy? Instead of posting about your one-off Saturday mimosas or touristy photo ops, post about your goals and ambitions!
                    </p>
                    <p>
                        Keeping Up, an Instagram-style clone, is a website for users to share their current activities in the form of to-do/bucket lists, creating an environment of accountability and encouragement among their peers.
                    </p>
                    <p>
                        Share YOUR reality with friends and family. Inspire and be inspired to keep up with your ambitions - no matter how big or small.
                    </p>
                    <div id="list-demo-popup">
                        Click on each task to see what happens!
                    </div>
                </div>
                <div id="list-demo-wrapper">
                    <div id="list-demo-header">
                        <img id="list-demo-user-image" src="https://i.ibb.co/jTrn4Vc/default.png" alt="demo-user" />
                        <div className="list-demo-user-name">awesome_user_xoxo</div>
                    </div>
                    <div id="list-demo">
                        <div id="list-demo-content">
                            <p id="list-demo-title">How to Keep Up</p>
                            <ul id="list-demo-list">
                                <li id="list-demo-li-1" onClick={() => {
                                    let currentStyle = document.getElementById("list-demo-li-1").style.textDecoration;
                                    if (currentStyle === "") document.getElementById("list-demo-li-1").style.textDecoration = "solid line-through red 3px";
                                    else document.getElementById("list-demo-li-1").style.textDecoration = "";
                                }}>Create a Keeping Up Account</li>
                                <li id="list-demo-li-2" onClick={() => {
                                    let currentStyle = document.getElementById("list-demo-li-2").style.textDecoration;
                                    if (currentStyle === "") document.getElementById("list-demo-li-2").style.textDecoration = "solid line-through red 3px";
                                    else document.getElementById("list-demo-li-2").style.textDecoration = "";
                                }}>Create your 1st List</li>
                                <li id="list-demo-li-3" onClick={() => {
                                    let currentStyle = document.getElementById("list-demo-li-3").style.textDecoration;
                                    if (currentStyle === "") document.getElementById("list-demo-li-3").style.textDecoration = "solid line-through red 3px";
                                    else document.getElementById("list-demo-li-3").style.textDecoration = "";
                                }}>Follow other Keeping Up Users</li>
                                <li id="list-demo-li-4" onClick={() => {
                                    let currentStyle = document.getElementById("list-demo-li-4").style.textDecoration;
                                    if (currentStyle === "") document.getElementById("list-demo-li-4").style.textDecoration = "solid line-through red 3px";
                                    else document.getElementById("list-demo-li-4").style.textDecoration = "";
                                }}>Complete your lists (show off that progress!)</li>
                                <li id="list-demo-li-5" onClick={() => {
                                    let currentStyle = document.getElementById("list-demo-li-5").style.textDecoration;
                                    if (currentStyle === "") document.getElementById("list-demo-li-5").style.textDecoration = "solid line-through red 3px";
                                    else document.getElementById("list-demo-li-5").style.textDecoration = "";
                                }}>Remind your friends and family to <span style={{ fontStyle: "italic" }}>keep up!</span></li>
                            </ul>
                        </div>
                    </div>
                    <div id="list-demo-footer">
                        <div id="list-demo-icons">
                            <span id="heart-icon-wrapper">
                                <i id="heart-icon" className="far fa-heart"
                                    onClick={() => {
                                        document.getElementById("heart-icon-wrapper").classList.toggle("red-like-icon");
                                        document.getElementById("heart-icon").classList.toggle("far");
                                        document.getElementById("heart-icon").classList.toggle("fas");
                                    }}>
                                </i>
                            </span>
                            <span>
                                <i className="far fa-comment"></i>
                            </span>
                        </div>
                        <div id="list-demo-likes">1,294,302 likes</div>
                        <div id="list-demo-caption"><span className="list-demo-user-name">awesome_user_xoxo</span> here's how to get started!</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutPage;
