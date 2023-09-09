import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as listActions from "../../store/list";
import './EditListItems.css';

function EditListItemsModal({ listId, setListItems }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const listItems = useSelector((state) => state.list.current.list_items);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const handleEdit = async (e, id, defaultIsComplete) => {
        e.preventDefault();
        const input = document.getElementById(`li-input-${id}`);
        const data = await dispatch(listActions.editListItem(id, input.value, defaultIsComplete));
        if (data) {
            setErrors(data);
        }
    };

    const handleReset = async (e, id, defaultDescription) => {
        e.preventDefault();
        const input = document.getElementById(`li-input-${id}`);
        input.value = defaultDescription;
        setErrors([]);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const data = await dispatch(listActions.createListItem(listId, description));
        if (data) {
            setErrors(data);
        } else {
            setDescription("");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        dispatch(listActions.removeListItem(id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(listActions.getList(listId))
            .then(() => setListItems((listItems.map(li => li.description)).join('\n')))
            .then(() => closeModal());
    };

    return (
        <div id="edit-list-items-container">
            <div id="modal-title">Advanced List Settings</div>
            <form id="edit-list-items-form" onSubmit={handleSubmit}>
                {errors.length > 0 && <ul className="error-message-container">
                    {errors.map((error, idx) => (
                        <li className="error-message" key={idx}>{error}</li>
                    ))}
                </ul>}
                {listItems.map(liObj => {
                    return (
                        <div key={liObj.id} className="list-item-container">
                            <input
                                id={`li-input-${liObj.id}`}
                                className="list-item-input"
                                type="text"
                                defaultValue={liObj.description}
                                required
                            />
                            <div className="list-item-buttons">
                                <button onClick={(e) => handleReset(e, liObj.id, liObj.description)}>&#8634;</button>
                                <button className="primary" onClick={(e) => handleEdit(e, liObj.id, liObj.is_complete)}>&#10003;</button>
                                <button className="delete-list-item-button" onClick={(e) => handleDelete(e, liObj.id)}>&#x2715;</button>
                            </div>
                        </div>
                    );
                })}
                <div className="list-item-container">
                    <input
                        type="text"
                        className="list-item-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add ..."
                    />
                    <button id="add-list-item-button" className="primary" onClick={handleAdd}>&#65291;</button>
                </div>
                <button type="submit">Go Back</button>
            </form>
        </div>
    );
}

export default EditListItemsModal;
