import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoteView from "@/components/NoteView";
import { useEffect, useState } from "react";

export default function Note() {
  const [location] = useLocation();
  const [debugInfo, setDebugInfo] = useState("");
  
  useEffect(() => {
    // Get the raw query string for debugging
    const queryString = window.location.search;
    const parsedParams = new URLSearchParams(queryString);
    
    // Log debugging information
    console.log("Current URL:", window.location.href);
    console.log("Query string:", queryString);
    console.log("Title param:", parsedParams.get('title'));
    console.log("Problem param:", parsedParams.get('problem'));
    
    setDebugInfo(`URL: ${window.location.href.substring(0, 50)}... 
                 Title: ${parsedParams.has('title') ? 'exists' : 'missing'}
                 Problem: ${parsedParams.has('problem') ? 'exists' : 'missing'}`);
  }, [location]);
  
  // Use window.location.search directly to get query parameters
  const params = new URLSearchParams(window.location.search);
  
  // Check if we have required parameters
  const hasRequiredParams = params.has('title') && params.has('problem');
  
  // Collect note data from URL parameters
  const noteData = {
    title: params.get('title') || "Untitled Note",
    problem: params.get('problem') || "No content provided",
    mood: params.get('mood') || "💌",
    solution: params.get('solution') || "",
    timestamp: params.get('timestamp') || new Date().toISOString()
  };
  
  return (
    <div className="container mx-auto p-4 max-w-3xl relative min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {hasRequiredParams ? (
          <NoteView note={noteData} />
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">No Note Found</h2>
            <p className="text-gray-600 mb-6">This link doesn't contain a valid note.</p>
            <p className="text-xs text-gray-500 mb-4">{debugInfo}</p>
            <a href="/" className="text-pink-500 hover:text-pink-700 font-medium transition duration-200">
              Create a new note →
            </a>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
