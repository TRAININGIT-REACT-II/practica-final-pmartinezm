import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Status from "./components/Status";
import { THEMES } from "./constants/Themes";
import ThemeCtx from './contexts/ThemeCtx';
import Toolbar from './components/Toolbar';
import Notes from "./components/Notes";
import AddEditSeeNote from "./components/AddEditSeeNote";
import LoginCtx from "./contexts/LoginCtx";
import Welcome from "./components/Welcome";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

// Componente principal de la aplicación.
const App = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);


  const [tema, setTema] = useState(localStorage.getItem("theme") || THEMES.light);
  const [loginInfo, setLoginInfo] = useState({ username: localStorage.getItem("username"), token: localStorage.getItem("token") });

  useEffect(() => {
    console.log("App - useEffect - aplicar tema");
    if (document.body.classList.value == "") {
      document.body.classList.add(tema);
    } else {
      document.body.classList.replace(document.body.classList.value, tema);
    }
  });

  return (
    <>
      <ThemeCtx.Provider value={{ actual: tema, actualizar: setTema }}>
        <LoginCtx.Provider value={{ username: loginInfo.username, token: loginInfo.token, update: setLoginInfo }}>
          <Router>
            <Toolbar />
            <ErrorBoundary message="algo ha ido mal">
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/status" exact element={<Status />} />
                <Route path="/notas" exact element={<Notes />} />
                <Route path="/nuevaNota" exact element={<AddEditSeeNote isEditing={false} />} />
                <Route path="/editarNota/:id" exact element={<AddEditSeeNote isEditing={true} />} />
                <Route path="/welcome" exact element={<Welcome />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/note/:id" exact element={<AddEditSeeNote isVisualization={true} />} />
              </Routes>
            </ErrorBoundary>
          </Router>
        </LoginCtx.Provider>
      </ThemeCtx.Provider>
    </>
  );
};

export default App;
