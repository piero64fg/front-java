import './estilos/venta.css';
import { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { crearVenta } from "../api/ventasService";
import { getProductos } from "../api/productosService";

const Venta = () => {
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [cliente, setCliente] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [comentario, setComentario] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getProductos()
      .then((data) => setProductosDisponibles(data))
      .catch(console.error)
      .finally(() => setCargando(false));
  }, []);

  const productoSeleccionado = productosDisponibles.find(
    (p) => p.id === parseInt(productoId)
  );
  const total =
    productoSeleccionado ? productoSeleccionado.precio * cantidad : 0;

  const handleRegistrarVenta = () => {
    if (!productoId || cantidad <= 0 || !cliente || !vendedor) {
      alert("Completa todos los campos requeridos");
      return;
    }

    const venta = {
      cliente: cliente.trim(),
      vendedor: vendedor.trim(),
      comentario: comentario.trim() || "-",
      productos: [
        {
          producto_id: productoSeleccionado.id,
          cantidad,
          precio_unitario: productoSeleccionado.precio,
        },
      ],
    };

    crearVenta(venta)
      .then(() => {
        alert("Venta registrada correctamente en el backend");
        // Reiniciar
        setProductoId("");
        setCantidad(1);
        setCliente("");
        setVendedor("");
        setComentario("");
      })
      .catch((err) => {
        console.error(err);
        alert("Error al registrar venta");
      });
  };

  return (
    <div>
      <h2 className='uwu'>Realizar Venta</h2>

      {cargando ? (
        <Spinner animation="border" />
      ) : (
        <Form className="form-grid">
          <Form.Group className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vendedor</Form.Label>
            <Form.Control
              type="text"
              value={vendedor}
              onChange={(e) => setVendedor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              type="text"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </Form.Group>

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
      )}
    </div>
  );
};

export default Venta;
