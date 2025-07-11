import { useEffect, useState } from "react";
import { Button, Form, Modal, Table, InputGroup } from "react-bootstrap";
import {
  getProductos,
  getProductoById,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../api/productosService";

import { getCategorias } from "../api/categoriasService";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    unidad_medida: "",
    categoria_id: "",
    imagen: "",
  });
  const [modoEditar, setModoEditar] = useState(false);
  const [productoEditarId, setProductoEditarId] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [buscarId, setBuscarId] = useState("");

  const cargarProductos = () => {
    getProductos()
      .then(setProductos)
      .catch(console.error);
  };

  const cargarCategorias = () => {
    getCategorias()
      .then(setCategorias)
      .catch(console.error);
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  const handleOpen = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      unidad_medida: "",
      categoria_id: "",
      imagen: "",
    });
    setModoEditar(false);
    setMostrarModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    const accion = modoEditar
      ? actualizarProducto(productoEditarId, formData)
      : crearProducto(formData);

    accion
      .then(() => {
        cargarProductos();
        setMostrarModal(false);
      })
      .catch(console.error);
  };

  const handleEditar = (producto) => {
    setFormData(producto);
    setProductoEditarId(producto.id);
    setModoEditar(true);
    setMostrarModal(true);
  };

  const handleEliminar = (id) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      eliminarProducto(id)
        .then(cargarProductos)
        .catch(console.error);
    }
  };

  const handleBuscar = () => {
    if (!buscarId) {
      cargarProductos();
      return;
    }
    getProductoById(buscarId)
      .then((prod) => setProductos([prod]))
      .catch(console.error);
  };

  return (
    <div className="page-content">
      <h2 className="mb-4 text-center">Gestión de Productos</h2>

      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={handleOpen}>
          Agregar Producto
        </Button>
        <InputGroup style={{ width: "300px" }}>
          <Form.Control
            placeholder="Buscar por ID"
            value={buscarId}
            onChange={(e) => setBuscarId(e.target.value)}
          />
          <Button variant="secondary" onClick={handleBuscar}>
            Buscar
          </Button>
        </InputGroup>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio (S/)</th>
            <th>Stock</th>
            <th>Unidad</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No hay productos registrados.
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.unidad_medida}</td>
                <td>{producto.categoria_nombre || producto.categoria_id}</td>
                <td>
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    "Sin imagen"
                  )}
                </td>

                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditar(producto)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleEliminar(producto.id)}
                  >
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
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Unidad de Medida</Form.Label>
              <Form.Control
                type="text"
                name="unidad_medida"
                value={formData.unidad_medida}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="categoria_id"
                value={formData.categoria_id}
                onChange={handleChange}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={formData.imagen}
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
