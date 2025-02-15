import { useContext } from "react";
import { DataContext } from "../../components/context/data";
import { useNavigate } from "react-router-dom";

export default function Page3_1() {
  const { name } = useContext(DataContext);

  const navigate = useNavigate();

  const handleClickStart = () => {
    navigate("/3");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-2xl">
        {name}, Você será testado com algumas perguntas, está pronto para um
        desafio?
        <br/>
        <a
          className="text-blue-800 cursor-pointer hover:text-blue-700 text-center flex justify-center"
          onClick={handleClickStart}
        >
          Vamos lá!
        </a>
      </p>
    </div>
  );
}
