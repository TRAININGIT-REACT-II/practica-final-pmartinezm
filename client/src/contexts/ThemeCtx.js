import { createContext } from 'react';
import { THEMES } from '../constants/Themes';

const ThemeCtx = createContext({
    actual: THEMES.light,
    actualizar: () => {}
});

export default ThemeCtx;