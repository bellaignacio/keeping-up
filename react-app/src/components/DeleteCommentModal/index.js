import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as listActions from "../../store/list";
import './DeleteComment.css';

function DeleteCommentModal({ commentObj }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(listActions.removeComment(commentObj.id));
        closeModal();
    };

    return (
        <div id="delete-comment-container">
            <div id="modal-title">Are you sure you want to delete this comment?</div>
            <form id="delete-comment-form">
                <button className="delete" onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default DeleteCommentModal;
