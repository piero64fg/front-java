// Historial.jsx
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const Historial = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];
    setVentas(ventasGuardadas);
  }, []);

  return (
    <div>
      <h2>Historial de Ventas</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio (S/)</th>
            <th>Cantidad</th>
            <th>Total (S/)</th>
          </tr>
        </thead>
        <tbody>
          {ventas.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No hay ventas registradas.</td>
            </tr>
          ) : (
            ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.producto}</td>
                <td>{venta.precio}</td>
                <td>{venta.cantidad}</td>
                <td>{venta.total.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Historial;
