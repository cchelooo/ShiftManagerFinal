import { useState, useEffect } from "react";

export default function Home() {
  const [tareas, setTareas] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
    cargarTareas(id);
  }, []);

  const cargarTareas = (id) => {
    const storedTareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const tareasFiltradas = storedTareas.filter(
      (tarea) => tarea.id.toString() === id
    );
    setTareas(tareasFiltradas);
  };

  const toggleDone = (index) => {
    const storedTareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const tareaReal = storedTareas.find(
      (t) => t.id.toString() === userId && t.tarea === tareas[index].tarea
    );

    if (tareaReal) {
      tareaReal.done = !tareaReal.done;
      localStorage.setItem("tareas", JSON.stringify(storedTareas));
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
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_60px] bg-[#eef0eb] text-[#153243] text-[16px]"
            >
              <div
                className={`p-[16px] border-t-[1px] border-r-[1px] border-[#284b63] ${
                  tarea.done ? "line-through text-gray-500" : ""
                }`}
              >
                {tarea.tarea}
              </div>
              <div
                className={`p-[16px] border-t-[1px] border-r-[1px] border-[#284b63] ${
                  tarea.done ? "line-through text-gray-500" : ""
                }`}
              >
                {tarea.ocupacion}
              </div>
              <div
                className={`p-[16px] border-t-[1px] border-r-[1px] border-[#284b63] ${
                  tarea.done ? "line-through text-gray-500" : ""
                }`}
              >
                {tarea.ubicacion}
              </div>
              <div
                className={`p-[16px] border-t-[1px] border-r-[1px] border-[#284b63] ${
                  tarea.done ? "line-through text-gray-500" : ""
                }`}
              >
                {tarea.fecha}
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
