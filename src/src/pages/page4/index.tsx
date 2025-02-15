import { useEffect } from "react";
import Quizz from "./quizz";
import { useProgress } from "../../components/context/progressContext";

export default function Page4() {
  const { updateProgress } = useProgress();

  useEffect(() => {
    updateProgress(3); // Define progresso para 50%
  }, []);
  return (
    <div>
      <Quizz />
    </div>
  );
}

/* 

Q1 - Qual é o filme que a Isabella MAIS assistiu?
a - O bom dinoussauro (certa)
b - Patrulha Canina, O filme
c - Rei Leão
d - Moana


Q2 - Como a Isabella pedia agua quando era pequena?
a - báah 
b - aaah
c - cáah (certa)
d - gáah

Q3 - Qual o lugar de passeio preferido da Isabella?
a - Shopping (certa)
b - Parquinho
c - Igreja
d - Casa da Ana

Q4 - Qual o vegetal preferido do momento da Isabella?
a - Pepino
b - Brócolis (certa)
c - Cenoura
d - Beterraba

Q5 - Qual é o tema do primeiro aniversário a Isabella?
a - Patrulha Canina
b - Galinha Pintadinha
c - Pequena Sereia
d - Procurando Dory (certa)

Q6 - Qual o horário que a Isabella começa a dormir anoite?
a - 19:30
b - 20:30 (certo)
c - 21:30
d - 22:30

Q7 - Qual a marca de fralda que a Isabella mais usou em toda infância?
a - PomPom
b - Pampers
c - Huggies (certa)
d - Babysec

Q8 - Qual o lanche preferido da Isabella?
a - Pizza
b - Hamgurguer + Batata frita (certa)
c - Cuzcuz com leite
d - Pão

Q9 - Qual o nome da marca do primeiro sapatinha da Isabella?
a - Moleka
b - Pampili
c - Bibi
d - Melissa (certa)

Q10 - Qual sabor de suco preferido da Isabella?
a - Uva
b - Cupuaçu
c - Acerola (certa)
d - Laranja
 */
