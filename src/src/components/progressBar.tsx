import { LinearProgress } from "@mui/material";
import { useProgress } from "../components/context/progressContext";

export default function ProgressBar() {
  const { progress } = useProgress();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50">
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 8 }} // 🔥 Ajuste na altura para garantir visibilidade
      />
    </div>
  );
}