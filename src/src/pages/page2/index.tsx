import { useContext, useEffect, useState } from "react";
import { useProgress } from "../../components/context/progressContext";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../components/context/data";

export default function Page2() {
  const { updateProgress } = useProgress();
  const { name, surname, setName, setSurname } = useContext(DataContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    updateProgress(1); // Define progresso para 50%
  }, []);

  const handleNext = () => {
    if (name.trim() === "" || surname.trim() === "") {
      setError("Por favor, preencha seu primeiro e último nome.");
      return;
    }
    navigate("/3_1");
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Digite seu nome completo
        </h2>

        <div className="flex flex-col space-y-4">
          {/* Primeiro Nome */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Primeiro Nome"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* Último Nome */}
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Último Nome"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* Exibe erro caso os campos estejam vazios */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Botão para avançar */}
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
