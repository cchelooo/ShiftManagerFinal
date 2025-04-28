import { Outlet } from "react-router-dom";
import Panel from "./Panel";

export default function Dashboard() {
  return (
    <div className="h-screen flex font-[Poppins]">
      {/* Panel Fijo */}
      <Panel />

      {/* Separador invisible */}
      <div className="w-[16%]" />

      {/* Contenido que cambia */}
      <div
        className="w-[84%] h-screen p-[32px]"
        style={{ backgroundColor: "#eef0eb" }}
      >
        <Outlet />
      </div>
    </div>
  );
}
