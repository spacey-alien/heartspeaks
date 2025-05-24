import { useState } from "react";
import { encodeFormToURL } from "@/lib/utils";
import { FormData } from "@/pages/Home";

interface MoodButton {
  emoji: string;
  isSelected: boolean;
}

interface GrievanceFormProps {
  onSubmit: (link: string) => void;
}

export default function GrievanceForm({ onSubmit }: GrievanceFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    problem: "",
    mood: "",
    solution: "",
  });
  
  // Updated with more romantic emoji options and including purple hearts
  const [moodButtons, setMoodButtons] = useState<MoodButton[]>([
    { emoji: "😊", isSelected: false },
    { emoji: "🥰", isSelected: false },
    { emoji: "😔", isSelected: false },
    { emoji: "💜", isSelected: false },
    { emoji: "💞", isSelected: false },
    { emoji: "💌", isSelected: false },
    { emoji: "🌸", isSelected: false },
    { emoji: "✨", isSelected: false },
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMoodSelect = (selectedEmoji: string) => {
    setFormData(prev => ({ ...prev, mood: selectedEmoji }));
    
    setMoodButtons(prev => 
      prev.map(btn => ({
        ...btn,
        isSelected: btn.emoji === selectedEmoji
      }))
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log form data for debugging
    console.log("Form data being submitted:", formData);
    
    // Generate URL with form data
    const baseUrl = `${window.location.origin}/note`;
    
    // Build URL manually to ensure parameters are included properly
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      params.append(key, value);
    });
    
    // Add timestamp
    params.append('timestamp', new Date().toISOString());
    
    const link = `${baseUrl}?${params.toString()}`;
    console.log("Generated link:", link);
    
    onSubmit(link);
  };
  
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-8">
      <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
            Title of your note 💭
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-200 transition duration-200"
            placeholder="What's on your mind?"
            required
          />
        </div>
        
        <div>
          <label htmlFor="problem" className="block text-lg font-medium text-gray-700 mb-2">
            What's bothering you? 💬
          </label>
          <textarea
            id="problem"
            name="problem"
            rows={4}
            value={formData.problem}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-200 transition duration-200"
            placeholder="I feel..."
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Current mood 🌈
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {moodButtons.map((btn, index) => (
              <button
                key={index}
                type="button"
                className={`p-2 rounded-lg ${
                  btn.isSelected ? "bg-purple-200" : "bg-gray-100 hover:bg-purple-100"
                } transition duration-200 text-2xl`}
                onClick={() => handleMoodSelect(btn.emoji)}
              >
                {btn.emoji}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="solution" className="block text-lg font-medium text-gray-700 mb-2">
            Suggested fix 💫 <span className="text-sm text-gray-500">(optional)</span>
          </label>
          <textarea
            id="solution"
            name="solution"
            rows={2}
            value={formData.solution}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-200 transition duration-200"
            placeholder="What would make it better?"
          ></textarea>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 flex items-center justify-center"
          >
            <span>Send with Love</span>
            <i className="fas fa-heart ml-2"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
