import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import CreateListPage from "../CreateListPage";
import Navigation from "../Navigation";
import UnavailablePage from "../UnavailablePage";
import * as listActions from "../../store/list";
import './EditList.css';

function EditListPage() {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const listObj = useSelector((state) => state.list.current);
    const [isListLoaded, setIsListLoaded] = useState(false);

    useEffect(() => {
        dispatch(listActions.getList(listId))
            .then(() => setIsListLoaded(true));
    }, [dispatch, listId]);

    if (!sessionUser) return <Redirect to="/about" />;

    if (Object.keys(listObj).length === 0) {
        return (
            <>
                <Navigation />
                <UnavailablePage />
            </>
        );
    }

    return (isListLoaded ?
        <CreateListPage listObj={listObj} isEdit={true} />
        : null
    );
}

export default EditListPage;
