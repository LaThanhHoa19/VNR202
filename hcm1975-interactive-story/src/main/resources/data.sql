-- ============================================================
-- Chiến dịch Hồ Chí Minh 1975 - Interactive Story Data
-- Based on user's provided JSON structure
-- ============================================================

-- STORY
INSERT INTO stories (id, title, description) VALUES (
    1,
    'Chiến dịch Hồ Chí Minh — Truyện tương tác học Triết học',
    'Trải nghiệm tương tác giả tưởng dựa trên bối cảnh Chiến dịch Hồ Chí Minh 1975, mỗi lựa chọn liên kết với một khái niệm triết học để học sinh vừa chơi vừa hiểu lý luận.'
);

-- CHAPTERS
INSERT INTO chapters (id, story_id, title, order_index) VALUES (1, 1, 'Hành trình giải phóng', 1);

-- SCENES & CHOICES

-- Scene 1: Họp Bộ Chỉ huy
INSERT INTO scenes (id, chapter_id, title, content, image_url, philosophy_note) VALUES (
    1, 1, 'Họp Bộ Chỉ huy',
    'Phòng họp tối, bàn bản đồ rộng. Bộ chỉ huy phân tích tình hình sau Hiệp định. Quyết định có thể mở chiến dịch ở một vùng trọng điểm hay tiếp tục củng cố lực lượng.',
    '/assets/images/scene_01.jpg',
    'Phép biện chứng duy vật: đánh giá hoàn cảnh khách quan trước khi hành động.'
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    101, 1, 'Phương án A: Tấn công mở rộng ngay — tận dụng thời cơ', 2,
    'Thể hiện ‘nhạy bén với quy luật lịch sử’ — biện chứng lịch sử: nắm thời cơ để thay đổi vận mệnh.',
    'Bộ chỉ huy quyết định hành động táo bạo, huy động mũi tiến công.', 2, 10, -5, -10, 5
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    102, 1, 'Phương án B: Hoãn lại, củng cố thêm lực lượng', 3,
    'Tôn trọng luận điểm: phải chuẩn bị về lực lượng và vật chất — phép biện chứng duy vật cho cân nhắc thực tiễn.',
    'Quân đội dùng thêm thời gian để chuẩn bị trang bị và kế hoạch.', 0, 5, 5, 15, 0
);

-- Scene 2: Bản đồ chiến lược
INSERT INTO scenes (id, chapter_id, title, content, image_url, philosophy_note) VALUES (
    2, 1, 'Bản đồ chiến lược',
    'Các sỹ quan trải bản đồ chiến trường và vạch mũi tiến công. Mũi tấn công thật sự quyết đoán, nhưng rủi ro cao nếu thông tin không chính xác.',
    '/assets/images/scene_02.jpg',
    'Phân tích mối liên hệ vật chất: đánh giá tương quan lực lượng.'
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    201, 2, 'Chọn đường tiến công A (đánh thẳng vào trọng điểm)', 4,
    'Ứng dụng phân tích biện chứng: lựa chọn căn cứ vào năng lực tác động thực tế.',
    'Quân tiến công theo tuyến chính, áp lực lên địch tăng.', 2, 8, -2, -5, 2
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    202, 2, 'Chọn đường tiến công B (dùng đánh lừa, vòng sang yếu điểm)', 5,
    'Chiến lược vận dụng mâu thuẫn biện chứng: chuyển đổi lực lượng bằng sự sáng tạo chiến thuật.',
    'Quân chuyển hướng gây bất ngờ, nhưng mất thời gian.', 1, 5, 2, 5, 10
);

-- Scene 3: Củng cố lực lượng
INSERT INTO scenes (id, chapter_id, title, content, image_url, philosophy_note) VALUES (
    3, 1, 'Củng cố lực lượng',
    'Đội quân củng cố hậu cần và huấn luyện. Một số chỉ huy lo ngại lỡ thời cơ lịch sử, một số muốn đảm bảo chắc thắng trước.',
    '/assets/images/scene_03.jpg',
    'Nguyên tắc thực tiễn: sức mạnh thực tế là cơ sở của thắng lợi.'
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    301, 3, 'Tiếp tục cố gắng chuẩn bị cho đến khi chắc chắn', 5,
    'Ưu tiên biện chứng giữa lý luận và thực tiễn: chuẩn bị tốt, giảm rủi ro.',
    'Chuẩn bị thêm phương tiện và thông tin tình báo.', 0, 5, 5, 15, 0
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    302, 3, 'Tiến hành một cuộc đột phá cục bộ để thử nghiệm chiến thuật', 4,
    'Thực nghiệm lý luận: kiểm chứng chiến thuật trong thực tế.',
    'Thử nghiệm gây áp lực, thu về thông tin quý giá.', 1, 10, -5, -5, 5
);

