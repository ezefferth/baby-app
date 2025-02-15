import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useProgress } from "../../components/context/progressContext";

export default function Page1() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateProgress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);
  const [start, setStart] = useState(false);

  useEffect(() => {
    // Simula um tempo de carregamento antes de exibir o conteúdo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Define o progresso para cada página
  useEffect(() => {
    const progressMap: Record<string, number> = {
      "/1": 20,
      "/2": 50,
      "/3": 80,
      "/final": 100,
    };
    updateProgress(progressMap[location.pathname] || 0);
  }, [location.pathname, updateProgress]);

  const handleClickStart = () => {
    setStart(true);
    navigate("/2");
  };

  if (!start) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        ) : (
          <div className="text-center transition-opacity duration-5000 opacity-100">
            <p className="text-2xl">
              Olá, seja muito bem-vindo.{" "}
              <a
                className="text-blue-800 cursor-pointer hover:text-blue-700"
                onClick={handleClickStart}
              >
                Clique aqui
              </a>{" "}
              para iniciar.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Área principal para o conteúdo da página */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-[80%] max-w-xl bg-white p-6 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>

    </div>
  );
}
