import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "../App.css"; // Asegúrate que App.css tenga la clase `.page-content`

const Productos = () => {
  // Categorías simuladas (puedes luego conectarlas desde el CRUD de Categorías)
  const categoriasDisponibles = ["Bebidas", "Comida rápida", "Postres", "Snacks"];

  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", precio: "", stock: "", categoria: "" });
  const [modoEditar, setModoEditar] = useState(false);
  const [productoEditarId, setProductoEditarId] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleOpen = () => {
    setFormData({ nombre: "", precio: "", stock: "", categoria: "" });
    setModoEditar(false);
    setMostrarModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    if (modoEditar) {
      setProductos(
        productos.map((prod) =>
          prod.id === productoEditarId ? { ...formData, id: productoEditarId } : prod
        )
      );
    } else {
      setProductos([...productos, { ...formData, id: Date.now() }]);
    }
    setMostrarModal(false);
  };

  const handleEditar = (producto) => {
    setFormData(producto);
    setProductoEditarId(producto.id);
    setModoEditar(true);
    setMostrarModal(true);
  };

  const handleEliminar = (id) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      setProductos(productos.filter((prod) => prod.id !== id));
    }
  };

  return (
    <div className="page-content">
      <h2 className="mb-4 text-center">Gestión de Productos</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleOpen}>
          Agregar Producto
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio (S/)</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No hay productos registrados.
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditar(producto)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleEliminar(producto.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEditar ? "Editar Producto" : "Nuevo Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCategoria" className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              >
                <option value="">Selecciona una categoría</option>
                {categoriasDisponibles.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formPrecio" className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formStock" className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardar}>
            {modoEditar ? "Actualizar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Productos;
