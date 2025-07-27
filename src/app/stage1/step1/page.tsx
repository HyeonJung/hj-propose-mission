'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FavorBar from '@/components/FavorBar';
import FavorFloatingText from '@/components/FavorFloatingText';

const dialogScript = [
    { name: '죄우식', line: '자 다들 주목~~', image: '/images/woosik-default.png' },
    { name: '죄우식', line: '오늘 지어소프트에서 개발자가 왔으니까 민지씨가 잘 챙겨줘요~', image: '/images/woosik-default.png' },
    { name: '현중', line: '안녕하세요... 잘 부탁드립니다.', image: '/images/hyeonjung-default.png' },
    { name: '[SYSTEM]', line: '새로온 개발자 윤현중의 첫인상은?', image: '' },
    { name: '민지', line: ['(완전 개발자같이 생겼네;;)', '(첫눈에 반했다. 바로 꼬셔야겠다.)', '(신기하게 생겼다. 👽)'], image: '/images/minji-default.png' },
];


export default function Stage1() {
    // Overlay 상태: 화면 mount 시 페이드인 효과
    const [showOverlay, setShowOverlay] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowOverlay(false), 800);
        return () => clearTimeout(timer);
    }, []);
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
    const [floatingText, setFloatingText] = useState<string | null>(null);
    // favorScore: store favor score in localStorage, not in state
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('favorScore', '0');
        }
    }, []);

    // Create extendedScript based on selectedChoiceIndex
    const extendedScript = [...dialogScript];
    if (selectedChoiceIndex !== null) {
        let response = '';
        let hjResponse = '';
        let response2 = '';
        if (selectedChoiceIndex === 0) {
            response = '안녕하세요. 잘 부탁드립니다.';
            hjResponse = '잘부탁드려요~';
            response2 = '(자리로 가서 앉는다)';
        } else if (selectedChoiceIndex === 1) {
            response = '반가워요!! 주말에 뭐하세요??';
            hjResponse = '(당황하며) 네 저요?? 일해요..🥲'
            response2 = '그러면 다음에 같이 놀아요 ㅠㅠ';
        } else if (selectedChoiceIndex === 2) {
            response = '신기하게 생기셨네요!';
            hjResponse = '네?? 😳'
            response2 = '농담이에요 ㅎㅎㅎ';
        }

        extendedScript.push({
            name: '민지',
            line: response,
            image: '/images/minji-default.png',
        });

        extendedScript.push({
            name: '현중',
            line: hjResponse,
            image: '/images/hyeonjung-default.png',
        });

        extendedScript.push({
            name: '민지',
            line: response2,
            image: '/images/minji-default.png',
        });
    }

    const currentLine = extendedScript[currentIndex];

    const handleNext = () => {
        if (Array.isArray(currentLine.line)) return;
        if (currentIndex < extendedScript.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            router.push('/start/stage2');
        }
    };

    useEffect(() => {
        if (typeof currentLine.line === 'string') {
            const fullText = currentLine.line;
            setDisplayedText('');
            let i = 0;
            const interval = setInterval(() => {
                if (i < fullText.length) {
                    setDisplayedText(fullText.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 40); // 글자 출력 속도 (ms)
            return () => clearInterval(interval);
        }
    }, [currentIndex, currentLine.line]);

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex flex-col justify-end items-center"
            style={{ backgroundImage: "url('/images/office-bg.png')" }}
        >
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-1000 z-50 pointer-events-none ${
                    showOverlay ? 'opacity-100' : 'opacity-0'
                }`}
            />
            {!showOverlay && (<FavorBar />)}
            
            {floatingText && <FavorFloatingText text={floatingText} />}
            <div
                className="absolute bottom-0 left-0 right-0 text-white bg-black/70 px-8 py-6 text-lg font-mono min-h-[220px] pt-[80px]"
                onClick={handleNext}
            >
                <p className="font-bold">{currentLine.name}</p>
                {Array.isArray(currentLine.line) ? (
                    <div className="space-y-2">
                        {currentLine.line.map((choice: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    // favorScore: store in localStorage immediately
                                    if (typeof window !== 'undefined') {
                                        if (idx === 0) {
                                            localStorage.setItem('favorScore', '2');
                                            setFloatingText('+2');
                                        } else if (idx === 1) {
                                            localStorage.setItem('favorScore', '10');
                                            setFloatingText('+10');
                                        } else if (idx === 2) {
                                            localStorage.setItem('favorScore', '20');
                                            setFloatingText('+20');
                                        }
                                        setTimeout(() => setFloatingText(null), 1000);
                                    }
                                    setSelectedChoiceIndex(idx);
                                    setCurrentIndex(currentIndex + 1);
                                }}
                                className="block w-full text-left bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition"
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="mt-2">{displayedText}</p>
                )}
                {!Array.isArray(currentLine.line) && (
                    <div className="mt-4 text-right text-sm text-gray-300 flex items-center justify-end gap-2">
                        <span className="text-lg">🖱️</span>
                        <span>CLICK</span>
                    </div>
                )}
            </div>

            {currentLine.image && (
                <div className="absolute bottom-[280px] left-10 w-[200px] h-[200px]">
                    <Image
                        src={currentLine.image}
                        alt={`${currentLine.name} 캐릭터`}
                        width={200}
                        height={200}
                        className="object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] z-10"
                    />
                </div>
            )}
        </div>
    );
}