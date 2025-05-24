import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "iloveyoupapa") {
      // Set an authentication flag in localStorage
      localStorage.setItem("isAuthenticated", "true");
      
      // Redirect to home page
      setLocation("/");
      
      toast({
        title: "Welcome back, Nithya! 💜",
        duration: 3000,
      });
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <i className="fas fa-heart text-5xl text-purple-500"></i>
          </div>
          <h1 className="font-poppins font-bold text-3xl bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text mb-2">
            HeartSpeak
          </h1>
          <p className="text-gray-600">Made with love for Nithya 💜</p>
          <p className="text-gray-500 text-xs mt-2 italic">Made by Alien</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-200 transition"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            Enter Your Space
          </button>
        </form>
      </div>
    </div>
  );
}