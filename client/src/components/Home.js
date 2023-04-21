import './Home.css';
import Login from './Login';
import Title from './Title';

const Home = () => {
    return (
        <div class="content">
            <Title title="Inicio" />
            <p class="description">
                Training notes es una herramienta imprescindible para aquellos que desean mantener sus ideas y pensamientos organizados en un solo lugar accesible desde cualquier dispositivo. Con esta aplicación, los usuarios podrán crear, editar y organizar sus notas de manera fácil y eficiente, tanto en sus ordenadores como en sus dispositivos móviles.
            </p>
        </div>
    );
}

export default Home;