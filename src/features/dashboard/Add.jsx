import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import bcrypt from "bcryptjs";

export default function Add() {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");

  // Obtener el siguiente ID al montar el componente
  useEffect(() => {
    const obtenerSiguienteId = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);

      if (error) {
        console.error("❌ Error al obtener último ID:", error);
        return;
      }

      const ultimoId = data?.[0]?.id || "0";
      const siguienteId = (parseInt(ultimoId) + 1).toString();
      setId(siguienteId);
    };

    obtenerSiguienteId();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const hashedPassword = await bcrypt.hash(password.trim(), 10);

      const newUser = {
        id: id.trim(),
        name: nombre.trim(),
        surname: apellido.trim(),
        password: hashedPassword,
        address: "None",
        role: "user",
      };

      const { error } = await supabase.from("users").insert([newUser]);

      if (error) {
        console.error("❌ Error al añadir usuario:", error);
        alert("❌ No se pudo añadir el usuario.");
        return;
      }

      setNombre("");
      setApellido("");
      setPassword("");

      // Actualizar a un nuevo siguiente ID
      const nuevoId = (parseInt(id) + 1).toString();
      setId(nuevoId);

      alert("✅ Usuario añadido correctamente");
    } catch (err) {
      console.error("❌ Error general:", err);
      alert("❌ Ocurrió un error al crear el usuario.");
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center gap-[32px]">
      <form
        onSubmit={handleAddUser}
        className="bg-[#b4b8ab] p-[24px] rounded-[8px] w-[45%] h-[80%] shadow-md flex flex-col justify-center"
      >
        <h2 className="text-[#153243] text-[28px] font-bold mb-[24px] text-center">
          Añadir Nuevo Usuario
        </h2>

        <div className="flex flex-col gap-[16px]">
          <div>
            <label className="block text-[#153243] text-[18px] mb-[4px]">
              ID
            </label>
            <input
              type="text"
              value={id}
              readOnly
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#d6d6d6] text-[#153243] cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[#153243] text-[18px] mb-[4px]">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#eef0eb] text-[#153243]"
              placeholder="Ingrese el nombre"
              required
            />
          </div>

          <div>
            <label className="block text-[#153243] text-[18px] mb-[4px]">
              Apellido
            </label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#eef0eb] text-[#153243]"
              placeholder="Ingrese el apellido"
              required
            />
          </div>

          <div>
            <label className="block text-[#153243] text-[18px] mb-[4px]">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#eef0eb] text-[#153243]"
              placeholder="Ingrese la contraseña"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-[24px] bg-[#284b63] text-[#eef0eb] p-[12px] rounded-[8px] font-bold hover:bg-[#153243] transition-colors"
        >
          Añadir Usuario
        </button>
      </form>

      {/* Vista Previa */}
      <div className="bg-[#b4b8ab] p-[24px] rounded-[8px] w-[45%] h-[80%] shadow-md flex flex-col justify-center">
        <h2 className="text-[#153243] text-[28px] font-bold mb-[24px] text-center">
          Vista Previa
        </h2>
        <div className="text-[#153243] text-[18px] space-y-[12px]">
          <p>
            <strong>ID:</strong> {id || "None"}
          </p>
          <p>
            <strong>Contraseña:</strong> {password || "None"}
          </p>
          <p>
            <strong>Nombre:</strong> {nombre || "None"}
          </p>
          <p>
            <strong>Apellido:</strong> {apellido || "None"}
          </p>
          <p>
            <strong>Ubicación:</strong> None
          </p>
        </div>
      </div>
    </div>
  );
}
