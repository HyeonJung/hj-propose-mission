const FavorFloatingText = ({ text }: { text: string }) => (
  <div className="absolute top-12 left-6 z-50 animate-float-up text-pink-400 font-bold text-lg pointer-events-none">
    {text} ♥️
  </div>
);

export default FavorFloatingText;