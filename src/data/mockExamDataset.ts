export type ExamSection = 'listening' | 'reading' | 'use_of_english';

export interface ExamOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface ExamQuestion {
  id: string;
  partNumber: number;
  section: ExamSection;
  sectionTitle: string;
  instructions: string;
  audioText?: string;
  audioSpeaker?: string;
  passage?: {
    type: 'notice' | 'email' | 'article' | 'memo';
    title: string;
    content: string;
  };
  question: string;
  options: ExamOption[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'A2' | 'B1' | 'B1+';
  relatedVocabWord?: string;
}

// =================================================================
// 🎧 LISTENING POOL (15 QUESTIONS)
// =================================================================
export const LISTENING_POOL: ExamQuestion[] = [
  {
    id: 'L01',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังเสียงประกาศหรือบทสนทนา แล้วเลือกคำตอบที่ถูกต้องที่สุด',
    audioSpeaker: 'Airport PA Announcement',
    audioText: 'Attention all passengers on flight BA 342 to Manchester. Please be advised that boarding has been moved from Gate 12 to Gate 18 due to unexpected maintenance. Boarding will commence in approximately fifteen minutes. We apologize for any inconvenience.',
    question: 'Where should passengers for flight BA 342 go?',
    options: [
      { id: 'A', text: 'Gate 12' },
      { id: 'B', text: 'Gate 18' },
      { id: 'C', text: 'Information Desk' },
      { id: 'D', text: 'Manchester Terminal 2' },
    ],
    correctAnswer: 'B',
    explanation: 'เสียงประกาศระบุชัดเจนว่า "boarding has been moved from Gate 12 to Gate 18" ดังนั้นผู้โดยสารต้องไปที่ Gate 18',
    difficulty: 'B1',
    relatedVocabWord: 'passenger',
  },
  {
    id: 'L02',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังบทสนทนาระหว่างเพื่อนสองคนเกี่ยวกับการรับประทานอาหารกลางวัน',
    audioSpeaker: 'Conversation between Emma and David',
    audioText: 'Hi David! Are you coming to the Italian cafe for lunch? Actually Emma, I brought a homemade salad today because I need to finish reviewing the quarterly report before two o clock. Maybe tomorrow instead!',
    question: 'Why is David NOT joining Emma for lunch at the Italian cafe?',
    options: [
      { id: 'A', text: 'He does not like Italian food.' },
      { id: 'B', text: 'He has already eaten lunch.' },
      { id: 'C', text: 'He brought his own food and needs to finish work.' },
      { id: 'D', text: 'The cafe is currently closed for renovation.' },
    ],
    correctAnswer: 'C',
    explanation: 'David บอกว่า "I brought a homemade salad today because I need to finish reviewing the quarterly report" คือนำอาหารมาเองและมีงานต้องตรวจให้เสร็จก่อน 14:00 น.',
    difficulty: 'B1',
    relatedVocabWord: 'review',
  },
  {
    id: 'L03',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังพยากรณ์อากาศประจำสัปดาห์',
    audioSpeaker: 'Radio Weather Presenter',
    audioText: 'Good morning listeners. After a gloomy, rainy Friday morning, conditions will rapidly improve by Saturday afternoon. Expect sunny spells and temperatures climbing to twenty-three degrees, making it ideal for outdoor weekend activities.',
    question: 'What will the weather be like on Saturday afternoon?',
    options: [
      { id: 'A', text: 'Heavy continuous thunderstorms' },
      { id: 'B', text: 'Gloomy and chilly with fog' },
      { id: 'C', text: 'Sunny and pleasant for outdoor activities' },
      { id: 'D', text: 'Freezing cold with sudden frost' },
    ],
    correctAnswer: 'C',
    explanation: 'ผู้ประกาศระบุว่า "conditions will rapidly improve by Saturday afternoon. Expect sunny spells... ideal for outdoor weekend activities"',
    difficulty: 'A2',
    relatedVocabWord: 'activity',
  },
  {
    id: 'L04',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังข้อความเสียงในโทรศัพท์',
    audioSpeaker: 'Voicemail Message',
    audioText: 'Hello Mr. Jenkins. This is Sarah from the Central Dental Clinic calling to confirm your dental check-up tomorrow at four thirty p.m. If you need to reschedule, please call our reception before six p.m. today.',
    question: 'What is the primary purpose of Sarah\'s call?',
    options: [
      { id: 'A', text: 'To cancel an appointment permanently' },
      { id: 'B', text: 'To confirm an upcoming dental appointment' },
      { id: 'C', text: 'To request an emergency consultation' },
      { id: 'D', text: 'To inform about new dental charges' },
    ],
    correctAnswer: 'B',
    explanation: 'Sarah พูดว่า "calling to confirm your dental check-up tomorrow at four thirty p.m." เพื่อยืนยันนัดตรวจฟัน',
    difficulty: 'B1',
    relatedVocabWord: 'confirm',
  },
  {
    id: 'L05',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังบทสนทนาระหว่างพนักงานและลูกค้าที่เคาน์เตอร์โรงแรม',
    audioSpeaker: 'Hotel Receptionist & Guest',
    audioText: 'Welcome to Riverside Hotel, madam. Breakfast is served in the main dining hall from seven to ten a.m. High-speed Wi-Fi is complimentary; the password is on your room key envelope. Here is your key for room 304.',
    question: 'Until what time is breakfast available at the hotel?',
    options: [
      { id: 'A', text: '7:00 a.m.' },
      { id: 'B', text: '9:30 a.m.' },
      { id: 'C', text: '10:00 a.m.' },
      { id: 'D', text: '11:00 a.m.' },
    ],
    correctAnswer: 'C',
    explanation: 'พนักงานแจ้งว่า "Breakfast is served... from seven to ten a.m." ดังนั้นทานได้จนถึง 10:00 a.m.',
    difficulty: 'A2',
    relatedVocabWord: 'accommodation',
  },
  {
    id: 'L06',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังคำแนะนำจากอาจารย์ประจำวิชา',
    audioSpeaker: 'Course Instructor',
    audioText: 'Remember students, your midterm essay must be submitted through the student portal by midnight this Friday. Late submissions will automatically incur a five percent deduction for each day overdue.',
    question: 'What will happen if students submit their essay after Friday midnight?',
    options: [
      { id: 'A', text: 'They will receive an immediate failing grade.' },
      { id: 'B', text: 'They will lose five percent of marks per day.' },
      { id: 'C', text: 'They must write a completely new essay topic.' },
      { id: 'D', text: 'Their submission will not be penalized.' },
    ],
    correctAnswer: 'B',
    explanation: 'อาจารย์ชี้แจงว่า "Late submissions will automatically incur a five percent deduction for each day overdue" จะถูกหักคะแนน 5% ต่อวัน',
    difficulty: 'B1+',
    relatedVocabWord: 'submit',
  },
  {
    id: 'L07',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังการบรรยายของไกด์นำเที่ยวในพิพิธภัณฑ์ประวัติศาสตร์',
    audioSpeaker: 'Museum Tour Guide',
    audioText: 'On your left is our nineteenth-century steam locomotive collection. Please feel free to take photographs, but remember that flash photography and touching the exhibits are strictly prohibited to preserve the paintwork.',
    question: 'What are visitors strictly forbidden from doing?',
    options: [
      { id: 'A', text: 'Taking standard non-flash photos' },
      { id: 'B', text: 'Asking questions during the tour' },
      { id: 'C', text: 'Using flash photography and touching exhibits' },
      { id: 'D', text: 'Entering without prior appointment' },
    ],
    correctAnswer: 'C',
    explanation: 'ไกด์เน้นย้ำว่า "flash photography and touching the exhibits are strictly prohibited" ห้ามใช้แฟลชและห้ามสัมผัสชิ้นงาน',
    difficulty: 'B1',
    relatedVocabWord: 'prohibit',
  },
  {
    id: 'L08',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังเสียงประกาศที่สถานีรถไฟ',
    audioSpeaker: 'Train Station Announcement',
    audioText: 'May I have your attention please. The express service to Oxford departing at 14:15 will now leave from Platform 4 instead of Platform 2. Passengers already waiting on Platform 2 should use the footbridge to cross over immediately.',
    question: 'What should passengers traveling to Oxford do?',
    options: [
      { id: 'A', text: 'Wait on Platform 2 until 14:15' },
      { id: 'B', text: 'Cross over to Platform 4 using the footbridge' },
      { id: 'C', text: 'Purchase a new express ticket at the counter' },
      { id: 'D', text: 'Take the slower local train instead' },
    ],
    correctAnswer: 'B',
    explanation: 'ประกาศระบุให้ผู้โดยสารข้ามสะพานลอยไปยังชานชาลา 4 ("use the footbridge to cross over immediately to Platform 4")',
    difficulty: 'B1',
    relatedVocabWord: 'platform',
  },
  {
    id: 'L09',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังบทสนทนาระหว่างลูกค้าและพนักงานบริการลูกค้า',
    audioSpeaker: 'Customer Service Helpline',
    audioText: 'Thank you for calling Apex Broadband. Our technical team is currently upgrading server lines in your district. Normal high-speed connection will be fully restored by 6:00 PM this evening. We sincerely appreciate your patience.',
    question: 'Why is the customer\'s internet connection slow?',
    options: [
      { id: 'A', text: 'The customer did not pay their monthly bill.' },
      { id: 'B', text: 'The company is performing scheduled server line upgrades.' },
      { id: 'C', text: 'The router device is permanently broken.' },
      { id: 'D', text: 'A severe lightning storm damaged the cables.' },
    ],
    correctAnswer: 'B',
    explanation: 'พนักงานแจ้งว่าทีมเทคนิคกำลังอัปเกรดสายสัญญาณเซิร์ฟเวอร์ ("upgrading server lines in your district")',
    difficulty: 'B1',
    relatedVocabWord: 'restore',
  },
  {
    id: 'L10',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังบทสนทนาการนัดประชุมงาน',
    audioSpeaker: 'Colleagues Mark and Lisa',
    audioText: 'Lisa, can we move our budget review meeting from 10:00 AM to 3:00 PM on Thursday? I have an urgent client video conference that morning. That works well for me, Mark. Let us meet in Conference Room B.',
    question: 'At what time will Mark and Lisa meet on Thursday?',
    options: [
      { id: 'A', text: '10:00 AM' },
      { id: 'B', text: '12:00 PM' },
      { id: 'C', text: '3:00 PM' },
      { id: 'D', text: '5:00 PM' },
    ],
    correctAnswer: 'C',
    explanation: 'Mark ขอเลื่อนไปเป็นเวลา 15:00 น. ("move our budget review meeting... to 3:00 PM on Thursday") และ Lisa ตอบตกลง',
    difficulty: 'A2',
    relatedVocabWord: 'conference',
  },
  {
    id: 'L11',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังการสัมภาษณ์งานสั้นๆ',
    audioSpeaker: 'Job Interview Discussion',
    audioText: 'We were particularly impressed by your international project leadership, Elena. If selected, would you be comfortable traveling to our regional branch in Singapore twice a year? Yes absolutely, I enjoy cross-cultural collaborations.',
    question: 'How often will the successful candidate need to travel to Singapore?',
    options: [
      { id: 'A', text: 'Once a month' },
      { id: 'B', text: 'Twice a year' },
      { id: 'C', text: 'Every week' },
      { id: 'D', text: 'Only during emergency crises' },
    ],
    correctAnswer: 'B',
    explanation: 'ผู้สัมภาษณ์ถามว่าสะดวกเดินทางไปสิงคโปร์ปีละสองครั้งหรือไม่ ("traveling to our regional branch in Singapore twice a year")',
    difficulty: 'B1',
    relatedVocabWord: 'international',
  },
  {
    id: 'L12',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังคำแนะนำด้านความปลอดภัยบนเครื่องบิน',
    audioSpeaker: 'Flight Attendant Safety Briefing',
    audioText: 'Ladies and gentlemen, as we prepare for take-off, please make sure your seatbelt is securely fastened, your tray table is folded away, and all large electronic devices such as laptops are stowed safely in the overhead bins or under the seat in front of you.',
    question: 'Where should passengers place large laptops during take-off?',
    options: [
      { id: 'A', text: 'On their open tray tables' },
      { id: 'B', text: 'In their hands ready to work' },
      { id: 'C', text: 'In overhead bins or under the seat in front' },
      { id: 'D', text: 'Handed to the flight attendants' },
    ],
    correctAnswer: 'C',
    explanation: 'ระบุชัดเจนว่าให้เก็บคอมพิวเตอร์แล็ปท็อปไว้ในช่องเก็บเหนือศีรษะหรือใต้ที่นั่งด้านหน้า ("in the overhead bins or under the seat in front of you")',
    difficulty: 'B1',
    relatedVocabWord: 'fasten',
  },
  {
    id: 'L13',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังประกาศในห้างสรรพสินค้า',
    audioSpeaker: 'Department Store Public Announcement',
    audioText: 'Good evening shoppers. The store will be closing in ten minutes at 9:00 PM. Please bring your selected merchandise to the central registers on the ground floor. Tomorrow morning, our summer clearance sale begins at 8:30 AM with discounts of up to fifty percent.',
    question: 'When will tomorrow\'s summer clearance sale begin?',
    options: [
      { id: 'A', text: '8:30 AM' },
      { id: 'B', text: '9:00 AM' },
      { id: 'C', text: '10:00 AM' },
      { id: 'D', text: '12:00 PM' },
    ],
    correctAnswer: 'A',
    explanation: 'ประกาศระบุว่าเซลล์รอบเช้าวันพรุ่งนี้จะเริ่มเวลา 8:30 น. ("our summer clearance sale begins at 8:30 AM")',
    difficulty: 'A2',
    relatedVocabWord: 'discount',
  },
  {
    id: 'L14',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังคำอธิบายจากเจ้าหน้าที่อุทยานแห่งชาติ',
    audioSpeaker: 'National Park Ranger',
    audioText: 'Hikers planning to tackle the northern peak trail today should note that high winds and dense mist are predicted above 1,500 meters. Sturdy waterproof footwear and warm layered clothing are strictly recommended for safety.',
    question: 'What gear is recommended for hikers on the northern peak trail?',
    options: [
      { id: 'A', text: 'Light sandals and swimming gear' },
      { id: 'B', text: 'Sturdy waterproof footwear and warm layered clothing' },
      { id: 'C', text: 'Heavy bicycles and helmets' },
      { id: 'D', text: 'Only a compass and bottle of water' },
    ],
    correctAnswer: 'B',
    explanation: 'เจ้าหน้าที่อุทยานแนะนำให้สวมใส่รองเท้ากันน้ำที่แข็งแรงและเสื้อผ้าหลายชั้นที่อบอุ่น ("Sturdy waterproof footwear and warm layered clothing")',
    difficulty: 'B1',
    relatedVocabWord: 'footwear',
  },
  {
    id: 'L15',
    partNumber: 1,
    section: 'listening',
    sectionTitle: 'Part 1: Listening Comprehension',
    instructions: 'ฟังบทสนทนาระหว่างเภสัชกรและคนไข้',
    audioSpeaker: 'Pharmacist and Patient',
    audioText: 'Take one tablet twice daily after meals, preferably once in the morning and once at night. Avoid drinking grapefruit juice while taking this medication as it may interact with the active ingredients. Drink plenty of water.',
    question: 'What beverage should the patient avoid while taking this medication?',
    options: [
      { id: 'A', text: 'Pure mineral water' },
      { id: 'B', text: 'Grapefruit juice' },
      { id: 'C', text: 'Warm green tea' },
      { id: 'D', text: 'Low-fat milk' },
    ],
    correctAnswer: 'B',
    explanation: 'เภสัชกรเตือนให้หลีกเลี่ยงน้ำเกรปฟรุต ("Avoid drinking grapefruit juice while taking this medication")',
    difficulty: 'B1+',
    relatedVocabWord: 'medication',
  },
];

// =================================================================
// 📖 READING POOL (15 QUESTIONS)
// =================================================================
export const READING_POOL: ExamQuestion[] = [
  {
    id: 'R01',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านป้ายประกาศและเลือกคำตอบที่สรุปความหมายได้ถูกต้องที่สุด',
    passage: {
      type: 'notice',
      title: 'Fitness Centre Maintenance Notice',
      content: 'SWIMMING POOL CLOSURE\nThe indoor heated pool will undergo urgent tile replacement from Monday 5th to Thursday 8th November. The gymnasium, sauna, and group exercise studios will operate normally during this period.',
    },
    question: 'According to the notice, what is true about the fitness centre?',
    options: [
      { id: 'A', text: 'The entire centre is closed from Monday to Thursday.' },
      { id: 'B', text: 'Only the swimming pool is temporarily unavailable.' },
      { id: 'C', text: 'The sauna is undergoing urgent tile replacement.' },
      { id: 'D', text: 'The pool will reopen on Wednesday afternoon.' },
    ],
    correctAnswer: 'B',
    explanation: 'ป้ายระบุว่าเฉพาะสระว่ายน้ำที่ปิดซ่อมแซมกระเบื้อง ("The gymnasium, sauna, and studios will operate normally") จึงมีเพียงสระว่ายน้ำที่ปิดบริการชั่วคราว',
    difficulty: 'B1',
    relatedVocabWord: 'operate',
  },
  {
    id: 'R02',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านอีเมลการทำงานด้านล่างแล้วตอบคำถาม',
    passage: {
      type: 'email',
      title: 'Subject: Upcoming Client Presentation Schedule',
      content: 'Dear Marketing Team,\n\nOur client from Henderson Holdings has requested to reschedule our pitch presentation from Wednesday morning to Thursday at 2:00 PM. Please ensure the updated slide deck and budget proposal are uploaded to the shared cloud folder no later than Wednesday 5:00 PM so that our director can give final approval.\n\nBest regards,\nClara Hughes\nProject Lead',
    },
    question: 'When must team members upload the finalized presentation materials?',
    options: [
      { id: 'A', text: 'Wednesday morning before 9:00 AM' },
      { id: 'B', text: 'Wednesday by 5:00 PM' },
      { id: 'C', text: 'Thursday at 2:00 PM' },
      { id: 'D', text: 'Right after the director presentation' },
    ],
    correctAnswer: 'B',
    explanation: 'ในอีเมลระบุชัดเจนว่า "uploaded to the shared cloud folder no later than Wednesday 5:00 PM"',
    difficulty: 'B1',
    relatedVocabWord: 'schedule',
  },
  {
    id: 'R03',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านป้ายข้อความประกาศรับสมัครงาน',
    passage: {
      type: 'notice',
      title: 'Barista Wanted - Green Beans Cafe',
      content: 'Part-time barista position available (20 hrs/week). Previous coffee shop experience preferred, but full training provided for candidates with positive communication skills and a passion for hospitality. Free lunch and generous staff discounts included.\nApply in person with CV or email info@greenbeans.co.uk',
    },
    question: 'What is required for the barista position?',
    options: [
      { id: 'A', text: 'At least 5 years of certified coffee roasting experience' },
      { id: 'B', text: 'A passion for hospitality and great communication skills' },
      { id: 'C', text: 'Availability to work 40 hours per week full-time' },
      { id: 'D', text: 'A formal degree in business management' },
    ],
    correctAnswer: 'B',
    explanation: 'แม้ประสบการณ์ร้านกาแฟจะได้รับการพิจารณาเป็นพิเศษ (preferred) แต่ร้านระบุว่า "full training provided for candidates with positive communication skills and a passion for hospitality"',
    difficulty: 'A2',
    relatedVocabWord: 'communication',
  },
  {
    id: 'R04',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านบทความสั้นเกี่ยวกับเทคโนโลยีสิ่งแวดล้อม',
    passage: {
      type: 'article',
      title: 'Urban Solar Tree Projects',
      content: 'Cities worldwide are introducing "solar trees"—innovative street installations with artificial leaves containing photovoltaic cells. Besides generating green electricity to illuminate pathways at night, they also feature free USB mobile charging ports and collect rainwater for local park irrigation. Environmentalists praise them as a creative way to bring sustainable technology into public spaces.',
    },
    question: 'What is NOT mentioned as a function of the solar trees?',
    options: [
      { id: 'A', text: 'Illuminating public pathways after dark' },
      { id: 'B', text: 'Providing free mobile phone battery charging' },
      { id: 'C', text: 'Collecting rainwater for watering park plants' },
      { id: 'D', text: 'Selling commercial advertising space on digital screens' },
    ],
    correctAnswer: 'D',
    explanation: 'ในบทความกล่าวถึงการให้แสงสว่าง (A), ช่องชาร์จแบตเตอรี่ (B) และการเก็บน้ำฝน (C) แต่ไม่ได้กล่าวถึงการขายพื้นที่โฆษณา (D)',
    difficulty: 'B1+',
    relatedVocabWord: 'environment',
  },
  {
    id: 'R05',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านจดหมายข่าวของห้องสมุดประชาชน',
    passage: {
      type: 'memo',
      title: 'City Library Book Return Policy Update',
      content: 'Starting December 1st, late return fees will be abolished for all youth and standard cardholders. Members can renew physical items up to three times online, provided no other borrower has reserved the book. Lost or damaged books will still be subject to standard replacement charges.',
    },
    question: 'Under what condition can a library member renew a borrowed book online?',
    options: [
      { id: 'A', text: 'If they pay a renewal fee in advance' },
      { id: 'B', text: 'Only if no other patron has placed a reservation on it' },
      { id: 'C', text: 'Only after returning it in person to the front desk' },
      { id: 'D', text: 'If the book was published within the last twelve months' },
    ],
    correctAnswer: 'B',
    explanation: 'เงื่อนไขการต่ออายุออนไลน์คือ "provided no other borrower has reserved the book" (ตราบใดที่ไม่มีผู้อื่นจองไว้)',
    difficulty: 'B1',
    relatedVocabWord: 'reserve',
  },
  {
    id: 'R06',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านข้อความแนะนำสำหรับผู้เดินทาง',
    passage: {
      type: 'article',
      title: 'Traveler Guide: Eco-Friendly Packing Tips',
      content: 'When packing for international trips, minimizing luggage weight is not merely convenient—it directly cuts fuel emissions during air transit. Travelers are advised to choose versatile, quick-drying apparel that can be easily washed overnight in hotel basins, rendering bulky wardrobes unnecessary.',
    },
    question: 'Why does the text recommend choosing quick-drying clothing?',
    options: [
      { id: 'A', text: 'It looks more fashionable in holiday photos.' },
      { id: 'B', text: 'It can be washed and reused easily, reducing luggage weight.' },
      { id: 'C', text: 'It protects travelers from extreme weather conditions.' },
      { id: 'D', text: 'It is mandatory by international airline security rules.' },
    ],
    correctAnswer: 'B',
    explanation: 'บทความระบุว่า "quick-drying apparel that can be easily washed overnight in hotel basins, rendering bulky wardrobes unnecessary" ช่วยให้ซักง่ายและลดน้ำหนักสัมภาระ',
    difficulty: 'B1',
    relatedVocabWord: 'convenient',
  },
  {
    id: 'R07',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านข้อความบันทึกช่วยจำภายในองค์กร (Internal Memo)',
    passage: {
      type: 'memo',
      title: 'Internal Memo: Office Energy Conservation',
      content: 'To support our company zero-carbon initiative, all staff members departing after 6:30 PM are requested to ensure personal desktop monitors and peripheral devices are fully powered down rather than left on standby mode. Heating will be automatically lowered by two degrees across all floors.',
    },
    question: 'What are staff members asked to do when leaving the office in the evening?',
    options: [
      { id: 'A', text: 'Turn off their computers and monitors completely.' },
      { id: 'B', text: 'Leave heating systems running on maximum level.' },
      { id: 'C', text: 'Keep all peripheral devices on standby mode.' },
      { id: 'D', text: 'Submit an overtime attendance form to reception.' },
    ],
    correctAnswer: 'A',
    explanation: 'บันทึกระบุว่า "requested to ensure personal desktop monitors and peripheral devices are fully powered down rather than left on standby mode"',
    difficulty: 'B1',
    relatedVocabWord: 'device',
  },
  {
    id: 'R08',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านเงื่อนไขการคืนสินค้าของร้านค้าออนไลน์',
    passage: {
      type: 'notice',
      title: 'Horizon Apparel: 30-Day Return Policy',
      content: 'Items may be returned within 30 days of delivery for a full refund or exchange. Garments must be unworn, unwashed, and have original designer tags attached. Footwear must be returned in the original branded shoe box without postal stamps attached directly to the box.',
    },
    question: 'What is a requirement for returning clothes for a refund?',
    options: [
      { id: 'A', text: 'They must be dry-cleaned by the customer first.' },
      { id: 'B', text: 'They must have original designer tags attached and be unworn.' },
      { id: 'C', text: 'They can only be exchanged for store credit coupons.' },
      { id: 'D', text: 'The receipt must be physically signed by a store manager.' },
    ],
    correctAnswer: 'B',
    explanation: 'ข้อความระบุชัดเจนว่า "Garments must be unworn, unwashed, and have original designer tags attached"',
    difficulty: 'B1',
    relatedVocabWord: 'garment',
  },
  {
    id: 'R09',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านอีเมลแจ้งเตือนการจองตั๋วภาพยนตร์',
    passage: {
      type: 'email',
      title: 'Booking Confirmation: Cineplex IMAX',
      content: 'Dear Customer,\n\nYour e-tickets for "Galactic Odyssey" on Saturday at 7:30 PM (Screen 4, Seats F12-F13) are confirmed. Please show the QR code on your mobile screen upon entering; no paper printout is required. Concession stand snacks ordered online can be picked up at the Priority Counter.',
    },
    question: 'How should cinema attendees present their admission tickets?',
    options: [
      { id: 'A', text: 'By showing the QR code on their smartphone screen' },
      { id: 'B', text: 'By bringing an officially stamped paper printout' },
      { id: 'C', text: 'By stating their national identity number at the box office' },
      { id: 'D', text: 'By arriving two hours early for verification' },
    ],
    correctAnswer: 'A',
    explanation: 'อีเมลระบุว่า "Please show the QR code on your mobile screen upon entering; no paper printout is required"',
    difficulty: 'A2',
    relatedVocabWord: 'admission',
  },
  {
    id: 'R10',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านข้อความแนะนำการดูแลรักษาต้นไม้ในร่ม',
    passage: {
      type: 'article',
      title: 'Indoor Gardening: Caring for Succulents',
      content: 'The most frequent cause of houseplant demise is well-intentioned overwatering. Succulents store substantial moisture inside their fleshy leaves, meaning their soil should be allowed to dry out entirely between waterings. Position them on south-facing windowsills where they can receive at least four hours of unfiltered sunlight daily.',
    },
    question: 'What is the most common reason indoor succulents die?',
    options: [
      { id: 'A', text: 'Lack of chemical fertilizer' },
      { id: 'B', text: 'Receiving too much water' },
      { id: 'C', text: 'Excessive unfiltered sunlight' },
      { id: 'D', text: 'Being repotted too frequently' },
    ],
    correctAnswer: 'B',
    explanation: 'บทความระบุว่า "The most frequent cause of houseplant demise is well-intentioned overwatering" (การรดน้ำมากเกินไป)',
    difficulty: 'B1+',
    relatedVocabWord: 'frequent',
  },
  {
    id: 'R11',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านป้ายประกาศหน้าพิพิธภัณฑ์ศิลปะร่วมสมัย',
    passage: {
      type: 'notice',
      title: 'Museum of Contemporary Art - Visitor Guidelines',
      content: 'Free general admission every Thursday evening from 5:00 PM to 9:00 PM courtesy of the City Cultural Endowment. Large backpacks, umbrellas, and liquids over 100ml must be deposited in the secure cloakroom lockers in the basement foyer.',
    },
    question: 'When can visitors enter the museum without paying admission?',
    options: [
      { id: 'A', text: 'Every Saturday morning before noon' },
      { id: 'B', text: 'Thursday evenings between 5:00 PM and 9:00 PM' },
      { id: 'C', text: 'On the first Sunday of every calendar month' },
      { id: 'D', text: 'Only when accompanied by an accredited tour guide' },
    ],
    correctAnswer: 'B',
    explanation: 'ป้ายระบุ "Free general admission every Thursday evening from 5:00 PM to 9:00 PM"',
    difficulty: 'A2',
    relatedVocabWord: 'admission',
  },
  {
    id: 'R12',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านข้อความประชาสัมพันธ์การฝึกอบรมพนักงาน',
    passage: {
      type: 'memo',
      title: 'Professional Development Workshop: Data Visualization',
      content: 'Human Resources is hosting a hands-on webinar series on modern dashboard design using business intelligence software. Open to all department coordinators. Attendance is voluntary, but completing all three modules grants a certified internal qualification badge.',
    },
    question: 'Who is eligible to participate in the webinar series?',
    options: [
      { id: 'A', text: 'Only senior executive directors' },
      { id: 'B', text: 'All department coordinators' },
      { id: 'C', text: 'External university interns only' },
      { id: 'D', text: 'IT security specialists exclusively' },
    ],
    correctAnswer: 'B',
    explanation: 'ระบุว่า "Open to all department coordinators"',
    difficulty: 'B1',
    relatedVocabWord: 'qualify',
  },
  {
    id: 'R13',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านรีวิวร้านอาหารจากนักวิจารณ์',
    passage: {
      type: 'article',
      title: 'Culinary Review: Trattoria Bella',
      content: 'While Trattoria Bella offers charming rustic decor and remarkably attentive staff, the pasta sauces lacked the vibrant seasoning one anticipates from traditional southern Italian cooking. However, their wood-fired artisan sourdough bread and house tiramisu comfortably redeemed the evening.',
    },
    question: 'What did the food reviewer find disappointing about Trattoria Bella?',
    options: [
      { id: 'A', text: 'The unfriendly attitude of the serving staff' },
      { id: 'B', text: 'The under-seasoned pasta sauces' },
      { id: 'C', text: 'The quality of the wood-fired bread' },
      { id: 'D', text: 'The overly expensive dessert menu' },
    ],
    correctAnswer: 'B',
    explanation: 'นักวิจารณ์ระบุว่าซอสพาสต้าขาดรสชาติที่จัดจ้าน ("the pasta sauces lacked the vibrant seasoning")',
    difficulty: 'B1+',
    relatedVocabWord: 'anticipate',
  },
  {
    id: 'R14',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านประกาศปรับปรุงระบบรถไฟฟ้าใต้ดิน',
    passage: {
      type: 'notice',
      title: 'Metro Transit System: Track Modernization',
      content: 'Line 3 services between Central Station and University Campus will be suspended this weekend due to signal upgrades. Replacement shuttle buses will operate every 8 minutes directly from street-level bus stop C outside Central Station.',
    },
    question: 'How frequently will replacement shuttle buses run?',
    options: [
      { id: 'A', text: 'Every 8 minutes' },
      { id: 'B', text: 'Every 15 minutes' },
      { id: 'C', text: 'Only once per hour' },
      { id: 'D', text: 'On demand via mobile phone booking' },
    ],
    correctAnswer: 'A',
    explanation: 'ประกาศระบุชัดเจนว่ารถบัสทดแทนจะออกทุกๆ 8 นาที ("Replacement shuttle buses will operate every 8 minutes")',
    difficulty: 'A2',
    relatedVocabWord: 'frequency',
  },
  {
    id: 'R15',
    partNumber: 2,
    section: 'reading',
    sectionTitle: 'Part 2: Reading & Comprehension',
    instructions: 'อ่านคำแนะนำด้านการยศาสตร์ (Ergonomics) ในที่ทำงาน',
    passage: {
      type: 'article',
      title: 'Workplace Health: Desk Ergonomics 101',
      content: 'To prevent repetitive strain injuries and chronic neck tension, position your computer monitor so that the top third of the screen sits directly at eye level. Your elbows should rest naturally at a ninety-degree angle when typing, and feet should be planted flat on the floor.',
    },
    question: 'At what height should a computer monitor be positioned?',
    options: [
      { id: 'A', text: 'Below the chest line to encourage looking downward' },
      { id: 'B', text: 'With the top third of the screen directly at eye level' },
      { id: 'C', text: 'At least ten inches above your head' },
      { id: 'D', text: 'Directly flat on top of the keyboard' },
    ],
    correctAnswer: 'B',
    explanation: 'บทความระบุว่า "top third of the screen sits directly at eye level"',
    difficulty: 'B1',
    relatedVocabWord: 'tension',
  },
];

// =================================================================
// ✍️ USE OF ENGLISH POOL (15 QUESTIONS)
// =================================================================
export const USE_OF_ENGLISH_POOL: ExamQuestion[] = [
  {
    id: 'V01',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือกคำศัพท์หรือวลีที่ถูกต้องที่สุดเพื่อเติมลงในประโยคให้สมบูรณ์',
    question: 'The young entrepreneur decided to __________ full advantage of the online marketing seminar to expand her business network.',
    options: [
      { id: 'A', text: 'make' },
      { id: 'B', text: 'take' },
      { id: 'C', text: 'have' },
      { id: 'D', text: 'give' },
    ],
    correctAnswer: 'B',
    explanation: 'Collocation สำคัญในภาษาอังกฤษคือ "take advantage of" แปลว่า "ใช้ประโยชน์จาก / ฉวยโอกาสจาก"',
    difficulty: 'B1',
    relatedVocabWord: 'advantage',
  },
  {
    id: 'V02',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือกคำบุพบท (Preposition) หรือคำเชื่อมที่ถูกต้อง',
    question: 'Our senior marketing director is directly responsible __________ coordinating all global advertising campaigns this season.',
    options: [
      { id: 'A', text: 'with' },
      { id: 'B', text: 'for' },
      { id: 'C', text: 'about' },
      { id: 'D', text: 'in' },
    ],
    correctAnswer: 'B',
    explanation: 'Adjective "responsible" ใช้คู่กับบุพบท "for" เสมอ: "responsible for something" (รับผิดชอบต่อสิ่งใด)',
    difficulty: 'B1',
    relatedVocabWord: 'responsible',
  },
  {
    id: 'V03',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือกคำศัพท์ที่ถูกต้องตามบริบทและความหมายของประโยค',
    question: 'Due to severe traffic congestion caused by roadworks, commuters experienced an unexpected __________ of thirty minutes.',
    options: [
      { id: 'A', text: 'delay' },
      { id: 'B', text: 'journey' },
      { id: 'C', text: 'transport' },
      { id: 'D', text: 'accident' },
    ],
    correctAnswer: 'A',
    explanation: 'จากบริบทการจราจรติดขัดรุนแรง ทำให้ผู้สัญจรต้องพบกับ "delay" (ความล่าช้า) 30 นาที',
    difficulty: 'A2',
    relatedVocabWord: 'delay',
  },
  {
    id: 'V04',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือกคำเชื่อม (Conjunction / Connector) ที่เชื่อมประโยคขัดแย้งได้อย่างถูกต้อง',
    question: '__________ the weather conditions were far from ideal, the mountain climbers successfully reached the summit on schedule.',
    options: [
      { id: 'A', text: 'Despite' },
      { id: 'B', text: 'Although' },
      { id: 'C', text: 'Because' },
      { id: 'D', text: 'However' },
    ],
    correctAnswer: 'B',
    explanation: '"Although" เชื่อมประโยครอง (Clause: Subject + Verb: the weather conditions were...) เพื่อแสดงความขัดแย้ง "แม้ว่าสภาพอากาศจะไม่เป็นใจ..." (ส่วน Despite ต้องตามด้วย Noun/Gerund)',
    difficulty: 'B1+',
    relatedVocabWord: 'condition',
  },
  {
    id: 'V05',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือกคำกริยาหรือ Tense ที่ถูกต้องตามหลักไวยากรณ์',
    question: 'Dr. Watson __________ at the national research institute for more than a decade and has published numerous scientific articles.',
    options: [
      { id: 'A', text: 'works' },
      { id: 'B', text: 'has worked' },
      { id: 'C', text: 'is working' },
      { id: 'D', text: 'worked' },
    ],
    correctAnswer: 'B',
    explanation: 'มีวลีแสดงช่วงเวลา "for more than a decade" (นานกว่า 10 ปี) เชื่อมโยงกับผลในปัจจุบัน ("and has published...") จึงต้องใช้ Present Perfect Tense "has worked"',
    difficulty: 'B1',
    relatedVocabWord: 'research',
  },
  {
    id: 'V06',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือก Phrasal Verb ที่มีความหมายถูกต้องตามบริบท',
    question: 'The committee had to __________ the proposal because it exceeded the department budget by fifty percent.',
    options: [
      { id: 'A', text: 'look after' },
      { id: 'B', text: 'turn down' },
      { id: 'C', text: 'give up' },
      { id: 'D', text: 'take off' },
    ],
    correctAnswer: 'B',
    explanation: '"turn down" เป็นกริยาวลีแปลว่า "ปฏิเสธ" (reject) สอดคล้องกับเหตุผลที่งบประมาณเกินไปถึง 50%',
    difficulty: 'B1',
    relatedVocabWord: 'refuse',
  },
  {
    id: 'V07',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือกคำศัพท์ที่ถูกต้องในบริบทการเดินทางและการท่องเที่ยว',
    question: 'The travel agency arranged comfortable hotel __________ near the historic city centre for our entire tour group.',
    options: [
      { id: 'A', text: 'accommodation' },
      { id: 'B', text: 'destination' },
      { id: 'C', text: 'navigation' },
      { id: 'D', text: 'transportation' },
    ],
    correctAnswer: 'A',
    explanation: '"hotel accommodation" หมายถึง "ที่พักโรงแรม" ตรงกับบริบทการจัดที่พักให้คณะทัวร์',
    difficulty: 'B1',
    relatedVocabWord: 'accommodation',
  },
  {
    id: 'V08',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือก Collocation ที่ถูกต้อง',
    question: 'Before launching the software update, our engineering team must __________ extensive tests to ensure zero security vulnerabilities.',
    options: [
      { id: 'A', text: 'conduct' },
      { id: 'B', text: 'invent' },
      { id: 'C', text: 'compose' },
      { id: 'D', text: 'pretend' },
    ],
    correctAnswer: 'A',
    explanation: 'Collocation มาตรฐานคือ "conduct tests / conduct research" แปลว่า "ดำเนินการทดสอบ / ทำการวิจัย"',
    difficulty: 'B1+',
    relatedVocabWord: 'conduct',
  },
  {
    id: 'V09',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือก Adverb ที่เหมาะสมกับประโยค',
    question: 'The international flight arrived __________ on time despite severe headwind turbulence over the Atlantic Ocean.',
    options: [
      { id: 'A', text: 'exactly' },
      { id: 'B', text: 'rarely' },
      { id: 'C', text: 'scarcely' },
      { id: 'D', text: 'doubtfully' },
    ],
    correctAnswer: 'A',
    explanation: '"exactly on time" หมายถึง "ตรงเวลาเป๊ะ" สอดคล้องกับ despite ที่บอกว่าแม้เจอลมปะทะก็ยังตรงเวลา',
    difficulty: 'A2',
    relatedVocabWord: 'exact',
  },
  {
    id: 'V10',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือกรูปประโยคเงื่อนไข (Conditional Clause) ที่ถูกต้อง',
    question: 'If customers __________ any technical difficulties with online payment, our 24/7 support hotline is ready to assist.',
    options: [
      { id: 'A', text: 'experience' },
      { id: 'B', text: 'will experience' },
      { id: 'C', text: 'experienced' },
      { id: 'D', text: 'had experienced' },
    ],
    correctAnswer: 'A',
    explanation: 'ใน First/Zero Conditional ท่อน if-clause ใช้ Present Simple ("If customers experience...")',
    difficulty: 'B1',
    relatedVocabWord: 'experience',
  },
  {
    id: 'V11',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือกคำศัพท์ที่ถูกต้องในบริบทการทำงาน',
    question: 'Employees who demonstrate exceptional creativity and leadership are often considered for career __________.',
    options: [
      { id: 'A', text: 'promotion' },
      { id: 'B', text: 'permission' },
      { id: 'C', text: 'prevention' },
      { id: 'D', text: 'punctuality' },
    ],
    correctAnswer: 'A',
    explanation: '"career promotion" หมายถึง "การเลื่อนตำแหน่งในสายอาชีพ" สอดคล้องกับการมีความคิดสร้างสรรค์และความเป็นผู้นำ',
    difficulty: 'B1',
    relatedVocabWord: 'promote',
  },
  {
    id: 'V12',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือกคำเชื่อมที่แสดงผลลัพธ์ (Result Conjunction)',
    question: 'The factory introduced automated robotic assembly lines; __________, overall production efficiency increased by thirty percent.',
    options: [
      { id: 'A', text: 'as a result' },
      { id: 'B', text: 'in contrast' },
      { id: 'C', text: 'on the other hand' },
      { id: 'D', text: 'otherwise' },
    ],
    correctAnswer: 'A',
    explanation: '"as a result" หมายถึง "เป็นผลให้ / ผลลัพธ์คือ" ใช้เชื่อมเหตุ (นำหุ่นยนต์มาใช้) กับผล (ประสิทธิภาพเพิ่มขึ้น 30%)',
    difficulty: 'B1',
    relatedVocabWord: 'result',
  },
  {
    id: 'V13',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือก Preposition ที่ใช้คู่กับ Adjective',
    question: 'The science professor was deeply impressed __________ the students\' innovative renewable energy presentation.',
    options: [
      { id: 'A', text: 'by' },
      { id: 'B', text: 'of' },
      { id: 'C', text: 'to' },
      { id: 'D', text: 'at' },
    ],
    correctAnswer: 'A',
    explanation: '"impressed by / with something" แปลว่า "ประทับใจในสิ่งใด"',
    difficulty: 'B1',
    relatedVocabWord: 'impress',
  },
  {
    id: 'V14',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือกคำศัพท์ที่ถูกต้องเกี่ยวกับสุขภาพ',
    question: 'Regular cardiovascular exercise and balanced nutrition play a vital role in the __________ of chronic health conditions.',
    options: [
      { id: 'A', text: 'prevention' },
      { id: 'B', text: 'pollution' },
      { id: 'C', text: 'possession' },
      { id: 'D', text: 'permission' },
    ],
    correctAnswer: 'A',
    explanation: '"prevention of chronic conditions" แปลว่า "การป้องกันโรคเรื้อรัง" ตรงกับประโยชน์ของการออกกำลังกายและการกินอาหารสมดุล',
    difficulty: 'B1+',
    relatedVocabWord: 'prevent',
  },
  {
    id: 'V15',
    partNumber: 3,
    section: 'use_of_english',
    sectionTitle: 'Part 3: Vocabulary & Use of English',
    instructions: 'เลือก Phrasal Verb ที่ถูกต้อง',
    question: 'Due to severe heavy snowstorms, the airline had no choice but to __________ all outbound flights until tomorrow morning.',
    options: [
      { id: 'A', text: 'call off' },
      { id: 'B', text: 'look up' },
      { id: 'C', text: 'get along' },
      { id: 'D', text: 'carry on' },
    ],
    correctAnswer: 'A',
    explanation: '"call off" เป็นสำนวนแปลว่า "ยกเลิก" (cancel) สอดคล้องกับพายุหิมะทำให้ต้องยกเลิกเที่ยวบินขาออก',
    difficulty: 'B1',
    relatedVocabWord: 'cancel',
  },
];

// Helper: Fisher-Yates array shuffler
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffle choices (A, B, C, D) and update correctAnswer pointer seamlessly
 */
function shuffleQuestionOptions(question: ExamQuestion): ExamQuestion {
  const originalOptions = question.options;
  const correctOptionText = originalOptions.find((o) => o.id === question.correctAnswer)?.text;

  // Shuffle text
  const shuffledTexts = shuffleArray(originalOptions.map((o) => o.text));
  const newLetters = ['A', 'B', 'C', 'D'];

  const newOptions: ExamOption[] = shuffledTexts.map((text, idx) => ({
    id: newLetters[idx],
    text,
  }));

  const newCorrectAnswer = newOptions.find((o) => o.text === correctOptionText)?.id || 'A';

  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };
}

