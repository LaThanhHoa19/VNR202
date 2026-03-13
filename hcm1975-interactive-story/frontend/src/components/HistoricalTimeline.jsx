import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timelineData = [
    {
        year: '1968',
        title: 'Tổng tiến công và nổi dậy Tết Mậu Thân',
        description: 'Cuộc tổng tiến công đồng loạt của lực lượng cách mạng trên khắp miền Nam vào dịp Tết năm 1968. Sự kiện này tạo cú sốc lớn về chính trị và tâm lý, làm thay đổi cục diện chiến tranh, buộc Mỹ phải xem xét lại chiến lược và mở đường cho các cuộc đàm phán hòa bình.',
        icon: '🎆',
        philosophy: 'Mâu thuẫn và đấu tranh của các mặt đối lập. Khi mâu thuẫn giữa các lực lượng xã hội phát triển đến đỉnh điểm, nó sẽ thúc đẩy sự thay đổi trong cục diện lịch sử.'
    },
    {
        year: '1973',
        title: 'Hiệp định Paris',
        description: 'Sau quá trình đàm phán kéo dài, Hiệp định Paris được ký kết năm 1973 nhằm chấm dứt chiến tranh và lập lại hòa bình ở Việt Nam. Theo hiệp định, Mỹ rút toàn bộ quân đội khỏi miền Nam, tạo điều kiện thuận lợi cho sự thay đổi tương quan lực lượng.',
        icon: '✍️',
        philosophy: 'Điều kiện khách quan và chủ quan trong cách mạng. Việc nắm bắt đúng thời cơ lịch sử và tận dụng điều kiện khách quan là yếu tố quan trọng để tạo nên bước ngoặt trong tiến trình phát triển.'
    },
    {
        year: '1975',
        title: 'Chiến dịch Tây Nguyên',
        description: 'Chiến dịch mở màn của cuộc Tổng tiến công mùa Xuân 1975, bắt đầu bằng đòn đánh bất ngờ vào Buôn Ma Thuột. Chiến thắng này làm tan rã hệ thống phòng thủ của đối phương tại Tây Nguyên và tạo ra sự chuyển biến nhanh chóng của cục diện chiến trường.',
        icon: '⛰️',
        philosophy: 'Quy luật chuyển hóa từ lượng sang chất. Những tích lũy về lực lượng, chiến lược và điều kiện trong thời gian dài đã dẫn đến bước chuyển mang tính đột phá.'
    },
    {
        year: '1975',
        title: 'Chiến dịch Huế – Đà Nẵng',
        description: 'Sau thắng lợi ở Tây Nguyên, các lực lượng cách mạng nhanh chóng tiến công và giải phóng Huế và Đà Nẵng. Sự sụp đổ của hệ thống phòng thủ lớn nhất miền Trung đã mở đường cho cuộc tiến công quyết định vào Sài Gòn.',
        icon: '🏯',
        philosophy: 'Sự phát triển theo bước nhảy vọt. Khi các điều kiện tích lũy đạt đến điểm tới hạn, sự phát triển có thể diễn ra nhanh chóng và tạo ra bước ngoặt lớn.'
    },
    {
        year: '1975',
        title: 'Chiến dịch Hồ Chí Minh',
        description: 'Chiến dịch quân sự cuối cùng của cuộc kháng chiến chống Mỹ, diễn ra vào cuối tháng 4 năm 1975. Ngày 30/4/1975, Sài Gòn được giải phóng, kết thúc chiến tranh và mở ra thời kỳ thống nhất đất nước.',
        icon: '⭐',
        philosophy: 'Thực tiễn là tiêu chuẩn của chân lý. Thắng lợi của cuộc đấu tranh giải phóng dân tộc khẳng định vai trò của thực tiễn trong việc kiểm nghiệm và khẳng định giá trị của tư tưởng cách mạng.'
    }
];

const HistoricalTimeline = ({ onClose }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex flex-col p-8 md:p-16 overflow-y-auto"
        >
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-12">
                    <motion.h2 
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="font-history text-5xl md:text-7xl text-white tracking-tighter"
                    >
                        <span className="text-primary-500">Dòng thời gian</span> Lịch sử
                    </motion.h2>
                    <button 
                        onClick={onClose}
                        className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-500 transition-all font-bold text-2xl shadow-xl hover:scale-110 active:scale-95"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1">
                    {/* Left: Interactive List */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {timelineData.map((item, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`
                                    relative p-6 rounded-3xl border text-left transition-all duration-700 overflow-hidden group
                                    ${activeIndex === index 
                                        ? 'bg-primary-600/30 border-primary-500/50 shadow-[0_0_40px_rgba(212,131,29,0.2)]' 
                                        : 'bg-white/5 border-white/5 hover:border-white/20 opacity-50 hover:opacity-100'}
                                `}
                                whileHover={{ x: 15 }}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: index === activeIndex ? 1 : 0.6 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`
                                        w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500
                                        ${activeIndex === index ? 'bg-primary-500/20 scale-110' : 'bg-white/5 group-hover:scale-110'}
                                    `}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-[0.4em] text-primary-400 mb-1">{item.year}</div>
                                        <div className="text-white font-history text-lg font-bold group-hover:text-primary-300 transition-colors uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                            {item.title}
                                        </div>
                                    </div>
                                </div>
                                {activeIndex === index && (
                                    <motion.div 
                                        layoutId="timeline-glow"
                                        className="absolute inset-0 bg-primary-500/5 pointer-events-none"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Right: Detailed Content Box */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 1.02, x: -20 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="glass-card h-full p-12 flex flex-col relative overflow-hidden border-white/10"
                                style={{ boxShadow: '0 20px 80px -20px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)' }}
                            >
                                {/* Background Watermark Icon */}
                                <div className="absolute -top-10 -right-10 text-[20rem] opacity-[0.03] select-none pointer-events-none grayscale">
                                    {timelineData[activeIndex].icon}
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-6 mb-10">
                                        <div className="text-8xl filter drop-shadow-[0_10px_20px_rgba(212,131,29,0.3)]">{timelineData[activeIndex].icon}</div>
                                        <div>
                                            <div className="text-3xl text-primary-500 font-black tracking-widest mb-2 italic">
                                                {timelineData[activeIndex].year}
                                            </div>
                                            <h3 className="text-4xl md:text-5xl text-white font-bold leading-[1.1] uppercase tracking-normal">
                                                {timelineData[activeIndex].title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-transparent mb-10" />

                                    <p className="text-gray-300 text-2xl leading-relaxed mb-auto font-light">
                                        {timelineData[activeIndex].description}
                                    </p>
                                    
                                    <motion.div 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="mt-12 bg-gradient-to-br from-primary-900/40 to-dark-900/80 p-10 rounded-[2.5rem] border border-primary-500/20 shadow-inner relative"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-xl text-white shadow-lg shadow-primary-500/30">🎓</div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-400">Góc nhìn Triết học Biện chứng</span>
                                        </div>
                                        <p className="text-white text-xl font-bold leading-relaxed italic">
                                            "{timelineData[activeIndex].philosophy}"
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HistoricalTimeline;
