import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const subtitles = [
    { time: 0, text: "Ngày 27/01/1973: Hiệp định Paris chính thức được ký kết." },
    { time: 5, text: "Thắng lợi vĩ đại của cuộc đấu tranh ngoại giao dài nhất lịch sử (1968 - 1973)." },
    { time: 10, text: "Chúng ta đã kết hợp nhuần nhuyễn đấu tranh Quân sự - Chính trị - Ngoại giao." },
    { time: 15, text: "Mỹ rút quân, tạo điều kiện khách quan thuận lợi: 'Đánh cho Mỹ cút, đánh cho Ngụy nhào'." },
    { time: 20, text: "Quy luật lượng-chất đã chín muồi, chuẩn bị cho bước nhảy vọt mùa Xuân 1975." }
];

const IntroVideo = ({ onComplete }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSub, setCurrentSub] = useState("");
    const [isMuted, setIsMuted] = useState(false);

    const handleStart = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const currentTime = videoRef.current.currentTime;
        const sub = subtitles.findLast(s => currentTime >= s.time);
        if (sub) setCurrentSub(sub.text);
    };

    return (
        <div className="fixed inset-0 z-[150] bg-black flex items-center justify-center overflow-hidden">
            {!isPlaying && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl px-6"
                    >
                        <h2 className="text-5xl md:text-7xl text-amber-500 mb-6 tracking-tighter uppercase font-black drop-shadow-2xl">
                            Mở đầu: Hiệp định Paris
                        </h2>
                        <p className="text-gray-400 text-xl mb-12 italic leading-relaxed">
                            "Từ Hiệp định Paris 1973 đến Đại thắng mùa Xuân 1975"
                        </p>
                        <button 
                            onClick={handleStart}
                            className="group relative px-16 py-5 bg-amber-600 hover:bg-amber-500 text-white rounded-full text-2xl font-black transition-all shadow-[0_0_50px_rgba(217,119,6,0.3)] overflow-hidden"
                        >
                            <span className="relative z-10">📜 Xem Prologue</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </button>
                    </motion.div>
                </div>
            )}

            <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                onEnded={onComplete}
                onTimeUpdate={handleTimeUpdate}
                muted={isMuted}
                poster="/assets/images/scene_00_paris_talks.webp"
            >
                <source src="/assets/images/video/paris_accords.mp4" type="video/mp4" />
                Trình duyệt không hỗ trợ video.
            </video>

            {/* Subtitles Layer */}
            <AnimatePresence>
                {isPlaying && currentSub && (
                    <motion.div 
                        key={currentSub}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-12 md:bottom-24 left-0 right-0 z-30 flex justify-center px-4"
                    >
                        <div className="bg-black/70 backdrop-blur-xl px-6 py-3 md:px-10 md:py-6 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl max-w-full sm:max-w-4xl">
                            <p className="text-white text-base sm:text-xl md:text-3xl font-medium leading-relaxed drop-shadow-lg text-center">
                                {currentSub}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isPlaying && (
                <div className="absolute top-10 right-10 z-30 flex gap-4">
                     <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
                    >
                        {isMuted ? "🔇" : "🔊"}
                    </button>
                    <button 
                        onClick={onComplete}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-all border border-white/10 font-bold"
                    >
                        Bỏ qua Prologue →
                    </button>
                </div>
            )}
        </div>
    );
};

export default IntroVideo;
