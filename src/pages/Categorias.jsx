import { useEffect, useState } from "react";
import { Button, Form, Modal, Table, InputGroup, FormControl } from "react-bootstrap";
import {
  getCategorias,
  getCategoriaById,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../api/categoriasService";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", descripcion: "" });
  const [modoEditar, setModoEditar] = useState(false);
  const [categoriaEditarId, setCategoriaEditarId] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busquedaId, setBusquedaId] = useState("");

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleOpen = () => {
    setFormData({ nombre: "", descripcion: "" });
    setModoEditar(false);
    setMostrarModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      if (modoEditar) {
        await actualizarCategoria(categoriaEditarId, formData);
      } else {
        await crearCategoria(formData);
      }
      setMostrarModal(false);
      cargarCategorias();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditar = (categoria) => {
    setFormData(categoria);
    setCategoriaEditarId(categoria.id);
    setModoEditar(true);
    setMostrarModal(true);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Deseas eliminar esta categoría?")) {
      try {
        await eliminarCategoria(id);
        cargarCategorias();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleBuscar = async () => {
    if (!busquedaId) {
      cargarCategorias();
      return;
    }
    try {
      const data = await getCategoriaById(busquedaId);
      setCategorias([data]);
    } catch (err) {
      alert(err.message);
      setCategorias([]);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Gestión de Categorías</h2>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={handleOpen}>
          Agregar Categoría
        </Button>
        <InputGroup style={{ maxWidth: "300px" }}>
          <FormControl
            placeholder="Buscar por ID"
            value={busquedaId}
            onChange={(e) => setBusquedaId(e.target.value)}
          />
          <Button variant="info" onClick={handleBuscar}>
            Buscar
          </Button>
        </InputGroup>
      </div>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No hay categorías registradas.
              </td>
            </tr>
          ) : (
            categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>{cat.descripcion}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditar(cat)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleEliminar(cat.id)}
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
          <Modal.Title>{modoEditar ? "Editar Categoría" : "Nueva Categoría"}</Modal.Title>
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
            <Form.Group controlId="formDescripcion" className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
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

export default Categorias;
