import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { CheckCircleOutline, CancelOutlined } from "@mui/icons-material";
import { useProgress } from "../../components/context/progressContext";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question: "Qual é o filme que a Isabella MAIS assistiu?",
    options: [
      "O bom dinossauro",
      "Patrulha Canina, O filme",
      "Rei Leão",
      "Moana",
    ],
    correctAnswer: "O bom dinossauro",
  },
  {
    question: "Como a Isabella pedia água quando era pequena?",
    options: ["báah", "aaah", "cáah", "gáah"],
    correctAnswer: "cáah",
  },
  {
    question: "Qual o lugar de passeio preferido da Isabella?",
    options: ["Shopping", "Parquinho", "Igreja", "Casa da Ana"],
    correctAnswer: "Shopping",
  },
  {
    question: "Qual o vegetal preferido do momento da Isabella?",
    options: ["Pepino", "Brócolis", "Cenoura", "Beterraba"],
    correctAnswer: "Pepino",
  },
  {
    question: "Qual é o tema do primeiro aniversário da Isabella?",
    options: [
      "Patrulha Canina",
      "Galinha Pintadinha",
      "Pequena Sereia",
      "Procurando Dory",
    ],
    correctAnswer: "Procurando Dory",
  },
  {
    question: "Qual o horário que a Isabella começa a dormir à noite?",
    options: ["19:30", "20:30", "21:30", "22:30"],
    correctAnswer: "20:30",
  },
  {
    question:
      "Qual a marca de fralda que a Isabella mais usou em toda infância?",
    options: ["PomPom", "Pampers", "Huggies", "Babysec"],
    correctAnswer: "Huggies",
  },
  {
    question: "Qual o lanche preferido da Isabella?",
    options: ["Pizza", "Hambúrguer + Batata frita", "Cuscuz com leite", "Pão"],
    correctAnswer: "Hambúrguer + Batata frita",
  },
  {
    question: "Qual o nome da marca do primeiro sapatinho da Isabella?",
    options: ["Moleka", "Pampili", "Bibi", "Melissa"],
    correctAnswer: "Melissa",
  },
  {
    question: "Qual sabor de suco preferido da Isabella?",
    options: ["Uva", "Cupuaçu", "Acerola", "Laranja"],
    correctAnswer: "Acerola",
  },
];

export default function Quizz() {
  const { updateProgress } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();
  // Define o incremento do progresso por acerto
  const progressIncrement = 100 / questions.length;

  const handleAnswer = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const handleConfirm = () => {
    if (selectedOption !== null) {
      setIsAnswered(true);
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore((prev) => prev + 1);
        updateProgress((prev) => prev + progressIncrement); // Incrementa o progresso
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Redireciona para a página de resultados com a pontuação obtida
      navigate("/5", {
        state: { score, totalQuestions: questions.length },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardContent className="p-6">
          <Typography
            variant="h5"
            className="text-gray-800 font-bold text-center mb-4"
          >
            {questions[currentQuestion].question}
          </Typography>

          {/* Opções */}
          <div className="flex flex-col space-y-3">
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option}
                variant={selectedOption === option ? "contained" : "outlined"}
                color={
                  isAnswered
                    ? option === questions[currentQuestion].correctAnswer
                      ? "success"
                      : selectedOption === option
                      ? "error"
                      : "primary"
                    : "primary"
                }
                className={`py-2 ${
                  isAnswered ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
              >
                {option}
              </Button>
            ))}
          </div>

          {/* Resultado da pergunta */}
          {isAnswered && (
            <div className="flex flex-col items-center mt-4">
              {selectedOption === questions[currentQuestion].correctAnswer ? (
                <Typography className="text-green-600 font-semibold flex items-center">
                  🎉 Parabéns! Você acertou!
                  <CheckCircleOutline className="ml-2 text-green-600" />
                </Typography>
              ) : (
                <Typography className="text-red-600 font-semibold flex items-center">
                  😢 Errou! A resposta certa era:{" "}
                  {questions[currentQuestion].correctAnswer}
                  <CancelOutlined className="ml-2 text-red-600" />
                </Typography>
              )}
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex justify-between mt-6">
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              disabled={isAnswered || selectedOption === null}
            >
              Confirmar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleNextQuestion}
              disabled={!isAnswered}
            >
              Próxima
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
