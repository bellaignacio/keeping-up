import { useModal } from '../../context/Modal';
import { useHistory } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import DeleteListModal from '../DeleteListModal';
import './ListSettings.css';

function ListSettingsModal({ listObj }) {
    const { closeModal } = useModal();
    const history = useHistory();

    const handleEdit = async (e) => {
        e.preventDefault();
        history.push(`/lists/${listObj.id}/edit`);
        closeModal();
    };

    return (
        <div id="list-settings-modal-container">
            <form id="list-settings-form">
                <OpenModalButton
                    buttonText="Delete List"
                    modalComponent={<DeleteListModal listObj={listObj} />}
                />
                <button onClick={handleEdit}>Edit List</button>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default ListSettingsModal;
