import { useState } from "react";
import users from "../data/users.json";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userFound = users.find(
      (user) => user.id === Number(id) && user.password === password
    );

    if (userFound) {
      console.log("✅ Login exitoso");
      
      localStorage.setItem("userName", userFound.name);
      localStorage.setItem("userSurname", userFound.surname);

      navigate("/dashboard");
      // Aquí podrías navegar a otra página, guardar sesión, etc.
    } else {
      console.log("❌ ID o contraseña incorrectos");
    }
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
