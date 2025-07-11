const BASE_URL = "https://project-python-production.up.railway.app/ventas";

export const getVentas = async () => {
  const res = await fetch(`${BASE_URL}/`);
  if (!res.ok) throw new Error("Error al listar ventas");
  return res.json();
};

export const getVentaById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error(`Error al obtener venta con ID ${id}`);
  return res.json();
};

export const crearVenta = async (venta) => {
  const res = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(venta),
  });
  if (!res.ok) throw new Error("Error al registrar venta");
  return res.json();
};
