import { useContext, useEffect, useRef, useState } from 'react';
import useApi from './hooks/APIHook';

import LoginCtx from '../contexts/LoginCtx';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Title from './Title';

const Login = () => {
    const [mensajeError, setMensajeError] = useState("");

    const api = useApi();
    const navigate = useNavigate();

    const userRef = useRef("");
    const passwordRef = useRef("");

    const loginCtx = useContext(LoginCtx);

    const performLogin = (e) => {
        e.preventDefault();

        if (userRef.current.value !== "" && passwordRef.current.value !== "") {
            api.login(userRef.current.value, passwordRef.current.value)
                .then((data) => {
                    console.log(data);
                    const { status } = data;

                    if (status === 200) {
                        console.log("LOGIN CORRECTO");
                        data.json().then((json) => {
                            localStorage.setItem("token", json.token);
                            localStorage.setItem("username", json.username);

                            loginCtx.update({ username: json.username, token: json.token });
                            // loginCtx.token = json.token;
                            // loginCtx.username = json.username;

                            navigate('/welcome');

                            setTimeout(() => {
                                navigate('/notas');
                            }, 2000);
                        });
                        setMensajeError("");
                    } else if (status === 401) {
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

        if (userRef.current.value !== "" && passwordRef.current.value !== "") {
            api.register(userRef.current.value, passwordRef.current.value)
                .then((data => {
                    console.log(data);
                    const { status } = data;
                    if (status === 200) {
                        setMensajeError("");
                        data.json().then((json) => {
                            localStorage.setItem("token", json.token);
                            localStorage.setItem("username", json.username);

                            loginCtx.update({ username: json.username, token: json.username });
                            // loginCtx.token = json.token;
                            // loginCtx.username = json.username;

                            navigate('/welcome');

                            setTimeout(() => {
                                navigate('/notas');
                            }, 2000);
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

    useEffect(() => {
        console.log("UE", loginCtx.username);
        if (loginCtx.username != null) {
            navigate("/notas");
        }
    }, []);

    return (
        <Title title="Iniciar sesión / Registro">
            <div className="login">
                <div className="login-main">
                    <div className="description">Iniciar sesión</div>
                    <form>
                        <div className="form">
                            <input placeholder="Usuario" ref={userRef}></input>
                            <input placeholder="Contraseña" type="password" ref={passwordRef}></input>
                        </div>
                        <div className="errores" style={{ height: "30px" }}>
                            <span style={{ color: "red" }}>{mensajeError}</span>
                        </div>
                        <div className="buttons">
                            <button className="login-button" onClick={performLogin}>Iniciar sesión</button>
                            <button className="register-button" onClick={performRegister}>Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
        </Title>
    );
};

export default Login;