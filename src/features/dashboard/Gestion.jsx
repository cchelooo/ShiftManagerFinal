import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import bcrypt from "bcryptjs";

export default function Gestion() {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [originalPassword, setOriginalPassword] = useState(""); // ← para detectar si fue editada

  useEffect(() => {
    if (id.trim() !== "") {
      fetchUser(id.trim());
    } else {
      resetForm();
    }
  }, [id]);

  const fetchUser = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("❌ Usuario no encontrado:", error);
      resetForm();
    } else {
      setNombre(data.name || "");
      setApellido(data.surname || "");
      setPassword(""); // ← no mostrar hash
      setOriginalPassword(data.password || ""); // ← guardar hash original
      setUbicacion(data.address || "");
    }
  };

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setPassword("");
    setOriginalPassword("");
    setUbicacion("");
  };

  const handleGestionar = async () => {
    let passwordFinal = originalPassword;

    // Si el usuario escribió una nueva contraseña, la ciframos
    if (password.trim() !== "") {
      passwordFinal = await bcrypt.hash(password.trim(), 10);
    }

    const { error } = await supabase
      .from("users")
      .update({
        name: nombre.trim(),
        surname: apellido.trim(),
        password: passwordFinal,
        address: ubicacion.trim() || "None",
      })
      .eq("id", id.trim());

    if (error) {
      console.error("❌ Error al actualizar usuario:", error);
      alert("❌ No se pudo actualizar el usuario.");
    } else {
      alert("✅ Usuario actualizado correctamente");
    }
  };

  const handleEliminar = async () => {
    const { error } = await supabase.from("users").delete().eq("id", id.trim());

    if (error) {
      console.error("❌ Error al eliminar usuario:", error);
      alert("❌ No se pudo eliminar el usuario.");
    } else {
      resetForm();
      setId("");
      setConfirmarEliminar(false);
      alert("✅ Usuario eliminado correctamente");
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center gap-[32px]">
      <form className="bg-[#b4b8ab] p-[24px] rounded-[8px] w-[45%] h-[85%] shadow-md flex flex-col justify-center">
        <h2 className="text-[#153243] text-[28px] font-bold mb-[24px] text-center">
          Gestionar Usuario
        </h2>

        <div className="flex flex-col gap-[16px]">
          <div>
            <label className="block text-[#153243] text-[18px] mb-[4px]">
              ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#eef0eb] text-[#153243]"
              placeholder="Ingrese el ID"
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
              placeholder="Nombre"
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
              placeholder="Apellido"
            />
          </div>

          <div>
            <label className="block text-[#153243] text-[18px] mb-[4px]">
              Contraseña
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#eef0eb] text-[#153243]"
              placeholder="Contraseña"
            />
          </div>

          <div>
            <label className="block text-[#153243] text-[18px] mb-[4px]">
              Ubicación
            </label>
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              className="w-full p-[12px] box-border rounded-[8px] border-2 border-[#284b63] bg-[#eef0eb] text-[#153243]"
              placeholder="Ubicación"
            />
          </div>
        </div>

        <div className="flex justify-between mt-[24px]">
          <button
            type="button"
            onClick={handleGestionar}
            className="w-[48%] bg-[#284b63] text-[#eef0eb] p-[12px] rounded-[8px] font-bold hover:bg-[#153243] transition-colors"
          >
            Gestionar
          </button>

          <button
            type="button"
            onClick={() => setConfirmarEliminar(true)}
            className="w-[48%] bg-[#b91c1c] text-[#eef0eb] p-[12px] rounded-[8px] font-bold hover:bg-[#7f1d1d] transition-colors"
          >
            Eliminar
          </button>
        </div>

        {confirmarEliminar && (
          <div className="mt-[16px] p-[16px] bg-[#eef0eb] text-[#153243] rounded-[8px] shadow-md">
            <p className="mb-[8px]">¿Estás seguro de eliminar este usuario?</p>
            <div className="flex gap-[12px]">
              <button
                onClick={handleEliminar}
                type="button"
                className="bg-[#b91c1c] hover:bg-[#7f1d1d] text-[#eef0eb] px-[12px] py-[8px] rounded-[8px]"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setConfirmarEliminar(false)}
                type="button"
                className="bg-[#284b63] hover:bg-[#153243] text-[#eef0eb] px-[12px] py-[8px] rounded-[8px]"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Vista Previa */}
      <div className="bg-[#b4b8ab] p-[24px] rounded-[8px] w-[45%] h-[85%] shadow-md flex flex-col justify-center">
        <h2 className="text-[#153243] text-[28px] font-bold mb-[24px] text-center">
          Vista Previa
        </h2>
        <div className="text-[#153243] text-[18px] space-y-[8px]">
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
            <strong>Ubicación:</strong> {ubicacion || "None"}
          </p>
        </div>
      </div>
    </div>
  );
}
