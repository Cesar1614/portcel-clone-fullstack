import { useEffect, useState } from 'react';
import axios from 'axios';

function ProcesosTramites() {
  const [barcos, setBarcos] = useState([]);
  const [procesos, setProcesos] = useState([]);
  const [formData, setFormData] = useState({
    barco_id: '',
    descripcion: '',
    valor_producto: '',
    costo_seguro: '',
    costo_flete: ''
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    obtenerBarcos();
    obtenerProcesos();
  }, []);

  const obtenerBarcos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/barcos');
      setBarcos(res.data);
    } catch (error) {
      console.error('Error al obtener barcos:', error);
    }
  };

  const obtenerProcesos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/procesos');
      setProcesos(res.data);
    } catch (error) {
      console.error('Error al obtener procesos:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calcularCIF = () => {
    const { valor_producto, costo_seguro, costo_flete } = formData;
    return (
      parseFloat(valor_producto || 0) +
      parseFloat(costo_seguro || 0) +
      parseFloat(costo_flete || 0)
    ).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/procesos', formData);
      setMensaje('✅ Proceso registrado con éxito');
      setFormData({
        barco_id: '',
        descripcion: '',
        valor_producto: '',
        costo_seguro: '',
        costo_flete: ''
      });
      obtenerProcesos();
    } catch (error) {
      console.error('Error al registrar proceso:', error);
      setMensaje('❌ Error al registrar proceso');
    }
  };

  const handlePagar = async (procesoId) => {
    try {
      const res = await axios.post('http://localhost:5000/api/pagos/create-checkout-session', {
        proceso_id: procesoId,
      });
      window.location.href = res.data.url; // redirige a Stripe
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      alert('❌ Error al iniciar el pago');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Registrar Proceso Aduanero</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
        <label>Barco:</label>
        <select name="barco_id" value={formData.barco_id} onChange={handleChange} required>
          <option value="">Selecciona un barco</option>
          {barcos.map(barco => (
            <option key={barco.id} value={barco.id}>
              {barco.nombre} ({barco.tipo})
            </option>
          ))}
        </select>

        <label>Descripción:</label>
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />

        <label>Valor del Producto:</label>
        <input type="number" name="valor_producto" value={formData.valor_producto} onChange={handleChange} required />

        <label>Costo del Seguro:</label>
        <input type="number" name="costo_seguro" value={formData.costo_seguro} onChange={handleChange} required />

        <label>Costo del Flete:</label>
        <input type="number" name="costo_flete" value={formData.costo_flete} onChange={handleChange} required />

        <p><strong>Valor CIF:</strong> ${calcularCIF()}</p>

        <button type="submit" style={{ marginTop: '1rem' }}>Registrar Proceso</button>
      </form>

      {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}

      <hr />

      <h2>Procesos Registrados</h2>
      {procesos.length === 0 ? (
        <p>No hay procesos registrados aún.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%', maxWidth: '800px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Barco</th>
              <th>Descripción</th>
              <th>Valor CIF</th>
              <th>Fecha</th>
              <th>Estado de Pago</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {procesos.map((proceso) => (
              <tr key={proceso.id}>
                <td>{proceso.id}</td>
                <td>{proceso.Barco?.nombre}</td>
                <td>{proceso.descripcion}</td>
                <td>${proceso.valor_cif}</td>
                <td>{proceso.fecha?.split("T")[0]}</td>
                <td>{proceso.Pago?.estado || "pendiente"}</td>
                <td>
                  {!proceso.Pago || proceso.Pago.estado === "pendiente" ? (
                    <button onClick={() => handlePagar(proceso.id)}>Pagar</button>
                  ) : (
                    "✔ Pagado"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProcesosTramites;