-- Scene 4: Tây Nguyên bùng nổ
INSERT INTO scenes (id, chapter_id, title, content, image_url, philosophy_note) VALUES (
    4, 1, 'Tây Nguyên bùng nổ',
    'Quân ta tiến vào vùng chiến lược, thắng lợi mở ra cửa ngõ phía Bắc Sài Gòn. Tin thắng trận tạo đà cho các vùng khác.',
    '/assets/images/scene_04.jpg',
    'Ảnh hưởng qua lại giữa bộ phận và tổng thể — triết học lịch sử thể hiện bằng hiệu ứng lan truyền.'
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    401, 4, 'Tận dụng chiến thắng, mở chiến dịch lớn', 7,
    'Tư duy chiến lược theo phép biện chứng: lấy nhỏ thắng lớn, tạo lực đẩy tổng thể.',
    'Chiến dịch mở rộng, nhiều nơi nổi dậy ủng hộ.', 2, 15, 10, -10, 10
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    402, 4, 'Tập trung giữ vùng vừa chiếm để củng cố', 5,
    'Tư duy lâu dài: duy trì thành quả là yếu tố của sự phát triển bền vững.',
    'Nguồn lực được phân tán để trấn giữ vùng mới.', 0, 5, 15, 10, 5
);

-- Scene 5: Hiệu ứng domino
INSERT INTO scenes (id, chapter_id, title, content, image_url, philosophy_note) VALUES (
    5, 1, 'Hiệu ứng domino',
    'Các thành phố nhỏ thất thủ, quân địch rối loạn. Tinh thần quần chúng và binh lính bị ảnh hưởng lớn—cả chính trị lẫn quân sự.',
    '/assets/images/scene_05.jpg',
    'Lý luận về lực lượng quần chúng: sức mạnh nhân dân là động lực lịch sử.'
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    501, 5, 'Kêu gọi quần chúng ủng hộ tại các vùng vừa giải phóng', 6,
    'Thực tiễn tuyến cơ sở: huy động quần chúng làm tăng sức mạnh chính trị và hậu cần.',
    'Dân chúng đồng lòng, cung cấp hậu cần và tin tức.', 1, 0, 20, 10, 15
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    502, 5, 'Đẩy mạnh tấn công vào tuyến địch yếu', 7,
    'Tận dụng mâu thuẫn để làm suy yếu đối phương, theo logic biện chứng.',
    'Áp lực gia tăng, địch bắt đầu rút lui.', 2, 12, -5, -5, 5
);

-- Scene 6: Tiếp nhận và củng cố Huế
INSERT INTO scenes (id, chapter_id, title, content, image_url, philosophy_note) VALUES (
    6, 1, 'Tiếp nhận và củng cố Huế',
    'Quân vào thành phố lịch sử, dân chào đón. Cần quyết định xử lý hành chính và đảm bảo trật tự.',
    '/assets/images/scene_06.jpg',
    'Quan điểm lịch sử-cụ thể: chính sách dân sinh phải gắn với điều kiện địa phương.'
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    601, 6, 'Thiết lập trật tự nhanh, giao quyền cho chính quyền lâm thời', 7,
    'Thực hiện quan điểm phát triển: lồng ghép chính sách phù hợp để củng cố thành quả.',
    'Trật tự nhanh chóng được khôi phục, hậu cần ổn định.', 1, 0, 15, 5, 20
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    602, 6, 'Giữ quân tại vị trí chiến đấu, ưu tiên an ninh', 7,
    'Ưu tiên an ninh là tôn trọng điều kiện tồn tại trong phân tích thực tiễn.',
    'Đảm bảo an ninh nhưng chậm triển khai chính sách dân sinh.', 0, 8, 0, 0, 5
);

