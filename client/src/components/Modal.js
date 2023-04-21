import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import "./Modal.css";

const Modal = ({ children, show, onSuccess, closeModal, message }) => {
    const modalRef = useRef(null);
    const modalGroupRef = useRef(document.getElementById("modals"));

    useEffect(() => {
        const modalEl = document.createElement("div");
        modalEl.classList.add("modal-hidden");
        modalGroupRef.current.appendChild(modalEl);
        modalRef.current = modalEl;

        return () => {
            modalGroupRef.current.removeChild(modalRef.current);
        }
    }, []);

    useEffect(() => {
        if (modalRef != null) {
            if (show) {
                modalRef.current.classList.remove("modal-hidden");
            } else {
                modalRef.current.classList.add("modal-hidden");
            }
        }
    }, [show]);

    if (show && modalRef.current != null) {
        return createPortal(
            <div role="dialog" aria-modal="true">
                <div className="modal-background" onClick={closeModal} />
                <div className="modal">
                    <button
                        className="modal-close outline"
                        aria-label="Cerrar modal"
                        onClick={closeModal}
                    >&times;</button>
                    <span>{message}</span>
                    <div className="buttons">
                        <button onClick={onSuccess}>Si</button>
                        <button onClick={closeModal}>No</button>
                    </div>
                </div>
            </div>,
            modalRef.current
        )
    }
    return null;
}

export default Modal;