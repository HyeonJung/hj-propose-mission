'use client';

import { useEffect, useState } from 'react';

const FavorBar = () => {
  const [favor, setFavor] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('favorScore');
        if (stored !== null) setFavor(parseInt(stored, 10));
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-4 left-4 w-48 z-50 bg-black/70 px-3 py-2 rounded">
      <div className="w-full h-4 bg-white/30 rounded overflow-hidden shadow-inner">
        <div
          className="h-full bg-pink-500 transition-all duration-500"
          style={{ width: `${Math.max(0, Math.min(100, favor))}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FavorBar;