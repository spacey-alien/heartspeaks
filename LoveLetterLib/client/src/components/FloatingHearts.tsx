export default function FloatingHearts() {
  // Optimized for lower resource usage (fewer elements for 2GB RAM devices)
  return (
    <div className="fixed w-full h-full pointer-events-none overflow-hidden z-0">
      <i className="fixed fas fa-heart text-2xl text-purple-400 opacity-60" 
         style={{ 
           top: '10%', 
           left: '10%', 
           animation: 'float 4s ease-in-out infinite',
           transform: 'translateZ(0)' // Hardware acceleration
         }}>
      </i>
      <i className="fixed fas fa-heart text-3xl text-purple-500 opacity-60" 
         style={{ 
           top: '20%', 
           left: '80%', 
           animation: 'float 5s ease-in-out 0.5s infinite',
           transform: 'translateZ(0)'
         }}>
      </i>
      <i className="fixed fas fa-heart text-xl text-purple-300 opacity-60" 
         style={{ 
           top: '70%', 
           left: '20%', 
           animation: 'float 4.5s ease-in-out 1s infinite',
           transform: 'translateZ(0)'
         }}>
      </i>
    </div>
  );
}
