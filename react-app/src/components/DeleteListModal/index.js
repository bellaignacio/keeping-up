import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal';
import * as listActions from "../../store/list";
import './DeleteList.css';

function DeleteListModal({ listObj }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(listActions.removeList(listObj.id));
        history.push(`/${listObj.user_id}`);
        closeModal();
    };

    return (
        <div id="delete-list-container">
            <div id="modal-title">Are you sure you want to delete this list?</div>
            <form id="delete-list-form">
                <button onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default DeleteListModal;
