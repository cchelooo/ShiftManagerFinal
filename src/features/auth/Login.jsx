import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedId = id.trim();
    const trimmedPassword = password.trim();

    console.log("🟡 Enviando ID:", trimmedId);
    console.log("🟡 Enviando Password:", trimmedPassword);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", trimmedId)
      .eq("password", trimmedPassword);

    console.log("🔍 Resultado de Supabase:", data, "Error:", error);

    if (error || !data || data.length === 0) {
      setErrorMsg("❌ ID o contraseña incorrectos");
      return;
    }

    const user = data[0];

    // Guardar datos básicos en localStorage
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userSurname", user.surname);
    localStorage.setItem("userRole", user.role);

    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex font-[Poppins]"
      style={{ backgroundColor: "#eef0eb" }}
    >
      {/* Sección Izquierda */}
      <div
        className="w-[40%] flex items-center justify-center p-[40px]"
        style={{ backgroundColor: "#eef0eb" }}
      >
        <div className="text-left leading-none animate-fadeInUp">
          <h1
            className="text-[8rem] font-black"
            style={{ color: "#153243", lineHeight: "0.58" }}
          >
            Shift
          </h1>
          <h1
            className="text-[8rem] font-black mt-[-24px]"
            style={{ color: "#153243", lineHeight: "0" }}
          >
            Manager
          </h1>
        </div>
      </div>

      {/* Sección Derecha */}
      <div
        className="w-[60%] flex items-center justify-center"
        style={{ backgroundColor: "#284b63" }}
      >
        <form
          onSubmit={handleSubmit}
          className="p-[48px] rounded-[16px] shadow-2xl w-[400px] flex flex-col items-center"
        >
          <h2 className="text-[32px] font-semibold text-center mb-[40px] text-[#eef0eb]">
            Iniciar Sesión
          </h2>

          {errorMsg && (
            <p className="text-red-400 text-[16px] mb-4">{errorMsg}</p>
          )}

          <div className="w-[452px] flex flex-col items-center">
            <div className="w-full mb-[20px]">
              <label className="block text-[#eef0eb] text-[20px] mb-[8px]">
                ID
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="h-[50px] w-full box-border border-2 border-[#f4f9e9] rounded-[8px] bg-[#eef0eb] text-[#153243] text-[18px] shadow-md
                focus:border-[#b4b8ab] focus:outline-none transition-colors"
                placeholder="Ingrese su ID"
                required
              />
            </div>

            <div className="w-full mb-[32px]">
              <label className="block text-[#eef0eb] text-[20px] mb-[8px]">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[50px] w-full box-border border-2 border-[#f4f9e9] rounded-[8px] bg-[#eef0eb] text-[#153243] text-[18px] shadow-md
                focus:border-[#b4b8ab] focus:outline-none transition-colors"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="h-[50px] w-full box-border bg-[#eef0eb] text-[#284b63] border-2 border-[#f4f9e9] rounded-[8px] font-bold text-[20px]
                hover:bg-[#b4b8ab] hover:border-[#9ea295]
                focus:bg-[#b4b8ab] focus:border-[#9ea295] focus:outline-none
                transition-colors shadow-lg"
              >
                Ingresar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
