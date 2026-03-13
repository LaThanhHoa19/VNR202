import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatesBar from '../components/StatesBar';

const getGrade = (score) => {
  if (score >= 20) return { label: 'Xuất sắc', icon: '🏆', color: 'text-yellow-400', msg: 'Bạn là nhà chiến lược xuất sắc với tư duy biện chứng hoàn hảo!' };
  if (score >= 10) return { label: 'Khá tốt', icon: '🥈', color: 'text-gray-300', msg: 'Bạn có hiểu biết tốt về triết học Mác-Lênin và lịch sử.' };
  if (score >= 5) return { label: 'Trung bình', icon: '🥉', color: 'text-orange-400', msg: 'Hãy học thêm về biện chứng duy vật để đưa ra quyết định tốt hơn.' };
  return { label: 'Cần cố gắng', icon: '📚', color: 'text-red-400', msg: 'Tìm hiểu thêm về triết học Mác-Lênin và thử lại nhé!' };
};

const getBadge = (scene) => {
  if (!scene) return null;
  const states = [
    { name: 'Chiến lược gia Quyết đoán', val: scene.militaryStrength, icon: '⚔️' },
    { name: 'Lãnh đạo Nhân văn', val: scene.publicSupport, icon: '🤝' },
    { name: 'Bậc thầy Hậu cần', val: scene.logistics, icon: '📦' },
    { name: 'Chính trị gia Bản lĩnh', val: scene.politicalLegitimacy, icon: '⚖️' }
  ];
  const max = states.reduce((prev, current) => (prev.val > current.val) ? prev : current);
  if (max.val < 60) return null;
  return max;
};

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, playerName = 'Player', history = [], scene } = location.state || {};
  const grade = getGrade(score);
  const badge = getBadge(scene);


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-black overflow-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110%', x: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ 
                y: '-10%', 
                opacity: [0, 0.3, 0],
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
            }}
            transition={{ 
                duration: Math.random() * 15 + 15, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
            }}
            className="absolute rounded-full bg-primary-600 blur-[2px]"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="max-w-3xl w-full z-10 py-12">
        {/* Header Celebration */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
        >
          <div className="text-8xl mb-6 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">{grade.icon}</div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-normal">
            CHIẾN DỊCH HOÀN THÀNH
          </h1>
          <p className="text-primary-400/80 italic text-xl">Dành cho chiến sĩ {playerName}</p>
        </motion.div>

        {/* Score & Badge Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Score card */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-10 text-center flex flex-col items-center justify-center border-white/5"
            >
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Tổng điểm tích lũy</div>
                <div className={`text-8xl font-black mb-4 ${grade.color} drop-shadow-2xl`}>{score}</div>
                <div className={`px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${grade.color} border-current bg-current/5`}>
                    {grade.label}
                </div>
            </motion.div>

            {/* Badge card */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-10 flex flex-col items-center justify-center border-amber-500/10 bg-amber-500/5 relative overflow-hidden"
            >
                {badge ? (
                    <>
                        <div className="text-7xl mb-4 z-10">{badge.icon}</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/80 mb-2 z-10">Danh hiệu đạt được</div>
                        <h3 className="text-white text-2xl font-history font-bold text-center z-10 leading-tight">
                            {badge.name}
                        </h3>
                        <div className="absolute -right-6 -bottom-6 text-9xl opacity-[0.03] rotate-12">{badge.icon}</div>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="text-6xl mb-4 opacity-20">🎖️</div>
                        <p className="text-gray-500 text-sm font-medium">Hãy đưa ra những lựa chọn<br/>quyết đoán hơn để nhận danh hiệu.</p>
                    </div>
                )}
            </motion.div>
        </div>

        {/* Story History */}
        {scene && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-center">
              — Thế trận cuối cùng —
            </h3>
            <StatesBar states={{
              militaryStrength: scene.militaryStrength,
              publicSupport: scene.publicSupport,
              logistics: scene.logistics,
              politicalLegitimacy: scene.politicalLegitimacy
            }} />
          </motion.div>
        )}

        {/* Philosophy Summary */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="philosophy-box mb-12 p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary-500">🎓</span>
            <span className="text-white font-history font-bold text-xl tracking-wide">Bài học lịch sử & Triết học</span>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed font-light italic">
            Chiến dịch Hồ Chí Minh 1975 là minh chứng sống động cho quy luật mâu thuẫn và phủ định biện chứng. 
            Thắng lợi này khẳng định thực tiễn là tiêu chuẩn của chân lý, và sự nhạy bén với thời cơ lịch sử chính là sự vận dụng hoàn hảo của tư duy biện chứng duy vật.
          </p>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="btn-primary flex-1 text-lg py-5"
          >
            🔄 Thực hiện lại Chiến dịch
          </button>
        </div>
      </div>
    </div>
  );
}
