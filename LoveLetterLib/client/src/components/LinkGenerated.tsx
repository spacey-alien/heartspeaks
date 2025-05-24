import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LinkGeneratedProps {
  link: string;
  onCreateNew: () => void;
}

export default function LinkGenerated({ link, onCreateNew }: LinkGeneratedProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopyLink = async () => {
    try {
      await copyToClipboard(link);
      setIsCopied(true);
      
      toast({
        title: "Link copied 💜",
        duration: 3000,
      });
      
      // Reset the copied state after 3 seconds
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      toast({
        title: "Failed to copy link",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-8 text-center">
      <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
        <i className="fas fa-check text-2xl text-purple-500"></i>
      </div>
      <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">Your note is ready!</h2>
      <p className="text-gray-600 mb-2">Share this link with your loved one:</p>
      <p className="text-purple-600 font-handwriting text-lg mb-4 p-3 bg-purple-50 rounded-xl border border-purple-100">"Don't worry babe, I will fix it" 💜</p>
      
      <div className="flex flex-col sm:flex-row items-center mb-8 gap-2">
        <input
          type="text"
          value={link}
          className="w-full px-4 py-3 bg-gray-50 rounded-xl sm:rounded-l-xl sm:rounded-r-none border border-purple-200 text-sm sm:text-base"
          readOnly
        />
        <button
          onClick={handleCopyLink}
          className={`${
            isCopied ? "bg-green-500" : "bg-gradient-to-r from-purple-500 to-pink-400"
          } text-white px-4 py-3 rounded-xl sm:rounded-r-xl sm:rounded-l-none transition duration-200 whitespace-nowrap`}
        >
          <i className={`fas ${isCopied ? "fa-check" : "fa-copy"} mr-1`}></i>
          {isCopied ? "Copied!" : "Copy Link"}
        </button>
      </div>
      
      <div className="mt-4 flex justify-center">
        <button
          onClick={onCreateNew}
          className="text-purple-500 hover:text-purple-700 font-medium transition duration-200 flex items-center"
        >
          <i className="fas fa-heart mr-1"></i> Create a new note
        </button>
      </div>
    </div>
  );
}
