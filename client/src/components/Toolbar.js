import './Toolbar.css';
import { Link } from 'react-router-dom';
import Account from './Account.js'

const Toolbar = () => {
    return (
        <div class="toolbar">
            <div className="l-panel">
                <span className="logo">TrainingNotes</span>
            </div>

            <div className="c-panel">
                <div className="links">
                    <div class="link">
                        <Link to='/'>Inicio</Link>
                    </div>
                    <div class="link">
                        <Link to='/login'>Login/Registro</Link>
                    </div>
                    <div class="link">
                        <Link to='/notas'>Notas</Link>
                    </div>
                    <div class="link">
                        <Link to='/status'>Estado del servidor</Link>
                    </div>
                </div>
            </div>

            <div className="r-panel">
                <Account />
            </div>
        </div>
    );
}

export default Toolbar;