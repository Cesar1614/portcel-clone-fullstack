// src/pages/PagoCancelado.jsx
import React from 'react';

function PagoCancelado() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>❌ Pago cancelado</h1>
      <p>El proceso de pago fue cancelado. Puedes intentarlo nuevamente si lo deseas.</p>
      <a href="/procesos-tramites">Volver a Procesos y Trámites</a>
    </div>
  );
}

export default PagoCancelado;
