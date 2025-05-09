import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function Panel() {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUser = async () => {
      if (!userId) return;

      const { data: user, error } = await supabase
        .from("users")
        .select("name, surname, role")
        .eq("id", userId)
        .single();

      if (error || !user) {
        console.error("❌ Error al obtener el usuario:", error);
        return;
      }

      setNombreCompleto(`${user.name} ${user.surname}`);
      setIsAdmin(user.role.toLowerCase() === "admin"); // <- Compara sin importar mayúsculas
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userSurname");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
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
            <p
              className="text-[#eef0eb] text-[20px] text-left cursor-pointer hover:underline px-[24px]"
              onClick={() => handleNavigation("/dashboard")}
            >
              Inicio
            </p>

            {isAdmin && (
              <>
                <div className="w-full h-[1px] bg-[#3c5d75]" />
                <p
                  className="text-[#eef0eb] text-[20px] text-left cursor-pointer hover:underline px-[24px]"
                  onClick={() => handleNavigation("/dashboard/add")}
                >
                  Añadir
                </p>
                <div className="w-full h-[1px] bg-[#3c5d75]" />
                <p
                  className="text-[#eef0eb] text-[20px] text-left cursor-pointer hover:underline px-[24px]"
                  onClick={() => handleNavigation("/dashboard/gestion")}
                >
                  Gestionar
                </p>
                <div className="w-full h-[1px] bg-[#3c5d75]" />
                <p
                  className="text-[#eef0eb] text-[20px] text-left cursor-pointer hover:underline px-[24px]"
                  onClick={() => handleNavigation("/dashboard/assign")}
                >
                  Asignar
                </p>
              </>
            )}
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
  );
}
