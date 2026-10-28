-- ========================================================================
-- Supabase Seed Data: Memory & Challenge Game
-- Pre-populates images and associated questions (Question & Challenge types)
-- ========================================================================

-- Clear existing data
TRUNCATE TABLE reward_claims, session_answers, game_sessions, questions, images CASCADE;

-- EASY IMAGE 1: Cozy Bakery Counter
INSERT INTO images (id, title, image_url, difficulty, description) VALUES
('e1111111-1111-1111-1111-111111111111', 
 'Cozy Artisanal Bakery', 
 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80', 
 'Easy', 
 'A warm morning bakery display with golden croissants, baguettes, and fresh pastries on wooden trays.');

-- Questions for Easy Image 1
INSERT INTO questions (image_id, question_text, question_type, options, correct_answer, challenge_criteria) VALUES
('e1111111-1111-1111-1111-111111111111', 
 'What type of golden pastry is prominently displayed across the front wooden tray?', 
 'Question', 
 '["Croissants", "Chocolate Donuts", "Blueberry Muffins", "Cinnamon Rolls"]'::jsonb, 
 'Croissants', 
 NULL),

('e1111111-1111-1111-1111-111111111111', 
 'What material are the display trays and shelving primarily made of?', 
 'Question', 
 '["Natural Rustic Wood", "Stainless Steel", "Black Marble", "Clear Acrylic"]'::jsonb, 
 'Natural Rustic Wood', 
 NULL),

