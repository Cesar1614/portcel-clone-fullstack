// src/pages/Servicios/AgregarBarcos.jsx
import { useState } from 'react';
import axios from 'axios';

function AgregarBarcos() {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    pais_origen: '',
    fecha_registro: '',
  });

  const [mensaje, setMensaje] = useState('');

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
    </div>
  );
}

export default AgregarBarcos;
