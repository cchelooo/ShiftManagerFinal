import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import Home from "./features/dashboard/Home";
import Add from "./features/dashboard/Add";
import Gestion from "./features/dashboard/Gestion";
import Assign from "./features/dashboard/Assign";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta Login */}
        <Route path="/" element={<Login />} />

        {/* Ruta Dashboard con rutas anidadas */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="add" element={<Add />} />
          <Route path="gestion" element={<Gestion />} />
          <Route path="assign" element={<Assign />} />
        </Route>

        {/* (Opcional) Podrías agregar un 404 not found aquí en el futuro */}
      </Routes>
    </Router>
  );
}
