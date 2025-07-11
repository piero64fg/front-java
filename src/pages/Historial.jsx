import { useEffect, useState } from "react";
import { Table, Form, Button, InputGroup, Spinner, Modal } from "react-bootstrap";
import { getVentas, getVentaById } from "../api/ventasService";

const Historial = () => {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [buscarId, setBuscarId] = useState("");

  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarVentas = () => {
    setCargando(true);
    getVentas()
      .then(setVentas)
      .catch(console.error)
      .finally(() => setCargando(false));
  };

  const buscarVenta = () => {
    if (!buscarId.trim()) {
      cargarVentas();
      return;
    }

    setCargando(true);
    getVentaById(buscarId)
      .then((venta) => setVentas([venta]))
      .catch((err) => {
        console.error(err);
        alert("Venta no encontrada");
        setVentas([]);
      })
      .finally(() => setCargando(false));
  };

  const handleVerDetalles = (venta) => {
    setVentaSeleccionada(venta);
    setMostrarModal(true);
  };

  const formatearFecha = (isoDate) => {
    const fecha = new Date(isoDate);
    const dia = fecha.toLocaleDateString("es-PE");
    const hora = fecha.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    return `${dia} ${hora}`;
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  return (
    <div>
      <h2 className="uwu">Historial de Ventas</h2>

      <InputGroup className="my-3" style={{ maxWidth: 300 }}>
        <Form.Control
          placeholder="Buscar por ID"
          value={buscarId}
          onChange={(e) => setBuscarId(e.target.value)}
        />
        <Button variant="secondary" onClick={buscarVenta}>
          Buscar
        </Button>
      </InputGroup>

      {cargando ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Vendedor</th>
              <th>Fecha</th>
              <th>Comentario</th>
              <th>Productos</th>
              <th>Total (S/)</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay ventas registradas.
                </td>
              </tr>
            ) : (
              ventas.map((venta) => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.cliente}</td>
                  <td>{venta.vendedor}</td>
                  <td>{formatearFecha(venta.fecha)}</td>
                  <td>{venta.comentario}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => handleVerDetalles(venta)}
                    >
                      Ver Detalles
                    </Button>
                  </td>
                  <td>
                    S/
                    {venta.detalles
                      .reduce((sum, d) => sum + d.subtotal, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ventaSeleccionada && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {ventaSeleccionada.detalles.map((detalle) => (
                  <tr key={detalle.id}>
                    <td>{detalle.producto_nombre}</td>
                    <td>{detalle.cantidad}</td>
                    <td>S/ {detalle.precio_unitario}</td>
                    <td>S/ {detalle.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Historial;
