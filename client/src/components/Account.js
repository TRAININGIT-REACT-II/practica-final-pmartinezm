import { useContext, useEffect, useState } from "react";

import './Account.css';
import ThemeChanger from "./ThemeChanger";
import LoginCtx from "../contexts/LoginCtx";
import { useNavigate } from "react-router-dom";

const Account = () => {
    const [name, setName] = useState(localStorage.getItem("username") === null ? 'Perfil': localStorage.getItem("username"));
    const [showMenu, setShowMenu] = useState(false);
    const [menu, setMenu] = useState(null);

    const loginCtx = useContext(LoginCtx);

    const navigate = useNavigate();

    const switchMenu = () => {
        setShowMenu(!showMenu);
    }

    const logout = () => {
        localStorage.clear();
        // setName("Perfil");

        loginCtx.update({username: null, token: null});
        navigate("/");
        // loginCtx.token = null;
        // loginCtx.username = null;
    }

    const goToNotes = () => {
        navigate("/notas");
    }

    useEffect(()=>{
        console.log("useEffect showMenu", showMenu);
        if(showMenu) {
            setMenu(
                <div className="menu">
                    <div className="menu-item">
                        <ThemeChanger />
                    </div>
                    <div className="menu-item" onClick={goToNotes}>
                        Mis notas
                    </div>
                    <div className="menu-item" onClick={logout}>
                        Cerrar sesión
                    </div>
                </div>
            );
        } else {
            setMenu(null);
        }
    }, [showMenu]);

    return (
        <div className="account" onClick={switchMenu} style={{cursor: 'pointer'}}>
            <span class="material-symbols-outlined menu-button" style={{fontSize: '3em'}}>
                account_circle
            </span>
            <div style={{verticalAlign: 'center'}}>{loginCtx.username}</div>
            {menu}
        </div>
    )
}

export default Account;