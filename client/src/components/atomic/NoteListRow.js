import { useNavigate } from "react-router-dom";

const NoteListRow = ({ id, title, content, createdAt, updatedAt, editNote, removeNote, seeNote }) => {
    const navigate = useNavigate();

    const edit = () => {
        navigate("/editarNota/" + id);
    }

    const parseDate = (stringDate) => {
        return new Date(stringDate).toLocaleDateString() + " a las " + new Date(stringDate).toLocaleTimeString();
    }

    return (
        <tr key={id}>
            <td>
                <span class="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => { editNote(id) }}>
                    edit
                </span>
                <span class="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => { removeNote(id) }}>
                    delete
                </span>
                <span class="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => { seeNote(id) }}>
                    visibility
                </span>
            </td>
            <td>{title}</td>
            <td>{content}</td>
            <td style={{ fontSize: "0.75em" }}>{parseDate(createdAt)}</td>
            <td style={{ fontSize: "0.75em" }}>{parseDate(updatedAt)}</td>
        </tr>
    )
}

export default NoteListRow;