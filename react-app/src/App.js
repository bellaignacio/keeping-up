import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ExplorePage from "./components/ExplorePage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import CreateListPage from "./components/CreateListPage";
import EditListPage from "./components/EditListPage";
import ListPage from "./components/ListPage";
import EditProfilePage from "./components/EditProfilePage";
import ProfilePage from "./components/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/explore">
            <ExplorePage />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/lists/new">
            <CreateListPage />
          </Route>
          <Route path="/lists/:listId/edit">
            <EditListPage />
          </Route>
          <Route path="/lists/:listId">
            <ListPage />
          </Route>
          <Route path="/:userId/edit">
            <EditProfilePage />
          </Route>
          <Route path="/:userId">
            <ProfilePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
