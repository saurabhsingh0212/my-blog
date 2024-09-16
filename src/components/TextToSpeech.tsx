import { useEffect, useState } from "react";

export default function TextToSpeech({ text }: { text: string }) {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const totalWords = text.split(/[" ",-]/).length;
    const estDuration = totalWords / 150;
    const voices = synth.getVoices();

    console.log(voices);

    // set default settings
    u.voice = voices[0];
    u.pitch = 1;
    u.rate = 1;
    u.volume = 10;
    u.onend = () => {
      setIsPlaying(false);
    };

    setUtterance(u);
    setDuration(estDuration);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (!isPlaying) {
      synth.resume();
    }

    if (utterance) {
      synth.speak(utterance);
    }

    setIsPlaying(true);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-md shadow-sm">
      <button
        type="button"
        className="shadow py-1 px-3 text-sm bg-white rounded"
        onClick={isPlaying ? handlePause : handlePlay}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h326l-80 80H160v640h440v-80h80v80q0 33-23.5 56.5T600-80H160Zm80-160v-80h280v80H240Zm0-120v-80h200v80H240Zm360 0L440-520H320v-200h120l160-160v520Zm80-122v-276q36 21 58 57t22 81q0 45-22 81t-58 57Zm0 172v-84q70-25 115-86.5T840-620q0-78-45-139.5T680-846v-84q104 27 172 112.5T920-620q0 112-68 197.5T680-310Z" />
      </svg>
      <span className="text-sm">{duration.toFixed(0)} min</span>
    </div>
  );
}
