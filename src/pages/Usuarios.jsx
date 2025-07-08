import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", email: "", rol: "" });
  const [modoEditar, setModoEditar] = useState(false);
  const [usuarioEditarId, setUsuarioEditarId] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleOpen = () => {
    setFormData({ nombre: "", email: "", rol: "" });
    setModoEditar(false);
    setMostrarModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    if (modoEditar) {
      setUsuarios(
        usuarios.map((user) =>
          user.id === usuarioEditarId ? { ...formData, id: usuarioEditarId } : user
        )
      );
    } else {
      setUsuarios([...usuarios, { ...formData, id: Date.now() }]);
    }
    setMostrarModal(false);
  };

  const handleEditar = (usuario) => {
    setFormData(usuario);
    setUsuarioEditarId(usuario.id);
    setModoEditar(true);
    setMostrarModal(true);
  };

  const handleEliminar = (id) => {
    if (confirm("¿Deseas eliminar este usuario?")) {
      setUsuarios(usuarios.filter((user) => user.id !== id));
    }
  };

  return (
    <div>
      <h2 className="mb-4">Gestión de Usuarios</h2>
      <Button variant="primary" onClick={handleOpen}>
        Agregar Usuario
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No hay usuarios registrados.</td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditar(usuario)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleEliminar(usuario.id)}>
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
          <Modal.Title>{modoEditar ? "Editar Usuario" : "Nuevo Usuario"}</Modal.Title>
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
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                type="text"
                name="rol"
                value={formData.rol}
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

export default Usuarios;
