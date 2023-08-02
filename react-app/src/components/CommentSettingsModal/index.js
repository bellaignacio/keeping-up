import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import EditCommentModal from '../EditCommentModal';
import DeleteCommentModal from '../DeleteCommentModal';
import './CommentSettings.css';

function CommentSettingsModal({ commentObj }) {
    const { closeModal } = useModal();

    return (
        <div id="comment-settings-modal-container">
            <form id="comment-settings-form">
                <OpenModalButton
                    buttonText="Delete Comment"
                    modalComponent={<DeleteCommentModal commentObj={commentObj} />}
                />
                <OpenModalButton
                    buttonText="Edit Comment"
                    modalComponent={<EditCommentModal commentObj={commentObj} />}
                />
                <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default CommentSettingsModal;
