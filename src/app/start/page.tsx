'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MinjiHyeonjoong from '/images/minji-hyeonjoong.png';
import { useRef } from 'react';

export default function StartPage() {
    const router = useRouter();
    const clickSoundRef = useRef<HTMLAudioElement | null>(null);

    const handleStartClick = () => {
        if (clickSoundRef.current) {
            clickSoundRef.current.play().catch(err => {
                console.warn('Sound play blocked:', err);
            });
        }
        setTimeout(() => {
            router.push('/stage1');
        }, 300);
    };


    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-pink-100 via-pink-50 to-pink-200 text-center p-8 font-[sans-serif] relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 z-10"
            >
                <Image
                    src="/images/minji-hyeonjoong.png"
                    alt="민지와 현중 캐릭터"
                    className="w-60 h-auto mx-auto drop-shadow"
                    width={240}
                    height={240}
                    priority
                />
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-extrabold mb-4 text-pink-700 relative animate-pulse z-10"
            >
                💌 현중이의&nbsp;
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-400 drop-shadow-md">
                    프로포즈 대작전
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl mb-8 z-10"
            >
                호감도를 상승시켜 프로포즈를 하게 유도하세요!
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-white/70 backdrop-blur-md border border-pink-200 rounded-xl p-4 max-w-xl text-sm text-pink-900 shadow-inner z-10"
            >
                <p className="mb-2 font-semibold">🎮 게임목표</p>
                <p>당신은 민지입니다.</p>
                <p>지금부터 현중의 호감도를 상승시켜 프로포즈를 이끌어내야 합니다.</p>
                <p>기억을 잘 되살려 추억 속 선택지를 골라 해피엔딩을 만들어보세요!</p>
            </motion.div>

            {/* 효과음 오디오 */}
            <audio ref={clickSoundRef} src="/audio/click.wav" preload="auto" />

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.4 }}
                onClick={handleStartClick}
                className="bg-pink-400 hover:bg-pink-500 text-white px-10 py-5 rounded-full text-xl shadow-lg mt-10 animate-bounce z-10"
            >
                🎮 게임 시작하기
            </motion.button>

            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="animate-bubble absolute w-8 h-8 bg-white bg-opacity-50 rounded-full left-[20%] top-[80%]" />
                <div className="animate-bubble absolute w-10 h-10 bg-white bg-opacity-40 rounded-full left-[40%] top-[90%]" />
                <div className="animate-bubble absolute w-7 h-7 bg-white bg-opacity-50 rounded-full left-[60%] top-[85%]" />
                <div className="animate-bubble absolute w-12 h-12 bg-white bg-opacity-35 rounded-full left-[75%] top-[95%]" />
            </div>
            <style jsx>{`
                @keyframes bubble {
                    0% {
                        transform: translateY(0) scale(1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-600px) scale(1.4);
                        opacity: 0;
                    }
                }

                .animate-bubble {
                    animation: bubble 9s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
}