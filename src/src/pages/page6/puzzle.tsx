import { useState, useEffect, useRef, useContext } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import { useNavigate } from "react-router-dom";
import puzzleImageSrc from "../../../assets/img1.jpg"; // 🔥 Importa a imagem do assets
import { DataContext } from "../../components/context/data";

interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  correctX: number;
  correctY: number;
  croppedImage: HTMLImageElement;
}

export default function Puzzle() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const imageRef = useRef(new window.Image());
  const navigate = useNavigate();
  const gridSize = { rows: 2, cols: 3 }; // 🔥 Define um quebra-cabeça de 2x3 (6 peças)
  const tolerance = 20; // 🔥 Define a tolerância para considerar a peça encaixada
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateStageSize = () => {
      const screenHeight = window.innerHeight; // 🖥️ Altura da tela
      const screenWidth = window.innerWidth; // 🖥️ Largura da tela
      const aspectRatio = 2 / 2; // 📏 Proporção da imagem

      let width = screenWidth;
      let height = width * aspectRatio;

      if (height > screenHeight) {
        height = screenHeight;
        width = height / aspectRatio;
      }

      setStageSize({ width, height });
    };

    updateStageSize();
    window.addEventListener("resize", updateStageSize); // Atualiza ao redimensionar a tela
    return () => window.removeEventListener("resize", updateStageSize);
  }, []);

  useEffect(() => {
    const image = new window.Image();
    image.src = puzzleImageSrc;
    image.onload = () => {
      const pieceWidth = image.width / gridSize.cols;
      const pieceHeight = image.height / gridSize.rows;
      const tempPieces: PuzzlePiece[] = [];

      // Criar canvas para recortar a imagem
      for (let row = 0; row < gridSize.rows; row++) {
        for (let col = 0; col < gridSize.cols; col++) {
          const canvas = document.createElement("canvas");
          canvas.width = pieceWidth;
          canvas.height = pieceHeight;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(
              image,
              col * pieceWidth,
              row * pieceHeight,
              pieceWidth,
              pieceHeight,
              0,
              0,
              pieceWidth,
              pieceHeight
            );
          }

          const croppedImage = new window.Image();
          croppedImage.src = canvas.toDataURL(); // Converte para imagem

          tempPieces.push({
            id: row * gridSize.cols + col,
            x: Math.random() * (stageSize.width - pieceWidth),
            y: Math.random() * (stageSize.height - pieceHeight),
            correctX: col * (stageSize.width / gridSize.cols),
            correctY: row * (stageSize.height / gridSize.rows),
            croppedImage,
          });
        }
      }
      setPieces(tempPieces);
      imageRef.current = image;
    };
  }, [stageSize]);

  const handleDragEnd = (id: number, x: number, y: number) => {
    setPieces((prevPieces) =>
      prevPieces.map((piece) =>
        piece.id === id
          ? {
              ...piece,
              x: Math.abs(piece.correctX - x) < tolerance ? piece.correctX : x,
              y: Math.abs(piece.correctY - y) < tolerance ? piece.correctY : y,
            }
          : piece
      )
    );

    // Verifica se todas as peças estão na posição correta dentro da tolerância
    const completed = pieces.every(
      (p) =>
        Math.abs(p.x - p.correctX) < tolerance &&
        Math.abs(p.y - p.correctY) < tolerance
    );

    if (completed) {
      setIsCompleted(true);
    }
  };

  const { name } = useContext(DataContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      <div className="relative">
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          className="border-2 border-gray-400"
        >
          <Layer>
            {pieces.map((piece) => (
              <KonvaImage
                key={piece.id}
                image={piece.croppedImage}
                x={piece.x}
                y={piece.y}
                width={stageSize.width / gridSize.cols}
                height={stageSize.height / gridSize.rows}
                draggable
                onDragEnd={(e) =>
                  handleDragEnd(piece.id, e.target.x(), e.target.y())
                }
              />
            ))}
          </Layer>
        </Stage>

        {/* 🔥 Tela de "Parabéns" quando completar o quebra-cabeça */}
        {isCompleted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white text-center p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold">🎉 Parabéns {name}! 🎉</h3>
            <p className="text-lg mt-2">Você completou o Quebra-Cabeça!</p>
            <button
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow"
              onClick={() => navigate("/7")}
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
