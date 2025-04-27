import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const surname = localStorage.getItem("userSurname");
    if (name && surname) {
      setNombreCompleto(`${name} ${surname}`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="h-screen flex font-[Poppins]">
      {/* Panel Fijo */}
      <div
        className="fixed top-0 left-0 w-[16%] h-screen flex flex-col items-start"
        style={{ backgroundColor: "#284b63" }}
      >
        <div className="flex flex-col w-full h-full mt-[32px]">
          {/* Parte superior del panel */}
          <div className="flex flex-col">
            <h2 className="text-[#eef0eb] text-[24px] font-bold text-left px-[24px]">
              Panel
            </h2>

            {/* Opciones de menú */}
            <div className="flex flex-col space-y-[14px]">
              <div className="w-full h-[1px] bg-[#3c5d75]" />
              <p className="text-[#eef0eb] text-[20px] text-left cursor-pointer hover:underline px-[24px]">
                Inicio
              </p>
              <div className="w-full h-[1px] bg-[#3c5d75]" />

              <p className="text-[#eef0eb] text-[20px] text-left cursor-pointer hover:underline px-[24px]">
                Añadir
              </p>
              <div className="w-full h-[1px] bg-[#3c5d75]" />

              <p className="text-[#eef0eb] text-[20px] text-left cursor-pointer hover:underline px-[24px]">
                Gestionar
              </p>
              <div className="w-full h-[1px] bg-[#3c5d75]" />

              <p className="text-[#eef0eb] text-[20px] text-left cursor-pointer hover:underline px-[24px]">
                Asignar
              </p>
              <div className="w-full h-[1px] bg-[#3c5d75]" />
            </div>
          </div>

          {/* Espaciador */}
          <div className="flex-grow" />

          {/* Cerrar sesión y usuario */}
          <div className="flex flex-col w-full mb-[10px] relative">
            <div
              className="flex items-center gap-[12px] px-[24px] py-[12px] cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              <i className="fa-regular fa-circle-user text-[#eef0eb] text-[28px]" />
              <span className="text-[#eef0eb] text-[20px] font-bold hover:underline transition-colors">
                {nombreCompleto}
              </span>
            </div>

            {/* Menú desplegable */}
            {showMenu && (
              <div
                className="absolute bottom-[60px] left-[24px] bg-[#eef0eb] text-[#284b63] rounded-[8px] p-[12px] text-[16px] shadow-md cursor-pointer hover:bg-[#b4b8ab] transition-colors"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Separador invisible */}
      <div className="w-[16%]" />

      {/* Espacio Informativo */}
      <div
        className="w-[84%] h-screen p-[32px]"
        style={{ backgroundColor: "#eef0eb" }}
      >
        <div className="w-full mt-[32px]">
          {/* Título */}
          <h2 className="text-[#153243] text-[28px] font-bold mb-[24px]">
            Mis Tareas
          </h2>

          {/* Tabla */}
          <div className="border-[2px] border-[#153243] rounded-[8px] overflow-hidden">
            {/* Encabezados */}
            <div className="grid grid-cols-4 bg-[#b4b8ab] text-[#153243] font-bold text-[18px]">
              <div className="p-[16px] border-r-[1px] border-[#284b63]">
                Tarea
              </div>
              <div className="p-[16px] border-r-[1px] border-[#284b63]">
                Ocupación
              </div>
              <div className="p-[16px] border-r-[1px] border-[#284b63]">
                Ubicación
              </div>
              <div className="p-[16px]">Fecha</div>
            </div>

            {/* Filas de contenido */}
            <div className="grid grid-cols-4 bg-[#eef0eb] text-[#153243] text-[16px]">
              <div className="p-[16px] border-t-[1px] border-r-[1px] border-[#284b63]">
                Revisar Inventario
              </div>
              <div className="p-[16px] border-t-[1px] border-r-[1px] border-[#284b63]">
                Encargado de Bodega
              </div>
              <div className="p-[16px] border-t-[1px] border-r-[1px] border-[#284b63]">
                Santiago
              </div>
              <div className="p-[16px] border-t-[1px]">26/04/2025</div>
            </div>

            <div className="grid grid-cols-4 bg-[#eef0eb] text-[#153243] text-[16px]">
              <div className="p-[16px] border-t-[1px] border-r-[1px] border-[#284b63]">
                Coordinar Turnos
              </div>
              <div className="p-[16px] border-t-[1px] border-r-[1px] border-[#284b63]">
                Supervisor
              </div>
              <div className="p-[16px] border-t-[1px] border-r-[1px] border-[#284b63]">
                Valparaíso
              </div>
              <div className="p-[16px] border-t-[1px]">27/04/2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
