import { useContext, useEffect, useState } from "react";
import { NOTES_VISUALIZATION_MODE } from "../constants/NotesVisualizationMode";
import './Notes.css';
import useApi from "./hooks/APIHook";
import LoginCtx from "../contexts/LoginCtx";
import { useNavigate } from "react-router-dom";
import NoteCard from "./atomic/NoteCard";
import NoteListRow from "./atomic/NoteListRow";
import Modal from "./Modal";

const Notes = () => {
    const [showModal, setShowModal] = useState(false);
    const [noteIdToRemove, setNoteIdToRemove] = useState(null);

    const api = useApi();
    const navigate = useNavigate();

    const loginCtx = useContext(LoginCtx);

    const [visualizationMode, setVisualizationMode] = useState(localStorage.getItem("visualizationMode") == null ? NOTES_VISUALIZATION_MODE.CARDS : localStorage.getItem("visualizationMode"));
    const [notes, setNotes] = useState([]);

    const getNotes = () => {
        api.getNotes().then((data) => {
            if (data.status === 401) {
                return;
            }
            data.json().then((json) => {
                setNotes(json);
            }).catch((e) => {
                console.log(e);
            })
        });
    };

    const newNote = () => {
        navigate("/nuevaNota");
    }

    const editNote = (id) => {
        navigate("/editarNota/" + id);
    }

    const removeNote = () => {
        api.removeNote(noteIdToRemove).then((data) => {
            if (data.status === 200) {
                closeModal();
                getNotes();
            }
        });
    }

    const prepareForRemoveNote = (id) => {
        setNoteIdToRemove(id);
        openModal();
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        console.log("closeModal");
        setShowModal(false);
    }

    const seeNote = (id) => {
        navigate("/note/"+id);
    }

    useEffect(() => {
        if (loginCtx.username == null) {
            navigate('/login');
        } else {
            console.log("getting notes");
            getNotes();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("visualizationMode", visualizationMode);
    }, [visualizationMode]);

    if (visualizationMode === NOTES_VISUALIZATION_MODE.LIST) {
        return (
            <div className="notes">
                <div className="notes-title">
                    <h2>Mis notas</h2>
                    <span class="badge" style={{ cursor: "pointer" }} onClick={newNote}>Nueva nota</span>
                    <span class="material-symbols-outlined visualization-change-button" onClick={() => { setVisualizationMode(NOTES_VISUALIZATION_MODE.CARDS) }}>
                        calendar_view_month
                    </span>
                </div>
                <div className="notes-list">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '4%' }}></th>
                                <th style={{ width: '30%' }}>Título</th>
                                <th style={{ width: '40%' }}>Contenido</th>
                                <th style={{ width: '13%' }}>Creada</th>
                                <th style={{ width: '13%' }}>Modificada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, i) => {
                                return (
                                    <NoteListRow
                                        id={note.id}
                                        title={note.title}
                                        content={note.content}
                                        createdAt={note.createdAt}
                                        updatedAt={note.updatedAt}
                                        editNote={editNote}
                                        removeNote={() => { prepareForRemoveNote(note.id) }}
                                        seeNote={seeNote}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Modal onSuccess={removeNote} closeModal={closeModal} show={showModal} message="Desea eliminar la nota?">
                </Modal>
            </div>
        );
    } else if (visualizationMode === NOTES_VISUALIZATION_MODE.CARDS) {
        return (
            <div className="notes">
                <div className="notes-title">
                    <h2>Mis notas</h2>
                    <span class="badge" style={{ cursor: "pointer" }} onClick={newNote}>Nueva nota</span>
                    <span class="material-symbols-outlined visualization-change-button" onClick={() => { setVisualizationMode(NOTES_VISUALIZATION_MODE.LIST) }}>
                        view_list
                    </span>
                </div>
                <div className="notes-cards">
                    {notes.map((note) => {
                        return (
                            <NoteCard
                                id={note.id}
                                title={note.title}
                                content={note.content}
                                createdAt={note.createdAt}
                                updatedAt={note.updatedAt}
                                editNote={editNote}
                                removeNote={() => { prepareForRemoveNote(note.id) }}
                                seeNote={seeNote}
                            />
                        );
                    })}
                </div>
                <Modal onSuccess={removeNote} closeModal={closeModal} show={showModal} message="Desea eliminar la nota?">
                </Modal>
            </div>
        );
    } else {
        return null;
    }
}

export default Notes;