import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { startGame, hasProgress, resumeGame } from '../api';
import AudioController from '../services/AudioController';
import IntroVideo from '../components/IntroVideo';
import HistoricalTimeline from '../components/HistoricalTimeline';

export default function HomePage() {
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showIntro, setShowIntro] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [isMuted, setIsMuted] = useState(AudioController.isMuted);
  const [pendingScene, setPendingScene] = useState(null);
  const navigate = useNavigate();

  // Start BGM on mount (will only play if browser allows or user interacts)
  React.useEffect(() => {
    AudioController.playSceneBgm(0); // Use 0 or a specific ID for home
  }, []);

  const handleStart = async () => {
    if (!playerName.trim()) {
      setError('Vui lòng nhập tên của bạn!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const existsRes = await hasProgress(playerName.trim());
      let sceneRes;
      if (existsRes.data?.exists) {
        const resume = window.confirm(
          `Chào mừng trở lại, ${playerName}! Bạn muốn tiếp tục trò chơi cũ hay bắt đầu lại?`
          + '\n\nOK = Tiếp tục | Cancel = Bắt đầu lại'
        );
        if (resume) {
          sceneRes = await resumeGame(playerName.trim());
        } else {
          sceneRes = await startGame(playerName.trim());
        }
      } else {
        sceneRes = await startGame(playerName.trim());
      }
      
      localStorage.setItem('playerName', playerName.trim());
      localStorage.setItem('score', String(sceneRes.data?.updatedScore ?? 0));
      
      setPendingScene(sceneRes.data);
      setShowIntro(true); // Start intro
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleIntroComplete = () => {
    if (pendingScene) {
      navigate(`/scene/${pendingScene.sceneId}`, {
        state: { scene: pendingScene, playerName: playerName.trim(), score: 0, history: [] }
      });
    }
  };

  if (showIntro) {
    return <IntroVideo onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Cinematic Background: Floating Embers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110%', x: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ 
                y: '-10%', 
                opacity: [0, 0.4, 0],
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
            }}
            transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 20
            }}
            className="absolute rounded-full bg-primary-500 blur-[1px]"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <div className="max-w-3xl w-full text-center z-20 px-2">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6 shadow-2xl"
        >
          <span className="text-primary-500 animate-pulse">⚓</span>
          <span className="text-gray-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Trải nghiệm Triết học & Lịch sử</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-8xl font-black mb-4 md:mb-6 leading-none tracking-tighter"
        >
          <span className="text-white drop-shadow-2xl">CHIẾN DỊCH</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary-400 via-primary-600 to-primary-900 drop-shadow-sm">
            HỒ CHÍ MINH 1975
          </span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-gray-400 text-base sm:text-xl mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto font-light px-2"
        >
          Nhập vai chỉ huy, đưa ra những quyết định chiến lược xoay chuyển vận mệnh dân tộc thông qua lăng kính biện chứng duy vật.
        </motion.p>

        {/* Stats Grid */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 md:mb-12"
        >
          {[
            { icon: '📜', label: '3 Chương', sub: 'Hành trình lịch sử' },
            { icon: '🎖️', label: '10 Cảnh', sub: 'Nút thắt chiến lược' },
            { icon: '⚖️', label: 'Triết học', sub: 'Tư duy Mác-Lênin' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-3 sm:p-6 border-white/5 hover:border-primary-500/30 group">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-3 group-hover:scale-125 transition-transform duration-500">{s.icon}</div>
              <div className="text-white text-sm sm:text-xl font-bold mb-0.5 sm:mb-1 tracking-wide leading-tight">{s.label}</div>
              <div className="text-gray-500 text-[8px] sm:text-[10px] font-black uppercase tracking-widest hidden sm:block">{s.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Input & Button */}
        <div className="glass-card p-5 sm:p-8 text-left">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Tên của bạn
          </label>
          <input
            id="player-name-input"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="Nhập tên chiến sĩ..."
            className="w-full bg-dark-900 border border-dark-500 hover:border-primary-700 focus:border-primary-500 
                       text-white placeholder-gray-600 rounded-xl px-4 py-3 mb-4 
                       outline-none transition-colors duration-200"
          />
          {error && (
            <p className="text-red-400 text-sm mb-4 flex items-center gap-2">
              <span>⚠️</span> {error}
            </p>
          )}
          <button
            id="start-game-btn"
            onClick={handleStart}
            disabled={loading}
            className="btn-primary w-full text-center justify-center flex items-center gap-2 text-lg"
          >
            {loading ? (
              <><span className="animate-spin">⟳</span> Đang kết nối...</>
            ) : (
              <><span>🚀</span> Bắt đầu Chiến dịch</>
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:mt-8">
          <button
            onClick={() => navigate('/')}
            className="btn-primary flex-1 text-base sm:text-lg py-4 sm:py-5"
          >
            🔄 Thực hiện lại Chiến dịch
          </button>
          <button
            onClick={() => setShowTimeline(true)}
            className="flex-1 flex items-center justify-center px-4 sm:px-8 py-4 sm:py-5 rounded-xl border border-primary-500/30 text-primary-400 
                       hover:border-primary-500 hover:text-white transition-all bg-primary-500/5 backdrop-blur-md text-base sm:text-lg"
          >
            📜 Dòng thời gian Lịch sử
          </button>
        </div>

        <AnimatePresence>
          {showTimeline && <HistoricalTimeline onClose={() => setShowTimeline(false)} />}
        </AnimatePresence>
      </div>

      {/* Global Background Video - Optimized for Mobile */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
            key="bg-video"
            autoPlay 
            loop 
            muted 
            playsInline
            poster="/assets/images/background.jpg"
            src="/assets/images/video/hanoi_vivu.mp4"
            className="w-full h-full object-cover scale-105"
            style={{ filter: 'blur(8px) brightness(0.5)' }}
            onCanPlayThrough={(e) => e.target.play()}
        >
            Trình duyệt của bạn không hỗ trợ video nền.
        </video>
        {/* Cinematic overlays for depth and legibility */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Mute toggle for background video */}
      <div className="fixed bottom-6 right-6 z-20">
          <button
              onClick={() => {
                const newMute = !isMuted;
                AudioController.setMute(newMute);
                setIsMuted(newMute);
              }}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white flex items-center justify-center transition-all backdrop-blur-md"
              title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
              {isMuted ? "🔇" : "🔊"}
          </button>
      </div>
    </div>
  );
}