('e1111111-1111-1111-1111-111111111111', 
 'Staff Challenge: Recreate the French baker chef pose for 5 seconds!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'Player must do a dramatic chef kiss / proud baker stance with hands gesturing delicious pastry.'),

('e1111111-1111-1111-1111-111111111111', 
 'What was the overall color tone and lighting ambiance of the bakery scene?', 
 'Question', 
 '["Warm golden-brown morning glow", "Cool fluorescent blue", "Neon purple nightlife", "Dark grayscale shadow"]'::jsonb, 
 'Warm golden-brown morning glow', 
 NULL),

('e1111111-1111-1111-1111-111111111111', 
 'Are the long French baguettes arranged vertically in baskets or laying flat?', 
 'Question', 
 '["Standing upright in baskets", "Stacked horizontally flat", "Hanging from overhead hooks", "Cut into round slices"]'::jsonb, 
 'Standing upright in baskets', 
 NULL),

('e1111111-1111-1111-1111-111111111111', 
 'Staff Challenge: Name 3 key ingredients in classic French bread within 10 seconds.', 
 'Challenge', 
 NULL, 
 'PASS', 
 'Player must correctly name at least 3 of: Flour, Water, Yeast, Salt, Butter within 10 seconds.'),

('e1111111-1111-1111-1111-111111111111', 
 'Did you spot any powdered sugar dusting on any of the pastries in the center?', 
 'Question', 
 '["Yes, finely dusted on the top pastries", "No, everything was completely glazed", "No, only plain savory bread", "No sugar visible anywhere"]'::jsonb, 
 'Yes, finely dusted on the top pastries', 
 NULL);


-- MEDIUM IMAGE 1: ร้านหนังสือ
INSERT INTO images (id, title, image_url, difficulty, description) VALUES
('b1111111-1111-1111-1111-111111111111', 
 'ร้านหนังสือ', 
 'https://ljaokxwsnbtjneirylff.supabase.co/storage/v1/object/public/game-images/M_Q1.png', 
 'Medium', 
 'ภาพบรรยากาศหน้าร้านหนังสือที่มีผู้หญิงนั่งอ่านหนังสือและสุนัข');

INSERT INTO questions (image_id, question_text, question_type, options, correct_answer, challenge_criteria) VALUES
('b1111111-1111-1111-1111-111111111111', 
 'ร้านในรูปคือร้านอะไร', 
 'Question', 
 '["ร้านเบเกอรี่", "ร้านรองเท้า", "ร้านหนังสือ", "ร้านเสื้อผ้า"]'::jsonb, 
 'ร้านหนังสือ', 
 NULL),

('b1111111-1111-1111-1111-111111111111', 
 'ผู้หญิงในรูปใส่ชุดสีอะไร', 
 'Question', 
 '["สีแดง", "สีม่วง", "สีน้ำตาล", "สีเขียว"]'::jsonb, 
 'สีม่วง', 
 NULL),

('b1111111-1111-1111-1111-111111111111', 
 'สัตว์ในรูปคือตัวอะไร', 
 'Question', 
 '["แมว", "นก", "สุนัข", "ผีเสื้อ"]'::jsonb, 
 'สุนัข', 
 NULL),

('b1111111-1111-1111-1111-111111111111', 
 'รถเข็นหน้าร้านใส่อะไร', 
 'Question', 
 '["ดอกไม้", "หนังสือ", "ไม่มีอะไร", "ขนมปัง"]'::jsonb, 
 'หนังสือ', 
 NULL),

('b1111111-1111-1111-1111-111111111111', 
 'มีคนทั้งหมดกี่คน', 
 'Question', 
 '["2 คน", "1 คน", "3 คน", "5 คน"]'::jsonb, 
 '2 คน', 
 NULL),

('b1111111-1111-1111-1111-111111111111', 
 'ดอกไม้ในกระถางสีอะไร', 
 'Question', 
 '["ฟ้า", "เหลือง", "แดง", "ชมพู"]'::jsonb, 
 'ชมพู', 
 NULL),

('b1111111-1111-1111-1111-111111111111', 
 'ผู้หญิงในรูปกำลังทำอะไร', 
 'Question', 
 '["อ่านหนังสือ", "เล่นกับสัตว์", "เข็นรถเข็น", "รดน้ำดอกไม้"]'::jsonb, 
 'อ่านหนังสือ', 
 NULL),

('b1111111-1111-1111-1111-111111111111', 
 'ภารกิจ Staff: บอกชื่อหนังสือหรือวรรณกรรมที่ชอบ 3 เล่ม ภายใน 10 วินาที!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นต้องบอกชื่อหนังสือหรือการ์ตูนที่รู้จักครบ 3 เล่มภายในเวลา 10 วินาที'),

('b1111111-1111-1111-1111-111111111111', 
 'ภารกิจ Staff: ทำท่าเปิดอ่านหนังสือแล้วทำสีหน้าประหลาดใจค้างไว้ 5 วินาที!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นต้องทำท่าเปิดหนังสือและทำตาโตอ้าปากค้างเป็นเวลา 5 วินาที'),

('b1111111-1111-1111-1111-111111111111', 
 'ภารกิจ Staff: เลียนเสียงเห่าของสุนัข 3 ครั้งติดต่อกัน!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นต้องส่งเสียงเห่า โฮ่งๆๆ ให้ชัดเจน 3 ครั้ง');


-- MEDIUM IMAGE 2: ลานสกีในฤดูหนาว
INSERT INTO images (id, title, image_url, difficulty, description) VALUES
('b2222222-2222-2222-2222-222222222222', 
 'ลานสกีในฤดูหนาว', 
 'https://ljaokxwsnbtjneirylff.supabase.co/storage/v1/object/public/game-images/M_Q2.png', 
 'Medium', 
 'ภาพทิวทัศน์หิมะและผู้คนกำลังเล่นสกี');

INSERT INTO questions (image_id, question_text, question_type, options, correct_answer, challenge_criteria) VALUES
('b2222222-2222-2222-2222-222222222222', 
 'ฤดูในรูปตอนนี้คือฤดูอะไร', 
 'Question', 
 '["ฤดูร้อน", "ฤดูใบไม้ผลิ", "ฤดูฝน", "ฤดูหนาว"]'::jsonb, 
 'ฤดูหนาว', 
 NULL),

('b2222222-2222-2222-2222-222222222222', 
 'มีคนทั้งหมดกี่คนในรูป', 
 'Question', 
 '["4 คน", "2 คน", "6 คน", "3 คน"]'::jsonb, 
 '4 คน', 
 NULL),

('b2222222-2222-2222-2222-222222222222', 
 'คนในรูปกำลังทำอะไร', 
 'Question', 
 '["ปั้นตุ๊กตาหิมะ", "เล่นสกี", "ตกปลา", "นั่งคุยกัน"]'::jsonb, 
 'เล่นสกี', 
 NULL),

('b2222222-2222-2222-2222-222222222222', 
 'คนที่อยู่หน้าสุดใส่หมวกสีอะไร', 
 'Question', 
 '["ฟ้า", "แดง", "เขียว", "ม่วง"]'::jsonb, 
 'ม่วง', 
 NULL),

('b2222222-2222-2222-2222-222222222222', 
 'มีคนใส่หมวกทั้งหมดกี่คน', 
 'Question', 
 '["3 คน", "1 คน", "4 คน", "2 คน"]'::jsonb, 
 '3 คน', 
 NULL),

('b2222222-2222-2222-2222-222222222222', 
 'คนที่ไม่ใส่หมวกใส่เสื้อสีอะไร', 
 'Question', 
 '["ส้ม", "เขียว", "แดง", "ฟ้า"]'::jsonb, 
 'แดง', 
 NULL),

('b2222222-2222-2222-2222-222222222222', 
 'สัตว์ในรูปคือตัวอะไร', 
 'Question', 
 '["หมีขาว", "แพนกวิน", "สุนัข", "ไม่มีสัตว์ในรูป"]'::jsonb, 
 'ไม่มีสัตว์ในรูป', 
 NULL),

('b2222222-2222-2222-2222-222222222222', 
 'ภารกิจ Staff: ทำท่าทางไถสกีลงเขาพร้อมส่งเสียง วู้ววว! ค้างไว้ 5 วินาที', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นย่อตัวทำท่าถือไม้สกีและโยกตัวเหมือนกำลังไถสกีเป็นเวลา 5 วินาที'),

('b2222222-2222-2222-2222-222222222222', 
 'ภารกิจ Staff: กอดอกทำท่าหนาวสั่น ฟันกระทบกัน กึ๊กๆๆ นาน 5 วินาที!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นต้องกอดอกตัวสั่นและทำเสียงหนาวอย่างสมจริง'),

('b2222222-2222-2222-2222-222222222222', 
 'ภารกิจ Staff: บอกชื่อสิ่งของที่ช่วยกันหนาวมา 4 อย่าง ภายใน 8 วินาที!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นตอบของกันหนาว 4 อย่าง (เช่น เสื้อกันหนาว ผ้าพันคอ ถุงมือ หมวกไหมพรม) ภายในเวลา');


-- MEDIUM IMAGE 3: เทศกาลคริสต์มาส
INSERT INTO images (id, title, image_url, difficulty, description) VALUES
('b3333333-3333-3333-3333-333333333333', 
 'เทศกาลคริสต์มาส', 
 'https://ljaokxwsnbtjneirylff.supabase.co/storage/v1/object/public/game-images/M_Q3.png', 
 'Medium', 
 'ภาพบรรยากาศห้องนั่งเล่นในช่วงเทศกาลคริสต์มาส มีต้นคริสต์มาส เตาผิง และกล่องของขวัญ');

INSERT INTO questions (image_id, question_text, question_type, options, correct_answer, challenge_criteria) VALUES
('b3333333-3333-3333-3333-333333333333', 
 'ในรูปเป็นช่วงเทศกาลอะไร', 
 'Question', 
 '["คริสต์มาส", "ขอบคุณพระเจ้า", "วันเกิด", "วันฮัลโลวีน"]'::jsonb, 
 'คริสต์มาส', 
 NULL),

('b3333333-3333-3333-3333-333333333333', 
 'สัตว์ในรูปคือตัวอะไร', 
 'Question', 
 '["สุนัข", "ยีราฟ", "ปลา", "แมว"]'::jsonb, 
 'แมว', 
 NULL),

('b3333333-3333-3333-3333-333333333333', 
 'มีสัตว์ในรูปทั้งหมดกี่ตัว', 
 'Question', 
 '["1 ตัว", "2 ตัว", "3 ตัว", "4 ตัว"]'::jsonb, 
 '2 ตัว', 
 NULL),

('b3333333-3333-3333-3333-333333333333', 
 'รูปในกรอบรูปคือรูปอะไร', 
 'Question', 
 '["ครอบครัว", "ดาว", "ตุ๊กตาหิมะ", "ดอกไม้"]'::jsonb, 
 'ตุ๊กตาหิมะ', 
 NULL),

('b3333333-3333-3333-3333-333333333333', 
 'มีกล่องของขวัญทั้งหมดกี่อัน', 
 'Question', 
 '["3 อัน", "1 อัน", "4 อัน", "2 อัน"]'::jsonb, 
 '3 อัน', 
 NULL),

('b3333333-3333-3333-3333-333333333333', 
 'สิ่งที่อยู่บนยอดของต้นไม้คืออะไร', 
 'Question', 
 '["ดาว", "แอปเปิ้ล", "ลูกบอล", "ไม่มี"]'::jsonb, 
 'ดาว', 
 NULL),

('b3333333-3333-3333-3333-333333333333', 
 'ในรูปมีถุงเท้าทั้งหมดกี่อัน', 
 'Question', 
 '["1 อัน", "2 อัน", "3 อัน", "4 อัน"]'::jsonb, 
 '3 อัน', 
 NULL),

('b3333333-3333-3333-3333-333333333333', 
 'ภารกิจ Staff: ร้องท่อนฮุกเพลง Jingle Bells หรือเพลงคริสต์มาสสั้นๆ 1 ท่อน!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นร้อง "Jingle bells, jingle bells, jingle all the way" หรือเพลงคริสต์มาสได้อย่างมั่นใจ'),

('b3333333-3333-3333-3333-333333333333', 
 'ภารกิจ Staff: ทำท่าเป็นซานตาคลอสลูบท้องแล้วหัวเราะ "โฮ่ โฮ่ โฮ่!" 3 ครั้ง!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นต้องเอามือลูบพุงและเปล่งเสียงหัวเราะแบบซานตาคลอสให้ได้ยินชัดเจน'),

('b3333333-3333-3333-3333-333333333333', 
 'ภารกิจ Staff: บอกชื่อของขวัญที่คุณอยากได้ในวันคริสต์มาสมา 3 อย่าง ใน 6 วินาที!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นตอบชื่อของขวัญ 3 อย่างอย่างรวดเร็วภายใน 6 วินาที');


-- MEDIUM IMAGE 4: รวมภาพใบหน้าตัวละคร
INSERT INTO images (id, title, image_url, difficulty, description) VALUES
('b4444444-4444-4444-4444-444444444444', 
 'รวมภาพใบหน้าตัวละคร', 
 'https://ljaokxwsnbtjneirylff.supabase.co/storage/v1/object/public/game-images/M_Q4.png', 
 'Medium', 
 'ภาพตารางแสดงใบหน้าตัวละครหลากหลายรูปแบบ');

INSERT INTO questions (image_id, question_text, question_type, options, correct_answer, challenge_criteria) VALUES
('b4444444-4444-4444-4444-444444444444', 
 'ในรูปมีคนทั้งหมดกี่คน', 
 'Question', 
 '["12 คน", "15 คน", "16 คน", "20 คน"]'::jsonb, 
 '12 คน', 
 NULL),

('b4444444-4444-4444-4444-444444444444', 
 'ในรูปมีคนผมสีดำกี่คน', 
 'Question', 
 '["3 คน", "7 คน", "9 คน", "15 คน"]'::jsonb, 
 '9 คน', 
 NULL),

('b4444444-4444-4444-4444-444444444444', 
 'ในรูปมีผู้หญิงกี่คน', 
 'Question', 
 '["4 คน", "6 คน", "7 คน", "9 คน"]'::jsonb, 
 '6 คน', 
 NULL),

('b4444444-4444-4444-4444-444444444444', 
 'ในรูปมีคนใส่แว่นกี่คน', 
 'Question', 
 '["1 คน", "2 คน", "3 คน", "ไม่มี"]'::jsonb, 
 '3 คน', 
 NULL),

('b4444444-4444-4444-4444-444444444444', 
 'ในรูปมีคนเป็นกระกี่คน', 
 'Question', 
 '["3 คน", "4 คน", "5 คน", "6 คน"]'::jsonb, 
 '3 คน', 
 NULL),

('b4444444-4444-4444-4444-444444444444', 
 'ในรูปมีคนยิ้มเห็นฟันกี่คน', 
 'Question', 
 '["3 คน", "4 คน", "5 คน", "6 คน"]'::jsonb, 
 '4 คน', 
 NULL),

('b4444444-4444-4444-4444-444444444444', 
 'ในรูปมีคนร้องไห้กี่คน', 
 'Question', 
 '["1 คน", "2 คน", "3 คน", "ไม่มี"]'::jsonb, 
 '1 คน', 
 NULL),

('b4444444-4444-4444-4444-444444444444', 
 'ภารกิจ Staff: สลับทำสีหน้า ดีใจ -> โกรธ -> ร้องไห้ -> ยิ้มหวาน ให้ครบใน 5 วินาที!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นเปลี่ยนสีหน้าแสดงอารมณ์ 4 แบบตามลำดับอย่างชัดเจน'),

('b4444444-4444-4444-4444-444444444444', 
 'ภารกิจ Staff: ทำหน้าตลก/หน้าทะเล้นค้างไว้ 5 วินาทีโดยห้ามหลุดหัวเราะ!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นทำหน้าตลกค้างไว้ครบ 5 วินาทีโดยไม่หลุดขำ'),

('b4444444-4444-4444-4444-444444444444', 
 'ภารกิจ Staff: ขยิบตาซ้าย 2 ครั้ง แล้วขยิบตาขวา 2 ครั้งติดกัน!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นขยิบตาทีละข้าง ข้างละ 2 ครั้งได้อย่างถูกต้อง');


-- MEDIUM IMAGE 5: คาเฟ่บรรยากาศอบอุ่น
INSERT INTO images (id, title, image_url, difficulty, description) VALUES
('b5555555-5555-5555-5555-555555555555', 
 'คาเฟ่บรรยากาศอบอุ่น', 
 'https://ljaokxwsnbtjneirylff.supabase.co/storage/v1/object/public/game-images/M_Q5.png', 
 'Medium', 
 'ภาพคาเฟ่ตึกอิฐสีแดง มีผู้คนนั่งพูดคุยกันหน้าร้าน และมีแมวอยู่บริเวณหน้าร้าน');

INSERT INTO questions (image_id, question_text, question_type, options, correct_answer, challenge_criteria) VALUES
('b5555555-5555-5555-5555-555555555555', 
 'ในรูปคือร้านอะไร', 
 'Question', 
 '["ร้านเสื้อผ้า", "ร้านดอกไม้", "คาเฟ่", "ร้านหนังสือ"]'::jsonb, 
 'คาเฟ่', 
 NULL),

('b5555555-5555-5555-5555-555555555555', 
 'ในรูปมีคนทั้งหมดกี่คน', 
 'Question', 
 '["2 คน", "3 คน", "4 คน", "5 คน"]'::jsonb, 
 '4 คน', 
 NULL),

('b5555555-5555-5555-5555-555555555555', 
 'ในรูปมีผู้หญิงกี่คน', 
 'Question', 
 '["1 คน", "2 คน", "3 คน", "4 คน"]'::jsonb, 
 '2 คน', 
 NULL),

('b5555555-5555-5555-5555-555555555555', 
 'สัตว์ในรูปคือตัวอะไร', 
 'Question', 
 '["แมว", "สุนัข", "นก", "กระต่าย"]'::jsonb, 
 'แมว', 
 NULL),

('b5555555-5555-5555-5555-555555555555', 
 'คนที่อยู่ชั้น2ใส่เสื้อสีอะไร', 
 'Question', 
 '["ดำ", "ขาว", "ส้ม", "เทา"]'::jsonb, 
 'ขาว', 
 NULL),

('b5555555-5555-5555-5555-555555555555', 
 'ผู้หญิงที่ถือโทรศัพท์ใส่เสื้อสีอะไร', 
 'Question', 
 '["ดำ", "ขาว", "ส้ม", "เทา"]'::jsonb, 
 'ส้ม', 
 NULL),

('b5555555-5555-5555-5555-555555555555', 
 'ในป้ายเมนูมีเมนูอะไร', 
 'Question', 
 '["น้ำส้ม", "เค้กช็อกโกแลต", "ชา", "นม"]'::jsonb, 
 'ชา', 
 NULL),

('b5555555-5555-5555-5555-555555555555', 
 'ภารกิจ Staff: สวมบทบาทเป็นบาริสต้าต้อนรับลูกค้าด้วยความสุภาพและร่าเริง!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นกล่าวทักทาย เช่น "สวัสดีครับ/ค่ะ รับกาแฟหรือเครื่องดื่มอะไรดีครับ/ค่ะ" ด้วยน้ำเสียงสดใส'),

('b5555555-5555-5555-5555-555555555555', 
 'ภารกิจ Staff: ทำท่าทางเลียนแบบแมวข่วนกรงเล็บ พร้อมร้อง เหมียว~ 3 ครั้ง!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นยกมือทำท่าอุ้งเท้าแมวแล้วส่งเสียงร้องเหมียว 3 ครั้ง'),

('b5555555-5555-5555-5555-555555555555', 
 'ภารกิจ Staff: บอกชื่อเมนูกาแฟหรือเครื่องดื่มในคาเฟ่มา 4 เมนู ภายใน 8 วินาที!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'ผู้เล่นบอกชื่อเครื่องดื่ม 4 เมนู (เช่น ลาเต้ เอสเพรสโซ ชาเขียว โกโก้) ภายในเวลา');


-- HARD IMAGE 1: Cyberpunk Neon City
INSERT INTO images (id, title, image_url, difficulty, description) VALUES
('c3333333-3333-3333-3333-333333333333', 
 'Cyberpunk Rainy Alleyway', 
 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80', 
 'Hard', 
 'A dense futuristic downtown night alley illuminated by vivid magenta and teal neon kanji signs reflected in puddles.');

-- Questions for Hard Image 1
INSERT INTO questions (image_id, question_text, question_type, options, correct_answer, challenge_criteria) VALUES
('c3333333-3333-3333-3333-333333333333', 
 'What two dominant complementary neon neon hues illuminated the alleyway reflection?', 
 'Question', 
 '["Electric Cyan and Hot Magenta / Pink", "Warm Amber and Forest Green", "Solid White and Black", "Monochrome Red and Brown"]'::jsonb, 
 'Electric Cyan and Hot Magenta / Pink', 
 NULL),

('c3333333-3333-3333-3333-333333333333', 
 'What was creating the high-contrast glossy reflection on the ground surface?', 
 'Question', 
 '["Rainwater puddles on asphalt", "A frozen ice rink", "Polished indoor tile flooring", "Fresh wet concrete paint"]'::jsonb, 
 'Rainwater puddles on asphalt', 
 NULL),

('c3333333-3333-3333-3333-333333333333', 
 'Staff Challenge: Perform the robotic cyborg dance freeze for 5 seconds!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'Player must perform stiff robotic mechanical movements and hold a freeze pose without moving.'),

('c3333333-3333-3333-3333-333333333333', 
 'In which direction did the vanishing perspective of the corridor lead the viewer?', 
 'Question', 
 '["Straight down the center into distance", "Sharp right turn 90 degrees", "Straight up toward the clouds", "Curving into a cul-de-sac"]'::jsonb, 
 'Straight down the center into distance', 
 NULL),

('c3333333-3333-3333-3333-333333333333', 
 'What language/script characters predominated on the glowing storefront signboards?', 
 'Question', 
 '["East Asian Kanji / Katakana glyphs", "Cyrillic Russian script", "Ancient Egyptian Hieroglyphs", "Greek Alphabet"]'::jsonb, 
 'East Asian Kanji / Katakana glyphs', 
 NULL),

('c3333333-3333-3333-3333-333333333333', 
 'Staff Challenge: Decode this Cyberpunk binary codeword: 01010011 (Hint: ASCII letter S)', 
 'Challenge', 
 NULL, 
 'PASS', 
 'Player states the answer or spells out "CYBER" backwards within 10 seconds.'),

('c3333333-3333-3333-3333-333333333333', 
 'Were there overhead utility cables / power lines crisscrossing above the street?', 
 'Question', 
 '["Yes, dense tangled wires hanging overhead", "No, wireless empty clear sky", "Only decorative holiday fairy lights", "Underground glass conduits only"]'::jsonb, 
 'Yes, dense tangled wires hanging overhead', 
 NULL);
