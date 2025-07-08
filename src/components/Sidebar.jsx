import { Link } from "react-router-dom";
import { 
  FaHome, 
  FaBox, 
  FaUsers, 
  FaHistory, 
  FaCashRegister,
  FaTags,
  FaClipboardList
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h1>Raulito Market</h1>
      <ul>
        <li>
          <Link to="/menu"><FaHome className="inline mr-2" /> Menú</Link>
        </li>
        <li className="section-title">General</li>
        <li>
          <Link to="/productos"><FaBox className="inline mr-2" /> Productos</Link>
        </li>
        <li className="pl-14">
          <Link to="/categorias"><FaTags className="inline mr-2" /> Categorías</Link>
        </li>
        <li className="pl-14">
          <Link to="/venta"><FaCashRegister className="inline mr-2" /> Realizar venta</Link>
        </li>
        <li className="pl-14">
          <Link to="/historial"><FaHistory className="inline mr-2" /> Historial de ventas</Link>
        </li>
        <li>
          <Link to="/usuarios"><FaUsers className="inline mr-2" /> Usuarios</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;