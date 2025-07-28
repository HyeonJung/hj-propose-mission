'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const sentences = [
  '2020년 12월 25일',
  '오늘은 둘이서 맞는 첫 크리스마스!',
  '즐거운 데이트를 하러 가자!',
  '[데이트 복장을 골라 잠실로 이동해주세요]',
];

export default function Stage1() {
  const router = useRouter();
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [showNextPrompt, setShowNextPrompt] = useState(false);
  const [showEpisodeTitle, setShowEpisodeTitle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEpisodeTitle(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentSentence >= sentences.length) return;

    if (charIndex < sentences[currentSentence].length) {
      const timeout = setTimeout(() => {
        if (typingSoundRef.current) {
          typingSoundRef.current.currentTime = 0;
          const playPromise = typingSoundRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setTimeout(() => {
                  typingSoundRef.current?.pause();
                }, 1000); // play for 1 second
              })
              .catch((error) => {
                console.warn('Typing sound play failed:', error);
              });
          }
        }
        setDisplayedText((prev) => prev + sentences[currentSentence][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setShowNextPrompt(true);
    }
  }, [charIndex, currentSentence]);

  const handleClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play();
    }
    if (showNextPrompt) {
      setCurrentSentence((prev) => prev + 1);
      setDisplayedText('');
      setCharIndex(0);
      setShowNextPrompt(false);
    }
  };

  return (
    <>
      {showEpisodeTitle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black z-50"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wider">
            EPISODE 02. Christmas 🎄
          </h1>
        </motion.div>
      )}
      {showEpisodeTitle ? null : (
        <div onClick={handleClick} className="min-h-screen bg-black text-white font-mono flex flex-col justify-center items-center px-6 py-20 text-xl tracking-wide space-y-6">
          <audio ref={clickSoundRef} src="/audio/click.wav" preload="auto" />
          <audio ref={typingSoundRef} src="/audio/typing.wav" preload="auto" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="whitespace-pre-wrap text-xl"
          >
            {displayedText}
          </motion.p>

          {showNextPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4 text-base text-gray-400"
            >
              <span className="flex items-center space-x-2">
                <span role="img" aria-label="mouse">🖱️</span>
                <span>CLICK</span>
              </span>
            </motion.div>
          )}

          {currentSentence >= sentences.length && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => router.push('/stage2/step1')}
              className="mt-10 px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 relative overflow-hidden group animate-pulse ring-2 ring-white ring-opacity-20"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-lg"></span>
              <span className="relative z-10">옷 고르기</span>
            </motion.button>
          )}
        </div>
      )}
    </>
  );
}