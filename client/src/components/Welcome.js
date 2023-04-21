import {useState, useRef, useContext} from 'react';
import useApi from './hooks/APIHook';

import './Welcome.css';
import LoginCtx from '../contexts/LoginCtx';

const Welcome = () => {
    const [mensajeError, setMensajeError] = useState("");

    const api = useApi();

    const userRef = useRef("");
    const passwordRef = useRef("");

    const loginCtx = useContext(LoginCtx);

    const performLogin = (e) => {
        e.preventDefault();

        if(userRef.current.value !== "" && passwordRef.current.value !== "") {
            api.login(userRef.current.value, passwordRef.current.value)
            .then((data) => {
                console.log(data);
                const {status} = data;

                if(status === 200) {
                    console.log("LOGIN CORRECTO");
                    data.json().then((json) => {
                        localStorage.setItem("token", json.token);
                        localStorage.setItem("username", json.username);

                        loginCtx.update({username: json.username, token: json.token});
                        // loginCtx.token = json.token;
                        // loginCtx.username = json.username;
                    });
                    setMensajeError("");
                } else if(status === 401) {
                    setMensajeError("Nombre de usuario o contraseña incorrectos.");
                }
            }).catch((e) => {
                console.log("ERROR", e);
                setMensajeError("Ha ocurrido un error en el login.");
            })
        } else {
            setMensajeError("El nombre de usuario o la contaseña están vacíos.");
        }
    };

    const performRegister = (e) => {
        e.preventDefault();

        if(userRef.current.value !== "" && passwordRef.current.value !== "") {
            api.register(userRef.current.value, passwordRef.current.value)
            .then((data => {
                const {status} = data;
                if(status === 200) {
                    setMensajeError("");
                    data.json().then((json) => {
                        localStorage.setItem("token", json.token);
                        localStorage.setItem("username", json.username);

                        loginCtx.update({username: token.username, token: json.username});
                        // loginCtx.token = json.token;
                        // loginCtx.username = json.username;
                    });
                }
            })).catch((e) => {
                console.log("ERROR", e);
                setMensajeError("Ha ocurrido un error en el registro.");
            });
        } else {
            setMensajeError("El nombre de usuario o la contaseña están vacíos.");
        }
    }

    return (
        <div className="login">
            <div className="login-main">
                <div className="description">Bienvenido de nuevo, {loginCtx.username}</div>
                <div className="description" style={{fontSize: "1em"}}>Serás redirigido en breve. <a href="/notas">Haz click aquí si no es así.</a></div>
            </div>
        </div>
    );
};

export default Welcome;