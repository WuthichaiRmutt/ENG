export interface VocabularyItem {
  id: string;
  word: string;
  pos: string;
  ipa: string;
  meaning: string;
  example: string;
  category: string;
}

export const CAMBRIDGE_B1_VOCABULARY: VocabularyItem[] = [
  {
    "id": "b1_001",
    "word": "abroad",
    "pos": "adv.",
    "ipa": "/əˈbrɔːd/",
    "meaning": "ในต่างประเทศ",
    "example": "Studying abroad allows you to learn about diverse global cultures.",
    "category": "Travel & Transport",
    "collocations": ["travel abroad", "study abroad", "live abroad"],
    "synonyms": ["overseas", "internationally"],
    "antonyms": ["at home", "domestically"]
  },
  {
    "id": "b1_002",
    "word": "accept",
    "pos": "v.",
    "ipa": "/əkˈsept/",
    "meaning": "ยอมรับ",
    "example": "She happily accepted the university's admission offer.",
    "category": "General",
    "wordFamily": {
      "noun": "acceptance",
      "verb": "accept",
      "adj": "acceptable",
      "adv": "acceptably"
    },
    "collocations": ["accept an offer", "accept responsibility", "accept advice"],
    "synonyms": ["agree to", "receive", "admit"],
    "antonyms": ["reject", "refuse", "decline"]
  },
  {
    "id": "b1_003",
    "word": "accommodation",
    "pos": "n.",
    "ipa": "/əˌkɒməˈdeɪʃn/",
    "meaning": "ที่พักอาศัย, โรงแรม",
    "example": "The package tour includes luxury beachfront hotel accommodation.",
    "category": "Travel & Transport",
    "wordFamily": {
      "noun": "accommodation",
      "verb": "accommodate",
      "adj": "accommodating"
    },
    "collocations": ["book accommodation", "provide accommodation", "temporary accommodation"],
    "synonyms": ["housing", "lodging", "shelter"]
  },
  {
    "id": "b1_004",
    "word": "accurate",
    "pos": "adj.",
    "ipa": "/ˈækjərət/",
    "meaning": "แม่นยำ, ถูกต้อง",
    "example": "The digital thermometer provides extremely accurate body temperature readings.",
    "category": "Descriptive Words",
    "wordFamily": {
      "noun": "accuracy",
      "adj": "accurate",
      "adv": "accurately"
    },
    "collocations": ["accurate measurement", "accurate description", "highly accurate"],
    "synonyms": ["precise", "correct", "exact"],
    "antonyms": ["inaccurate", "wrong", "imprecise"]
  },
  {
    "id": "b1_005",
    "word": "achieve",
    "pos": "v.",
    "ipa": "/əˈtʃiːv/",
    "meaning": "บรรลุเป้าหมาย, ทำสำเร็จ",
    "example": "She worked tirelessly to achieve her academic goals.",
    "category": "Daily Life",
    "wordFamily": {
      "noun": "achievement",
      "verb": "achieve",
      "adj": "achievable"
    },
    "collocations": ["achieve a goal", "achieve success", "achieve results"],
    "synonyms": ["accomplish", "attain", "reach"],
    "antonyms": ["fail", "give up"]
  },
  {
    "id": "b1_006",
    "word": "acquaintance",
    "pos": "n.",
    "ipa": "/əˈkweɪntəns/",
    "meaning": "คนรู้จัก (แต่ไม่สนิท)",
    "example": "He is not a close friend, just an acquaintance from tennis club.",
    "category": "Relationships"
  },
  {
    "id": "b1_007",
    "word": "act",
    "pos": "v.",
    "ipa": "/ækt/",
    "meaning": "กระทำ, แสดง",
    "example": "You must act swiftly during emergencies.",
    "category": "General"
  },
  {
    "id": "b1_008",
    "word": "acting",
    "pos": "n.",
    "ipa": "/ˈæktɪŋ/",
    "meaning": "การแสดงละคร/ภาพยนตร์",
    "example": "She studied classical acting at a drama academy in London.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_009",
    "word": "add",
    "pos": "v.",
    "ipa": "/æd/",
    "meaning": "เพิ่ม, บวก",
    "example": "Add a pinch of salt to balance the flavor.",
    "category": "General"
  },
  {
    "id": "b1_010",
    "word": "address",
    "pos": "v.",
    "ipa": "/əˈdres/",
    "meaning": "จัดการปัญหา, จ่าหน้าซอง",
    "example": "The government needs to address the affordable housing crisis.",
    "category": "General"
  },
  {
    "id": "b1_011",
    "word": "adequate",
    "pos": "adj.",
    "ipa": "/ˈædɪkwət/",
    "meaning": "เพียงพอ, เหมาะสม",
    "example": "Make sure you drink an adequate amount of water during hot summer days.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_012",
    "word": "adjust",
    "pos": "v.",
    "ipa": "/əˈdʒʌst/",
    "meaning": "ปรับแต่ง",
    "example": "Adjust your chair height to avoid back pain.",
    "category": "General"
  },
  {
    "id": "b1_013",
    "word": "admire",
    "pos": "v.",
    "ipa": "/ədˈmaɪər/",
    "meaning": "ชื่นชม, ยกย่อง",
    "example": "I really admire her courage to speak in public.",
    "category": "Daily Life"
  },
  {
    "id": "b1_014",
    "word": "admit",
    "pos": "v.",
    "ipa": "/ədˈmɪt/",
    "meaning": "ยอมรับความจริง",
    "example": "He finally admitted that he was wrong about the directions.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_015",
    "word": "adopt",
    "pos": "v.",
    "ipa": "/əˈdɒpt/",
    "meaning": "รับเลี้ยงเป็นบุตรบุญธรรม/สัตว์เลี้ยง",
    "example": "They decided to adopt a rescue dog from the local animal shelter.",
    "category": "Relationships"
  },
  {
    "id": "b1_016",
    "word": "adventure",
    "pos": "n.",
    "ipa": "/ədˈventʃər/",
    "meaning": "การผจญภัย",
    "example": "Their rafting trip down the river was an unforgettable adventure.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_017",
    "word": "advise",
    "pos": "v.",
    "ipa": "/ədˈvaɪz/",
    "meaning": "ให้คำแนะนำ",
    "example": "Financial experts advise saving at least twenty percent of your income.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_018",
    "word": "affect",
    "pos": "v.",
    "ipa": "/əˈfekt/",
    "meaning": "ส่งผลกระทบต่อ",
    "example": "Extreme weather can seriously affect public transport.",
    "category": "Daily Life"
  },
  {
    "id": "b1_019",
    "word": "afford",
    "pos": "v.",
    "ipa": "/əˈfɔːd/",
    "meaning": "มีเงิน/เวลาพอที่จะซื้อหรือทำ",
    "example": "We cannot afford to go on an overseas holiday this year.",
    "category": "Daily Life"
  },
  {
    "id": "b1_020",
    "word": "affordable",
    "pos": "adj.",
    "ipa": "/əˈfɔːdəbl/",
    "meaning": "ราคาจับต้องได้, ไม่แพง",
    "example": "The district has plenty of clean, affordable student accommodation apartments.",
    "category": "Shopping & City"
  },
  {
    "id": "b1_021",
    "word": "agree",
    "pos": "v.",
    "ipa": "/əˈɡriː/",
    "meaning": "เห็นพ้องต้องกัน",
    "example": "We all agreed on the proposed holiday destination.",
    "category": "General"
  },
  {
    "id": "b1_022",
    "word": "aim",
    "pos": "v.",
    "ipa": "/eɪm/",
    "meaning": "ตั้งเป้าหมาย",
    "example": "We aim to complete the application by tomorrow morning.",
    "category": "General"
  },
  {
    "id": "b1_023",
    "word": "airline",
    "pos": "n.",
    "ipa": "/ˈeəlaɪn/",
    "meaning": "สายการบิน",
    "example": "Which airline offers the best direct flights to Tokyo?",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_024",
    "word": "allergy",
    "pos": "n.",
    "ipa": "/ˈælədʒi/",
    "meaning": "อาการแพ้",
    "example": "Always inform the restaurant waiter if you have a severe peanut allergy.",
    "category": "Health & Food"
  },
  {
    "id": "b1_025",
    "word": "allow",
    "pos": "v.",
    "ipa": "/əˈlaʊ/",
    "meaning": "อนุญาตให้ทำ",
    "example": "Passengers are not allowed to smoke anywhere inside the terminal.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_026",
    "word": "analyse",
    "pos": "v.",
    "ipa": "/ˈænəlaɪz/",
    "meaning": "วิเคราะห์",
    "example": "Scientists analysed the water samples for microplastics.",
    "category": "General"
  },
  {
    "id": "b1_027",
    "word": "ancestor",
    "pos": "n.",
    "ipa": "/ˈænsestər/",
    "meaning": "บรรพบุรุษ",
    "example": "Her ancestors migrated from northern Scotland over two centuries ago.",
    "category": "Relationships"
  },
  {
    "id": "b1_028",
    "word": "ancient",
    "pos": "adj.",
    "ipa": "/ˈeɪnʃənt/",
    "meaning": "โบราณ, เก่าแก่มาก",
    "example": "Tourists queued to explore the ancient ruins of the Roman Colosseum.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_029",
    "word": "announce",
    "pos": "v.",
    "ipa": "/əˈnaʊns/",
    "meaning": "ประกาศ",
    "example": "The headmaster will announce the winner of the essay contest.",
    "category": "General"
  },
  {
    "id": "b1_030",
    "word": "announcement",
    "pos": "n.",
    "ipa": "/əˈnaʊnsmənt/",
    "meaning": "การประกาศแจ้งข้อมูล",
    "example": "Listen carefully to the platform announcement for train updates.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_031",
    "word": "annoy",
    "pos": "v.",
    "ipa": "/əˈnɔɪ/",
    "meaning": "ทำให้รำคาญใจ",
    "example": "Loud notifications during lectures annoy the professor.",
    "category": "General"
  },
  {
    "id": "b1_032",
    "word": "anxious",
    "pos": "adj.",
    "ipa": "/ˈæŋkʃəs/",
    "meaning": "วิตกกังวล, กระวนกระวาย",
    "example": "She felt slightly anxious before walking onto the exam stage.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_033",
    "word": "apologise",
    "pos": "v.",
    "ipa": "/əˈpɒlədʒaɪz/",
    "meaning": "ขอโทษ",
    "example": "He sent a message to apologise for missing the meeting.",
    "category": "Daily Life"
  },
  {
    "id": "b1_034",
    "word": "appetite",
    "pos": "n.",
    "ipa": "/ˈæpɪtaɪt/",
    "meaning": "ความอยากอาหาร",
    "example": "A brisk morning jog will surely stimulate your healthy breakfast appetite.",
    "category": "Health & Food"
  },
  {
    "id": "b1_035",
    "word": "applicant",
    "pos": "n.",
    "ipa": "/ˈæplɪkənt/",
    "meaning": "ผู้สมัครงาน",
    "example": "Over two hundred applicants applied for the marketing manager position.",
    "category": "Work & Career"
  },
  {
    "id": "b1_036",
    "word": "application",
    "pos": "n.",
    "ipa": "/ˌæplɪˈkeɪʃn/",
    "meaning": "แอปพลิเคชัน, โปรแกรม",
    "example": "This vocabulary application helps English learners remember words faster.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_037",
    "word": "apply",
    "pos": "v.",
    "ipa": "/əˈplaɪ/",
    "meaning": "สมัคร, ประยุกต์ใช้",
    "example": "She applied for an international scholarship in Melbourne.",
    "category": "General"
  },
  {
    "id": "b1_038",
    "word": "appoint",
    "pos": "v.",
    "ipa": "/əˈpɔɪnt/",
    "meaning": "แต่งตั้ง",
    "example": "The board appointed a new executive director.",
    "category": "General"
  },
  {
    "id": "b1_039",
    "word": "appreciate",
    "pos": "v.",
    "ipa": "/əˈpriːʃieɪt/",
    "meaning": "ซาบซึ้ง, เห็นคุณค่า",
    "example": "I truly appreciate your thoughtful assistance with my project.",
    "category": "General"
  },
  {
    "id": "b1_040",
    "word": "approach",
    "pos": "v.",
    "ipa": "/əˈprəʊtʃ/",
    "meaning": "เข้าใกล้",
    "example": "Slow down as your car approaches the pedestrian crossing.",
    "category": "General"
  },
  {
    "id": "b1_041",
    "word": "approve",
    "pos": "v.",
    "ipa": "/əˈpruːv/",
    "meaning": "อนุมัติ, เห็นชอบ",
    "example": "The city council approved plans to build a new public library.",
    "category": "General"
  },
  {
    "id": "b1_042",
    "word": "approximate",
    "pos": "adj.",
    "ipa": "/əˈprɒksɪmət/",
    "meaning": "โดยประมาณ, คร่าวๆ",
    "example": "The approximate flight time from London to Bangkok is eleven hours.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_043",
    "word": "argue",
    "pos": "v.",
    "ipa": "/ˈɑːɡjuː/",
    "meaning": "โต้เถียง, ทะเลาะ",
    "example": "They often argue about minor things, but they always make up quickly.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_044",
    "word": "arrange",
    "pos": "v.",
    "ipa": "/əˈreɪndʒ/",
    "meaning": "จัดเตรียม, นัดหมาย",
    "example": "Could you arrange a convenient time for us to meet?",
    "category": "Daily Life"
  },
  {
    "id": "b1_045",
    "word": "arrest",
    "pos": "v.",
    "ipa": "/əˈrest/",
    "meaning": "จับกุม",
    "example": "The police arrested the suspect near the train station.",
    "category": "General"
  },
  {
    "id": "b1_046",
    "word": "arrive",
    "pos": "v.",
    "ipa": "/əˈraɪv/",
    "meaning": "มาถึง",
    "example": "The express train will arrive at platform two momentarily.",
    "category": "General"
  },
  {
    "id": "b1_047",
    "word": "artificial",
    "pos": "adj.",
    "ipa": "/ˌɑːtɪˈfɪʃl/",
    "meaning": "เทียม, ประดิษฐ์ขึ้น",
    "example": "This flower arrangement is made of high quality artificial silk.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_048",
    "word": "assignment",
    "pos": "n.",
    "ipa": "/əˈsaɪnmənt/",
    "meaning": "งานที่ได้รับมอบหมาย, การบ้าน",
    "example": "The literature professor gave us a five-page essay assignment.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_049",
    "word": "assist",
    "pos": "v.",
    "ipa": "/əˈsɪst/",
    "meaning": "ช่วยเหลือ",
    "example": "Volunteers assisted elderly residents with their weekly groceries.",
    "category": "General"
  },
  {
    "id": "b1_050",
    "word": "assume",
    "pos": "v.",
    "ipa": "/əˈsjuːm/",
    "meaning": "สันนิษฐาน",
    "example": "Never assume you know someone's motives without asking.",
    "category": "General"
  },
  {
    "id": "b1_051",
    "word": "atmosphere",
    "pos": "n.",
    "ipa": "/ˈætməsfɪər/",
    "meaning": "บรรยากาศ",
    "example": "The cafe has a warm, relaxed atmosphere that is ideal for afternoon reading.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_052",
    "word": "attach",
    "pos": "v.",
    "ipa": "/əˈtætʃ/",
    "meaning": "แนบไฟล์, ติดแน่น",
    "example": "Attach a recent passport photo to your visa application form.",
    "category": "General"
  },
  {
    "id": "b1_053",
    "word": "attachment",
    "pos": "n.",
    "ipa": "/əˈtætʃmənt/",
    "meaning": "ไฟล์แนบในอีเมล",
    "example": "Please review the updated price proposal in the email attachment.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_054",
    "word": "attack",
    "pos": "v.",
    "ipa": "/əˈtæk/",
    "meaning": "โจมตี",
    "example": "Cybercriminals attack unsecured networks to steal private credentials.",
    "category": "General"
  },
  {
    "id": "b1_055",
    "word": "attempt",
    "pos": "v.",
    "ipa": "/əˈtempt/",
    "meaning": "พยายามทำ",
    "example": "He made a brave attempt to swim across the cold lake.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_056",
    "word": "attend",
    "pos": "v.",
    "ipa": "/əˈtend/",
    "meaning": "เข้าร่วม",
    "example": "Hundreds of delegates attended the international climate conference.",
    "category": "General"
  },
  {
    "id": "b1_057",
    "word": "attract",
    "pos": "v.",
    "ipa": "/əˈtrækt/",
    "meaning": "ดึงดูดความสนใจ",
    "example": "The summer festival attracts thousands of international visitors.",
    "category": "Daily Life"
  },
  {
    "id": "b1_058",
    "word": "audience",
    "pos": "n.",
    "ipa": "/ˈɔːdiəns/",
    "meaning": "ผู้ชม, ผู้ฟัง",
    "example": "The audience burst into enthusiastic applause after the concert.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_059",
    "word": "author",
    "pos": "n.",
    "ipa": "/ˈɔːθər/",
    "meaning": "นักเขียน, ผู้แต่ง",
    "example": "The author signed copies of her new mystery novel for fans.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_060",
    "word": "automatic",
    "pos": "adj.",
    "ipa": "/ˌɔːtəˈmætɪk/",
    "meaning": "อัตโนมัติ",
    "example": "The sliding glass doors are automatic and open as you approach.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_061",
    "word": "avoid",
    "pos": "v.",
    "ipa": "/əˈvɔɪd/",
    "meaning": "หลีกเลี่ยง",
    "example": "You should take the highway to avoid morning traffic jams.",
    "category": "Daily Life"
  },
  {
    "id": "b1_062",
    "word": "awkward",
    "pos": "adj.",
    "ipa": "/ˈɔːkwəd/",
    "meaning": "เก้งก้าง, อึดอัดใจ",
    "example": "There was an awkward silence when nobody answered the professor's question.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_063",
    "word": "baggage",
    "pos": "n.",
    "ipa": "/ˈbæɡɪdʒ/",
    "meaning": "สัมภาระ, กระเป๋าเดินทาง",
    "example": "Passengers must collect their checked baggage at carousel number 4.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_064",
    "word": "bake",
    "pos": "v.",
    "ipa": "/beɪk/",
    "meaning": "อบขนม/อาหาร",
    "example": "Grandma baked fresh cinnamon rolls for Sunday breakfast.",
    "category": "General"
  },
  {
    "id": "b1_065",
    "word": "balance",
    "pos": "v.",
    "ipa": "/ˈbæləns/",
    "meaning": "สร้างสมดุล",
    "example": "Try to balance challenging study sessions with restful breaks.",
    "category": "General"
  },
  {
    "id": "b1_066",
    "word": "balanced",
    "pos": "adj.",
    "ipa": "/ˈbælənst/",
    "meaning": "สมดุล, ครบถ้วน",
    "example": "Nutritionists recommend eating a balanced diet rich in vegetables and whole grains.",
    "category": "Health & Food"
  },
  {
    "id": "b1_067",
    "word": "balcony",
    "pos": "n.",
    "ipa": "/ˈbælkəni/",
    "meaning": "ระเบียง",
    "example": "We enjoyed our morning coffee on the sunny balcony overlooking the sea.",
    "category": "Home & Living"
  },
  {
    "id": "b1_068",
    "word": "ballet",
    "pos": "n.",
    "ipa": "/ˈbæleɪ/",
    "meaning": "การแสดงบัลเลต์",
    "example": "We purchased front-row tickets to watch Swan Lake at the opera house.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_069",
    "word": "ban",
    "pos": "v.",
    "ipa": "/bæn/",
    "meaning": "สั่งห้าม",
    "example": "The municipality banned single-use plastic bags in grocery stores.",
    "category": "General"
  },
  {
    "id": "b1_070",
    "word": "band",
    "pos": "n.",
    "ipa": "/bænd/",
    "meaning": "วงดนตรี",
    "example": "The indie rock band will perform live at the music festival this weekend.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_071",
    "word": "bargain",
    "pos": "n.",
    "ipa": "/ˈbɑːɡən/",
    "meaning": "สินค้าราคาถูกเป็นพิเศษ",
    "example": "She found a genuine vintage leather jacket at a real bargain price.",
    "category": "Shopping & City"
  },
  {
    "id": "b1_072",
    "word": "basement",
    "pos": "n.",
    "ipa": "/ˈbeɪsmənt/",
    "meaning": "ชั้นใต้ดิน",
    "example": "They converted the damp basement into a modern games and fitness room.",
    "category": "Home & Living"
  },
  {
    "id": "b1_073",
    "word": "battery",
    "pos": "n.",
    "ipa": "/ˈbætəri/",
    "meaning": "แบตเตอรี่",
    "example": "The laptop battery lasts for over ten hours on a single charge.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_074",
    "word": "battle",
    "pos": "v.",
    "ipa": "/ˈbætl/",
    "meaning": "ต่อสู้, ฝ่าฟัน",
    "example": "Firefighters battled the blaze through the windy night.",
    "category": "General"
  },
  {
    "id": "b1_075",
    "word": "beat",
    "pos": "v.",
    "ipa": "/biːt/",
    "meaning": "เอาชนะ, ตี",
    "example": "Our team beat the defending champions by two points.",
    "category": "General"
  },
  {
    "id": "b1_076",
    "word": "beg",
    "pos": "v.",
    "ipa": "/beɡ/",
    "meaning": "ขอร้อง, วิงวอน",
    "example": "The child begged his parents for a bedtime story.",
    "category": "General"
  },
  {
    "id": "b1_077",
    "word": "behave",
    "pos": "v.",
    "ipa": "/bɪˈheɪv/",
    "meaning": "ประพฤติตัว, ปฏิบัติตน",
    "example": "The pupils were praised for behaving politely during the museum tour.",
    "category": "Daily Life"
  },
  {
    "id": "b1_078",
    "word": "belong",
    "pos": "v.",
    "ipa": "/bɪˈlɒŋ/",
    "meaning": "เป็นของ, สังกัดอยู่",
    "example": "Excuse me, does this leather wallet belong to you?",
    "category": "Daily Life"
  },
  {
    "id": "b1_079",
    "word": "belong to",
    "pos": "phr. v.",
    "ipa": "/bɪˈlɒŋ tuː/",
    "meaning": "เป็นของ",
    "example": "This vintage fountain pen belongs to my great-grandfather.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_080",
    "word": "bend",
    "pos": "v.",
    "ipa": "/bend/",
    "meaning": "โค้งงอ, ก้ม",
    "example": "Bend your knees when lifting heavy luggage to avoid back strain.",
    "category": "General"
  },
  {
    "id": "b1_081",
    "word": "bet",
    "pos": "v.",
    "ipa": "/bet/",
    "meaning": "พนัน, มั่นใจว่า",
    "example": "I bet you will pass your Cambridge B1 exam with top marks.",
    "category": "General"
  },
  {
    "id": "b1_082",
    "word": "bilingual",
    "pos": "adj.",
    "ipa": "/ˌbaɪˈlɪŋɡwəl/",
    "meaning": "พูดได้สองภาษา",
    "example": "Growing up in Canada allowed her to become effortlessly bilingual in English and French.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_083",
    "word": "bite",
    "pos": "v.",
    "ipa": "/baɪt/",
    "meaning": "กัด",
    "example": "Mosquitoes rarely bite if you apply herbal insect repellent.",
    "category": "General"
  },
  {
    "id": "b1_084",
    "word": "blame",
    "pos": "v.",
    "ipa": "/bleɪm/",
    "meaning": "ตำหนิ, กล่าวโทษ",
    "example": "Do not blame others for your own avoidable mistakes.",
    "category": "General"
  },
  {
    "id": "b1_085",
    "word": "blanket",
    "pos": "n.",
    "ipa": "/ˈblæŋkɪt/",
    "meaning": "ผ้าห่ม",
    "example": "Wrap yourself in this warm woollen blanket if you feel chilly.",
    "category": "Home & Living"
  },
  {
    "id": "b1_086",
    "word": "bleed",
    "pos": "v.",
    "ipa": "/bliːd/",
    "meaning": "เลือดออก",
    "example": "Apply gentle pressure if your finger starts to bleed.",
    "category": "General"
  },
  {
    "id": "b1_087",
    "word": "block",
    "pos": "v.",
    "ipa": "/blɒk/",
    "meaning": "กีดขวาง",
    "example": "A fallen branch blocked the narrow country road.",
    "category": "General"
  },
  {
    "id": "b1_088",
    "word": "blow",
    "pos": "v.",
    "ipa": "/bləʊ/",
    "meaning": "พัด, เป่า",
    "example": "A gentle sea breeze blew across the sandy beach.",
    "category": "General"
  },
  {
    "id": "b1_089",
    "word": "boarding",
    "pos": "n.",
    "ipa": "/ˈbɔːdɪŋ/",
    "meaning": "การขึ้นเครื่องบิน/เรือ",
    "example": "Boarding for flight QR812 will begin at gate 24 in fifteen minutes.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_090",
    "word": "boil",
    "pos": "v.",
    "ipa": "/bɔɪl/",
    "meaning": "ต้มจนเดือด",
    "example": "Boil the water thoroughly before drinking from natural mountain streams.",
    "category": "General"
  },
  {
    "id": "b1_091",
    "word": "boost",
    "pos": "v.",
    "ipa": "/buːst/",
    "meaning": "ส่งเสริม, เพิ่มพูน",
    "example": "Flashcard repetition boosts long-term memory significantly.",
    "category": "General"
  },
  {
    "id": "b1_092",
    "word": "borrow",
    "pos": "v.",
    "ipa": "/ˈbɒrəʊ/",
    "meaning": "ขอยืม",
    "example": "May I borrow your English dictionary for a moment?",
    "category": "Daily Life"
  },
  {
    "id": "b1_093",
    "word": "bother",
    "pos": "v.",
    "ipa": "/ˈbɒðər/",
    "meaning": "รบกวน, ทำให้กังวล",
    "example": "I am very sorry to bother you while you are studying.",
    "category": "Daily Life"
  },
  {
    "id": "b1_094",
    "word": "brake",
    "pos": "v.",
    "ipa": "/breɪk/",
    "meaning": "เหยียบเบรก",
    "example": "The bus driver braked quickly to avoid the deer.",
    "category": "General"
  },
  {
    "id": "b1_095",
    "word": "break down",
    "pos": "phr. v.",
    "ipa": "/breɪk daʊn/",
    "meaning": "เครื่องยนต์เสีย, พัง",
    "example": "Our family car broke down on the expressway during rush hour.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_096",
    "word": "breathe",
    "pos": "v.",
    "ipa": "/briːð/",
    "meaning": "หายใจ",
    "example": "Take deep breaths and stay calm during the timed speaking examination.",
    "category": "Health & Food"
  },
  {
    "id": "b1_097",
    "word": "breed",
    "pos": "v.",
    "ipa": "/briːd/",
    "meaning": "เพาะพันธุ์",
    "example": "The conservation park breeds rare sea turtles in safe hatcheries.",
    "category": "General"
  },
  {
    "id": "b1_098",
    "word": "bride",
    "pos": "n.",
    "ipa": "/braɪd/",
    "meaning": "เจ้าสาว",
    "example": "The radiant bride wore a breathtaking hand-stitched lace gown.",
    "category": "Relationships"
  },
  {
    "id": "b1_099",
    "word": "brilliant",
    "pos": "adj.",
    "ipa": "/ˈbrɪliənt/",
    "meaning": "ยอดเยี่ยม, ฉลาดหลักแหลม",
    "example": "Her brilliant invention solved the clean water crisis for several rural communities.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_100",
    "word": "bring up",
    "pos": "phr. v.",
    "ipa": "/brɪŋ ʌp/",
    "meaning": "เลี้ยงดูเด็ก, หยิบยกเรื่องขึ้นมา",
    "example": "She was lovingly brought up by her grandparents in a rural village.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_101",
    "word": "broadcast",
    "pos": "v.",
    "ipa": "/ˈbrɔːdkɑːst/",
    "meaning": "แพร่ภาพ, ถ่ายทอดสด",
    "example": "The national television channel will broadcast the World Cup final live.",
    "category": "Media & Society"
  },
  {
    "id": "b1_102",
    "word": "brochure",
    "pos": "n.",
    "ipa": "/ˈbrəʊʃər/",
    "meaning": "แผ่นพับข้อมูลนำเที่ยว",
    "example": "We picked up a colourful travel brochure at the visitor tourist centre.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_103",
    "word": "browser",
    "pos": "n.",
    "ipa": "/ˈbraʊzər/",
    "meaning": "เว็บเบราว์เซอร์",
    "example": "Make sure your internet browser is updated to the latest security version.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_104",
    "word": "brush",
    "pos": "v.",
    "ipa": "/brʌʃ/",
    "meaning": "แปรง",
    "example": "Brush your teeth twice a day with fluoride toothpaste.",
    "category": "General"
  },
  {
    "id": "b1_105",
    "word": "burn",
    "pos": "v.",
    "ipa": "/bɜːn/",
    "meaning": "เผาไหม้",
    "example": "Campers must ensure campfire embers do not burn unattended.",
    "category": "General"
  },
  {
    "id": "b1_106",
    "word": "burst",
    "pos": "v.",
    "ipa": "/bɜːst/",
    "meaning": "ระเบิดออก, แตกออก",
    "example": "The colourful party balloon burst when it touched the cactus.",
    "category": "General"
  },
  {
    "id": "b1_107",
    "word": "bury",
    "pos": "v.",
    "ipa": "/ˈberi/",
    "meaning": "ฝังดิน",
    "example": "The dog buried its favourite bone in the backyard garden.",
    "category": "General"
  },
  {
    "id": "b1_108",
    "word": "calculate",
    "pos": "v.",
    "ipa": "/ˈkælkjuleɪt/",
    "meaning": "คำนวณ",
    "example": "Use the app's built-in calculator to calculate your monthly expenses.",
    "category": "General"
  },
  {
    "id": "b1_109",
    "word": "calm",
    "pos": "v.",
    "ipa": "/kɑːm/",
    "meaning": "สงบจิตใจ",
    "example": "Listening to soft instrumental music helps calm exam jitters.",
    "category": "General"
  },
  {
    "id": "b1_110",
    "word": "calory",
    "pos": "n.",
    "ipa": "/ˈkæləri/",
    "meaning": "แคลอรี, หน่วยพลังงาน",
    "example": "Drinking sweet carbonated drinks adds unnecessary calories to your diet.",
    "category": "Health & Food"
  },
  {
    "id": "b1_111",
    "word": "camp",
    "pos": "v.",
    "ipa": "/kæmp/",
    "meaning": "ตั้งแคมป์",
    "example": "We plan to camp near the national forest lake this weekend.",
    "category": "General"
  },
  {
    "id": "b1_112",
    "word": "cancel",
    "pos": "v.",
    "ipa": "/ˈkænsl/",
    "meaning": "ยกเลิก",
    "example": "They had to cancel the outdoor festival due to torrential downpours.",
    "category": "General"
  },
  {
    "id": "b1_113",
    "word": "cancelled",
    "pos": "adj.",
    "ipa": "/ˈkænsld/",
    "meaning": "ถูกยกเลิก",
    "example": "Due to thick fog, all morning ferry services have been cancelled.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_114",
    "word": "canvas",
    "pos": "n.",
    "ipa": "/ˈkænvəs/",
    "meaning": "ผ้าใบวาดรูป",
    "example": "The painter applied vibrant oil colours onto the blank canvas.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_115",
    "word": "capture",
    "pos": "v.",
    "ipa": "/ˈkæptʃər/",
    "meaning": "จับกุม, บันทึกภาพ",
    "example": "The camera captured the stunning colors of the sunset.",
    "category": "General"
  },
  {
    "id": "b1_116",
    "word": "care",
    "pos": "v.",
    "ipa": "/keər/",
    "meaning": "ใส่ใจ, ดูแล",
    "example": "Good doctors care deeply about their patients' physical and mental wellbeing.",
    "category": "General"
  },
  {
    "id": "b1_117",
    "word": "career",
    "pos": "n.",
    "ipa": "/kəˈrɪər/",
    "meaning": "อาชีพการงาน, เส้นทางอาชีพ",
    "example": "She pursued a successful career in international finance.",
    "category": "Work & Career"
  },
  {
    "id": "b1_118",
    "word": "carpet",
    "pos": "n.",
    "ipa": "/ˈkɑːpɪt/",
    "meaning": "พรมปูพื้น",
    "example": "Remember to take off your outdoor shoes before walking on the carpet.",
    "category": "Home & Living"
  },
  {
    "id": "b1_119",
    "word": "carry on",
    "pos": "phr. v.",
    "ipa": "/ˈkæri ɒn/",
    "meaning": "ทำต่อไป, ดำเนินต่อไป",
    "example": "Please carry on with your reading while I write on the board.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_120",
    "word": "cashier",
    "pos": "n.",
    "ipa": "/kæˈʃɪər/",
    "meaning": "พนักงานคิดเงิน, แคชเชียร์",
    "example": "Hand your store discount coupon to the cashier before paying for your groceries.",
    "category": "Shopping & City"
  },
  {
    "id": "b1_121",
    "word": "catch up",
    "pos": "phr. v.",
    "ipa": "/kætʃ ʌp/",
    "meaning": "ตามทัน, พบปะพูดคุยอัปเดต",
    "example": "Let us grab coffee this weekend to catch up on each other's news.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_122",
    "word": "cautious",
    "pos": "adj.",
    "ipa": "/ˈkɔːʃəs/",
    "meaning": "ระมัดระวัง, รอบคอบ",
    "example": "Drivers should be especially cautious on wet, slippery roads.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_123",
    "word": "ceiling",
    "pos": "n.",
    "ipa": "/ˈsiːlɪŋ/",
    "meaning": "เพดาน",
    "example": "The high ceiling makes the living room feel spacious and airy.",
    "category": "Home & Living"
  },
  {
    "id": "b1_124",
    "word": "celebrate",
    "pos": "v.",
    "ipa": "/ˈselɪbreɪt/",
    "meaning": "เฉลิมฉลอง",
    "example": "The team gathered at the restaurant to celebrate their championship.",
    "category": "Daily Life"
  },
  {
    "id": "b1_125",
    "word": "celebrity",
    "pos": "n.",
    "ipa": "/səˈlebrəti/",
    "meaning": "คนมีชื่อเสียง, ดารา",
    "example": "The famous Hollywood celebrity attended the charity fundraising gala.",
    "category": "Media & Society"
  },
  {
    "id": "b1_126",
    "word": "certificate",
    "pos": "n.",
    "ipa": "/səˈtɪfɪkət/",
    "meaning": "ประกาศนียบัตร",
    "example": "Students who complete the intensive course will receive an official certificate.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_127",
    "word": "challenge",
    "pos": "v.",
    "ipa": "/ˈtʃælɪndʒ/",
    "meaning": "ท้าทาย",
    "example": "This advanced quiz challenges your grammar comprehension.",
    "category": "General"
  },
  {
    "id": "b1_128",
    "word": "charge",
    "pos": "v.",
    "ipa": "/tʃɑːdʒ/",
    "meaning": "คิดราคา, ชาร์จแบต",
    "example": "Remember to charge your smartphone battery before leaving home.",
    "category": "General"
  },
  {
    "id": "b1_129",
    "word": "chase",
    "pos": "v.",
    "ipa": "/tʃeɪs/",
    "meaning": "ไล่ตาม",
    "example": "The playful kitten chased a stray red wool ball across the floor.",
    "category": "General"
  },
  {
    "id": "b1_130",
    "word": "chat",
    "pos": "v.",
    "ipa": "/tʃæt/",
    "meaning": "สนทนา",
    "example": "We sat in the cafe and chatted happily for several hours.",
    "category": "General"
  },
  {
    "id": "b1_131",
    "word": "cheat",
    "pos": "v.",
    "ipa": "/tʃiːt/",
    "meaning": "โกง",
    "example": "Honest students never cheat during examinations.",
    "category": "General"
  },
  {
    "id": "b1_132",
    "word": "check in",
    "pos": "phr. v.",
    "ipa": "/tʃek ɪn/",
    "meaning": "เช็คอิน (ที่พัก/สนามบิน)",
    "example": "We must check in at the international airport two hours before departure.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_133",
    "word": "check out",
    "pos": "phr. v.",
    "ipa": "/tʃek aʊt/",
    "meaning": "เช็คเอาท์, ตรวจสอบดู",
    "example": "Hotel guests must check out before noon on their departure date.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_134",
    "word": "cheer",
    "pos": "v.",
    "ipa": "/tʃɪər/",
    "meaning": "ส่งเสียงเชียร์",
    "example": "The fans cheered wildly when their striker scored the winning goal.",
    "category": "General"
  },
  {
    "id": "b1_135",
    "word": "cheerful",
    "pos": "adj.",
    "ipa": "/ˈtʃɪəfl/",
    "meaning": "ร่าเริงแจ่มใส",
    "example": "His cheerful personality always lifts the mood of the entire office.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_136",
    "word": "childhood",
    "pos": "n.",
    "ipa": "/ˈtʃaɪldhʊd/",
    "meaning": "วัยเด็ก",
    "example": "He spent his joyful childhood exploring the countryside with his cousins.",
    "category": "Relationships"
  },
  {
    "id": "b1_137",
    "word": "chimney",
    "pos": "n.",
    "ipa": "/ˈtʃɪmni/",
    "meaning": "ปล่องไฟ",
    "example": "White smoke drifted gently from the brick chimney on the cottage roof.",
    "category": "Home & Living"
  },
  {
    "id": "b1_138",
    "word": "choose",
    "pos": "v.",
    "ipa": "/tʃuːz/",
    "meaning": "เลือกสรร",
    "example": "Choose healthy snacks like almonds and fresh berries over candy.",
    "category": "General"
  },
  {
    "id": "b1_139",
    "word": "cinema",
    "pos": "n.",
    "ipa": "/ˈsɪnəmə/",
    "meaning": "โรงภาพยนตร์",
    "example": "Let us meet outside the cinema twenty minutes before the film starts.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_140",
    "word": "citizen",
    "pos": "n.",
    "ipa": "/ˈsɪtɪzn/",
    "meaning": "พลเมือง, ประชาชน",
    "example": "Every responsible citizen should participate in the upcoming local council election.",
    "category": "Media & Society"
  },
  {
    "id": "b1_141",
    "word": "claim",
    "pos": "v.",
    "ipa": "/kleɪm/",
    "meaning": "อ้างสิทธิ์",
    "example": "You can claim compensation if your flight is delayed by over four hours.",
    "category": "General"
  },
  {
    "id": "b1_142",
    "word": "clap",
    "pos": "v.",
    "ipa": "/klæp/",
    "meaning": "ปรบมือ",
    "example": "The whole hall clapped enthusiastically after the graduation speech.",
    "category": "General"
  },
  {
    "id": "b1_143",
    "word": "clarify",
    "pos": "v.",
    "ipa": "/ˈklærəfaɪ/",
    "meaning": "ทำให้ชัดเจน",
    "example": "Could you clarify the final question on the assignment sheet?",
    "category": "General"
  },
  {
    "id": "b1_144",
    "word": "climate",
    "pos": "n.",
    "ipa": "/ˈklaɪmət/",
    "meaning": "สภาพภูมิอากาศ",
    "example": "Global climate change is causing polar ice caps to melt at alarming rates.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_145",
    "word": "climb",
    "pos": "v.",
    "ipa": "/klaɪm/",
    "meaning": "ปีนป่าย",
    "example": "They climbed to the peak of the mountain before midday.",
    "category": "General"
  },
  {
    "id": "b1_146",
    "word": "colleague",
    "pos": "n.",
    "ipa": "/ˈkɒliːɡ/",
    "meaning": "เพื่อนร่วมงาน",
    "example": "I usually have lunch with my colleagues at the company cafeteria.",
    "category": "Work & Career"
  },
  {
    "id": "b1_147",
    "word": "collect",
    "pos": "v.",
    "ipa": "/kəˈlekt/",
    "meaning": "สะสม, เก็บรวม",
    "example": "She collects vintage postage stamps from European countries.",
    "category": "General"
  },
  {
    "id": "b1_148",
    "word": "combine",
    "pos": "v.",
    "ipa": "/kəmˈbaɪn/",
    "meaning": "ผสมผสาน",
    "example": "Combine flour, eggs, and milk until the batter is smooth.",
    "category": "General"
  },
  {
    "id": "b1_149",
    "word": "come across",
    "pos": "phr. v.",
    "ipa": "/kʌm əˈkrɒs/",
    "meaning": "พบเจอโดยบังเอิญ",
    "example": "I came across an old family photo album while cleaning the attic.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_150",
    "word": "comedy",
    "pos": "n.",
    "ipa": "/ˈkɒmədi/",
    "meaning": "ภาพยนตร์หรือละครตลก",
    "example": "Watching a lighthearted comedy is a great way to relieve stress.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_151",
    "word": "comfort",
    "pos": "v.",
    "ipa": "/ˈkʌmfət/",
    "meaning": "ปลอบประโลม",
    "example": "The mother gently comforted her crying baby with a soft lullaby.",
    "category": "General"
  },
  {
    "id": "b1_152",
    "word": "command",
    "pos": "v.",
    "ipa": "/kəˈmɑːnd/",
    "meaning": "สั่งการ",
    "example": "The captain commanded the ship's crew to prepare the lifeboats.",
    "category": "General"
  },
  {
    "id": "b1_153",
    "word": "communicate",
    "pos": "v.",
    "ipa": "/kəˈmjuːnɪkeɪt/",
    "meaning": "สื่อสาร",
    "example": "Effective teams communicate clearly and listen empathetically.",
    "category": "General"
  },
  {
    "id": "b1_154",
    "word": "community",
    "pos": "n.",
    "ipa": "/kəˈmjuːnəti/",
    "meaning": "ชุมชน",
    "example": "Local residents gathered at the community centre to discuss playground renovations.",
    "category": "Media & Society"
  },
  {
    "id": "b1_155",
    "word": "commute",
    "pos": "v.",
    "ipa": "/kəˈmjuːt/",
    "meaning": "เดินทางไปกลับที่ทำงาน",
    "example": "Many office workers commute by rapid transit train every weekday.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_156",
    "word": "compete",
    "pos": "v.",
    "ipa": "/kəmˈpiːt/",
    "meaning": "แข่งขัน",
    "example": "Athletes from eighty nations compete in the international tournament.",
    "category": "General"
  },
  {
    "id": "b1_157",
    "word": "complain",
    "pos": "v.",
    "ipa": "/kəmˈpleɪn/",
    "meaning": "ร้องเรียน, บ่น",
    "example": "Customers have the right to complain if the service is substandard.",
    "category": "Daily Life"
  },
  {
    "id": "b1_158",
    "word": "complaint",
    "pos": "n.",
    "ipa": "/kəmˈpleɪnt/",
    "meaning": "ข้อร้องเรียน",
    "example": "The store manager promptly resolved the customer's complaint with a replacement.",
    "category": "Shopping & City"
  },
  {
    "id": "b1_159",
    "word": "complete",
    "pos": "v.",
    "ipa": "/kəmˈpliːt/",
    "meaning": "ทำเสร็จสมบูรณ์",
    "example": "Please complete all registration fields before submitting the online form.",
    "category": "General"
  },
  {
    "id": "b1_160",
    "word": "concentrate",
    "pos": "v.",
    "ipa": "/ˈkɒnsntreɪt/",
    "meaning": "มีสมาธิตั้งใจ",
    "example": "Turn off phone notifications so you can concentrate on your reading.",
    "category": "General"
  },
  {
    "id": "b1_161",
    "word": "concert",
    "pos": "n.",
    "ipa": "/ˈkɒnsət/",
    "meaning": "คอนเสิร์ต",
    "example": "Thousands of enthusiastic fans attended the outdoor rock concert.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_162",
    "word": "conclude",
    "pos": "v.",
    "ipa": "/kənˈkluːd/",
    "meaning": "สรุป",
    "example": "The keynote speaker concluded her lecture with an inspirational quote.",
    "category": "General"
  },
  {
    "id": "b1_163",
    "word": "conduct",
    "pos": "v.",
    "ipa": "/kənˈdʌkt/",
    "meaning": "ดำเนินการ, จัดทำ",
    "example": "The university conducts clinical trials under strict international guidelines.",
    "category": "General"
  },
  {
    "id": "b1_164",
    "word": "confess",
    "pos": "v.",
    "ipa": "/kənˈfes/",
    "meaning": "สารภาพ",
    "example": "He confessed his nervousness about delivering the commencement address.",
    "category": "General"
  },
  {
    "id": "b1_165",
    "word": "confident",
    "pos": "adj.",
    "ipa": "/ˈkɒnfɪdənt/",
    "meaning": "มั่นใจในตนเอง",
    "example": "Practicing speaking aloud will make you feel confident during the test.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_166",
    "word": "confirm",
    "pos": "v.",
    "ipa": "/kənˈfɜːm/",
    "meaning": "ยืนยัน",
    "example": "Please confirm your hotel reservation by email before Friday.",
    "category": "Daily Life"
  },
  {
    "id": "b1_167",
    "word": "confused",
    "pos": "adj.",
    "ipa": "/kənˈfjuːzd/",
    "meaning": "สับสน, งงงวย",
    "example": "The ambiguous road signage left many foreign drivers completely confused.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_168",
    "word": "congratulate",
    "pos": "v.",
    "ipa": "/kənˈɡrætʃuleɪt/",
    "meaning": "แสดงความยินดี",
    "example": "I want to congratulate you on achieving your B1 certificate.",
    "category": "General"
  },
  {
    "id": "b1_169",
    "word": "connect",
    "pos": "v.",
    "ipa": "/kəˈnekt/",
    "meaning": "เชื่อมต่อ",
    "example": "The app automatically connects with Supabase to sync your study progress.",
    "category": "General"
  },
  {
    "id": "b1_170",
    "word": "conquer",
    "pos": "v.",
    "ipa": "/ˈkɒŋkər/",
    "meaning": "พิชิต, เอาชนะ",
    "example": "Practice and persistence help you conquer vocabulary anxiety.",
    "category": "General"
  },
  {
    "id": "b1_171",
    "word": "consent",
    "pos": "v.",
    "ipa": "/kənˈsent/",
    "meaning": "ยินยอม",
    "example": "Patients must consent in writing before undergoing elective surgery.",
    "category": "General"
  },
  {
    "id": "b1_172",
    "word": "conservation",
    "pos": "n.",
    "ipa": "/ˌkɒnsəˈveɪʃn/",
    "meaning": "การอนุรักษ์ธรรมชาติ",
    "example": "Wildlife conservation efforts have helped bring endangered pandas back from extinction.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_173",
    "word": "consider",
    "pos": "v.",
    "ipa": "/kənˈsɪdər/",
    "meaning": "พิจารณา, คำนึงถึง",
    "example": "You must consider all safety rules before operating the equipment.",
    "category": "Daily Life"
  },
  {
    "id": "b1_174",
    "word": "consist",
    "pos": "v.",
    "ipa": "/kənˈsɪst/",
    "meaning": "ประกอบด้วย",
    "example": "A balanced breakfast consists of protein, fiber, and clean water.",
    "category": "General"
  },
  {
    "id": "b1_175",
    "word": "construct",
    "pos": "v.",
    "ipa": "/kənˈstrʌkt/",
    "meaning": "ก่อสร้าง",
    "example": "Engineers constructed a flood barrier to safeguard the riverside village.",
    "category": "General"
  },
  {
    "id": "b1_176",
    "word": "consume",
    "pos": "v.",
    "ipa": "/kənˈsjuːm/",
    "meaning": "บริโภค",
    "example": "Athletes consume complex carbohydrates before competing in marathons.",
    "category": "General"
  },
  {
    "id": "b1_177",
    "word": "consumer",
    "pos": "n.",
    "ipa": "/kənˈsjuːmər/",
    "meaning": "ผู้บริโภค",
    "example": "Modern consumers increasingly prefer shopping via trusted smartphone apps.",
    "category": "Shopping & City"
  },
  {
    "id": "b1_178",
    "word": "contact",
    "pos": "v.",
    "ipa": "/ˈkɒntækt/",
    "meaning": "ติดต่อสื่อสาร",
    "example": "Feel free to contact customer support if you experience any login issues.",
    "category": "General"
  },
  {
    "id": "b1_179",
    "word": "contain",
    "pos": "v.",
    "ipa": "/kənˈteɪn/",
    "meaning": "บรรจุ, มีส่วนประกอบของ",
    "example": "This bottle contains a concentrated herbal extract.",
    "category": "Daily Life"
  },
  {
    "id": "b1_180",
    "word": "continue",
    "pos": "v.",
    "ipa": "/kənˈtɪnjuː/",
    "meaning": "ดำเนินการต่อ",
    "example": "Continue practicing your flashcards daily to maintain your study streak.",
    "category": "General"
  },
  {
    "id": "b1_181",
    "word": "contract",
    "pos": "n.",
    "ipa": "/ˈkɒntrækt/",
    "meaning": "สัญญาจ้าง, ข้อตกลงทางกฎหมาย",
    "example": "Read the terms carefully before signing the employment contract.",
    "category": "Work & Career"
  },
  {
    "id": "b1_182",
    "word": "contribute",
    "pos": "v.",
    "ipa": "/kənˈtrɪbjuːt/",
    "meaning": "มีส่วนร่วม, บริจาค",
    "example": "Local businesses contributed funds to rebuild the neighborhood community park.",
    "category": "General"
  },
  {
    "id": "b1_183",
    "word": "control",
    "pos": "v.",
    "ipa": "/kənˈtrəʊl/",
    "meaning": "ควบคุม",
    "example": "Smart thermostats let homeowners control temperature from their mobile phones.",
    "category": "General"
  },
  {
    "id": "b1_184",
    "word": "convenient",
    "pos": "adj.",
    "ipa": "/kənˈviːniənt/",
    "meaning": "สะดวกสบาย",
    "example": "Living near the underground station is remarkably convenient for commuting.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_185",
    "word": "convert",
    "pos": "v.",
    "ipa": "/kənˈvɜːt/",
    "meaning": "แปลงสภาพ",
    "example": "Solar cells convert sunlight directly into usable electrical power.",
    "category": "General"
  },
  {
    "id": "b1_186",
    "word": "convince",
    "pos": "v.",
    "ipa": "/kənˈvɪns/",
    "meaning": "โน้มน้าวใจ, ทำให้เชื่อ",
    "example": "Her well-researched presentation convinced everyone in the room.",
    "category": "Daily Life"
  },
  {
    "id": "b1_187",
    "word": "cook",
    "pos": "v.",
    "ipa": "/kʊk/",
    "meaning": "ปรุงอาหาร",
    "example": "Learn to cook nutritious meals at home to save money and stay fit.",
    "category": "General"
  },
  {
    "id": "b1_188",
    "word": "cope",
    "pos": "v.",
    "ipa": "/kəʊp/",
    "meaning": "รับมือไหว",
    "example": "Deep breathing exercises help students cope with exam pressure.",
    "category": "General"
  },
  {
    "id": "b1_189",
    "word": "correct",
    "pos": "v.",
    "ipa": "/kəˈrekt/",
    "meaning": "แก้ไขให้ถูกต้อง",
    "example": "The teacher gently corrected my pronunciation during speaking practice.",
    "category": "General"
  },
  {
    "id": "b1_190",
    "word": "corridor",
    "pos": "n.",
    "ipa": "/ˈkɒrɪdɔːr/",
    "meaning": "ทางเดินในอาคาร",
    "example": "Walk down the long corridor and take the second door on your right.",
    "category": "Home & Living"
  },
  {
    "id": "b1_191",
    "word": "cost",
    "pos": "v.",
    "ipa": "/kɒst/",
    "meaning": "มีราคา",
    "example": "Good quality running shoes cost between fifty and one hundred pounds.",
    "category": "General"
  },
  {
    "id": "b1_192",
    "word": "costume",
    "pos": "n.",
    "ipa": "/ˈkɒstjuːm/",
    "meaning": "เครื่องแต่งกายการแสดง",
    "example": "The historical drama won an international award for best costume design.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_193",
    "word": "cottage",
    "pos": "n.",
    "ipa": "/ˈkɒtɪdʒ/",
    "meaning": "กระท่อม, บ้านพักตากอากาศ",
    "example": "They spent a peaceful autumn weekend at a cosy countryside cottage.",
    "category": "Home & Living"
  },
  {
    "id": "b1_194",
    "word": "cough",
    "pos": "v.",
    "ipa": "/kɒf/",
    "meaning": "ไอ",
    "example": "Cover your mouth when you cough to prevent spreading germs.",
    "category": "General"
  },
  {
    "id": "b1_195",
    "word": "count",
    "pos": "v.",
    "ipa": "/kaʊnt/",
    "meaning": "นับจำนวน",
    "example": "Count the total number of mastered words in your study dashboard.",
    "category": "General"
  },
  {
    "id": "b1_196",
    "word": "count on",
    "pos": "phr. v.",
    "ipa": "/kaʊnt ɒn/",
    "meaning": "พึ่งพาได้, ไว้วางใจ",
    "example": "You can always count on David whenever you need reliable help.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_197",
    "word": "couple",
    "pos": "n.",
    "ipa": "/ˈkʌpl/",
    "meaning": "คู่รัก, สามีภรรยา",
    "example": "The newlywed couple spent their sunny honeymoon touring Italy.",
    "category": "Relationships"
  },
  {
    "id": "b1_198",
    "word": "course",
    "pos": "n.",
    "ipa": "/kɔːs/",
    "meaning": "หลักสูตร, คอร์สเรียน",
    "example": "I signed up for an advanced online web development course.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_199",
    "word": "crash",
    "pos": "v.",
    "ipa": "/kræʃ/",
    "meaning": "ชน, ชนเสียหาย",
    "example": "Fortunately, no one was injured when the delivery drone crashed in the field.",
    "category": "General"
  },
  {
    "id": "b1_200",
    "word": "create",
    "pos": "v.",
    "ipa": "/kriˈeɪt/",
    "meaning": "สร้างสรรค์",
    "example": "Interactive quizzes create engaging learning experiences for students.",
    "category": "General"
  },
  {
    "id": "b1_201",
    "word": "criticize",
    "pos": "v.",
    "ipa": "/ˈkrɪtɪsaɪz/",
    "meaning": "วิพากษ์วิจารณ์",
    "example": "Constructive feedback aims to guide learners rather than criticize them harshly.",
    "category": "General"
  },
  {
    "id": "b1_202",
    "word": "cross",
    "pos": "v.",
    "ipa": "/krɒs/",
    "meaning": "ข้าม",
    "example": "Always check both directions before you cross the busy street.",
    "category": "General"
  },
  {
    "id": "b1_203",
    "word": "crowded",
    "pos": "adj.",
    "ipa": "/ˈkraʊdɪd/",
    "meaning": "แออัด, หนาแน่นไปด้วยผู้คน",
    "example": "The night market is always crowded on Friday evenings.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_204",
    "word": "crucial",
    "pos": "adj.",
    "ipa": "/ˈkruːʃl/",
    "meaning": "สำคัญยิ่งยวด, ชี้ขาด",
    "example": "Regular practice is crucial if you want to achieve B1 mastery.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_205",
    "word": "cry",
    "pos": "v.",
    "ipa": "/kraɪ/",
    "meaning": "ร้องไห้",
    "example": "Tears of joy were shed when the rescue team found the lost hikers.",
    "category": "General"
  },
  {
    "id": "b1_206",
    "word": "culture",
    "pos": "n.",
    "ipa": "/ˈkʌltʃər/",
    "meaning": "วัฒนธรรม",
    "example": "Experiencing traditional cuisine is a delightful way to understand foreign culture.",
    "category": "Media & Society"
  },
  {
    "id": "b1_207",
    "word": "cure",
    "pos": "v.",
    "ipa": "/kjʊər/",
    "meaning": "รักษาให้หายขาด",
    "example": "Doctors are working hard to discover medications that can cure rare diseases.",
    "category": "Health & Food"
  },
  {
    "id": "b1_208",
    "word": "curious",
    "pos": "adj.",
    "ipa": "/ˈkjʊəriəs/",
    "meaning": "อยากรู้อยากเห็น, ใฝ่รู้",
    "example": "Curious children always ask insightful questions about how nature works.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_209",
    "word": "curl",
    "pos": "v.",
    "ipa": "/kɜːl/",
    "meaning": "ม้วนงอ",
    "example": "The sleepy cat curled up on the soft armchair cushion.",
    "category": "General"
  },
  {
    "id": "b1_210",
    "word": "currency",
    "pos": "n.",
    "ipa": "/ˈkʌrənsi/",
    "meaning": "สกุลเงิน",
    "example": "You can easily exchange major foreign currencies at the airport bank kiosk.",
    "category": "Shopping & City"
  },
  {
    "id": "b1_211",
    "word": "curriculum",
    "pos": "n.",
    "ipa": "/kəˈrɪkjələm/",
    "meaning": "หลักสูตรการเรียนการสอน",
    "example": "The modern school curriculum emphasizes science, technology, and coding.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_212",
    "word": "curtain",
    "pos": "n.",
    "ipa": "/ˈkɜːtn/",
    "meaning": "ม่านเวที, ผ้าม่าน",
    "example": "The heavy velvet curtain rose as the stage lights illuminated the cast.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_213",
    "word": "cushion",
    "pos": "n.",
    "ipa": "/ˈkʊʃn/",
    "meaning": "หมอนอิง",
    "example": "The sofa is decorated with colourful embroidered cushions.",
    "category": "Home & Living"
  },
  {
    "id": "b1_214",
    "word": "customs",
    "pos": "n.",
    "ipa": "/ˈkʌstəmz/",
    "meaning": "ด่านศุลกากร",
    "example": "You must declare any taxable electronic goods when passing through customs.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_215",
    "word": "damage",
    "pos": "n.",
    "ipa": "/ˈdæmɪdʒ/",
    "meaning": "ความเสียหาย",
    "example": "The storm caused minor roof damage to several coastal village cottages.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_216",
    "word": "dance",
    "pos": "v.",
    "ipa": "/dɑːns/",
    "meaning": "เต้นรำ",
    "example": "Villagers danced joyfully to celebrate the autumn harvest.",
    "category": "General"
  },
  {
    "id": "b1_217",
    "word": "dare",
    "pos": "v.",
    "ipa": "/deər/",
    "meaning": "กล้าที่จะทำ",
    "example": "Few climbers dare to ascend the steep icy cliff without ropes.",
    "category": "General"
  },
  {
    "id": "b1_218",
    "word": "database",
    "pos": "n.",
    "ipa": "/ˈdeɪtəbeɪs/",
    "meaning": "ฐานข้อมูล",
    "example": "All student progress records are securely stored in the Supabase database.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_219",
    "word": "deadline",
    "pos": "n.",
    "ipa": "/ˈdedlaɪn/",
    "meaning": "กำหนดส่งงาน, เส้นตาย",
    "example": "Our team is working late to meet the client's Friday deadline.",
    "category": "Work & Career"
  },
  {
    "id": "b1_220",
    "word": "deal",
    "pos": "v.",
    "ipa": "/diːl/",
    "meaning": "แจกไพ่, จัดการ",
    "example": "Managers must deal fairly with workplace disputes.",
    "category": "General"
  },
  {
    "id": "b1_221",
    "word": "deal with",
    "pos": "phr. v.",
    "ipa": "/diːl wɪð/",
    "meaning": "รับมือกับ, จัดการปัญหา",
    "example": "Customer service agents must learn to deal with upset callers calmly.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_222",
    "word": "debate",
    "pos": "v.",
    "ipa": "/dɪˈbeɪt/",
    "meaning": "โต้วาที",
    "example": "The candidates debated economic policies on national television.",
    "category": "General"
  },
  {
    "id": "b1_223",
    "word": "decide",
    "pos": "v.",
    "ipa": "/dɪˈsaɪd/",
    "meaning": "ตัดสินใจ",
    "example": "They decided to move to a quieter town outside London.",
    "category": "Daily Life"
  },
  {
    "id": "b1_224",
    "word": "declare",
    "pos": "v.",
    "ipa": "/dɪˈkleər/",
    "meaning": "แถลง, ประกาศ",
    "example": "Travelers must declare agricultural produce at airport customs.",
    "category": "General"
  },
  {
    "id": "b1_225",
    "word": "decorate",
    "pos": "v.",
    "ipa": "/ˈdekəreɪt/",
    "meaning": "ตกแต่ง",
    "example": "They decorated the dining room with paper lanterns and flowers.",
    "category": "General"
  },
  {
    "id": "b1_226",
    "word": "decorating",
    "pos": "n.",
    "ipa": "/ˈdekəreɪtɪŋ/",
    "meaning": "การตกแต่งภายใน",
    "example": "They spent their holiday painting and decorating the nursery.",
    "category": "Home & Living"
  },
  {
    "id": "b1_227",
    "word": "decrease",
    "pos": "v.",
    "ipa": "/dɪˈkriːs/",
    "meaning": "ลดลง",
    "example": "Daily meditation decreases stress hormones in the body.",
    "category": "General"
  },
  {
    "id": "b1_228",
    "word": "defend",
    "pos": "v.",
    "ipa": "/dɪˈfend/",
    "meaning": "ปกป้อง",
    "example": "Lawyers defend their clients' rights vigorously in court.",
    "category": "General"
  },
  {
    "id": "b1_229",
    "word": "define",
    "pos": "v.",
    "ipa": "/dɪˈfaɪn/",
    "meaning": "นิยามความหมาย",
    "example": "Can you define the difference between a noun and an adjective?",
    "category": "General"
  },
  {
    "id": "b1_230",
    "word": "degree",
    "pos": "n.",
    "ipa": "/dɪˈɡriː/",
    "meaning": "ปริญญาบัตร",
    "example": "She graduated with high honours, earning a bachelor's degree in biology.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_231",
    "word": "delay",
    "pos": "v.",
    "ipa": "/dɪˈleɪ/",
    "meaning": "ทำให้ล่าช้า, เลื่อนเวลา",
    "example": "Heavy snowfall delayed the departure of flight BA204.",
    "category": "Daily Life"
  },
  {
    "id": "b1_232",
    "word": "delayed",
    "pos": "adj.",
    "ipa": "/dɪˈleɪd/",
    "meaning": "ล่าช้า, ดีเลย์",
    "example": "Our express coach was delayed by two hours due to highway maintenance.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_233",
    "word": "delete",
    "pos": "v.",
    "ipa": "/dɪˈliːt/",
    "meaning": "ลบข้อมูล",
    "example": "Be careful not to delete essential system files on your computer.",
    "category": "General"
  },
  {
    "id": "b1_234",
    "word": "delicious",
    "pos": "adj.",
    "ipa": "/dɪˈlɪʃəs/",
    "meaning": "อร่อยมาก",
    "example": "The home-cooked Italian pasta was truly delicious and flavourful.",
    "category": "Health & Food"
  },
  {
    "id": "b1_235",
    "word": "delighted",
    "pos": "adj.",
    "ipa": "/dɪˈlaɪtɪd/",
    "meaning": "ยินดีเป็นอย่างยิ่ง, ปลื้มใจ",
    "example": "We were delighted to hear that you passed your Cambridge B1 exam with distinction.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_236",
    "word": "deliver",
    "pos": "v.",
    "ipa": "/dɪˈlɪvər/",
    "meaning": "จัดส่งสินค้า/พัสดุ",
    "example": "The online store promises to deliver all orders within 24 hours.",
    "category": "Daily Life"
  },
  {
    "id": "b1_237",
    "word": "demand",
    "pos": "v.",
    "ipa": "/dɪˈmɑːnd/",
    "meaning": "เรียกร้อง",
    "example": "Employees demanded better safety standards in the manufacturing plant.",
    "category": "General"
  },
  {
    "id": "b1_238",
    "word": "demonstrate",
    "pos": "v.",
    "ipa": "/ˈdemənstreɪt/",
    "meaning": "สาธิตให้ดู",
    "example": "The chef demonstrated how to chop herbs with culinary precision.",
    "category": "General"
  },
  {
    "id": "b1_239",
    "word": "deny",
    "pos": "v.",
    "ipa": "/dɪˈnaɪ/",
    "meaning": "ปฏิเสธความจริง",
    "example": "The suspect denied any involvement in the neighborhood burglary.",
    "category": "General"
  },
  {
    "id": "b1_240",
    "word": "departure",
    "pos": "n.",
    "ipa": "/dɪˈpɑːtʃər/",
    "meaning": "การออกเดินทาง, เที่ยวบินขาออก",
    "example": "Check the electronic departures screen to see your flight's gate number.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_241",
    "word": "depend",
    "pos": "v.",
    "ipa": "/dɪˈpend/",
    "meaning": "ขึ้นอยู่กับ, พึ่งพา",
    "example": "Our weekend plans depend entirely on the weather forecast.",
    "category": "Daily Life"
  },
  {
    "id": "b1_242",
    "word": "depend on",
    "pos": "phr. v.",
    "ipa": "/dɪˈpend ɒn/",
    "meaning": "ขึ้นอยู่กับ",
    "example": "Whether we go hiking tomorrow depends on the weather conditions.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_243",
    "word": "deposit",
    "pos": "v.",
    "ipa": "/dɪˈpɒzɪt/",
    "meaning": "ฝากเงิน",
    "example": "She deposited her monthly pay check into her high-interest savings account.",
    "category": "General"
  },
  {
    "id": "b1_244",
    "word": "describe",
    "pos": "v.",
    "ipa": "/dɪˈskraɪb/",
    "meaning": "อธิบาย, บรรยายลักษณะ",
    "example": "Can you describe the missing person to the police officer?",
    "category": "Daily Life"
  },
  {
    "id": "b1_245",
    "word": "deserve",
    "pos": "v.",
    "ipa": "/dɪˈzɜːv/",
    "meaning": "สมควรได้รับ",
    "example": "After months of overtime work, she truly deserves a long holiday.",
    "category": "Daily Life"
  },
  {
    "id": "b1_246",
    "word": "design",
    "pos": "v.",
    "ipa": "/dɪˈzaɪn/",
    "meaning": "ออกแบบ",
    "example": "Architects designed an energy-efficient library with natural skylights.",
    "category": "General"
  },
  {
    "id": "b1_247",
    "word": "destination",
    "pos": "n.",
    "ipa": "/ˌdestɪˈneɪʃn/",
    "meaning": "จุดหมายปลายทาง",
    "example": "The tropical island is one of Southeast Asia's top tourist destinations.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_248",
    "word": "destroy",
    "pos": "v.",
    "ipa": "/dɪˈstrɔɪ/",
    "meaning": "ทำลายล้าง",
    "example": "The fierce wildfire destroyed several historic buildings in the valley.",
    "category": "Daily Life"
  },
  {
    "id": "b1_249",
    "word": "detect",
    "pos": "v.",
    "ipa": "/dɪˈtekt/",
    "meaning": "ตรวจพบ",
    "example": "Smoke sensors detect early traces of fire in modern office buildings.",
    "category": "General"
  },
  {
    "id": "b1_250",
    "word": "determine",
    "pos": "v.",
    "ipa": "/dɪˈtɜːmɪn/",
    "meaning": "กำหนด, ตัดสินใจแน่วแน่",
    "example": "Dedication determines how quickly you master a foreign language.",
    "category": "General"
  },
  {
    "id": "b1_251",
    "word": "develop",
    "pos": "v.",
    "ipa": "/dɪˈveləp/",
    "meaning": "พัฒนา",
    "example": "Reading widely develops a rich and expressive vocabulary.",
    "category": "General"
  },
  {
    "id": "b1_252",
    "word": "device",
    "pos": "n.",
    "ipa": "/dɪˈvaɪs/",
    "meaning": "อุปกรณ์อิเล็กทรอนิกส์",
    "example": "Modern mobile devices allow people to study anywhere, anytime.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_253",
    "word": "dialogue",
    "pos": "n.",
    "ipa": "/ˈdaɪəlɒɡ/",
    "meaning": "บทสนทนา, การเจรจา",
    "example": "Open dialogue between parents and teenagers builds trust and mutual understanding.",
    "category": "Media & Society"
  },
  {
    "id": "b1_254",
    "word": "diet",
    "pos": "n.",
    "ipa": "/ˈdaɪət/",
    "meaning": "อาหารการกิน, การควบคุมอาหาร",
    "example": "A Mediterranean diet is well-known for promoting long-term cardiovascular health.",
    "category": "Health & Food"
  },
  {
    "id": "b1_255",
    "word": "differ",
    "pos": "v.",
    "ipa": "/ˈdɪfər/",
    "meaning": "แตกต่าง",
    "example": "British English and American English differ slightly in vocabulary and spelling.",
    "category": "General"
  },
  {
    "id": "b1_256",
    "word": "digital",
    "pos": "adj.",
    "ipa": "/ˈdɪdʒɪtl/",
    "meaning": "ดิจิทัล",
    "example": "Digital textbooks are much lighter to carry than traditional heavy paper books.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_257",
    "word": "direct",
    "pos": "v.",
    "ipa": "/dəˈrekt/",
    "meaning": "ชี้แนะ, กำกับ",
    "example": "Traffic wardens directed vehicles around the flooded intersection.",
    "category": "General"
  },
  {
    "id": "b1_258",
    "word": "disagree",
    "pos": "v.",
    "ipa": "/ˌdɪsəˈɡriː/",
    "meaning": "ไม่เห็นด้วย",
    "example": "It is acceptable to disagree with peers as long as discussions remain polite.",
    "category": "General"
  },
  {
    "id": "b1_259",
    "word": "disappear",
    "pos": "v.",
    "ipa": "/ˌdɪsəˈpɪər/",
    "meaning": "หายตัวไป, สาบสูญ",
    "example": "The magician made the gold ring disappear in front of our eyes.",
    "category": "Daily Life"
  },
  {
    "id": "b1_260",
    "word": "disappoint",
    "pos": "v.",
    "ipa": "/ˌdɪsəˈpɔɪnt/",
    "meaning": "ทำให้ผิดหวัง",
    "example": "The sequel movie did not disappoint passionate fans of the original book.",
    "category": "General"
  },
  {
    "id": "b1_261",
    "word": "disappointed",
    "pos": "adj.",
    "ipa": "/ˌdɪsəˈpɔɪntɪd/",
    "meaning": "ผิดหวัง",
    "example": "He was understandably disappointed when the concert was abruptly called off.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_262",
    "word": "disaster",
    "pos": "n.",
    "ipa": "/dɪˈzɑːstər/",
    "meaning": "ภัยพิบัติ",
    "example": "Volunteers gathered quickly to provide food and clean water after the natural disaster.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_263",
    "word": "discount",
    "pos": "n.",
    "ipa": "/ˈdɪskaʊnt/",
    "meaning": "ส่วนลด",
    "example": "Students and senior citizens receive a twenty percent discount on cinema tickets.",
    "category": "Shopping & City"
  },
  {
    "id": "b1_264",
    "word": "discover",
    "pos": "v.",
    "ipa": "/dɪˈskʌvər/",
    "meaning": "ค้นพบ",
    "example": "Scientists discovered an ancient underwater city off the coast.",
    "category": "Daily Life"
  },
  {
    "id": "b1_265",
    "word": "discuss",
    "pos": "v.",
    "ipa": "/dɪˈskʌs/",
    "meaning": "อภิปราย",
    "example": "Students gathered in study circles to discuss the historical novel.",
    "category": "General"
  },
  {
    "id": "b1_266",
    "word": "disease",
    "pos": "n.",
    "ipa": "/dɪˈziːz/",
    "meaning": "โรคภัยไข้เจ็บ",
    "example": "Washing your hands frequently stops the spread of infectious disease.",
    "category": "Health & Food"
  },
  {
    "id": "b1_267",
    "word": "dislike",
    "pos": "v.",
    "ipa": "/dɪsˈlaɪk/",
    "meaning": "ไม่ชอบ",
    "example": "Many young children dislike eating bitter cruciferous vegetables.",
    "category": "General"
  },
  {
    "id": "b1_268",
    "word": "dismiss",
    "pos": "v.",
    "ipa": "/dɪsˈmɪs/",
    "meaning": "ปล่อยเลิก, ยกเลิก",
    "example": "The teacher dismissed the class as the afternoon school bell chimed.",
    "category": "General"
  },
  {
    "id": "b1_269",
    "word": "display",
    "pos": "v.",
    "ipa": "/dɪˈspleɪ/",
    "meaning": "จัดแสดง",
    "example": "The museum displays rare Egyptian papyrus scrolls behind protective glass.",
    "category": "General"
  },
  {
    "id": "b1_270",
    "word": "distribute",
    "pos": "v.",
    "ipa": "/dɪˈstrɪbjuːt/",
    "meaning": "แจกจ่าย",
    "example": "Volunteers distributed warm meals to families affected by the flood.",
    "category": "General"
  },
  {
    "id": "b1_271",
    "word": "disturb",
    "pos": "v.",
    "ipa": "/dɪˈstɜːb/",
    "meaning": "รบกวน",
    "example": "Please hang the 'Do Not Disturb' sign on your hotel room door.",
    "category": "General"
  },
  {
    "id": "b1_272",
    "word": "divide",
    "pos": "v.",
    "ipa": "/dɪˈvaɪd/",
    "meaning": "แบ่งแยก",
    "example": "Divide your study time into twenty-five minute focused intervals.",
    "category": "General"
  },
  {
    "id": "b1_273",
    "word": "divorce",
    "pos": "n.",
    "ipa": "/dɪˈvɔːs/",
    "meaning": "การหย่าร้าง",
    "example": "They remained respectful friends even after their mutual divorce.",
    "category": "Relationships"
  },
  {
    "id": "b1_274",
    "word": "doubt",
    "pos": "v.",
    "ipa": "/daʊt/",
    "meaning": "สงสัย, เคลือบแคลง",
    "example": "Nobody doubts her integrity and dedication to community service.",
    "category": "General"
  },
  {
    "id": "b1_275",
    "word": "download",
    "pos": "v.",
    "ipa": "/ˌdaʊnˈləʊd/",
    "meaning": "ดาวน์โหลดข้อมูล",
    "example": "You can download the PDF grammar guide directly to your smartphone.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_276",
    "word": "downstairs",
    "pos": "adv.",
    "ipa": "/ˌdaʊnˈsteəz/",
    "meaning": "ชั้นล่าง",
    "example": "My father is working in his study downstairs right now.",
    "category": "Home & Living"
  },
  {
    "id": "b1_277",
    "word": "drag",
    "pos": "v.",
    "ipa": "/dræɡ/",
    "meaning": "ลาก",
    "example": "You can drag and drop flashcard items into your custom study list.",
    "category": "General"
  },
  {
    "id": "b1_278",
    "word": "drain",
    "pos": "v.",
    "ipa": "/dreɪn/",
    "meaning": "ระบายน้ำ",
    "example": "Drain the cooked pasta thoroughly before stirring in the tomato sauce.",
    "category": "General"
  },
  {
    "id": "b1_279",
    "word": "dramatic",
    "pos": "adj.",
    "ipa": "/drəˈmætɪk/",
    "meaning": "น่าตื่นเต้นเร้าใจ, เปลี่ยนแปลงอย่างเห็นได้ชัด",
    "example": "There was a dramatic improvement in her listening exam scores.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_280",
    "word": "drop out",
    "pos": "phr. v.",
    "ipa": "/drɒp aʊt/",
    "meaning": "ออกกลางคัน, ลาออกจากเรียน",
    "example": "He dropped out of university to launch his own software company.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_281",
    "word": "drought",
    "pos": "n.",
    "ipa": "/draʊt/",
    "meaning": "ภัยแล้ง",
    "example": "A prolonged severe drought ruined crops and depleted rural water reservoirs.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_282",
    "word": "drown",
    "pos": "v.",
    "ipa": "/draʊn/",
    "meaning": "จมน้ำ",
    "example": "Lifeguards patrol the beach to ensure no swimmers drown in strong rip currents.",
    "category": "General"
  },
  {
    "id": "b1_283",
    "word": "earn",
    "pos": "v.",
    "ipa": "/ɜːn/",
    "meaning": "หาเงินได้, ได้รับจากการทำงาน",
    "example": "She earns extra pocket money by tutoring high school algebra on weekends.",
    "category": "General"
  },
  {
    "id": "b1_284",
    "word": "earthquake",
    "pos": "n.",
    "ipa": "/ˈɜːθkweɪk/",
    "meaning": "แผ่นดินไหว",
    "example": "Modern skyscrapers in Japan are engineered to withstand powerful earthquakes.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_285",
    "word": "educate",
    "pos": "v.",
    "ipa": "/ˈedʒukeɪt/",
    "meaning": "ให้การศึกษา",
    "example": "Public awareness campaigns educate drivers on bicycle safety distances.",
    "category": "General"
  },
  {
    "id": "b1_286",
    "word": "efficient",
    "pos": "adj.",
    "ipa": "/ɪˈfɪʃnt/",
    "meaning": "มีประสิทธิภาพ, รวดเร็วคุ้มค่า",
    "example": "High-speed electric trains are an efficient mode of modern transport.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_287",
    "word": "elect",
    "pos": "v.",
    "ipa": "/ɪˈlekt/",
    "meaning": "เลือกตั้ง",
    "example": "Citizens voted in record numbers to elect the new city mayor.",
    "category": "General"
  },
  {
    "id": "b1_288",
    "word": "eliminate",
    "pos": "v.",
    "ipa": "/ɪˈlɪmɪneɪt/",
    "meaning": "กำจัดให้หมดไป",
    "example": "Healthy lifestyle changes eliminate many avoidable cardiovascular risks.",
    "category": "General"
  },
  {
    "id": "b1_289",
    "word": "embarrass",
    "pos": "v.",
    "ipa": "/ɪmˈbærəs/",
    "meaning": "ทำให้อับอาย",
    "example": "Try not to embarrass someone when pointing out a slip of the tongue.",
    "category": "General"
  },
  {
    "id": "b1_290",
    "word": "embarrassed",
    "pos": "adj.",
    "ipa": "/ɪmˈbærəst/",
    "meaning": "อับอาย, เก้อเขิน",
    "example": "She felt embarrassed when her phone rang loudly inside the quiet study hall.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_291",
    "word": "emerge",
    "pos": "v.",
    "ipa": "/ɪˈmɜːdʒ/",
    "meaning": "ปรากฏขึ้นมา",
    "example": "The bright sun emerged from behind the mountain mist.",
    "category": "General"
  },
  {
    "id": "b1_292",
    "word": "emphasize",
    "pos": "v.",
    "ipa": "/ˈemfəsaɪz/",
    "meaning": "เน้นย้ำ",
    "example": "Cambridge examiners emphasize the importance of fluent, natural communication.",
    "category": "General"
  },
  {
    "id": "b1_293",
    "word": "employ",
    "pos": "v.",
    "ipa": "/ɪmˈplɔɪ/",
    "meaning": "ว่าจ้างงาน",
    "example": "The tech company employs over five hundred software engineers in Dublin.",
    "category": "General"
  },
  {
    "id": "b1_294",
    "word": "employee",
    "pos": "n.",
    "ipa": "/ɪmˈplɔɪiː/",
    "meaning": "พนักงาน, ลูกจ้าง",
    "example": "The tech company offers flexible working hours to all full-time employees.",
    "category": "Work & Career"
  },
  {
    "id": "b1_295",
    "word": "employer",
    "pos": "n.",
    "ipa": "/ɪmˈplɔɪər/",
    "meaning": "นายจ้าง, ผู้ว่าจ้าง",
    "example": "A good employer values employee wellness and professional development.",
    "category": "Work & Career"
  },
  {
    "id": "b1_296",
    "word": "enable",
    "pos": "v.",
    "ipa": "/ɪˈneɪbl/",
    "meaning": "ทำให้สามารถทำได้",
    "example": "Interactive learning platforms enable students to study at their own pace.",
    "category": "General"
  },
  {
    "id": "b1_297",
    "word": "encourage",
    "pos": "v.",
    "ipa": "/ɪnˈkʌrɪdʒ/",
    "meaning": "ให้กำลังใจ, สนับสนุน",
    "example": "Good teachers always encourage their students to ask creative questions.",
    "category": "Daily Life"
  },
  {
    "id": "b1_298",
    "word": "engagement",
    "pos": "n.",
    "ipa": "/ɪnˈɡeɪdʒmənt/",
    "meaning": "การหมั้นหมาย",
    "example": "They announced their engagement at a family dinner gathering.",
    "category": "Relationships"
  },
  {
    "id": "b1_299",
    "word": "entertain",
    "pos": "v.",
    "ipa": "/ˌentəˈteɪn/",
    "meaning": "สร้างความบันเทิง",
    "example": "A talented street musician entertained the crowd with his guitar.",
    "category": "Daily Life"
  },
  {
    "id": "b1_300",
    "word": "enthusiastic",
    "pos": "adj.",
    "ipa": "/ɪnˌθjuːziˈæstɪk/",
    "meaning": "กระตือรือร้น, มีไฟ",
    "example": "The young volunteers were enthusiastic about planting trees in the city park.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_301",
    "word": "environment",
    "pos": "n.",
    "ipa": "/ɪnˈvaɪrənmənt/",
    "meaning": "สิ่งแวดล้อม",
    "example": "Planting more urban trees cleans the air and protects the natural environment.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_302",
    "word": "escape",
    "pos": "v.",
    "ipa": "/ɪˈskeɪp/",
    "meaning": "หลบหนี",
    "example": "The clever fox escaped safely into the dense woodland undergrowth.",
    "category": "General"
  },
  {
    "id": "b1_303",
    "word": "essay",
    "pos": "n.",
    "ipa": "/ˈeseɪ/",
    "meaning": "เรียงความ, บทความวิชาการ",
    "example": "Write a persuasive essay debating the advantages of renewable energy.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_304",
    "word": "essential",
    "pos": "adj.",
    "ipa": "/ɪˈsenʃl/",
    "meaning": "จำเป็นอย่างยิ่ง, ขาดไม่ได้",
    "example": "A valid passport is essential for all international travel bookings.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_305",
    "word": "estimate",
    "pos": "v.",
    "ipa": "/ˈestɪmeɪt/",
    "meaning": "ประมาณการ",
    "example": "Contractors estimate the renovation work will take approximately four weeks.",
    "category": "General"
  },
  {
    "id": "b1_306",
    "word": "evaluate",
    "pos": "v.",
    "ipa": "/ɪˈvæljueɪt/",
    "meaning": "ประเมินผล",
    "example": "Teachers evaluate students based on coursework, presentations, and exams.",
    "category": "General"
  },
  {
    "id": "b1_307",
    "word": "examine",
    "pos": "v.",
    "ipa": "/ɪɡˈzæmɪn/",
    "meaning": "ตรวจตรา, สอบสวน",
    "example": "The customs inspector examined the luggage carefully for undeclared items.",
    "category": "General"
  },
  {
    "id": "b1_308",
    "word": "exchange",
    "pos": "v.",
    "ipa": "/ɪksˈtʃeɪndʒ/",
    "meaning": "แลกเปลี่ยน",
    "example": "Foreign students exchanged cultural traditions during international week.",
    "category": "General"
  },
  {
    "id": "b1_309",
    "word": "excite",
    "pos": "v.",
    "ipa": "/ɪkˈsaɪt/",
    "meaning": "ทำให้ตื่นเต้น",
    "example": "The prospect of travelling to Europe excited the young backpackers.",
    "category": "General"
  },
  {
    "id": "b1_310",
    "word": "exclude",
    "pos": "v.",
    "ipa": "/ɪkˈskluːd/",
    "meaning": "กีดกัน, คัดออก",
    "example": "The basic hotel room price excludes breakfast buffet and airport transfer.",
    "category": "General"
  },
  {
    "id": "b1_311",
    "word": "excursion",
    "pos": "n.",
    "ipa": "/ɪkˈskɜːʃn/",
    "meaning": "การทัศนศึกษา, เที่ยวระยะสั้น",
    "example": "The hotel organizes daily boat excursions to the nearby coral reefs.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_312",
    "word": "excuse",
    "pos": "v.",
    "ipa": "/ɪkˈskjuːz/",
    "meaning": "ยกโทษให้, ให้อภัย",
    "example": "Please excuse my late arrival; my train was delayed by track maintenance.",
    "category": "General"
  },
  {
    "id": "b1_313",
    "word": "exercise",
    "pos": "n.",
    "ipa": "/ˈeksəsaɪz/",
    "meaning": "การออกกำลังกาย",
    "example": "Regular aerobic exercise keeps your heart strong and lowers stress levels.",
    "category": "Health & Food"
  },
  {
    "id": "b1_314",
    "word": "exhausted",
    "pos": "adj.",
    "ipa": "/ɪɡˈzɔːstɪd/",
    "meaning": "เหนื่อยล้าจนหมดแรง",
    "example": "After hiking twenty kilometres up the mountain, we were completely exhausted.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_315",
    "word": "exhibit",
    "pos": "v.",
    "ipa": "/ɪɡˈzɪbɪt/",
    "meaning": "จัดแสดง",
    "example": "The local museum exhibits Roman artifacts found in the nearby valley.",
    "category": "General"
  },
  {
    "id": "b1_316",
    "word": "exhibition",
    "pos": "n.",
    "ipa": "/ˌeksɪˈbɪʃn/",
    "meaning": "นิทรรศการ",
    "example": "The national gallery is hosting an impressive exhibition of modern art.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_317",
    "word": "exist",
    "pos": "v.",
    "ipa": "/ɪɡˈzɪst/",
    "meaning": "มีอยู่จริง",
    "example": "Fascinating deep-sea creatures exist under immense underwater pressure.",
    "category": "General"
  },
  {
    "id": "b1_318",
    "word": "expand",
    "pos": "v.",
    "ipa": "/ɪkˈspænd/",
    "meaning": "ขยายตัว",
    "example": "The software company plans to expand its offices into Southeast Asia.",
    "category": "General"
  },
  {
    "id": "b1_319",
    "word": "expect",
    "pos": "v.",
    "ipa": "/ɪkˈspekt/",
    "meaning": "คาดหวัง, คาดการณ์",
    "example": "We expect the train to arrive at the central platform shortly.",
    "category": "Daily Life"
  },
  {
    "id": "b1_320",
    "word": "expensive",
    "pos": "adj.",
    "ipa": "/ɪkˈspensɪv/",
    "meaning": "ราคาแพง",
    "example": "Imported sports cars are too expensive for the average working household.",
    "category": "Shopping & City"
  },
  {
    "id": "b1_321",
    "word": "experience",
    "pos": "n.",
    "ipa": "/ɪkˈspɪəriəns/",
    "meaning": "ประสบการณ์การทำงาน",
    "example": "The position requires at least three years of graphic design experience.",
    "category": "Work & Career"
  },
  {
    "id": "b1_322",
    "word": "explain",
    "pos": "v.",
    "ipa": "/ɪkˈspleɪn/",
    "meaning": "อธิบาย",
    "example": "The coach patiently explained the new defensive strategy.",
    "category": "Daily Life"
  },
  {
    "id": "b1_323",
    "word": "explode",
    "pos": "v.",
    "ipa": "/ɪkˈspləʊd/",
    "meaning": "ระเบิดออก",
    "example": "Fireworks exploded across the midnight sky in a dazzling display of light.",
    "category": "General"
  },
  {
    "id": "b1_324",
    "word": "explore",
    "pos": "v.",
    "ipa": "/ɪkˈsplɔːr/",
    "meaning": "สำรวจ",
    "example": "Tourists enjoy exploring historic cobblestone streets in ancient European towns.",
    "category": "General"
  },
  {
    "id": "b1_325",
    "word": "express",
    "pos": "v.",
    "ipa": "/ɪkˈspres/",
    "meaning": "แสดงออก",
    "example": "Art allows individuals to express deep emotions that words cannot convey.",
    "category": "General"
  },
  {
    "id": "b1_326",
    "word": "extend",
    "pos": "v.",
    "ipa": "/ɪkˈstend/",
    "meaning": "ขยายระยะเวลา/พื้นที่",
    "example": "The university library extended its opening hours during final exam week.",
    "category": "General"
  },
  {
    "id": "b1_327",
    "word": "face",
    "pos": "v.",
    "ipa": "/feɪs/",
    "meaning": "เผชิญหน้า",
    "example": "Learners must face challenges with patience and consistent daily effort.",
    "category": "General"
  },
  {
    "id": "b1_328",
    "word": "fail",
    "pos": "v.",
    "ipa": "/feɪl/",
    "meaning": "ล้มเหลว, สอบตก",
    "example": "Mistakes are not permanent; you only fail when you stop trying.",
    "category": "General"
  },
  {
    "id": "b1_329",
    "word": "fare",
    "pos": "n.",
    "ipa": "/feər/",
    "meaning": "ค่าโดยสาร",
    "example": "The bus fare has slightly increased because of rising fuel prices.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_330",
    "word": "fasten",
    "pos": "v.",
    "ipa": "/ˈfɑːsn/",
    "meaning": "รัดให้แน่น",
    "example": "Please fasten your seat belt securely while the aircraft is taxiing.",
    "category": "General"
  },
  {
    "id": "b1_331",
    "word": "feature",
    "pos": "v.",
    "ipa": "/ˈfiːtʃər/",
    "meaning": "มีจุดเด่นเป็น",
    "example": "The new smartphone model features an ultra-sharp high-definition camera.",
    "category": "General"
  },
  {
    "id": "b1_332",
    "word": "feed",
    "pos": "v.",
    "ipa": "/fiːd/",
    "meaning": "ให้อาหาร",
    "example": "Visitors are reminded not to feed the wild monkeys in the national park.",
    "category": "General"
  },
  {
    "id": "b1_333",
    "word": "feel",
    "pos": "v.",
    "ipa": "/fiːl/",
    "meaning": "รู้สึก",
    "example": "You will feel proud and confident when you pass your B1 exam.",
    "category": "General"
  },
  {
    "id": "b1_334",
    "word": "festival",
    "pos": "n.",
    "ipa": "/ˈfestɪvl/",
    "meaning": "เทศกาล",
    "example": "The annual lantern festival attracts tourists from all around the world.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_335",
    "word": "fetch",
    "pos": "v.",
    "ipa": "/fetʃ/",
    "meaning": "ไปเอามา, นำมา",
    "example": "The faithful golden retriever ran to fetch the rubber tennis ball.",
    "category": "General"
  },
  {
    "id": "b1_336",
    "word": "fight",
    "pos": "v.",
    "ipa": "/faɪt/",
    "meaning": "ต่อสู้",
    "example": "Doctors and nurses fight tirelessly to protect community public health.",
    "category": "General"
  },
  {
    "id": "b1_337",
    "word": "figure out",
    "pos": "phr. v.",
    "ipa": "/ˈfɪɡər aʊt/",
    "meaning": "คิดหาทางออกได้, แก้ปัญหาได้",
    "example": "It took our engineers three days to figure out the software bug.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_338",
    "word": "fill",
    "pos": "v.",
    "ipa": "/fɪl/",
    "meaning": "เติมให้เต็ม",
    "example": "Fill the reusable water bottle before embarking on your mountain hike.",
    "category": "General"
  },
  {
    "id": "b1_339",
    "word": "filter",
    "pos": "v.",
    "ipa": "/ˈfɪltər/",
    "meaning": "กรองข้อมูล/น้ำ",
    "example": "You can easily filter vocabulary cards by theme or learning status.",
    "category": "General"
  },
  {
    "id": "b1_340",
    "word": "find out",
    "pos": "phr. v.",
    "ipa": "/faɪnd aʊt/",
    "meaning": "สืบรู้, ค้นพบความจริง",
    "example": "I was astonished to find out that she speaks five languages fluently.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_341",
    "word": "fit",
    "pos": "v.",
    "ipa": "/fɪt/",
    "meaning": "พอดี, เหมาะสม",
    "example": "These comfortable walking shoes fit perfectly for long city walking tours.",
    "category": "General"
  },
  {
    "id": "b1_342",
    "word": "fix",
    "pos": "v.",
    "ipa": "/fɪks/",
    "meaning": "ซ่อมแซม",
    "example": "The bicycle mechanic fixed the slipped chain in less than ten minutes.",
    "category": "General"
  },
  {
    "id": "b1_343",
    "word": "flash",
    "pos": "v.",
    "ipa": "/flæʃ/",
    "meaning": "กะพริบแสง",
    "example": "Warning lights flashed at the railroad crossing as the train approached.",
    "category": "General"
  },
  {
    "id": "b1_344",
    "word": "flavour",
    "pos": "n.",
    "ipa": "/ˈfleɪvər/",
    "meaning": "รสชาติ, กลิ่นรส",
    "example": "Add fresh basil and black pepper to enhance the natural flavour of the soup.",
    "category": "Health & Food"
  },
  {
    "id": "b1_345",
    "word": "flexible",
    "pos": "adj.",
    "ipa": "/ˈfleksəbl/",
    "meaning": "ยืดหยุ่น, ปรับเปลี่ยนได้",
    "example": "Our employer offers flexible remote working hours for all developers.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_346",
    "word": "float",
    "pos": "v.",
    "ipa": "/fləʊt/",
    "meaning": "ลอยน้ำ",
    "example": "Dry fallen leaves floated gently down the winding autumn river.",
    "category": "General"
  },
  {
    "id": "b1_347",
    "word": "flood",
    "pos": "n.",
    "ipa": "/flʌd/",
    "meaning": "น้ำท่วม, อุทกภัย",
    "example": "Heavy monsoon rain triggered flash floods across the low-lying northern province.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_348",
    "word": "fluent",
    "pos": "adj.",
    "ipa": "/ˈfluːənt/",
    "meaning": "พูดภาษาได้อย่างคล่องแคล่ว",
    "example": "After living in Madrid for two years, she became completely fluent in Spanish.",
    "category": "Media & Society"
  },
  {
    "id": "b1_349",
    "word": "fly",
    "pos": "v.",
    "ipa": "/flaɪ/",
    "meaning": "บิน",
    "example": "Flocks of migratory birds fly south to warmer climates each October.",
    "category": "General"
  },
  {
    "id": "b1_350",
    "word": "focus",
    "pos": "v.",
    "ipa": "/ˈfəʊkəs/",
    "meaning": "เพ่งความสนใจ",
    "example": "Focus on memorizing five new words every morning to build confidence.",
    "category": "General"
  },
  {
    "id": "b1_351",
    "word": "fold",
    "pos": "v.",
    "ipa": "/fəʊld/",
    "meaning": "พับ",
    "example": "Fold your clean clothes neatly before packing them into your suitcase.",
    "category": "General"
  },
  {
    "id": "b1_352",
    "word": "follow",
    "pos": "v.",
    "ipa": "/ˈfɒləʊ/",
    "meaning": "ติดตาม, ปฏิบัติตาม",
    "example": "Always follow safety instructions when visiting chemistry laboratories.",
    "category": "General"
  },
  {
    "id": "b1_353",
    "word": "forbid",
    "pos": "v.",
    "ipa": "/fəˈbɪd/",
    "meaning": "สั่งห้ามเด็ดขาด",
    "example": "National park regulations strictly forbid littering and lighting campfires.",
    "category": "General"
  },
  {
    "id": "b1_354",
    "word": "force",
    "pos": "v.",
    "ipa": "/fɔːs/",
    "meaning": "บังคับ",
    "example": "Nobody can force you to learn; genuine curiosity must come from within.",
    "category": "General"
  },
  {
    "id": "b1_355",
    "word": "forecast",
    "pos": "n.",
    "ipa": "/ˈfɔːkɑːst/",
    "meaning": "พยากรณ์อากาศ",
    "example": "Check tomorrow's weather forecast to decide whether to carry an umbrella.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_356",
    "word": "forgive",
    "pos": "v.",
    "ipa": "/fəˈɡɪv/",
    "meaning": "ยกโทษให้, ให้อภัย",
    "example": "It took time, but she finally decided to forgive his honest mistake.",
    "category": "Daily Life"
  },
  {
    "id": "b1_357",
    "word": "freeze",
    "pos": "v.",
    "ipa": "/friːz/",
    "meaning": "แช่แข็ง, กลายเป็นน้ำแข็ง",
    "example": "Ponds freeze solid during harsh northern winter months.",
    "category": "General"
  },
  {
    "id": "b1_358",
    "word": "frequent",
    "pos": "adj.",
    "ipa": "/ˈfriːkwənt/",
    "meaning": "บ่อยครั้ง, ถี่",
    "example": "He is a frequent business traveler who flies between Singapore and Sydney.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_359",
    "word": "friendship",
    "pos": "n.",
    "ipa": "/ˈfrendʃɪp/",
    "meaning": "มิตรภาพ",
    "example": "True friendship is built upon honesty, trust, and mutual respect.",
    "category": "Relationships"
  },
  {
    "id": "b1_360",
    "word": "frighten",
    "pos": "v.",
    "ipa": "/ˈfraɪtn/",
    "meaning": "ทำให้ตกใจกลัว",
    "example": "Sudden loud thunderclaps can frighten small domestic animals.",
    "category": "General"
  },
  {
    "id": "b1_361",
    "word": "frightened",
    "pos": "adj.",
    "ipa": "/ˈfraɪtnd/",
    "meaning": "ตกใจกลัว",
    "example": "The sudden crack of loud thunder frightened the small puppy.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_362",
    "word": "fulfil",
    "pos": "v.",
    "ipa": "/fʊlˈfɪl/",
    "meaning": "เติมเต็ม, บรรลุความฝัน",
    "example": "She fulfilled her lifelong ambition by earning a commercial pilot license.",
    "category": "General"
  },
  {
    "id": "b1_363",
    "word": "furniture",
    "pos": "n.",
    "ipa": "/ˈfɜːnɪtʃər/",
    "meaning": "เฟอร์นิเจอร์, เครื่องเรือน",
    "example": "Solid oak furniture is renowned for its timeless beauty and durability.",
    "category": "Home & Living"
  },
  {
    "id": "b1_364",
    "word": "gain",
    "pos": "v.",
    "ipa": "/ɡeɪn/",
    "meaning": "ได้รับเพิ่ม",
    "example": "Daily reading helps learners gain valuable exposure to natural grammar.",
    "category": "General"
  },
  {
    "id": "b1_365",
    "word": "gallery",
    "pos": "n.",
    "ipa": "/ˈɡæləri/",
    "meaning": "หอศิลป์",
    "example": "Admission to the contemporary art gallery is free on Sunday mornings.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_366",
    "word": "garage",
    "pos": "n.",
    "ipa": "/ˈɡærɑːʒ/",
    "meaning": "โรงจอดรถ",
    "example": "Park the family vehicle safely inside the garage overnight.",
    "category": "Home & Living"
  },
  {
    "id": "b1_367",
    "word": "gather",
    "pos": "v.",
    "ipa": "/ˈɡæðər/",
    "meaning": "รวบรวม, ชุมนุม",
    "example": "Friends gathered around the fireplace to share memorable travel stories.",
    "category": "General"
  },
  {
    "id": "b1_368",
    "word": "gaze",
    "pos": "v.",
    "ipa": "/ɡeɪz/",
    "meaning": "จ้องมองอย่างเพลิดเพลิน",
    "example": "We gazed in awe at the starry night sky over the desert.",
    "category": "General"
  },
  {
    "id": "b1_369",
    "word": "generate",
    "pos": "v.",
    "ipa": "/ˈdʒenəreɪt/",
    "meaning": "สร้างขึ้น, กำเนิด",
    "example": "Wind turbines generate clean renewable electricity for thousands of homes.",
    "category": "General"
  },
  {
    "id": "b1_370",
    "word": "generation",
    "pos": "n.",
    "ipa": "/ˌdʒenəˈreɪʃn/",
    "meaning": "คนรุ่น, ยุคสมัย",
    "example": "Digital smartphones have shaped the communication habits of this generation.",
    "category": "Relationships"
  },
  {
    "id": "b1_371",
    "word": "generous",
    "pos": "adj.",
    "ipa": "/ˈdʒenərəs/",
    "meaning": "ใจกว้าง, เอื้อเฟื้อเผื่อแผ่",
    "example": "The local philanthropist made a generous financial donation to the children's hospital.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_372",
    "word": "genuine",
    "pos": "adj.",
    "ipa": "/ˈdʒenjuɪn/",
    "meaning": "แท้จริง, ไม่ปลอมแปลง",
    "example": "The antique specialist verified that the bronze coin was genuine.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_373",
    "word": "give up",
    "pos": "phr. v.",
    "ipa": "/ɡɪv ʌp/",
    "meaning": "ยอมแพ้, เลิกทำ",
    "example": "Never give up on your dreams, even when facing difficult obstacles.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_374",
    "word": "glance",
    "pos": "v.",
    "ipa": "/ɡlɑːns/",
    "meaning": "ชำเลืองมอง",
    "example": "He glanced at his wristwatch and realized he had ten minutes to spare.",
    "category": "General"
  },
  {
    "id": "b1_375",
    "word": "global",
    "pos": "adj.",
    "ipa": "/ˈɡləʊbl/",
    "meaning": "ระดับโลก, ทั่วโลก",
    "example": "Deforestation is a pressing global problem that demands international cooperation.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_376",
    "word": "govern",
    "pos": "v.",
    "ipa": "/ˈɡʌvn/",
    "meaning": "ปกครอง, ควบคุม",
    "example": "Ethical principles should govern the responsible development of technology.",
    "category": "General"
  },
  {
    "id": "b1_377",
    "word": "grab",
    "pos": "v.",
    "ipa": "/ɡræb/",
    "meaning": "คว้า, ฉวยเอา",
    "example": "Grab your jacket and umbrella before heading out into the rainy evening.",
    "category": "General"
  },
  {
    "id": "b1_378",
    "word": "gradual",
    "pos": "adj.",
    "ipa": "/ˈɡrædʒuəl/",
    "meaning": "ค่อยเป็นค่อยไป",
    "example": "Language acquisition is a gradual process requiring regular daily dedication.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_379",
    "word": "graduate",
    "pos": "v.",
    "ipa": "/ˈɡrædʒueɪt/",
    "meaning": "สำเร็จการศึกษา",
    "example": "Most university students graduate after completing four years of study.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_380",
    "word": "grateful",
    "pos": "adj.",
    "ipa": "/ˈɡreɪtfl/",
    "meaning": "รู้สึกขอบคุณ, ซาบซึ้งใจ",
    "example": "I am deeply grateful for all the guidance and encouragement you provided.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_381",
    "word": "greet",
    "pos": "v.",
    "ipa": "/ɡriːt/",
    "meaning": "ทักทาย",
    "example": "The hotel concierge greeted international guests with a warm, welcoming smile.",
    "category": "General"
  },
  {
    "id": "b1_382",
    "word": "grin",
    "pos": "v.",
    "ipa": "/ɡrɪn/",
    "meaning": "ยิ้มกว้าง",
    "example": "She grinned happily after discovering that she scored full marks on the quiz.",
    "category": "General"
  },
  {
    "id": "b1_383",
    "word": "groom",
    "pos": "n.",
    "ipa": "/ɡruːm/",
    "meaning": "เจ้าบ่าว",
    "example": "The handsome groom waited patiently at the altar for his bride.",
    "category": "Relationships"
  },
  {
    "id": "b1_384",
    "word": "grow up",
    "pos": "phr. v.",
    "ipa": "/ɡrəʊ ʌp/",
    "meaning": "เติบโตขึ้น",
    "example": "Children grow up surprisingly fast these days.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_385",
    "word": "guarantee",
    "pos": "n.",
    "ipa": "/ˌɡærənˈtiː/",
    "meaning": "การรับประกันสินค้า",
    "example": "The digital camera comes with a two-year international manufacturer guarantee.",
    "category": "Shopping & City"
  },
  {
    "id": "b1_386",
    "word": "guard",
    "pos": "v.",
    "ipa": "/ɡɑːd/",
    "meaning": "คุ้มกัน, เฝ้าดูแล",
    "example": "Trained security personnel guard the historic national museum around the clock.",
    "category": "General"
  },
  {
    "id": "b1_387",
    "word": "guess",
    "pos": "v.",
    "ipa": "/ɡes/",
    "meaning": "คาดเดา",
    "example": "Try to guess the word's meaning from context clues before checking a dictionary.",
    "category": "General"
  },
  {
    "id": "b1_388",
    "word": "guide",
    "pos": "v.",
    "ipa": "/ɡaɪd/",
    "meaning": "นำทาง, ชี้แนะ",
    "example": "The experienced mountain ranger guided hikers safely across the rocky ridge.",
    "category": "General"
  },
  {
    "id": "b1_389",
    "word": "handle",
    "pos": "v.",
    "ipa": "/ˈhændl/",
    "meaning": "จัดการ, หยิบจับ",
    "example": "Please handle the antique ceramic vase with extreme caution.",
    "category": "General"
  },
  {
    "id": "b1_390",
    "word": "hang",
    "pos": "v.",
    "ipa": "/hæŋ/",
    "meaning": "แขวน",
    "example": "Hang your winter coats on the rack beside the front entrance.",
    "category": "General"
  },
  {
    "id": "b1_391",
    "word": "happen",
    "pos": "v.",
    "ipa": "/ˈhæpən/",
    "meaning": "เกิดขึ้น",
    "example": "Unexpected adventures often happen when you travel off the beaten track.",
    "category": "General"
  },
  {
    "id": "b1_392",
    "word": "hardware",
    "pos": "n.",
    "ipa": "/ˈhɑːdweər/",
    "meaning": "ฮาร์ดแวร์, ชิ้นส่วนอุปกรณ์",
    "example": "The computer technician upgraded our server hardware yesterday.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_393",
    "word": "harm",
    "pos": "v.",
    "ipa": "/hɑːm/",
    "meaning": "ทำอันตราย",
    "example": "Pollution from untreated factory waste can harm delicate freshwater ecosystems.",
    "category": "General"
  },
  {
    "id": "b1_394",
    "word": "harmless",
    "pos": "adj.",
    "ipa": "/ˈhɑːmləs/",
    "meaning": "ไม่มีพิษมีภัย, ปลอดภัย",
    "example": "Most common house spiders are completely harmless to humans.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_395",
    "word": "harvest",
    "pos": "v.",
    "ipa": "/ˈhɑːvɪst/",
    "meaning": "เก็บเกี่ยวพืชผล",
    "example": "Farmers harvest golden wheat fields before the autumn rains arrive.",
    "category": "General"
  },
  {
    "id": "b1_396",
    "word": "hate",
    "pos": "v.",
    "ipa": "/heɪt/",
    "meaning": "เกลียด",
    "example": "Most commuters hate being delayed in bumper-to-bumper traffic jams.",
    "category": "General"
  },
  {
    "id": "b1_397",
    "word": "headline",
    "pos": "n.",
    "ipa": "/ˈhedlaɪn/",
    "meaning": "พาดหัวข่าว",
    "example": "The dramatic news headline immediately caught everyone's attention this morning.",
    "category": "Media & Society"
  },
  {
    "id": "b1_398",
    "word": "heal",
    "pos": "v.",
    "ipa": "/hiːl/",
    "meaning": "เยียวยา, สมานแผล",
    "example": "The minor knee scratch will heal completely within a few days.",
    "category": "General"
  },
  {
    "id": "b1_399",
    "word": "healthy",
    "pos": "adj.",
    "ipa": "/ˈhelθi/",
    "meaning": "มีสุขภาพดี",
    "example": "Eating fresh fruit daily is a simple way to maintain a healthy lifestyle.",
    "category": "Health & Food"
  },
  {
    "id": "b1_400",
    "word": "heat",
    "pos": "v.",
    "ipa": "/hiːt/",
    "meaning": "อุ่นให้ร้อน",
    "example": "Gently heat the leftover vegetable soup in a small saucepan.",
    "category": "General"
  },
  {
    "id": "b1_401",
    "word": "heating",
    "pos": "n.",
    "ipa": "/ˈhiːtɪŋ/",
    "meaning": "ระบบทำความร้อน",
    "example": "The central heating automatically turns on when the temperature drops.",
    "category": "Home & Living"
  },
  {
    "id": "b1_402",
    "word": "hesitant",
    "pos": "adj.",
    "ipa": "/ˈhezɪtənt/",
    "meaning": "ลังเลใจ, ไม่แน่ใจ",
    "example": "She felt hesitant to invest in the newly founded venture company.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_403",
    "word": "hesitate",
    "pos": "v.",
    "ipa": "/ˈhezɪteɪt/",
    "meaning": "ลังเลใจ",
    "example": "Do not hesitate to reach out if you need additional assistance.",
    "category": "Daily Life"
  },
  {
    "id": "b1_404",
    "word": "hide",
    "pos": "v.",
    "ipa": "/haɪd/",
    "meaning": "ซ่อนตัว",
    "example": "The timid deer hid behind tall pine trees as hikers walked by.",
    "category": "General"
  },
  {
    "id": "b1_405",
    "word": "hilarious",
    "pos": "adj.",
    "ipa": "/hɪˈleəriəs/",
    "meaning": "ตลกขบขันอย่างยิ่ง",
    "example": "The comedian's stand-up routine was hilarious from start to finish.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_406",
    "word": "hire",
    "pos": "v.",
    "ipa": "/ˈhaɪər/",
    "meaning": "เช่า, ว่าจ้าง",
    "example": "We decided to hire bicycles to explore the scenic canals of Amsterdam.",
    "category": "General"
  },
  {
    "id": "b1_407",
    "word": "hit",
    "pos": "v.",
    "ipa": "/hɪt/",
    "meaning": "ตี, ชน",
    "example": "The tennis champion hit a powerful baseline ace down the line.",
    "category": "General"
  },
  {
    "id": "b1_408",
    "word": "hold",
    "pos": "v.",
    "ipa": "/həʊld/",
    "meaning": "ถือไว้, จัดงาน",
    "example": "The university will hold its annual science symposium in the main hall.",
    "category": "General"
  },
  {
    "id": "b1_409",
    "word": "honour",
    "pos": "v.",
    "ipa": "/ˈɒnər/",
    "meaning": "ให้เกียรติ, เชิดชู",
    "example": "The community ceremony honored courageous emergency rescue workers.",
    "category": "General"
  },
  {
    "id": "b1_410",
    "word": "hope",
    "pos": "v.",
    "ipa": "/həʊp/",
    "meaning": "หวังว่า",
    "example": "We hope you enjoy using this modern mobile-first vocabulary application!",
    "category": "General"
  },
  {
    "id": "b1_411",
    "word": "hug",
    "pos": "v.",
    "ipa": "/hʌɡ/",
    "meaning": "สวมกอด",
    "example": "Family members hugged warmly at the airport arrivals terminal gate.",
    "category": "General"
  },
  {
    "id": "b1_412",
    "word": "hunt",
    "pos": "v.",
    "ipa": "/hʌnt/",
    "meaning": "ล่า, ค้นหา",
    "example": "Bargain hunters search antique flea markets for rare vintage collectibles.",
    "category": "General"
  },
  {
    "id": "b1_413",
    "word": "hurricane",
    "pos": "n.",
    "ipa": "/ˈhʌrɪkən/",
    "meaning": "พายุเฮอริเคน",
    "example": "Residents boarded up their windows ahead of the category 4 hurricane.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_414",
    "word": "hurry",
    "pos": "v.",
    "ipa": "/ˈhʌri/",
    "meaning": "รีบเร่ง",
    "example": "We had to hurry along the platform so we would not miss the last train.",
    "category": "General"
  },
  {
    "id": "b1_415",
    "word": "hurt",
    "pos": "v.",
    "ipa": "/hɜːt/",
    "meaning": "เจ็บปวด, ทำร้าย",
    "example": "Wearing improper running shoes can hurt your knees during road marathons.",
    "category": "General"
  },
  {
    "id": "b1_416",
    "word": "identify",
    "pos": "v.",
    "ipa": "/aɪˈdentɪfaɪ/",
    "meaning": "ระบุตัวตน, ชี้ตัว",
    "example": "Botanists can easily identify plant species from leaf vein patterns.",
    "category": "General"
  },
  {
    "id": "b1_417",
    "word": "ignore",
    "pos": "v.",
    "ipa": "/ɪɡˈnɔːr/",
    "meaning": "เพิกเฉย, ละเลย",
    "example": "Never ignore dashboard warning lights while driving long distances.",
    "category": "General"
  },
  {
    "id": "b1_418",
    "word": "illustrate",
    "pos": "v.",
    "ipa": "/ˈɪləstreɪt/",
    "meaning": "วาดภาพประกอบ, อธิบาย",
    "example": "The lecturer used clear diagrams to illustrate the human circulatory system.",
    "category": "General"
  },
  {
    "id": "b1_419",
    "word": "imagine",
    "pos": "v.",
    "ipa": "/ɪˈmædʒɪn/",
    "meaning": "จินตนาการ, นึกภาพ",
    "example": "It is hard to imagine modern daily life without smartphones.",
    "category": "Daily Life"
  },
  {
    "id": "b1_420",
    "word": "imitate",
    "pos": "v.",
    "ipa": "/ˈɪmɪteɪt/",
    "meaning": "เลียนแบบ",
    "example": "Young children naturally imitate speech patterns of the people around them.",
    "category": "General"
  },
  {
    "id": "b1_421",
    "word": "imply",
    "pos": "v.",
    "ipa": "/ɪmˈplaɪ/",
    "meaning": "บอกเป็นนัย",
    "example": "His subtle smile seemed to imply that the surprise had succeeded.",
    "category": "General"
  },
  {
    "id": "b1_422",
    "word": "import",
    "pos": "v.",
    "ipa": "/ɪmˈpɔːt/",
    "meaning": "นำเข้าสินค้า",
    "example": "The country imports seasonal fresh fruits from Mediterranean orchards.",
    "category": "General"
  },
  {
    "id": "b1_423",
    "word": "impress",
    "pos": "v.",
    "ipa": "/ɪmˈpres/",
    "meaning": "สร้างความประทับใจ",
    "example": "Her articulate presentation impressed the entire panel of interviewers.",
    "category": "General"
  },
  {
    "id": "b1_424",
    "word": "impressive",
    "pos": "adj.",
    "ipa": "/ɪmˈpresɪv/",
    "meaning": "น่าประทับใจอย่างยิ่ง",
    "example": "The new bridge across the bay is an impressive feat of civil engineering.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_425",
    "word": "improve",
    "pos": "v.",
    "ipa": "/ɪmˈpruːv/",
    "meaning": "พัฒนา, ปรับปรุงให้ดีขึ้น",
    "example": "Daily practice will drastically improve your English fluency.",
    "category": "Daily Life"
  },
  {
    "id": "b1_426",
    "word": "include",
    "pos": "v.",
    "ipa": "/ɪnˈkluːd/",
    "meaning": "รวมอยู่ด้วย",
    "example": "The Cambridge PET B1 exam includes reading, writing, listening, and speaking.",
    "category": "General"
  },
  {
    "id": "b1_427",
    "word": "increase",
    "pos": "v.",
    "ipa": "/ɪnˈkriːs/",
    "meaning": "เพิ่มขึ้น",
    "example": "Regular aerobic exercise increases lung capacity and physical stamina.",
    "category": "General"
  },
  {
    "id": "b1_428",
    "word": "incredible",
    "pos": "adj.",
    "ipa": "/ɪnˈkredəbl/",
    "meaning": "เหลือเชื่อ, ยอดเยี่ยมมาก",
    "example": "The view from the mountain summit at sunrise was truly incredible.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_429",
    "word": "indicate",
    "pos": "v.",
    "ipa": "/ˈɪndɪkeɪt/",
    "meaning": "บ่งชี้",
    "example": "Recent survey statistics indicate growing interest in green lifestyle habits.",
    "category": "General"
  },
  {
    "id": "b1_430",
    "word": "inevitable",
    "pos": "adj.",
    "ipa": "/ɪnˈevɪtəbl/",
    "meaning": "หลีกเลี่ยงไม่ได้",
    "example": "With rapid technological progress, automation was inevitable across many sectors.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_431",
    "word": "inform",
    "pos": "v.",
    "ipa": "/ɪnˈfɔːm/",
    "meaning": "แจ้งให้ทราบ",
    "example": "The airline will inform passengers promptly of any schedule revisions.",
    "category": "General"
  },
  {
    "id": "b1_432",
    "word": "ingredient",
    "pos": "n.",
    "ipa": "/ɪnˈɡriːdiənt/",
    "meaning": "ส่วนผสมอาหาร",
    "example": "Olive oil, garlic, and ripe tomatoes are the core ingredients of this recipe.",
    "category": "Health & Food"
  },
  {
    "id": "b1_433",
    "word": "injure",
    "pos": "v.",
    "ipa": "/ˈɪndʒər/",
    "meaning": "ทำให้บาดเจ็บ",
    "example": "Be careful not to injure your lower back when lifting heavy parcels.",
    "category": "General"
  },
  {
    "id": "b1_434",
    "word": "injury",
    "pos": "n.",
    "ipa": "/ˈɪndʒəri/",
    "meaning": "การบาดเจ็บ",
    "example": "The football star took six weeks to recover from a minor knee injury.",
    "category": "Health & Food"
  },
  {
    "id": "b1_435",
    "word": "innocent",
    "pos": "adj.",
    "ipa": "/ˈɪnəsnt/",
    "meaning": "บริสุทธิ์, ไร้เดียงสา",
    "example": "The jury found the defendant completely innocent of all charges.",
    "category": "Descriptive Words"
  },
  {
    "id": "b1_436",
    "word": "insist",
    "pos": "v.",
    "ipa": "/ɪnˈsɪst/",
    "meaning": "ยืนกราน",
    "example": "Our generous host insisted on paying for our celebration dinner.",
    "category": "General"
  },
  {
    "id": "b1_437",
    "word": "inspect",
    "pos": "v.",
    "ipa": "/ɪnˈspekt/",
    "meaning": "ตรวจสอบ",
    "example": "Safety marshals inspect all carnival rides before the fair opens.",
    "category": "General"
  },
  {
    "id": "b1_438",
    "word": "inspire",
    "pos": "v.",
    "ipa": "/ɪnˈspaɪər/",
    "meaning": "สร้างแรงบันดาลใจ",
    "example": "The marathon runner's remarkable recovery inspired athletes across the nation.",
    "category": "General"
  },
  {
    "id": "b1_439",
    "word": "install",
    "pos": "v.",
    "ipa": "/ɪnˈstɔːl/",
    "meaning": "ติดตั้งโปรแกรม",
    "example": "Click the install button to set up the interactive flashcard app.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_440",
    "word": "instruct",
    "pos": "v.",
    "ipa": "/ɪnˈstrʌkt/",
    "meaning": "สั่งสอน, แนะนำวิธี",
    "example": "The fitness trainer instructed clients on proper barbell posture.",
    "category": "General"
  },
  {
    "id": "b1_441",
    "word": "instrument",
    "pos": "n.",
    "ipa": "/ˈɪnstrəmənt/",
    "meaning": "เครื่องดนตรี",
    "example": "Playing a musical instrument like the violin enhances cognitive skills.",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_442",
    "word": "insult",
    "pos": "v.",
    "ipa": "/ɪnˈsʌlt/",
    "meaning": "ดูถูก, สบประมาท",
    "example": "Polite individuals never insult someone over differing opinions.",
    "category": "General"
  },
  {
    "id": "b1_443",
    "word": "intend",
    "pos": "v.",
    "ipa": "/ɪnˈtend/",
    "meaning": "ตั้งใจ, มุ่งหมาย",
    "example": "I intend to complete the Cambridge preparation course by next month.",
    "category": "Daily Life"
  },
  {
    "id": "b1_444",
    "word": "interfere",
    "pos": "v.",
    "ipa": "/ˌɪntəˈfɪər/",
    "meaning": "แทรกแซง",
    "example": "Do not let background distractions interfere with your study schedule.",
    "category": "General"
  },
  {
    "id": "b1_445",
    "word": "interpret",
    "pos": "v.",
    "ipa": "/ɪnˈtɜːprɪt/",
    "meaning": "แปลความหมาย",
    "example": "Art historians interpret the symbolic meanings hidden within Renaissance paintings.",
    "category": "General"
  },
  {
    "id": "b1_446",
    "word": "interrupt",
    "pos": "v.",
    "ipa": "/ˌɪntəˈrʌpt/",
    "meaning": "ขัดจังหวะ",
    "example": "Please let him finish speaking before you interrupt.",
    "category": "Daily Life"
  },
  {
    "id": "b1_447",
    "word": "interview",
    "pos": "n.",
    "ipa": "/ˈɪntəvjuː/",
    "meaning": "การสัมภาษณ์งาน",
    "example": "Dress professionally and arrive ten minutes early for your job interview.",
    "category": "Work & Career"
  },
  {
    "id": "b1_448",
    "word": "introduce",
    "pos": "v.",
    "ipa": "/ˌɪntrəˈdjuːs/",
    "meaning": "แนะนำให้รู้จัก",
    "example": "Allow me to introduce our visiting international language instructor.",
    "category": "General"
  },
  {
    "id": "b1_449",
    "word": "invent",
    "pos": "v.",
    "ipa": "/ɪnˈvent/",
    "meaning": "ประดิษฐ์คิดค้น",
    "example": "Alexander Graham Bell invented the telephone in the nineteenth century.",
    "category": "General"
  },
  {
    "id": "b1_450",
    "word": "invest",
    "pos": "v.",
    "ipa": "/ɪnˈvest/",
    "meaning": "ลงทุน",
    "example": "Investing time in your English language skills opens global career doors.",
    "category": "General"
  },
  {
    "id": "b1_451",
    "word": "investigate",
    "pos": "v.",
    "ipa": "/ɪnˈvestɪɡeɪt/",
    "meaning": "สืบสวน",
    "example": "Detectives investigated the cause of the sudden warehouse fire.",
    "category": "General"
  },
  {
    "id": "b1_452",
    "word": "invite",
    "pos": "v.",
    "ipa": "/ɪnˈvaɪt/",
    "meaning": "เชิญชวน",
    "example": "They invited fifty close friends to celebrate their wedding anniversary.",
    "category": "General"
  },
  {
    "id": "b1_453",
    "word": "involve",
    "pos": "v.",
    "ipa": "/ɪnˈvɒlv/",
    "meaning": "เกี่ยวข้อง, เกี่ยวพัน",
    "example": "Preparing for international exams involves dedication, practice, and review.",
    "category": "General"
  },
  {
    "id": "b1_454",
    "word": "iron",
    "pos": "v.",
    "ipa": "/ˈaɪən/",
    "meaning": "รีดผ้า",
    "example": "Iron your shirt neatly before attending formal corporate interviews.",
    "category": "General"
  },
  {
    "id": "b1_455",
    "word": "irritate",
    "pos": "v.",
    "ipa": "/ˈɪrɪteɪt/",
    "meaning": "ทำให้ระคายเคือง/หงุดหงิด",
    "example": "Blinking frequently soothes dry eyes irritated by computer screens.",
    "category": "General"
  },
  {
    "id": "b1_456",
    "word": "isolate",
    "pos": "v.",
    "ipa": "/ˈaɪsəleɪt/",
    "meaning": "แยกตัวออกไป",
    "example": "Quarantine protocols isolate infectious patients to safeguard others.",
    "category": "General"
  },
  {
    "id": "b1_457",
    "word": "itinerary",
    "pos": "n.",
    "ipa": "/aɪˈtɪnərəri/",
    "meaning": "กำหนดการเดินทาง, แผนการเที่ยว",
    "example": "Our seven-day Europe itinerary covers Paris, Brussels, and Amsterdam.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_458",
    "word": "jealous",
    "pos": "adj.",
    "ipa": "/ˈdʒeləs/",
    "meaning": "อิจฉา, หึงหวง",
    "example": "Try not to feel jealous of other people's fast achievements; focus on your own growth.",
    "category": "Emotions & Traits"
  },
  {
    "id": "b1_459",
    "word": "jog",
    "pos": "v.",
    "ipa": "/dʒɒɡ/",
    "meaning": "วิ่งเหยาะๆ",
    "example": "Jogging around the park at sunrise is a refreshing morning routine.",
    "category": "General"
  },
  {
    "id": "b1_460",
    "word": "join",
    "pos": "v.",
    "ipa": "/dʒɔɪn/",
    "meaning": "เข้าร่วม",
    "example": "Join our online study group to practice conversational English daily.",
    "category": "General"
  },
  {
    "id": "b1_461",
    "word": "journalist",
    "pos": "n.",
    "ipa": "/ˈdʒɜːnəlɪst/",
    "meaning": "นักข่าว, ผู้สื่อข่าว",
    "example": "Investigative journalists uncovered vital evidence regarding environmental pollution.",
    "category": "Media & Society"
  },
  {
    "id": "b1_462",
    "word": "journey",
    "pos": "n.",
    "ipa": "/ˈdʒɜːni/",
    "meaning": "การเดินทางระยะทางไกล",
    "example": "The train journey through the Swiss Alps offers breathtaking alpine scenery.",
    "category": "Travel & Transport"
  },
  {
    "id": "b1_463",
    "word": "judge",
    "pos": "v.",
    "ipa": "/dʒʌdʒ/",
    "meaning": "ตัดสิน",
    "example": "Do not judge a book by its cover; explore its contents first.",
    "category": "General"
  },
  {
    "id": "b1_464",
    "word": "jump",
    "pos": "v.",
    "ipa": "/dʒʌmp/",
    "meaning": "กระโดด",
    "example": "The excited children jumped into the swimming pool on a hot afternoon.",
    "category": "General"
  },
  {
    "id": "b1_465",
    "word": "justify",
    "pos": "v.",
    "ipa": "/ˈdʒʌstɪfaɪ/",
    "meaning": "ให้เหตุผลสนับสนุน",
    "example": "Can you justify your decision to prioritize vocabulary acquisition first?",
    "category": "General"
  },
  {
    "id": "b1_466",
    "word": "keep",
    "pos": "v.",
    "ipa": "/kiːp/",
    "meaning": "เก็บรักษา, ทำอย่างต่อเนื่อง",
    "example": "Keep your study streak burning bright by reviewing ten words daily.",
    "category": "General"
  },
  {
    "id": "b1_467",
    "word": "keep up with",
    "pos": "phr. v.",
    "ipa": "/kiːp ʌp wɪð/",
    "meaning": "ตามให้ทัน",
    "example": "It can be challenging to keep up with the latest technological developments.",
    "category": "Verbs & Expressions"
  },
  {
    "id": "b1_468",
    "word": "kick",
    "pos": "v.",
    "ipa": "/kɪk/",
    "meaning": "เตะ",
    "example": "The midfielder kicked a precise pass directly to the advancing striker.",
    "category": "General"
  },
  {
    "id": "b1_469",
    "word": "kiss",
    "pos": "v.",
    "ipa": "/kɪs/",
    "meaning": "จูบ",
    "example": "Parents kissed their children goodnight before turning off bedroom lights.",
    "category": "General"
  },
  {
    "id": "b1_470",
    "word": "kitchen",
    "pos": "n.",
    "ipa": "/ˈkɪtʃɪn/",
    "meaning": "ห้องครัว",
    "example": "The aroma of freshly baked garlic bread filled the entire kitchen.",
    "category": "Home & Living"
  },
  {
    "id": "b1_471",
    "word": "kneel",
    "pos": "v.",
    "ipa": "/niːl/",
    "meaning": "คุกเข่า",
    "example": "Gardeners kneel on padded mats while weeding delicate flower beds.",
    "category": "General"
  },
  {
    "id": "b1_472",
    "word": "knit",
    "pos": "v.",
    "ipa": "/nɪt/",
    "meaning": "ถักไหมพรม",
    "example": "Grandmother knitted a warm woollen scarf for the cold winter weather.",
    "category": "General"
  },
  {
    "id": "b1_473",
    "word": "knock",
    "pos": "v.",
    "ipa": "/nɒk/",
    "meaning": "เคาะประตู",
    "example": "Always knock politely on closed office doors before entering.",
    "category": "General"
  },
  {
    "id": "b1_474",
    "word": "label",
    "pos": "v.",
    "ipa": "/ˈleɪbl/",
    "meaning": "ติดป้ายฉลาก",
    "example": "Label all your travel luggage bags clearly with your phone number.",
    "category": "General"
  },
  {
    "id": "b1_475",
    "word": "laboratory",
    "pos": "n.",
    "ipa": "/ləˈbɒrətri/",
    "meaning": "ห้องปฏิบัติการ, ห้องแล็บ",
    "example": "Students must wear protective goggles when conducting chemistry experiments in the laboratory.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_476",
    "word": "lack",
    "pos": "v.",
    "ipa": "/læk/",
    "meaning": "ขาดแคลน",
    "example": "Plants will wither if they lack sufficient sunlight and clean water.",
    "category": "General"
  },
  {
    "id": "b1_477",
    "word": "land",
    "pos": "v.",
    "ipa": "/lænd/",
    "meaning": "ลงจอด",
    "example": "The Airbus commercial aircraft landed smoothly despite strong coastal crosswinds.",
    "category": "General"
  },
  {
    "id": "b1_478",
    "word": "last",
    "pos": "v.",
    "ipa": "/lɑːst/",
    "meaning": "คงอยู่, มีอายุการใช้งาน",
    "example": "These durable leather boots will last for many years of hiking.",
    "category": "General"
  },
  {
    "id": "b1_479",
    "word": "laugh",
    "pos": "v.",
    "ipa": "/lɑːf/",
    "meaning": "หัวเราะ",
    "example": "Everyone laughed heartily at the comedian's clever observational jokes.",
    "category": "General"
  },
  {
    "id": "b1_480",
    "word": "launch",
    "pos": "v.",
    "ipa": "/lɔːntʃ/",
    "meaning": "เปิดตัว, ยิงจรวด",
    "example": "The tech startup launched its revolutionary mobile app on Vercel.",
    "category": "General"
  },
  {
    "id": "b1_481",
    "word": "lead",
    "pos": "v.",
    "ipa": "/liːd/",
    "meaning": "นำทาง, เป็นผู้นำ",
    "example": "Experienced guides lead travelers through breathtaking alpine trails.",
    "category": "General"
  },
  {
    "id": "b1_482",
    "word": "leak",
    "pos": "v.",
    "ipa": "/liːk/",
    "meaning": "รั่วไหล",
    "example": "The kitchen water pipe began to leak under the sink basin.",
    "category": "General"
  },
  {
    "id": "b1_483",
    "word": "lean",
    "pos": "v.",
    "ipa": "/liːn/",
    "meaning": "พิง, เอนตัว",
    "example": "Do not lean against the subway doors while the train is in motion.",
    "category": "General"
  },
  {
    "id": "b1_484",
    "word": "leap",
    "pos": "v.",
    "ipa": "/liːp/",
    "meaning": "กระโดดข้าม",
    "example": "The athletic gazelle leaped gracefully over the wooden pasture fence.",
    "category": "General"
  },
  {
    "id": "b1_485",
    "word": "learn",
    "pos": "v.",
    "ipa": "/lɜːn/",
    "meaning": "เรียนรู้",
    "example": "Learn vocabulary through contextual sentences rather than isolated word lists.",
    "category": "General"
  },
  {
    "id": "b1_486",
    "word": "leave",
    "pos": "v.",
    "ipa": "/liːv/",
    "meaning": "ออกจาก, ทิ้งไว้",
    "example": "Remember to leave your hotel room keycard at the front reception.",
    "category": "General"
  },
  {
    "id": "b1_487",
    "word": "lecture",
    "pos": "n.",
    "ipa": "/ˈlektʃər/",
    "meaning": "การบรรยายในห้องเรียน",
    "example": "The visiting professor gave an inspiring guest lecture on artificial intelligence.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_488",
    "word": "leisure",
    "pos": "n.",
    "ipa": "/ˈleʒər/",
    "meaning": "เวลาว่าง, กิจกรรมยามว่าง",
    "example": "What sports do you enjoy participating in during your leisure time?",
    "category": "Arts & Leisure"
  },
  {
    "id": "b1_489",
    "word": "lend",
    "pos": "v.",
    "ipa": "/lend/",
    "meaning": "ให้ยืม",
    "example": "Could you lend me an umbrella until the afternoon storm clears?",
    "category": "General"
  },
  {
    "id": "b1_490",
    "word": "let",
    "pos": "v.",
    "ipa": "/let/",
    "meaning": "อนุญาตให้",
    "example": "Let curiosity be your greatest teacher on your language journey.",
    "category": "General"
  },
  {
    "id": "b1_491",
    "word": "library",
    "pos": "n.",
    "ipa": "/ˈlaɪbrəri/",
    "meaning": "ห้องสมุด",
    "example": "You can borrow up to six academic textbooks from the campus library.",
    "category": "Education & Tech"
  },
  {
    "id": "b1_492",
    "word": "lift",
    "pos": "v.",
    "ipa": "/lɪft/",
    "meaning": "ยกขึ้น",
    "example": "Ask for assistance when you need to lift heavy airport baggage.",
    "category": "General"
  },
  {
    "id": "b1_493",
    "word": "light",
    "pos": "v.",
    "ipa": "/laɪt/",
    "meaning": "จุดไฟ, ส่องสว่าง",
    "example": "They lit scented candles around the dining table for the celebration.",
    "category": "General"
  },
  {
    "id": "b1_494",
    "word": "lightning",
    "pos": "n.",
    "ipa": "/ˈlaɪtnɪŋ/",
    "meaning": "ฟ้าแลบ, ฟ้าผ่า",
    "example": "Brilliant flashes of lightning lit up the stormy midnight sky.",
    "category": "Environment & Nature"
  },
  {
    "id": "b1_495",
    "word": "limit",
    "pos": "v.",
    "ipa": "/ˈlɪmɪt/",
    "meaning": "จำกัดขอบเขต",
    "example": "Limit your daily screen time before sleep to improve deep rest.",
    "category": "General"
  },
  {
    "id": "b1_496",
    "word": "link",
    "pos": "v.",
    "ipa": "/lɪŋk/",
    "meaning": "เชื่อมโยง",
    "example": "The online platform links learners with native conversation partners worldwide.",
    "category": "General"
  },
  {
    "id": "b1_497",
    "word": "listen",
    "pos": "v.",
    "ipa": "/ˈlɪsn/",
    "meaning": "รับฟังอย่างตั้งใจ",
    "example": "Listen carefully to the authentic pronunciation to train your accent.",
    "category": "General"
  },
  {
    "id": "b1_498",
    "word": "live",
    "pos": "v.",
    "ipa": "/lɪv/",
    "meaning": "อาศัยอยู่",
    "example": "Many international university students live in shared city flats.",
    "category": "General"
  },
  {
    "id": "b1_499",
    "word": "load",
    "pos": "v.",
    "ipa": "/ləʊd/",
    "meaning": "บรรทุก, โหลดข้อมูล",
    "example": "The web application loads in milliseconds thanks to modern Vite bundling.",
    "category": "General"
  },
  {
    "id": "b1_500",
    "word": "locate",
    "pos": "v.",
    "ipa": "/ləʊˈkeɪt/",
    "meaning": "หาตำแหน่ง, ตั้งอยู่",
    "example": "GPS navigation systems help drivers locate remote countryside addresses.",
    "category": "General"
  },
  {
    "id": "b1_501",
    "word": "look forward to",
    "pos": "phr.v.",
    "ipa": "/lʊk ˈfɔːwəd tuː/",
    "meaning": "ตั้งตารอคอยอย่างใจจดใจจ่อ",
    "example": "I really look forward to hearing your wonderful test results soon.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_502",
    "word": "give up",
    "pos": "phr.v.",
    "ipa": "/ɡɪv ʌp/",
    "meaning": "ยอมแพ้, ละทิ้งความพยายาม",
    "example": "Never give up when learning English; daily consistency brings mastery.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_503",
    "word": "find out",
    "pos": "phr.v.",
    "ipa": "/faɪnd aʊt/",
    "meaning": "ค้นพบ, หาคำตอบจนรู้ความจริง",
    "example": "We can find out the train timetable by checking the mobile app.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_504",
    "word": "carry on",
    "pos": "phr.v.",
    "ipa": "/ˈkæri ɒn/",
    "meaning": "ดำเนินต่อไป, ทำต่อไปไม่หยุด",
    "example": "Please carry on with your reading while the teacher checks homework.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_505",
    "word": "come across",
    "pos": "phr.v.",
    "ipa": "/kʌm əˈkrɒs/",
    "meaning": "พบเจอโดยบังเอิญ",
    "example": "I came across an interesting article about Cambridge PET exams.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_506",
    "word": "get along with",
    "pos": "phr.v.",
    "ipa": "/ɡet əˈlɒŋ wɪð/",
    "meaning": "เข้ากันได้ดีกับผู้อื่น",
    "example": "She gets along with all her classmates and international roommates.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_507",
    "word": "look after",
    "pos": "phr.v.",
    "ipa": "/lʊk ˈɑːftə/",
    "meaning": "ดูแลเอาใจใส่, คอยคุ้มครอง",
    "example": "Can you please look after my dog while I travel abroad for a week?",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_508",
    "word": "put off",
    "pos": "phr.v.",
    "ipa": "/pʊt ɒf/",
    "meaning": "เลื่อนออกไปก่อน, ผลัดวันประกันพรุ่ง",
    "example": "Never put off until tomorrow what you can easily study today.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_509",
    "word": "run out of",
    "pos": "phr.v.",
    "ipa": "/rʌn aʊt əv/",
    "meaning": "หมดเกลี้ยง, ขาดแคลน",
    "example": "We ran out of petrol just before reaching the downtown gas station.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_510",
    "word": "work out",
    "pos": "phr.v.",
    "ipa": "/wɜːk aʊt/",
    "meaning": "ออกกำลังกาย, แก้ไขปัญหาได้สำเร็จ",
    "example": "Regular physical exercise works out both your body and mind effectively.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_511",
    "word": "break down",
    "pos": "phr.v.",
    "ipa": "/breɪk daʊn/",
    "meaning": "เครื่องยนต์เสีย, พัง, สติแตก",
    "example": "Our family car broke down on the expressway during heavy monsoon rain.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_512",
    "word": "catch up with",
    "pos": "phr.v.",
    "ipa": "/kætʃ ʌp wɪð/",
    "meaning": "ไล่ตามทัน, พบปะอัปเดตข่าวคราว",
    "example": "Let's grab coffee this Saturday to catch up with each other's news.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_513",
    "word": "cut down on",
    "pos": "phr.v.",
    "ipa": "/kʌt daʊn ɒn/",
    "meaning": "ลดปริมาณการใช้หรือบริโภค",
    "example": "Doctors advise that we cut down on sugary drinks to stay healthy.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_514",
    "word": "figure out",
    "pos": "phr.v.",
    "ipa": "/ˈfɪɡər aʊt/",
    "meaning": "คิดคำนวณหรือหาทางออกได้สำเร็จ",
    "example": "With enough focus, you can figure out the solution to complex puzzles.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_515",
    "word": "turn down",
    "pos": "phr.v.",
    "ipa": "/tɜːn daʊn/",
    "meaning": "ปฏิเสธข้อเสนอ, หรี่เสียงลง",
    "example": "He turned down the job offer because the daily commute was too long.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_516",
    "word": "set up",
    "pos": "phr.v.",
    "ipa": "/set ʌp/",
    "meaning": "ก่อตั้ง, ติดตั้งอุปกรณ์",
    "example": "She set up an online English tutoring business with friends.",
    "category": "Phrasal Verbs"
  },
  {
    "id": "b1_517",
    "word": "piece of cake",
    "pos": "idiom",
    "ipa": "/piːs əv keɪk/",
    "meaning": "ง่ายเหมือนปอกกล้วยเข้าปาก",
    "example": "Passing the B1 vocabulary test is a piece of cake with daily practice.",
    "category": "Idioms & Expressions"
  },
  {
    "id": "b1_518",
    "word": "under the weather",
    "pos": "idiom",
    "ipa": "/ˈʌndə ðə ˈweðə/",
    "meaning": "รู้สึกไม่ค่อยสบาย, ป่วยเล็กน้อย",
    "example": "I'm feeling a bit under the weather today, so I will rest at home.",
    "category": "Idioms & Expressions"
  },
  {
    "id": "b1_519",
    "word": "once in a blue moon",
    "pos": "idiom",
    "ipa": "/wʌns ɪn ə bluː muːn/",
    "meaning": "นานๆ ที, แทบจะไม่เกิดขึ้นเลย",
    "example": "He only eats fast food once in a blue moon because he prefers cooking.",
    "category": "Idioms & Expressions"
  },
  {
    "id": "b1_520",
    "word": "hit the books",
    "pos": "idiom",
    "ipa": "/hɪt ðə bʊks/",
    "meaning": "ตั้งหน้าตั้งตาอ่านหนังสือสอบ",
    "example": "Final exams start on Monday, so it's time to hit the books tonight.",
    "category": "Idioms & Expressions"
  }
];
