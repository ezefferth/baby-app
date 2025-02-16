import { useContext, useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  TextField,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../../components/context/progressContext";
import { DataContext } from "../../components/context/data";

export default function Page3() {
  const { updateProgress } = useProgress();
  useEffect(() => {
    updateProgress(2); // Define progresso para 50%
  }, []);

  const { setParentesco } = useContext(DataContext); // Salva no contexto global
  const navigate = useNavigate();
  const [selectedParentesco, setSelectedParentesco] = useState("");
  const [customParentesco, setCustomParentesco] = useState("");

  const handleSelectChange = (event: any) => {
    setSelectedParentesco(event.target.value);
    if (event.target.value !== "Outro") {
      setParentesco(event.target.value); // Salva diretamente se não for "Outro"
    }
  };

  const handleCustomParentescoChange = (event: any) => {
    setCustomParentesco(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedParentesco === "Outro") {
      setParentesco(customParentesco);
    }
    navigate("/4"); // Redireciona para a próxima etapa
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Qual seu grau de parentesco com a Isabella?
        </h2>

        {/* Select do Material UI */}
        <FormControl
          fullWidth
          variant="filled"
          sx={{ mb: 4 }}
        >
          <InputLabel>Selecione</InputLabel>
          <Select
            value={selectedParentesco}
            onChange={handleSelectChange}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
          >
            <MenuItem value="Tio/Tia">Titio/Titia</MenuItem>
            <MenuItem value="Avô/Avó">Vovô/Vovó</MenuItem>
            <MenuItem value="Primo/Prima">Primo/Prima</MenuItem>
            <MenuItem value="Outro">Outro</MenuItem>
          </Select>
        </FormControl>

        {/* Input para "Outro" */}
        {selectedParentesco === "Outro" && (
          <TextField
          variant="filled"
            className="mt-4"
            sx={{ mb: 4 }}
            fullWidth
            label="Digite seu parentesco"
            value={customParentesco}
            onChange={handleCustomParentescoChange}
          />
        )}

        <Button
          className="mt-6"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={
            !selectedParentesco ||
            (selectedParentesco === "Outro" && !customParentesco)
          }
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
