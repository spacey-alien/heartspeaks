export default function Header() {
  return (
    <header className="text-center mb-8 pt-6">
      <div className="inline-block relative">
        <i className="fas fa-heart text-4xl text-purple-500 animate-float"></i>
        <i className="fas fa-heart text-3xl text-pink-400 absolute top-1 left-6 animate-float-delayed"></i>
      </div>
      <h1 className="font-poppins font-bold text-4xl bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text mt-2">HeartSpeak</h1>
      <p className="text-lg text-gray-600">Share your feelings with love</p>
      <p className="text-xs text-gray-500 italic mt-1">Made by Alien</p>
    </header>
  );
}
