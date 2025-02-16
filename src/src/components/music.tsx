import musicFile from "../../assets/riverFlowsinYou.mp3"; // 🔥 Adicione um arquivo de música na pasta assets

export default function Music() {
  return (
    <div className="fixed bottom-8 left-0 w-full flex justify-center z-50">
      <audio controls autoPlay loop className="w-[80%] max-w-lg">
        <source src={musicFile} type="audio/mp3" />
      </audio>
    </div>
  );
}
