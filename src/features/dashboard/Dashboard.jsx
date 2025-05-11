import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Panel from "./Panel";

export default function Dashboard() {
  useEffect(() => {
    // Inicializar OneSignal si no está iniciado
    window.OneSignal = window.OneSignal || [];
    window.OneSignal.push(function () {
      window.OneSignal.init({
        appId: "e3a8bdba-2093-4191-87b0-241d2a692c69", // ← reemplaza por el real
        serviceWorkerPath: "/OneSignalSDKWorker.js",
      });

      // Mostrar prompt solo si no está habilitado aún
      window.OneSignal.isPushNotificationsEnabled(function (isEnabled) {
        if (!isEnabled) {
          window.OneSignal.showSlidedownPrompt();
        }
      });
    });
  }, []);

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
