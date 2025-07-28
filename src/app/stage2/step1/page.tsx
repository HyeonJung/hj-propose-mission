'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FavorBar from '@/components/FavorBar';
import FavorFloatingText from '@/components/FavorFloatingText';

const dialogScript = [
    { name: '민지', line: '오늘 엄청 춥다 >_<', image: '/images/minji-default.png' },
    { name: '민지', line: '오늘 무슨 옷을 입을까?', image: '/images/minji-default.png' },
    { name: '민지', line: ['추우니까 바로 롱패딩 가야지', '그래도 첫 데이트인데 코트 입어야지', '상남자는 반팔이지'], image: '/images/minji-default.png' },
];


export default function Stage1() {
    // Overlay 상태: 화면 mount 시 페이드인 효과
    const [showOverlay, setShowOverlay] = useState(true);
    const [showEpisodeTitle, setShowEpisodeTitle] = useState(false);

    useEffect(() => {
        const episodeTimer = setTimeout(() => {
            setShowOverlay(false);
        }, 500);

        return () => {
            clearTimeout(episodeTimer);
        };
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
        let minjiImg = '';
        let response = '';
        if (selectedChoiceIndex === 0) {
            minjiImg = '/images/minji-stage2-1-1.png';
            response = '역시 뢍패딩이다...';
        } else if (selectedChoiceIndex === 1) {
            minjiImg = '/images/minji-stage2-1-2.png';
            response = '너무 춥다 >_<';
        } else if (selectedChoiceIndex === 2) {
            minjiImg = '/images/minji-stage2-1-2.png';
            response = '덥다 더워 ^^';
        }

        extendedScript.push({
            name: '민지',
            line: response,
            image: minjiImg,
        });

        extendedScript.push({
            name: '민지',
            line: '늦겠다!! 얼른 가야겠다.',
            image: minjiImg,
        });
    }

    const currentLine = extendedScript[currentIndex];

    const handleNext = () => {
        if (Array.isArray(currentLine.line)) return;

        const clickSound = new Audio('/audio/click.wav');
        clickSound.play();

        if (currentIndex < extendedScript.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            router.push('/stage2/step2');
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
                    const typingSound = new Audio('/audio/typing.wav');
                    typingSound.play();
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 40); // 글자 출력 속도 (ms)
            return () => clearInterval(interval);
        }
    }, [currentIndex, currentLine.line]);

    return (
        <>
            <div
                className="min-h-screen bg-cover bg-center relative flex flex-col justify-end items-center"
                style={{ backgroundImage: "url('/images/office-bg.png')" }}
            >
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-1000 z-50 pointer-events-none ${showOverlay ? 'opacity-100' : 'opacity-0'
                        }`}
                />
                {!showOverlay && (<FavorBar />)}

                {floatingText && <FavorFloatingText text={floatingText} />}
                <div
                    className="absolute bottom-0 left-0 right-0 text-white bg-black/70 px-8 py-6 text-xl font-mono min-h-[220px] pt-[80px]"
                    onClick={handleNext}
                >
                    <p className="font-bold">{currentLine.name}</p>
                    {Array.isArray(currentLine.line) ? (
                        <div className="space-y-2">
                            {currentLine.line.map((choice: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        const clickSound = new Audio('/audio/click.wav');
                                        clickSound.play();

                                        // favorScore: store in localStorage immediately
                                        if (typeof window !== 'undefined') {
                                            if (idx === 0) {
                                                localStorage.setItem('favorScore', '2');
                                                setFloatingText('+10');
                                            } else if (idx === 1) {
                                                localStorage.setItem('favorScore', '10');
                                                setFloatingText('+20');
                                            } else if (idx === 2) {
                                                localStorage.setItem('favorScore', '20');
                                                setFloatingText('+15');
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
                        <div className="mt-4 text-right text-base text-gray-300 flex items-center justify-end gap-2">
                            <span className="text-xl">🖱️</span>
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
        </>
    );
}