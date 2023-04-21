import { createContext } from "react";

const LoginCtx = createContext({
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
    update: () => {}
});

export default LoginCtx;