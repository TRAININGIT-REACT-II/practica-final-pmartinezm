import { useContext } from "react";
import ThemeCtx from "../contexts/ThemeCtx";
import { THEMES } from "../constants/Themes";

const ThemeChanger = () => {
    const tema = useContext(ThemeCtx);

    const onClick = () => {
        tema.actualizar(tema.actual === THEMES.light ? THEMES.dark : THEMES.light);
        localStorage.setItem("theme", tema.actual === THEMES.light ? THEMES.dark : THEMES.light);
    }

    if(tema.actual === THEMES.dark) {
        return (
            <div onClick={onClick}>Tema oscuro</div>
        );
    } else {
        return (
            <div onClick={onClick}>Tema claro</div>
        );
    }

}

export default ThemeChanger;