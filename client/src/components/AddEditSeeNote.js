import { useEffect, useRef, useState } from "react";
import useApi from "./hooks/APIHook";
import { useNavigate, useParams } from "react-router-dom";
import './AddEditSeeNote.css';

const AddEditSeeNote = ({ isEditing, isVisualization }) => {
    const api = useApi();

    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (isEditing || isVisualization) {
            console.log("getting note to edit");
            api.getNote(id).then((data) => {
                if (data.status === 200) {
                    data.json().then((json) => {
                        titleRef.current.value = json.title;
                        contentRef.current.value = json.content;
                    })
                }
            })
        }
    }, []);

    const save = () => {
        if (isEditing) {
            console.log("editing");
            api.editNote(id, titleRef.current.value, contentRef.current.value).then((data) => {
                if (data.status === 200) {
                    navigate("/notas/");
                }
            }).catch((e) => {
                console.log(e);
            })
        } else {
            console.log("not editing");
            api.newNote(titleRef.current.value, contentRef.current.value).then((data) => {
                if (data.status === 200) {
                    navigate("/notas/");
                }
            }).catch((e) => {
                console.log(e);
            })
        }
    };

    return (
        <>
            <div className="form add-edit-note">
                <input placeholder="Título" type="text" ref={titleRef} disabled={isVisualization}></input>
                <textarea placeholder="Contenido" type="text" ref={contentRef} disabled={isVisualization}></textarea>
                <button onClick={save} style={isVisualization ? {display: 'none'}:{}}>Guardar</button>
            </div>
        </>
    )
}

export default AddEditSeeNote;