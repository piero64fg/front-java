// Venta.jsx
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const productosDisponibles = [
  { id: 1, nombre: "Hamburguesa", precio: 10 },
  { id: 2, nombre: "Pizza", precio: 15 },
  { id: 3, nombre: "Refresco", precio: 5 },
];

const Venta = () => {
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const productoSeleccionado = productosDisponibles.find((p) => p.id === parseInt(productoId));
  const total = productoSeleccionado ? productoSeleccionado.precio * cantidad : 0;

  const handleRegistrarVenta = () => {
    if (!productoId || cantidad <= 0) {
      alert("Selecciona un producto y cantidad válida");
      return;
    }

    const nuevaVenta = {
      id: Date.now(),
      producto: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      cantidad,
      total,
    };

    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];
    localStorage.setItem("ventas", JSON.stringify([...ventasGuardadas, nuevaVenta]));

    alert("Venta registrada correctamente");

    // Reiniciar
    setProductoId("");
    setCantidad(1);
  };

  return (
    <div>
      <h2>Realizar Venta</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Producto</Form.Label>
          <Form.Select
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
          >
            <option value="">Selecciona un producto</option>
            {productosDisponibles.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.nombre} - S/ {prod.precio}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          />
        </Form.Group>

        <h5>Total: S/ {total.toFixed(2)}</h5>

        <Button variant="success" onClick={handleRegistrarVenta}>
          Registrar Venta
        </Button>
      </Form>
    </div>
  );
};

export default Venta;
