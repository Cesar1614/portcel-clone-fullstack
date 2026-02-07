// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/">Inicio</Link> |{' '}
      <Link to="/sobre-nosotros">Sobre Nosotros</Link> |{' '}
      <Link to="/servicios/agregar-barcos">Agregar Barcos</Link> |{' '}
      <Link to="/procesos-tramites">Procesos</Link> |{' '}
      <Link to="/noticias">Noticias</Link> |{' '}
      <Link to="/soporte">Soporte</Link> |{' '}
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
