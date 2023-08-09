import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as listActions from "../../store/list";
import './EditComment.css';

function EditCommentModal({ commentObj }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [comment, setComment] = useState(commentObj.comment);
    const [errors, setErrors] = useState([]);

    const handleEdit = async (e) => {
        e.preventDefault();
        const data = await dispatch(listActions.editComment(commentObj.id, comment));
        if (data) {
            setErrors(data);
        } else {
            closeModal();
        }
    };

    return (
        <div id="edit-comment-container">
            <div id="modal-title">Edit Comment</div>
            <form id="edit-comment-form">
                {errors.length > 0 && <ul className="error-message-container">
                    {errors.map((error, idx) => (
                        <li className="error-message" key={idx}>{error}</li>
                    ))}
                </ul>}
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add comment here"
                    required
                />
                <button className="primary" onClick={handleEdit}>Save</button>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default EditCommentModal;
