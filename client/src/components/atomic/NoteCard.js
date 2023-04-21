import { useNavigate } from 'react-router-dom';
import './NoteCard.css';

const NoteCard = ({ id, title, content, createdAt, updatedAt, editNote, removeNote, seeNote }) => {
    const parseDate = (stringDate) => {
        return new Date(stringDate).toLocaleDateString() + " a las " + new Date(stringDate).toLocaleTimeString();
    }

    return (
        <div className="card" key={id}>
            <div className="card-header">
                <h3 title={title}>{title}</h3>
            </div>
            <div className="card-content" title={content}>
                {content}
            </div>
            <div className="card-bottom">
                <span>Creada el {parseDate(createdAt)}</span>
                <span>Modificada el {parseDate(updatedAt)}</span>
            </div>
            <div className="card-footer">
                <span class="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => { editNote(id) }}>
                    edit
                </span>
                <span class="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => { removeNote(id) }}>
                    delete
                </span>
                <span class="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => { seeNote(id) }}>
                    visibility
                </span>
            </div>
        </div>
    )
}

export default NoteCard;