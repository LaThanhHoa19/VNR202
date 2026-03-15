// ============================================================
// Chiến dịch Hồ Chí Minh 1975 - Local Story Data
// Converted from backend data.sql — no server needed!
// ============================================================

export const STORY = {
  id: 1,
  title: 'Chiến dịch Hồ Chí Minh — Truyện tương tác học Triết học',
  description: 'Trải nghiệm tương tác giả tưởng dựa trên bối cảnh Chiến dịch Hồ Chí Minh 1975, mỗi lựa chọn liên kết với một khái niệm triết học để học sinh vừa chơi vừa hiểu lý luận.',
};

// Map of sceneId -> Scene object for O(1) lookup
export const SCENES = {
  1: {
    sceneId: 1,
    title: 'Họp Bộ Chỉ huy',
    content: 'Phòng họp tối, bàn bản đồ rộng. Bộ chỉ huy phân tích tình hình sau Hiệp định. Quyết định có thể mở chiến dịch ở một vùng trọng điểm hay tiếp tục củng cố lực lượng.',
    imageUrl: '/assets/images/scene_01.jpg',
    philosophyNote: 'Phép biện chứng duy vật: đánh giá hoàn cảnh khách quan trước khi hành động.',
    militaryStrength: 60, publicSupport: 50, logistics: 60, politicalLegitimacy: 55,
    isEnding: false,
    choices: [
      {
        id: 101, text: 'Phương án A: Tấn công mở rộng ngay — tận dụng thời cơ', nextSceneId: 2,
        philosophyExplain: 'Thể hiện \'nhạy bén với quy luật lịch sử\' — biện chứng lịch sử: nắm thời cơ để thay đổi vận mệnh.',
        consequenceText: 'Bộ chỉ huy quyết định hành động táo bạo, huy động mũi tiến công.',
        score: 2, militaryEffect: 10, publicEffect: -5, logisticsEffect: -10, politicalEffect: 5,
      },
      {
        id: 102, text: 'Phương án B: Hoãn lại, củng cố thêm lực lượng', nextSceneId: 3,
        philosophyExplain: 'Tôn trọng luận điểm: phải chuẩn bị về lực lượng và vật chất — phép biện chứng duy vật cho cân nhắc thực tiễn.',
        consequenceText: 'Quân đội dùng thêm thời gian để chuẩn bị trang bị và kế hoạch.',
        score: 0, militaryEffect: 5, publicEffect: 5, logisticsEffect: 15, politicalEffect: 0,
      },
    ],
  },
  2: {
    sceneId: 2,
    title: 'Bản đồ chiến lược',
    content: 'Các sỹ quan trải bản đồ chiến trường và vạch mũi tiến công. Mũi tấn công thật sự quyết đoán, nhưng rủi ro cao nếu thông tin không chính xác.',
    imageUrl: '/assets/images/scene_02.jpg',
    philosophyNote: 'Phân tích mối liên hệ vật chất: đánh giá tương quan lực lượng.',
    militaryStrength: 68, publicSupport: 47, logistics: 51, politicalLegitimacy: 58,
    isEnding: false,
    choices: [
      {
        id: 201, text: 'Chọn đường tiến công A (đánh thẳng vào trọng điểm)', nextSceneId: 4,
        philosophyExplain: 'Ứng dụng phân tích biện chứng: lựa chọn căn cứ vào năng lực tác động thực tế.',
        consequenceText: 'Quân tiến công theo tuyến chính, áp lực lên địch tăng.',
        score: 2, militaryEffect: 8, publicEffect: -2, logisticsEffect: -5, politicalEffect: 2,
      },
      {
        id: 202, text: 'Chọn đường tiến công B (dùng đánh lừa, vòng sang yếu điểm)', nextSceneId: 5,
        philosophyExplain: 'Chiến lược vận dụng mâu thuẫn biện chứng: chuyển đổi lực lượng bằng sự sáng tạo chiến thuật.',
        consequenceText: 'Quân chuyển hướng gây bất ngờ, nhưng mất thời gian.',
        score: 1, militaryEffect: 5, publicEffect: 2, logisticsEffect: 5, politicalEffect: 10,
      },
    ],
  },
  3: {
    sceneId: 3,
    title: 'Củng cố lực lượng',
    content: 'Đội quân củng cố hậu cần và huấn luyện. Một số chỉ huy lo ngại lỡ thời cơ lịch sử, một số muốn đảm bảo chắc thắng trước.',
    imageUrl: '/assets/images/scene_03.jpg',
    philosophyNote: 'Nguyên tắc thực tiễn: sức mạnh thực tế là cơ sở của thắng lợi.',
    militaryStrength: 63, publicSupport: 53, logistics: 72, politicalLegitimacy: 54,
    isEnding: false,
    choices: [
      {
        id: 301, text: 'Tiếp tục cố gắng chuẩn bị cho đến khi chắc chắn', nextSceneId: 5,
        philosophyExplain: 'Ưu tiên biện chứng giữa lý luận và thực tiễn: chuẩn bị tốt, giảm rủi ro.',
        consequenceText: 'Chuẩn bị thêm phương tiện và thông tin tình báo.',
        score: 0, militaryEffect: 5, publicEffect: 5, logisticsEffect: 15, politicalEffect: 0,
      },
      {
        id: 302, text: 'Tiến hành một cuộc đột phá cục bộ để thử nghiệm chiến thuật', nextSceneId: 4,
        philosophyExplain: 'Thực nghiệm lý luận: kiểm chứng chiến thuật trong thực tế.',
        consequenceText: 'Thử nghiệm gây áp lực, thu về thông tin quý giá.',
        score: 1, militaryEffect: 10, publicEffect: -5, logisticsEffect: -5, politicalEffect: 5,
      },
    ],
  },
  4: {
    sceneId: 4,
    title: 'Tây Nguyên bùng nổ',
    content: 'Quân ta tiến vào vùng chiến lược, thắng lợi mở ra cửa ngõ phía Bắc Sài Gòn. Tin thắng trận tạo đà cho các vùng khác.',
    imageUrl: '/assets/images/scene_04.jpg',
    philosophyNote: 'Ảnh hưởng qua lại giữa bộ phận và tổng thể — triết học lịch sử thể hiện bằng hiệu ứng lan truyền.',
    militaryStrength: 74, publicSupport: 58, logistics: 48, politicalLegitimacy: 62,
    isEnding: false,
    choices: [
      {
        id: 401, text: 'Tận dụng chiến thắng, mở chiến dịch lớn', nextSceneId: 7,
        philosophyExplain: 'Tư duy chiến lược theo phép biện chứng: lấy nhỏ thắng lớn, tạo lực đẩy tổng thể.',
        consequenceText: 'Chiến dịch mở rộng, nhiều nơi nổi dậy ủng hộ.',
        score: 2, militaryEffect: 15, publicEffect: 10, logisticsEffect: -10, politicalEffect: 10,
      },
      {
        id: 402, text: 'Tập trung giữ vùng vừa chiếm để củng cố', nextSceneId: 5,
        philosophyExplain: 'Tư duy lâu dài: duy trì thành quả là yếu tố của sự phát triển bền vững.',
        consequenceText: 'Nguồn lực được phân tán để trấn giữ vùng mới.',
        score: 0, militaryEffect: 5, publicEffect: 15, logisticsEffect: 10, politicalEffect: 5,
      },
    ],
  },
  5: {
    sceneId: 5,
    title: 'Hiệu ứng domino',
    content: 'Các thành phố nhỏ thất thủ, quân địch rối loạn. Tinh thần quần chúng và binh lính bị ảnh hưởng lớn—cả chính trị lẫn quân sự.',
    imageUrl: '/assets/images/scene_05.jpg',
    philosophyNote: 'Lý luận về lực lượng quần chúng: sức mạnh nhân dân là động lực lịch sử.',
    militaryStrength: 70, publicSupport: 62, logistics: 55, politicalLegitimacy: 65,
    isEnding: false,
    choices: [
      {
        id: 501, text: 'Kêu gọi quần chúng ủng hộ tại các vùng vừa giải phóng', nextSceneId: 6,
        philosophyExplain: 'Thực tiễn tuyến cơ sở: huy động quần chúng làm tăng sức mạnh chính trị và hậu cần.',
        consequenceText: 'Dân chúng đồng lòng, cung cấp hậu cần và tin tức.',
        score: 1, militaryEffect: 0, publicEffect: 20, logisticsEffect: 10, politicalEffect: 15,
      },
      {
        id: 502, text: 'Đẩy mạnh tấn công vào tuyến địch yếu', nextSceneId: 7,
        philosophyExplain: 'Tận dụng mâu thuẫn để làm suy yếu đối phương, theo logic biện chứng.',
        consequenceText: 'Áp lực gia tăng, địch bắt đầu rút lui.',
        score: 2, militaryEffect: 12, publicEffect: -5, logisticsEffect: -5, politicalEffect: 5,
      },
    ],
  },
  6: {
    sceneId: 6,
    title: 'Tiếp nhận và củng cố Huế',
    content: 'Quân vào thành phố lịch sử, dân chào đón. Cần quyết định xử lý hành chính và đảm bảo trật tự.',
    imageUrl: '/assets/images/scene_06.jpg',
    philosophyNote: 'Quan điểm lịch sử-cụ thể: chính sách dân sinh phải gắn với điều kiện địa phương.',
    militaryStrength: 68, publicSupport: 78, logistics: 62, politicalLegitimacy: 78,
    isEnding: false,
    choices: [
      {
        id: 601, text: 'Thiết lập trật tự nhanh, giao quyền cho chính quyền lâm thời', nextSceneId: 7,
        philosophyExplain: 'Thực hiện quan điểm phát triển: lồng ghép chính sách phù hợp để củng cố thành quả.',
        consequenceText: 'Trật tự nhanh chóng được khôi phục, hậu cần ổn định.',
        score: 1, militaryEffect: 0, publicEffect: 15, logisticsEffect: 5, politicalEffect: 20,
      },
      {
        id: 602, text: 'Giữ quân tại vị trí chiến đấu, ưu tiên an ninh', nextSceneId: 7,
        philosophyExplain: 'Ưu tiên an ninh là tôn trọng điều kiện tồn tại trong phân tích thực tiễn.',
        consequenceText: 'Đảm bảo an ninh nhưng chậm triển khai chính sách dân sinh.',
        score: 0, militaryEffect: 8, publicEffect: 0, logisticsEffect: 0, politicalEffect: 5,
      },
    ],
  },
  7: {
    sceneId: 7,
    title: 'Tập kết về Sài Gòn',
    content: 'Lực lượng chính hội tụ tiến về trung tâm — chuẩn bị tổng tiến công vào thủ phủ lớn nhất.',
    imageUrl: '/assets/images/scene_07.jpg',
    philosophyNote: 'Tư duy tổng hợp: phối hợp lực lượng, thời cơ và chiến lược để đạt mục tiêu lớn.',
    militaryStrength: 82, publicSupport: 70, logistics: 52, politicalLegitimacy: 75,
    isEnding: false,
    choices: [
      {
        id: 701, text: 'Tiến công đồng loạt toàn tuyến (tối đa hóa áp lực)', nextSceneId: 8,
        philosophyExplain: 'Nguyên tắc tổng công kích: kết hợp các yếu tố để tạo bước ngoặt lịch sử.',
        consequenceText: 'Các cánh quân đồng loạt tiến công vào thành phố.',
        score: 2, militaryEffect: 20, publicEffect: -10, logisticsEffect: -15, politicalEffect: 10,
      },
      {
        id: 702, text: 'Chia lực lượng tấn công từng mảng, tránh mạo hiểm quá lớn', nextSceneId: 8,
        philosophyExplain: 'Áp dụng nguyên tắc thận trọng: cân bằng giữa rủi ro và hiệu quả.',
        consequenceText: 'Tiến công theo giai đoạn, có kế hoạch dự phòng.',
        score: 1, militaryEffect: 10, publicEffect: 5, logisticsEffect: 5, politicalEffect: 5,
      },
    ],
  },
  8: {
    sceneId: 8,
    title: 'Tiến vào đô thị',
    content: 'Xe tăng và bộ binh tiến sâu vào đường phố, giao tranh diễn ra ở một số điểm then chốt.',
    imageUrl: '/assets/images/scene_08.jpg',
    philosophyNote: 'Mối quan hệ giữa lực lượng và chính trị: giải phóng cần kết hợp quân sự và chính trị.',
    militaryStrength: 88, publicSupport: 65, logistics: 42, politicalLegitimacy: 80,
    isEnding: false,
    choices: [
      {
        id: 801, text: 'Tập trung vào mục tiêu chính trị (chiếm trung tâm hành chính)', nextSceneId: 9,
        philosophyExplain: 'Chiến lược chính trị-milit: nhắm vào trung tâm khiến đối phương mất tinh thần.',
        consequenceText: 'Đội tiên phong xông vào các công sở quan trọng.',
        score: 2, militaryEffect: 5, publicEffect: 0, logisticsEffect: -5, politicalEffect: 25,
      },
      {
        id: 802, text: 'Dọn dẹp từng quận, ưu tiên an toàn dân sự', nextSceneId: 9,
        philosophyExplain: 'Quan điểm đạo đức cách mạng: bảo vệ dân là mục tiêu chính.',
        consequenceText: 'Hành quân thận trọng, giảm thương vong dân sự.',
        score: 1, militaryEffect: 0, publicEffect: 25, logisticsEffect: 5, politicalEffect: 15,
      },
    ],
  },
  9: {
    sceneId: 9,
    title: 'Dinh Độc Lập trước giờ G',
    content: 'Lực lượng áp sát cổng lớn. Một quyết định tối quan trọng: dùng lực lượng cơ giới đột phá hay thương lượng buộc đầu hàng?',
    imageUrl: '/assets/images/scene_09.jpg',
    philosophyNote: 'Đạo đức cách mạng và mục tiêu chiến lược: cân nhắc giữa sức mạnh và tính nhân văn.',
    militaryStrength: 90, publicSupport: 70, logistics: 38, politicalLegitimacy: 85,
    isEnding: false,
    choices: [
      {
        id: 901, text: 'Dùng lực lượng cơ giới đột phá cổng để kết thúc nhanh', nextSceneId: 10,
        philosophyExplain: 'Thể hiện quyết đoán: khi thời cơ chín muồi, hành động quyết liệt đem lại kết quả ngay.',
        consequenceText: 'Đội tiên phong đột phá, cổng bị xuyên phá.',
        score: 3, militaryEffect: 30, publicEffect: -5, logisticsEffect: -10, politicalEffect: 20,
      },
      {
        id: 902, text: 'Cố gắng thúc đẩy đầu hàng để tránh tàn phá', nextSceneId: 10,
        philosophyExplain: 'Ưu tiên giảm bạo lực: vận dụng lý luận nhân văn trong chiến tranh.',
        consequenceText: 'Đàm phán khiến nhiều đơn vị địch buông súng.',
        score: 1, militaryEffect: 5, publicEffect: 30, logisticsEffect: 0, politicalEffect: 15,
      },
    ],
  },
  10: {
    sceneId: 10,
    title: 'Cờ tung bay — Hậu quả và suy ngẫm',
    content: 'Lá cờ chiến thắng phấp phới. Người chơi nhận được tổng kết: điểm, phản ánh mối quan hệ giữa lựa chọn chiến lược và bài học triết học.',
    imageUrl: '/assets/images/scene_10.jpg',
    philosophyNote: 'Kết luận triết học: lịch sử là kết quả của lựa chọn, điều kiện khách quan và hoạt động chủ quan có mối quan hệ biện chứng.',
    militaryStrength: 100, publicSupport: 90, logistics: 50, politicalLegitimacy: 100,
    isEnding: true,
    choices: [],
  },
};

export const STARTING_SCENE_ID = 1;

export const INITIAL_STATS = {
  militaryStrength: 60,
  publicSupport: 50,
  logistics: 60,
  politicalLegitimacy: 55,
};