export interface DynamicExamOptions {
  section?: ExamSection | 'all';
  totalCount?: number;
  shuffleChoices?: boolean;
}

/**
 * 🎲 Dynamic Exam Generator: Picks from pools and shuffles choices
 */
export function generateDynamicExam(options: DynamicExamOptions = {}): ExamQuestion[] {
  const {
    section = 'all',
    totalCount = 20,
    shuffleChoices = true,
  } = options;

  let selected: ExamQuestion[] = [];

  if (section === 'listening') {
    const shuffledL = shuffleArray(LISTENING_POOL);
    selected = shuffledL.slice(0, Math.min(totalCount, shuffledL.length));
  } else if (section === 'reading') {
    const shuffledR = shuffleArray(READING_POOL);
    selected = shuffledR.slice(0, Math.min(totalCount, shuffledR.length));
  } else if (section === 'use_of_english') {
    const shuffledU = shuffleArray(USE_OF_ENGLISH_POOL);
    selected = shuffledU.slice(0, Math.min(totalCount, shuffledU.length));
  } else {
    // Balanced multi-skill allocation (e.g. 7 Listening + 7 Reading + 6 Vocab for 20 total)
    const countL = Math.ceil(totalCount * 0.35); // 7
    const countR = Math.ceil(totalCount * 0.35); // 7
    const countU = totalCount - (countL + countR); // 6

    const pickedL = shuffleArray(LISTENING_POOL).slice(0, countL);
    const pickedR = shuffleArray(READING_POOL).slice(0, countR);
    const pickedU = shuffleArray(USE_OF_ENGLISH_POOL).slice(0, countU);

    selected = [...pickedL, ...pickedR, ...pickedU];
  }

  // Shuffle option positions if enabled
  if (shuffleChoices) {
    selected = selected.map((q) => shuffleQuestionOptions(q));
  }

  return selected;
}

