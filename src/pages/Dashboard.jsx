const Dashboard = () => {
  return (
    <div className="container ms-md-5 mt-5">
      <h1 className="fw-bold mb-4">Sistema Administrativo La Patrona</h1>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <p className="card-text">Administra productos e inventario.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Personal</h5>
              <p className="card-text">Actualiza la información del personal.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Clientes</h5>
              <p className="card-text">Gestión de relaciones con los clientes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
