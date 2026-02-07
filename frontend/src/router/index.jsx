// src/router/index.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';

import Home from '../pages/Home';
import SobreNosotros from '../pages/SobreNosotros';
import AgregarBarcos from '../pages/AgregarBarcos';
import OtrosServicios from '../pages/OtrosServicios';
import ProcesosTramites from '../pages/ProcesosTramites';
import Noticias from '../pages/Noticias';
import Soporte from '../pages/Soporte';
import Login from '../pages/Login';
import PagoExitoso from '../pages/PagoExitoso';
import PagoCancelado from '../pages/PagoCancelado';


export default function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/servicios/agregar-barcos" element={<AgregarBarcos />} />
        <Route path="/servicios/otros" element={<OtrosServicios />} />
        <Route path="/procesos-tramites" element={<ProcesosTramites />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/pago-cancelado" element={<PagoCancelado />} />
  
      </Routes>
    </BrowserRouter>
  );
}
