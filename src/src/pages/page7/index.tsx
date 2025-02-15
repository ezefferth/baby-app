import { useState } from "react";
import { FcNext } from "react-icons/fc";

import img from "../../../assets/img.jpg";

export default function Page7() {
  const [next, setNext] = useState(0);

  const handleNext = () => {
    setNext((next) => next + 1);
  };

  return (
    <div className="h-screen flex justify-center items-center px-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg">
        {next === 0 && (
          <p className="text-xl font-semibold flex items-center">
            O melhor ainda está por vir!{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 1 && (
          <p className="text-xl mt-4 flex items-center">
            Uma nova aventura está prestes a começar...{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 2 && (
          <p className="text-xl mt-4 flex items-center">
            Um presente inesperado, uma alegria sem igual...{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 3 && (
          <p className="text-xl mt-4 flex items-center">
            O amor não se divide, ele se multiplica...{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 4 && (
          <p className="text-xl mt-4 flex items-center">
            Será que vocês conseguem adivinhar?{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 5 && (
          <p className="text-xl mt-4 flex items-center">
            É algo pequeno, mas que trará muito amor e felicidade!{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 6 && (
          <p className="text-xl mt-4 flex items-center">
            Ainda não sabemos seu nome... Nem seu rostinho...{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 7 && (
          <p className="text-xl mt-4 flex items-center">
            Mas já sabemos que ele chegará para encher nossas vidas de sorrisos e carinho!{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 8 && (
          <p className="text-2xl font-bold mt-4 text-green-600 flex items-center">
            Mas temos uma certeza... 💖{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 9 && (
          <p className="text-2xl font-bold mt-4 text-green-600 flex items-center">
            Nossa família está crescendo! 👶💙💖{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 10 && (
          <p className="text-2xl font-bold mt-4 text-green-600 flex items-center">
            Antes éramos três, agora seremos quatro! 👶💙💖{" "}
            <button className="cursor-pointer ml-2" onClick={handleNext}>
              <FcNext size={24} />
            </button>
          </p>
        )}
        {next === 11 && (
          <div className="flex flex-col items-center">
            <p className="text-2xl font-semibold mb-4">💖</p>
            <img src={img} width={600} className="rounded-lg shadow-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
