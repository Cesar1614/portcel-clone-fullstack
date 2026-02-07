import { useEffect, useState } from 'react';
import axios from 'axios';

function AgregarBarcos() {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    pais_origen: '',
    fecha_registro: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [barcos, setBarcos] = useState([]);

  // ✅ Obtener todos los barcos al cargar la página
  useEffect(() => {
    obtenerBarcos();
  }, []);

  const obtenerBarcos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/barcos');
      setBarcos(res.data);
    } catch (error) {
      console.error('Error al obtener los barcos:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/barcos', formData);
      setMensaje('✅ Barco registrado con éxito');
      setFormData({
        nombre: '',
        tipo: '',
        pais_origen: '',
        fecha_registro: '',
      });
      obtenerBarcos(); // ✅ Actualiza la lista después de agregar
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al registrar el barco');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Registrar Nuevo Barco</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <label>Nombre del Barco:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Tipo:</label>
        <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} />

        <label>País de Origen:</label>
        <input type="text" name="pais_origen" value={formData.pais_origen} onChange={handleChange} />

        <label>Fecha de Registro:</label>
        <input type="date" name="fecha_registro" value={formData.fecha_registro} onChange={handleChange} />

        <button type="submit" style={{ marginTop: '1rem' }}>Registrar</button>
      </form>

      {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}

      <hr />

      <h2>Lista de Barcos Registrados</h2>
      {barcos.length === 0 ? (
        <p>No hay barcos registrados aún.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%', maxWidth: '600px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>País</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {barcos.map((barco) => (
              <tr key={barco.id}>
                <td>{barco.id}</td>
                <td>{barco.nombre}</td>
                <td>{barco.tipo}</td>
                <td>{barco.pais_origen}</td>
                <td>{barco.fecha_registro?.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AgregarBarcos;
