import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as listActions from "../../store/list";
import './EditListItems.css';

function EditListItemsModal({ listId, setListItems }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const listItems = useSelector((state) => state.list.current.list_items);
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
                        <div className="list-item-container">
                            <input
                                id={`li-input-${liObj.id}`}
                                type="text"
                                defaultValue={liObj.description}
                                required
                            />
                            <div className="list-item-buttons">
                                <button onClick={(e) => handleReset(e, liObj.id, liObj.description)}>&#8634;</button>
                                <button className="primary" onClick={(e) => handleEdit(e, liObj.id, liObj.is_complete)}>&#10003;</button>
                            </div>
                        </div>
                    );
                })}
                <button type="submit">Go Back</button>
            </form>
        </div>
    );
}

export default EditListItemsModal;