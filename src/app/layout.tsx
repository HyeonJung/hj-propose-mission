'use client';

import '@/app/styles/globals.css';
import { useEffect, useRef, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const tryPlayAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          console.log('🔇 사용자 인터랙션 필요');
        });
      }
    };

    // 최초 실행 시도
    tryPlayAudio();

    // 사용자 클릭 시 재생 시도
    const handleUserGesture = () => {
      tryPlayAudio();
      document.removeEventListener('click', handleUserGesture);
    };

    document.addEventListener('click', handleUserGesture);

    return () => {
      document.removeEventListener('click', handleUserGesture);
    };
  }, [isPlaying]);

  return (
    <html lang="ko">
      <body>
        {children}
        <audio ref={audioRef} loop preload="auto" src="/audio/bgm1.mp3" />
      </body>
    </html>
  );
}