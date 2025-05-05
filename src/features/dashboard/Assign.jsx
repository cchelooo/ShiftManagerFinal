import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Assign() {
  const [id, setId] = useState("");
  const [tarea, setTarea] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [fecha, setFecha] = useState("");

  const handleAsignarTarea = async (e) => {
    e.preventDefault();

    // 1. Verifica si el usuario existe
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("address")
      .eq("id", id.trim())
      .single();

    if (userError || !user) {
      alert("❌ No se encontró un usuario con ese ID.");
      return;
    }

    const ubicacion = user.address || "None";

    // 2. Crea nueva tarea
    const nuevaTarea = {
      user_id: id.trim(),
      work: tarea.trim(),
      occupation: ocupacion.trim(),
      date: fecha,
      done: false,
    };

    const { error: insertError } = await supabase
      .from("works")
      .insert([nuevaTarea]);

    if (insertError) {
      console.error("❌ Error al asignar tarea:", insertError);
      alert("❌ No se pudo asignar la tarea.");
      return;
    }

    // 3. Limpiar campos
    setId("");
    setTarea("");
    setOcupacion("");
    setFecha("");

    alert("✅ Tarea asignada correctamente");
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <form
        onSubmit={handleAsignarTarea}
        className="bg-[#b4b8ab] p-[32px] rounded-[8px] w-[84%] h-[80%] shadow-md flex flex-col justify-center"
      >
        <h2 className="text-[#153243] text-[28px] font-bold mb-[24px] text-center">
          Asignar Nueva Tarea
        </h2>

        <div className="flex flex-col gap-[20px]">
          <div>
            <label className="block text-[#153243] text-[18px] mb-[6px]">
              ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#eef0eb] text-[#153243]"
              placeholder="Ingrese el ID"
              required
            />
          </div>

          <div>
            <label className="block text-[#153243] text-[18px] mb-[6px]">
              Tarea
            </label>
            <input
              type="text"
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#eef0eb] text-[#153243]"
              placeholder="Ingrese la tarea"
              required
            />
          </div>

          <div>
            <label className="block text-[#153243] text-[18px] mb-[6px]">
              Ocupación
            </label>
            <input
              type="text"
              value={ocupacion}
              onChange={(e) => setOcupacion(e.target.value)}
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#eef0eb] text-[#153243]"
              placeholder="Ingrese la ocupación"
              required
            />
          </div>

          <div>
            <label className="block text-[#153243] text-[18px] mb-[6px]">
              Fecha
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#eef0eb] text-[#153243]"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-[32px] bg-[#284b63] text-[#eef0eb] p-[14px] rounded-[8px] font-bold hover:bg-[#153243] transition-colors"
        >
          Asignar
        </button>
      </form>
    </div>
  );
}
