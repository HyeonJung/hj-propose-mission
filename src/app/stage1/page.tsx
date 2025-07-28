'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const sentences = [
  '2019년 8월, 여름...',
  '오늘도 어김없이 난 오아시스로 출근을 한다.',
  '장지 물류센터, 따가운 햇살, 그리고 반복되는 하루.',
  '오늘도 열심히 일해보자!',
];

export default function Stage1() {
  const router = useRouter();
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [showNextPrompt, setShowNextPrompt] = useState(false);

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
    <div onClick={handleClick} className="min-h-screen bg-black text-white font-mono flex flex-col justify-center items-center px-6 py-20 text-lg tracking-wide space-y-6">
      <audio ref={clickSoundRef} src="/audio/click.wav" preload="auto" />
      <audio ref={typingSoundRef} src="/audio/typing.wav" preload="auto" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="whitespace-pre-wrap"
      >
        {displayedText}
      </motion.p>

      {showNextPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-sm text-gray-400"
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
          onClick={() => router.push('/stage1/step1')}
          className="mt-10 px-6 py-3 bg-white text-black rounded-full shadow hover:bg-gray-200 transition"
        >
          사무실 들어가기
        </motion.button>
      )}
    </div>
  );
}