// Pre-defined sets for users who prefer static sets
export const MOCK_EXAM_SET_1: ExamQuestion[] = [
  LISTENING_POOL[0],
  LISTENING_POOL[1],
  LISTENING_POOL[2],
  LISTENING_POOL[3],
  LISTENING_POOL[4],
  LISTENING_POOL[5],
  LISTENING_POOL[6],
  READING_POOL[0],
  READING_POOL[1],
  READING_POOL[2],
  READING_POOL[3],
  READING_POOL[4],
  READING_POOL[5],
  READING_POOL[6],
  USE_OF_ENGLISH_POOL[0],
  USE_OF_ENGLISH_POOL[1],
  USE_OF_ENGLISH_POOL[2],
  USE_OF_ENGLISH_POOL[3],
  USE_OF_ENGLISH_POOL[4],
  USE_OF_ENGLISH_POOL[5],
];

export const MOCK_EXAM_SET_2: ExamQuestion[] = [
  LISTENING_POOL[7],
  LISTENING_POOL[8],
  LISTENING_POOL[9],
  LISTENING_POOL[10],
  LISTENING_POOL[11],
  LISTENING_POOL[12],
  LISTENING_POOL[13],
  READING_POOL[7],
  READING_POOL[8],
  READING_POOL[9],
  READING_POOL[10],
  READING_POOL[11],
  READING_POOL[12],
  READING_POOL[13],
  USE_OF_ENGLISH_POOL[6],
  USE_OF_ENGLISH_POOL[7],
  USE_OF_ENGLISH_POOL[8],
  USE_OF_ENGLISH_POOL[9],
  USE_OF_ENGLISH_POOL[10],
  USE_OF_ENGLISH_POOL[11],
];

export const MOCK_EXAM_SET_3: ExamQuestion[] = [
  LISTENING_POOL[1],
  LISTENING_POOL[4],
  LISTENING_POOL[8],
  LISTENING_POOL[11],
  LISTENING_POOL[12],
  LISTENING_POOL[13],
  LISTENING_POOL[14],
  READING_POOL[2],
  READING_POOL[5],
  READING_POOL[7],
  READING_POOL[9],
  READING_POOL[10],
  READING_POOL[13],
  READING_POOL[14],
  USE_OF_ENGLISH_POOL[1],
  USE_OF_ENGLISH_POOL[3],
  USE_OF_ENGLISH_POOL[7],
  USE_OF_ENGLISH_POOL[11],
  USE_OF_ENGLISH_POOL[13],
  USE_OF_ENGLISH_POOL[14],
];
