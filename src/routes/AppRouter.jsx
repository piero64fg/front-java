import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Productos";
import Categorias from "../pages/Categorias";
import Venta from "../pages/Venta";
import Historial from "../pages/Historial";
import Usuarios from "../pages/Usuarios";
import Menu from "../pages/Menu"; 

const AppRouter = () => {
  return (
    <Router>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/venta" element={<Venta />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
