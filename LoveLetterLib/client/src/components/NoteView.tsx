import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface NoteData {
  title: string;
  problem: string;
  mood: string;
  solution: string;
  timestamp: string;
}

interface NoteViewProps {
  note: NoteData;
}

export default function NoteView({ note }: NoteViewProps) {
  const { toast } = useToast();
  const [isHugSent, setIsHugSent] = useState(false);
  
  const handleSendHug = () => {
    setIsHugSent(true);
    
    toast({
      title: "Hug received with love! 💜",
      duration: 3000,
    });
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsHugSent(false);
    }, 3000);
  };
  
  return (
    <>
      <div className="paper-texture rounded-3xl shadow-lg p-6 md:p-8 mb-8 relative overflow-hidden">
        {/* Decorative Elements - Using purple hearts for romance */}
        <div className="absolute top-3 right-3 text-purple-400 opacity-40 text-5xl">
          <i className="fas fa-heart"></i>
        </div>
        <div className="absolute bottom-3 left-3 text-purple-400 opacity-40 text-4xl">
          <i className="fas fa-heart"></i>
        </div>
        <div className="absolute top-1/2 left-2 -translate-y-1/2 text-purple-300 opacity-20 text-6xl">
          <i className="fas fa-heart"></i>
        </div>
        
        {/* Note Content - Optimized rendering */}
        <div className="relative z-10">
          <div className="flex items-center mb-4 flex-wrap">
            <span className="text-3xl mr-2">{note.mood}</span>
            <h2 className="font-handwriting text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">{note.title}</h2>
          </div>
          
          <div className="mb-6">
            <p className="font-handwriting text-xl leading-relaxed">
              {note.problem}
            </p>
          </div>
          
          {note.solution && (
            <div className="mb-6 bg-purple-50 p-4 rounded-xl border border-purple-100">
              <h3 className="font-poppins font-medium text-purple-600 mb-2">Suggested Solution:</h3>
              <p className="font-handwriting text-lg">
                {note.solution}
              </p>
            </div>
          )}
          
          <div className="text-right text-gray-500 italic text-sm">
            <span>{formatDate(note.timestamp)}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button
          onClick={handleSendHug}
          className={`${
            isHugSent ? "bg-green-400" : "bg-gradient-to-r from-purple-500 to-pink-400"
          } text-white font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 will-change-transform`}
        >
          {isHugSent ? "Hug sent! 💜" : "Send a hug 💜"}
        </button>
      </div>
    </>
  );
}
