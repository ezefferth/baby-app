import { useEffect } from "react";
import { useProgress } from "../../components/context/progressContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function Page5() {
  const { updateProgress } = useProgress();
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const totalQuestions = location.state?.totalQuestions || 10;

  useEffect(() => {
    const progressPercentage =
      score >= 8 ? 100 : (score / totalQuestions) * 100;
    updateProgress(progressPercentage); // Atualiza o progresso proporcionalmente
  }, [score, totalQuestions, updateProgress]);

  // Mensagens de feedback
  const getFeedbackMessage = () => {
    if (score < 5) {
      return {
        title: "Você pode conhecer melhor a Isabella!",
        message:
          "Você acertou menos da metade das perguntas. Tente passar mais tempo com a Isa para aprender mais sobre ela!",
        emoji: "🤔",
      };
    } else if (score >= 5 && score <= 7) {
      return {
        title: "Muito bom, mas pode melhorar!",
        message:
          "Você se saiu bem, mas ainda tem algumas coisinhas que poderia aprender sobre a Isabella! Que tal conversar mais com ela?",
        emoji: "😊",
      };
    } else {
      return {
        title: "Parabéns! A Isabella está orgulhosa! 🎉",
        message:
          "Você acertou quase tudo! Isabella certamente sabe que você a conhece muito bem. Continue sendo essa pessoa especial para ela!",
        emoji: "🥳",
      };
    }
  };

  const feedback = getFeedbackMessage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardContent className="p-6 text-center">
          <Typography
            variant="h4"
            className="text-gray-800 font-bold mb-4"
          >
            {feedback.emoji} {feedback.title}
          </Typography>

          <Typography
            variant="h6"
            className="text-gray-600 mb-4"
          >
            Você acertou <strong>{score}</strong> de{" "}
            <strong>{totalQuestions}</strong> perguntas.
          </Typography>

          <Typography className="text-gray-700">{feedback.message}</Typography>

          <div className="mt-6">
            {score > 8 ? (
              // Se acertou mais de 8, mostra o botão do "Desafio Final"
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/6")}
              >
                Está pronto para o desafio final?
              </Button>
            ) : (
              // Se acertou menos de 8, mostra o botão para refazer o quizz
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
              >
                Refazer o Quizz
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
