import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({ nombre: "" });
  const [modoEditar, setModoEditar] = useState(false);
  const [categoriaEditarId, setCategoriaEditarId] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleOpen = () => {
    setFormData({ nombre: "" });
    setModoEditar(false);
    setMostrarModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    if (modoEditar) {
      setCategorias(
        categorias.map((cat) =>
          cat.id === categoriaEditarId ? { ...formData, id: categoriaEditarId } : cat
        )
      );
    } else {
      setCategorias([...categorias, { ...formData, id: Date.now() }]);
    }
    setMostrarModal(false);
  };

  const handleEditar = (categoria) => {
    setFormData(categoria);
    setCategoriaEditarId(categoria.id);
    setModoEditar(true);
    setMostrarModal(true);
  };

  const handleEliminar = (id) => {
    if (confirm("¿Deseas eliminar esta categoría?")) {
      setCategorias(categorias.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div>
      <h2 className="mb-4">Gestión de Categorías</h2>
      <Button variant="primary" onClick={handleOpen}>
        Agregar Categoría
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center">
                No hay categorías registradas.
              </td>
            </tr>
          ) : (
            categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.nombre}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditar(cat)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleEliminar(cat.id)}>
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
