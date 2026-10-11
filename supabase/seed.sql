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


-- MEDIUM IMAGE 1: Vintage Detective Desk
INSERT INTO images (id, title, image_url, difficulty, description) VALUES
('m2222222-2222-2222-2222-222222222222', 
 'Vintage Detective Workstation', 
 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=1200&q=80', 
 'Medium', 
 'A mysterious desk laden with old leather journals, brass compass, magnifying lens, inkwell, and weathered map.');

-- Questions for Medium Image 1
INSERT INTO questions (image_id, question_text, question_type, options, correct_answer, challenge_criteria) VALUES
('m2222222-2222-2222-2222-222222222222', 
 'Which metallic material was the navigational compass housing constructed from?', 
 'Question', 
 '["Aged Polished Brass", "Shiny Chrome Silver", "Matte Black Steel", "Cast Iron"]'::jsonb, 
 'Aged Polished Brass', 
 NULL),

('m2222222-2222-2222-2222-222222222222', 
 'What object was resting directly on top of the handwritten cartography map?', 
 'Question', 
 '["Brass Magnifying Glass", "A Cup of Black Coffee", "A Fountain Pen", "A Golden Coin"]'::jsonb, 
 'Brass Magnifying Glass', 
 NULL),

('m2222222-2222-2222-2222-222222222222', 
 'Staff Challenge: Impersonate a 1940s Film Noir detective delivering their opening line!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'Player must speak in a gritty monologue tone: "The rain was falling like broken glass on the pavement..." or equivalent.'),

('m2222222-2222-2222-2222-222222222222', 
 'What was the binding style of the antique journals on the desk?', 
 'Question', 
 '["Worn Brown Leather with Strap", "Modern Spiral Plastic", "Hardcover Bright Blue Cloth", "Stapled Paper Pamphlet"]'::jsonb, 
 'Worn Brown Leather with Strap', 
 NULL),

('m2222222-2222-2222-2222-222222222222', 
 'Staff Challenge: Solve this mystery riddle: What has cities, but no houses; forests, but no trees; and water, but no fish?', 
 'Challenge', 
 NULL, 
 'PASS', 
 'Player must answer "A Map" within 15 seconds.'),

('m2222222-2222-2222-2222-222222222222', 
 'Were the edges of the navigation map crisp and new or burned/frayed?', 
 'Question', 
 '["Aged, weathered and deckled edges", "Sharp factory laser cut", "Laminated plastic gloss", "Torn completely in half"]'::jsonb, 
 'Aged, weathered and deckled edges', 
 NULL),

('m2222222-2222-2222-2222-222222222222', 
 'Was there an ink container or writing implement visible near the papers?', 
 'Question', 
 '["Yes, a vintage pen and inkwell", "No writing tools present", "Only modern fluorescent highlighters", "A digital tablet stylus"]'::jsonb, 
 'Yes, a vintage pen and inkwell', 
 NULL);


-- HARD IMAGE 1: Cyberpunk Neon City
INSERT INTO images (id, title, image_url, difficulty, description) VALUES
('h3333333-3333-3333-3333-333333333333', 
 'Cyberpunk Rainy Alleyway', 
 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80', 
 'Hard', 
 'A dense futuristic downtown night alley illuminated by vivid magenta and teal neon kanji signs reflected in puddles.');

-- Questions for Hard Image 1
INSERT INTO questions (image_id, question_text, question_type, options, correct_answer, challenge_criteria) VALUES
('h3333333-3333-3333-3333-333333333333', 
 'What two dominant complementary neon neon hues illuminated the alleyway reflection?', 
 'Question', 
 '["Electric Cyan and Hot Magenta / Pink", "Warm Amber and Forest Green", "Solid White and Black", "Monochrome Red and Brown"]'::jsonb, 
 'Electric Cyan and Hot Magenta / Pink', 
 NULL),

('h3333333-3333-3333-3333-333333333333', 
 'What was creating the high-contrast glossy reflection on the ground surface?', 
 'Question', 
 '["Rainwater puddles on asphalt", "A frozen ice rink", "Polished indoor tile flooring", "Fresh wet concrete paint"]'::jsonb, 
 'Rainwater puddles on asphalt', 
 NULL),

('h3333333-3333-3333-3333-333333333333', 
 'Staff Challenge: Perform the robotic cyborg dance freeze for 5 seconds!', 
 'Challenge', 
 NULL, 
 'PASS', 
 'Player must perform stiff robotic mechanical movements and hold a freeze pose without moving.'),

('h3333333-3333-3333-3333-333333333333', 
 'In which direction did the vanishing perspective of the corridor lead the viewer?', 
 'Question', 
 '["Straight down the center into distance", "Sharp right turn 90 degrees", "Straight up toward the clouds", "Curving into a cul-de-sac"]'::jsonb, 
 'Straight down the center into distance', 
 NULL),

('h3333333-3333-3333-3333-333333333333', 
 'What language/script characters predominated on the glowing storefront signboards?', 
 'Question', 
 '["East Asian Kanji / Katakana glyphs", "Cyrillic Russian script", "Ancient Egyptian Hieroglyphs", "Greek Alphabet"]'::jsonb, 
 'East Asian Kanji / Katakana glyphs', 
 NULL),

('h3333333-3333-3333-3333-333333333333', 
 'Staff Challenge: Decode this Cyberpunk binary codeword: 01010011 (Hint: ASCII letter S)', 
 'Challenge', 
 NULL, 
 'PASS', 
 'Player states the answer or spells out "CYBER" backwards within 10 seconds.'),

('h3333333-3333-3333-3333-333333333333', 
 'Were there overhead utility cables / power lines crisscrossing above the street?', 
 'Question', 
 '["Yes, dense tangled wires hanging overhead", "No, wireless empty clear sky", "Only decorative holiday fairy lights", "Underground glass conduits only"]'::jsonb, 
 'Yes, dense tangled wires hanging overhead', 
 NULL);
