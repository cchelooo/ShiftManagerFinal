import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Home() {
  const [tareas, setTareas] = useState([]);
  const [userId, setUserId] = useState(null);
  const [direccion, setDireccion] = useState("...");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
      cargarTareas(id);
      cargarDireccion(id);
    }
  }, []);

  const cargarTareas = async (id) => {
    const { data, error } = await supabase
      .from("works")
      .select("*")
      .eq("user_id", id);

    if (error) {
      console.error("❌ Error al cargar tareas:", error);
    } else {
      setTareas(data);
    }
  };

  const cargarDireccion = async (id) => {
    const { data, error } = await supabase
      .from("users")
      .select("address")
      .eq("id", id)
      .single();

    if (error) {
      console.error("❌ Error al obtener dirección del usuario:", error);
      setDireccion("Desconocida");
    } else {
      setDireccion(data.address || "No registrada");
    }
  };

  const toggleDone = async (index) => {
    const tarea = tareas[index];
    const updatedDone = !tarea.done;

    const { error } = await supabase
      .from("works")
      .update({ done: updatedDone })
      .eq("id", tarea.id);

    if (error) {
      console.error("❌ Error al actualizar tarea:", error);
    } else {
      cargarTareas(userId);
    }
  };

  return (
    <div className="w-full mt-[32px]">
      <h2 className="text-[#153243] text-[28px] font-bold mb-[24px]">
        Mis Tareas
      </h2>

      <div className="border-[2px] border-[#153243] rounded-[8px] overflow-hidden">
        {/* Encabezados */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_60px] bg-[#b4b8ab] text-[#153243] font-bold text-[18px]">
          <div className="p-[16px] border-r-[1px] border-[#284b63]">Tarea</div>
          <div className="p-[16px] border-r-[1px] border-[#284b63]">
            Ocupación
          </div>
          <div className="p-[16px] border-r-[1px] border-[#284b63]">
            Ubicación
          </div>
          <div className="p-[16px] border-r-[1px] border-[#284b63]">Fecha</div>
          <div className="p-[16px] text-center">✔️</div>
        </div>

        {/* Filas dinámicas */}
        {tareas.length > 0 ? (
          tareas.map((tarea, index) => (
            <div
              key={tarea.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_60px] bg-[#eef0eb] text-[#153243] text-[16px]"
            >
              <div
                className={`p-[16px] border-t-[1px] border-r-[1px] border-[#284b63] ${
                  tarea.done ? "line-through text-gray-500" : ""
                }`}
              >
                {tarea.work}
              </div>
              <div
                className={`p-[16px] border-t-[1px] border-r-[1px] border-[#284b63] ${
                  tarea.done ? "line-through text-gray-500" : ""
                }`}
              >
                {tarea.occupation}
              </div>
              <div
                className={`p-[16px] border-t-[1px] border-r-[1px] border-[#284b63] ${
                  tarea.done ? "line-through text-gray-500" : ""
                }`}
              >
                {direccion}
              </div>
              <div
                className={`p-[16px] border-t-[1px] border-r-[1px] border-[#284b63] ${
                  tarea.done ? "line-through text-gray-500" : ""
                }`}
              >
                {tarea.date}
              </div>
              <div className="flex justify-center items-center p-[16px] border-t-[1px]">
                <input
                  type="checkbox"
                  checked={tarea.done || false}
                  onChange={() => toggleDone(index)}
                  className="w-[18px] h-[18px]"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-[#153243] text-center p-[24px]">
            No tienes tareas asignadas actualmente.
          </div>
        )}
      </div>
    </div>
  );
}
