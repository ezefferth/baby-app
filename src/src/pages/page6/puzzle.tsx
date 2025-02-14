import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import { useNavigate } from "react-router-dom";
import puzzleImageSrc from "../../../assets/img1.jpg"; // 🔥 Importa a imagem do assets

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
  const gridSize = 3; // 🔥 Modifique para 4, 5, etc., para aumentar a dificuldade

  useEffect(() => {
    const image = new window.Image();
    image.src = puzzleImageSrc;
    image.onload = () => {
      const pieceWidth = image.width / gridSize;
      const pieceHeight = image.height / gridSize;
      const tempPieces: PuzzlePiece[] = [];

      // Criar canvas para recortar a imagem
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
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
            id: row * gridSize + col,
            x: Math.random() * 300, // Posição inicial aleatória
            y: Math.random() * 300,
            correctX: col * pieceWidth,
            correctY: row * pieceHeight,
            croppedImage,
          });
        }
      }
      setPieces(tempPieces);
      imageRef.current = image;
    };
  }, []);

  const handleDragEnd = (id: number, x: number, y: number) => {
    setPieces((prevPieces) =>
      prevPieces.map((piece) =>
        piece.id === id
          ? {
              ...piece,
              x: Math.abs(piece.correctX - x) < 10 ? piece.correctX : x,
              y: Math.abs(piece.correctY - y) < 10 ? piece.correctY : y,
            }
          : piece
      )
    );

    // Verifica se todas as peças estão na posição correta
    const completed = pieces.every(
      (p) => Math.abs(p.x - p.correctX) < 10 && Math.abs(p.y - p.correctY) < 10
    );

    if (completed) {
      setIsCompleted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 relative">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Monte o Quebra-Cabeça!
      </h2>

      <div className="relative">
        <Stage
          width={imageRef.current.width}
          height={imageRef.current.height}
          className="border-2 border-gray-400"
        >
          <Layer>
            {pieces.map((piece) => (
              <KonvaImage
                key={piece.id}
                image={piece.croppedImage}
                x={piece.x}
                y={piece.y}
                width={imageRef.current.width / gridSize}
                height={imageRef.current.height / gridSize}
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
            <h3 className="text-3xl font-bold">🎉 Parabéns! 🎉</h3>
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