-- Scene 7: Tập kết về Sài Gòn
INSERT INTO scenes (id, chapter_id, title, content, image_url, philosophy_note) VALUES (
    7, 1, 'Tập kết về Sài Gòn',
    'Lực lượng chính hội tụ tiến về trung tâm — chuẩn bị tổng tiến công vào thủ phủ lớn nhất.',
    '/assets/images/scene_07.jpg',
    'Tư duy tổng hợp: phối hợp lực lượng, thời cơ và chiến lược để đạt mục tiêu lớn.'
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    701, 7, 'Tiến công đồng loạt toàn tuyến (tối đa hóa áp lực)', 8,
    'Nguyên tắc tổng công kích: kết hợp các yếu tố để tạo bước ngoặt lịch sử.',
    'Các cánh quân đồng loạt tiến công vào thành phố.', 2, 20, -10, -15, 10
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    702, 7, 'Chia lực lượng tấn công từng mảng, tránh mạo hiểm quá lớn', 8,
    'Áp dụng nguyên tắc thận trọng: cân bằng giữa rủi ro và hiệu quả.',
    'Tiến công theo giai đoạn, có kế hoạch dự phòng.', 1, 10, 5, 5, 5
);

-- Scene 8: Tiến vào đô thị
INSERT INTO scenes (id, chapter_id, title, content, image_url, philosophy_note) VALUES (
    8, 1, 'Tiến vào đô thị',
    'Xe tăng và bộ binh tiến sâu vào đường phố, giao tranh diễn ra ở một số điểm then chốt.',
    '/assets/images/scene_08.jpg',
    'Mối quan hệ giữa lực lượng và chính trị: giải phóng cần kết hợp quân sự và chính trị.'
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    801, 8, 'Tập trung vào mục tiêu chính trị (chiếm trung tâm hành chính)', 9,
    'Chiến lược chính trị-milit: nhắm vào trung tâm khiến đối phương mất tinh thần.',
    'Đội tiên phong xông vào các công sở quan trọng.', 2, 5, 0, -5, 25
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    802, 8, 'Dọn dẹp từng quận, ưu tiên an toàn dân sự', 9,
    'Quan điểm đạo đức cách mạng: bảo vệ dân là mục tiêu chính.',
    'Hành quân thận trọng, giảm thương vong dân sự.', 1, 0, 25, 5, 15
);

-- Scene 9: Dinh Độc Lập trước giờ G
INSERT INTO scenes (id, chapter_id, title, content, image_url, philosophy_note) VALUES (
    9, 1, 'Dinh Độc Lập trước giờ G',
    'Lực lượng áp sát cổng lớn. Một quyết định tối quan trọng: dùng lực lượng cơ giới đột phá hay thương lượng buộc đầu hàng?',
    '/assets/images/scene_09.jpg',
    'Đạo đức cách mạng và mục tiêu chiến lược: cân nhắc giữa sức mạnh và tính nhân văn.'
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    901, 9, 'Dùng lực lượng cơ giới đột phá cổng để kết thúc nhanh', 10,
    'Thể hiện quyết đoán: khi thời cơ chín muồi, hành động quyết liệt đem lại kết quả ngay.',
    'Đội tiên phong đột phá, cổng bị xuyên phá.', 3, 30, -5, -10, 20
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    902, 9, 'Cố gắng thúc đẩy đầu hàng để tránh tàn phá', 10,
    'Ưu tiên giảm bạo lực: vận dụng lý luận nhân văn trong chiến tranh.',
    'Đàm phán khiến nhiều đơn vị địch buông súng.', 1, 5, 30, 0, 15
);

-- Scene 10: Cờ tung bay — Hậu quả và suy ngẫm
INSERT INTO scenes (id, chapter_id, title, content, image_url, philosophy_note) VALUES (
    10, 1, 'Cờ tung bay — Hậu quả và suy ngẫm',
    'Lá cờ chiến thắng phấp phới. Người chơi nhận được tổng kết: điểm, phản ánh mối quan hệ giữa lựa chọn chiến lược và bài học triết học.',
    '/assets/images/scene_10.jpg',
    'Kết luận triết học: lịch sử là kết quả của lựa chọn, điều kiện khách quan và hoạt động chủ quan có mối quan hệ biện chứng.'
);
INSERT INTO choices (id, scene_id, text, next_scene_id, philosophy_explain, consequence_text, score, military_effect, public_effect, logistics_effect, political_effect) VALUES (
    1001, 10, 'Kết thúc: Xem báo cáo học tập (tóm tắt tư tưởng triết học bạn đã học)', NULL,
    'Tổng kết các khái niệm triết học đã áp dụng trong trò chơi.',
    'Hiển thị báo cáo học tập, gợi ý bài đọc thêm.', 0, 0, 0, 0, 0
);
