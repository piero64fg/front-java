const BASE_URL = "https://project-python-production.up.railway.app/categorias";

export const getCategorias = async () => {
  const res = await fetch(`${BASE_URL}/`);
  if (!res.ok) throw new Error("Error al listar categorías");
  return res.json();
};

export const getCategoriaById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Categoría no encontrada");
  return res.json();
};

export const crearCategoria = async (data) => {
  const res = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return res.json();
};

export const actualizarCategoria = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar categoría");
  return res.json();
};

export const eliminarCategoria = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar categoría");
};
