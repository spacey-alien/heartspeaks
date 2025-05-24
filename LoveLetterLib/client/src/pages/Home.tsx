import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrievanceForm from "@/components/GrievanceForm";
import LinkGenerated from "@/components/LinkGenerated";

export type FormData = {
  title: string;
  problem: string;
  mood: string;
  solution: string;
};

export default function Home() {
  const [showLinkPage, setShowLinkPage] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  
  const handleFormSubmit = (link: string) => {
    setGeneratedLink(link);
    setShowLinkPage(true);
  };
  
  const handleCreateNew = () => {
    setShowLinkPage(false);
  };
  
  return (
    <div className="container mx-auto p-4 max-w-3xl relative min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {!showLinkPage ? (
          <GrievanceForm onSubmit={handleFormSubmit} />
        ) : (
          <LinkGenerated link={generatedLink} onCreateNew={handleCreateNew} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
