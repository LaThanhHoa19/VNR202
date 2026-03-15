import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getScene, processChoice } from '../api';
import AudioController from '../services/AudioController';
import ScoreBoard from '../components/ScoreBoard';
import StoryPanel from '../components/StoryPanel';
import SceneImage from '../components/SceneImage';
import ChoiceButton from '../components/ChoiceButton';
import FeedbackModal from '../components/FeedbackModal';
import StatesBar from '../components/StatesBar';

export default function ScenePage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [scene, setScene] = useState(location.state?.scene || null);
  const [score, setScore] = useState(location.state?.score || parseInt(localStorage.getItem('score') || '0'));
  const [playerName] = useState(location.state?.playerName || localStorage.getItem('playerName') || 'Player');
  
  const [loading, setLoading] = useState(!scene);
  const [choiceLoading, setChoiceLoading] = useState(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [isMuted, setIsMuted] = useState(AudioController.isMuted);
  
  const [feedback, setFeedback] = useState(null); // { consequence, philosophy, nextScene }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  // Fetch scene if not passed via state and handle BGM
  useEffect(() => {
    if (!scene || scene.sceneId !== parseInt(id)) {
      setLoading(true);
      getScene(id)
        .then(res => {
          setScene(res.data);
          AudioController.playSceneBgm(res.data.sceneId);
        })
        .catch(() => setError('Không tải được cảnh này. Hãy kiểm tra kết nối server.'))
        .finally(() => setLoading(false));
    } else {
      AudioController.playSceneBgm(scene.sceneId);
    }
  }, [id, scene]);

  const handleChoice = async (choice) => {
    if (choiceLoading || isModalOpen) return;
    
    AudioController.playSfx('confirm');
    setSelectedChoiceId(choice.id);
    setChoiceLoading(true);

    try {
      const res = await processChoice(playerName, choice.id);
      const nextSceneResponse = res.data;
      
      // The API now returns consequenceText and feedbackPhilosophy in SceneResponse
      setFeedback({
        consequence: nextSceneResponse.consequenceText || 'Hành động đã được thực hiện.',
        philosophy: nextSceneResponse.feedbackPhilosophy || 'Không có giải thích triết học.',
        nextScene: nextSceneResponse,
        newScore: nextSceneResponse.updatedScore
      });
      
      setIsModalOpen(true);
    } catch (err) {
      setError('Lỗi khi xử lý lựa chọn. Vui lòng thử lại.');
      setSelectedChoiceId(null);
    } finally {
      setChoiceLoading(false);
    }
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    const { nextScene, newScore } = feedback;
    
    setScore(newScore);
    localStorage.setItem('score', newScore.toString());

    if (nextScene.isEnding || !nextScene.choices || nextScene.choices.length === 0) {
      navigate('/result', {
        state: { scene: nextScene, score: newScore, playerName }
      });
    } else {
      setSelectedChoiceId(null);
      setFeedback(null);
      // Pass the nextScene object in state to allow immediate render without loading flicker
      navigate(`/scene/${nextScene.sceneId}`, { 
        replace: true,
        state: { scene: nextScene, score: newScore, playerName }
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 font-medium">Đang chuẩn bị chiến trường...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-card p-8 text-center max-w-md border-red-500/30">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-red-400 mb-6 font-medium">{error}</p>
        <button onClick={() => navigate('/')} className="btn-primary w-full">← Quay lại Trang chủ</button>
      </div>
    </div>
  );

  if (!scene) return null;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col pt-2 sm:pt-4">
      {/* Background Layer: Full Screen Image with Cinematic Blur */}
      {scene.imageUrl && (
        <div className="fixed inset-0 z-0">
          <motion.div
            key={scene.imageUrl}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${scene.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </motion.div>
        </div>
      )}

      {/* Main Content: Cinematic Layout */}
      <div className="relative z-10 flex flex-col h-screen max-w-6xl mx-auto w-full px-3 sm:px-6">
        
        {/* Header Overlay */}
        <div className="flex items-center justify-between py-3 sm:py-6">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-all backdrop-blur-md text-sm sm:text-base"
            title="Thoát"
          >
            ✕
          </button>
          
          <div className="flex flex-col items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-primary-600/20 border border-primary-500/30 backdrop-blur-md">
               <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary-400">Tiến độ chiến dịch</span>
            </div>
            <div className="w-32 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((scene.sceneId / 10) * 100, 100)}%` }}
                    className="h-full bg-primary-500 shadow-[0_0_10px_rgba(212,131,29,0.8)]"
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const newMute = !isMuted;
                AudioController.setMute(newMute);
                setIsMuted(newMute);
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-all backdrop-blur-md text-sm sm:text-base"
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
            <div className="hidden md:block">
                <ScoreBoard score={score} playerName={playerName} />
            </div>
          </div>
        </div>

        {/* Top Indicators: States */}
        <div className="mt-4">
            <StatesBar states={{
              militaryStrength: scene.militaryStrength,
              publicSupport: scene.publicSupport,
              logistics: scene.logistics,
              politicalLegitimacy: scene.politicalLegitimacy
            }} />
        </div>

        <div className="flex-1" />

        {/* Visual Novel Style Dialogue Box */}
        <div className="pb-4 sm:pb-10 space-y-4 sm:space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            key={`dialogue-${scene.sceneId}`}
            className="glass-card p-0 overflow-hidden border-white/10 bg-dark-900/80 backdrop-blur-2xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Scene Media focus area */}
              <div className="w-full md:w-1/3 h-36 sm:h-48 md:h-auto overflow-hidden relative border-b md:border-b-0 md:border-r border-white/10">
                <img 
                    src={scene.imageUrl} 
                    alt={scene.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <span className="score-badge">Cảnh #{scene.sceneId}</span>
                </div>
              </div>

              {/* Text & choices area */}
              <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4 tracking-normal leading-tight">
                    {scene.title}
                </h2>
                <div className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-8">
                    {scene.content}
                </div>

                {scene.philosophyNote && (
                  <div className="bg-primary-900/20 border-l-2 border-primary-500/50 p-2 sm:p-4 rounded-r-xl mb-4 sm:mb-8">
                    <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary-400 mb-1">Tư duy chiến lược</p>
                    <p className="text-xs sm:text-sm italic text-gray-400">{scene.philosophyNote}</p>
                  </div>
                )}
                
                {/* Choices */}
                {scene.choices && scene.choices.length > 0 && (
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {scene.choices.map((choice, idx) => (
                      <ChoiceButton
                        key={choice.id}
                        index={idx}
                        choice={choice}
                        onClick={handleChoice}
                        description={choice.text}
                        isSelected={selectedChoiceId === choice.id}
                        disabled={choiceLoading}
                      />
                    ))}
                  </div>
                )}

                {(!scene.choices || scene.choices.length === 0) && (
                    <button
                        onClick={() => navigate('/result', { state: { scene, score, playerName } })}
                        className="btn-primary w-full text-center"
                    >
                        Tiến tới Tổng kết Chiến dịch 🏁
                    </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        consequence={feedback?.consequence}
        philosophy={feedback?.philosophy}
        onContinue={handleContinue}
      />

      {/* Error Toast */}
      {error && (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-red-600/90 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold shadow-2xl border border-red-500/50"
        >
            ⚠️ {error}
        </motion.div>
      )}
    </div>
  );
}
