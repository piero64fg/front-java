const BASE_URL = "https://project-python-production.up.railway.app/productos";

export const getProductos = async () => {
  const res = await fetch(`${BASE_URL}/lista`);
  if (!res.ok) throw new Error("Error al listar productos");
  return res.json();
};

export const getProductoById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error(`Error al obtener producto con ID ${id}`);
  return res.json();
};

export const crearProducto = async (producto) => {
  const res = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

export const actualizarProducto = async (id, producto) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error(`Error al actualizar producto con ID ${id}`);
  return res.json();
};

export const eliminarProducto = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Error al eliminar producto con ID ${id}`);
};
