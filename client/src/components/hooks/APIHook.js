import { useContext } from "react";
import LoginCtx from "../../contexts/LoginCtx";

const useApi = () => {

    const loginContext = useContext(LoginCtx);

    const login = (username, password) => {
        return fetch(API_URL + "/api/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type": "Application/json; charset=UTF-8"
            }
        });
    }

    const register = (username, password) => {
        return fetch(API_URL + "/api/register", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type": "Application/json; charset=UTF-8"
            }
        });
    }

    const getNotes = () => {
        return fetch(API_URL + "/api/notes", {
            method: "GET",
            headers: {
                "api-token": loginContext.token,
                "Content-Type": "Application/json; charset=UTF-8"
            }
        })
    }

    const newNote = (title, content) => {
        return fetch(API_URL + "/api/notes", {
            method: "POST",
            headers: {
                "api-token": loginContext.token,
                "Content-Type": "Application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                title: title,
                content, content
            })
        })
    }

    const editNote = (id, title, content) => {
        return fetch(API_URL + "/api/notes/" + id, {
            method: "PUT",
            headers: {
                "api-token": loginContext.token,
                "Content-Type": "Application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
    }

    const getNote = (id) => {
        return fetch(API_URL + "/api/notes/" + id, {
            method: "GET",
            headers: {
                "api-token": loginContext.token,
                "Content-Type": "Application/json; charset=UTF-8"
            },
        });
    };

    const removeNote = (id) => {
        return fetch(API_URL + "/api/notes/" + id, {
            method: "DELETE",
            headers: {
                "api-token": loginContext.token,
            }
        })
    }

    return {
        login,
        register,
        getNotes,
        newNote,
        editNote,
        getNote,
        removeNote
    }
}

export default useApi;