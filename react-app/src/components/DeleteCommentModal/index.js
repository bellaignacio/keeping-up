import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal';
import * as listActions from "../../store/list";
import './DeleteComment.css';

function DeleteCommentModal({ commentObj }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(listActions.removeComment(commentObj.id));
        closeModal();
    };

    return (
        <div id="delete-comment-container">
            <form id="delete-comment-form">
                <div>Are you sure you want to delete this comment?</div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default DeleteCommentModal;
