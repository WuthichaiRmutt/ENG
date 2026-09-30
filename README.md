# 🎓 PET B1 Vocabulary Academy

ระบบเว็บแอปพลิเคชันฝึกคำศัพท์ภาษาอังกฤษระดับ **Cambridge Preliminary (PET) B1** มาตรฐาน 500+ คำ ตรวจสอบความถูกต้องครบถ้วน ออกแบบ **Mobile-First** รองรับสมาร์ตโฟนและคอมพิวเตอร์ เชื่อมต่อ **Supabase** เป็นฐานข้อมูล และพร้อม Deploy บน **Vercel** ทันที

---

## 🌟 ฟีเจอร์เด่นเพื่อการจำศัพท์ได้จริง (Learning Retention)

1. **📱 Mobile-First 100% (เหมือน Native App):**
   - แถบเมนูด้านล่าง (Bottom Navigation Bar) ใช้งานง่ายด้วยนิ้วโป้งมือเดียว
   - รองรับ Responsive ขยายหน้าจอบนแท็บเล็ตและคอมพิวเตอร์อย่างสวยงาม
   - Dark / Light Mode ถนอมสายตา

2. **🃏 Smart Flashcards & Web Speech TTS:**
   - การ์ด 3D แตะพลิกหน้า-หลังดูคำแปล พร้อมประโยคตัวอย่างบริบทจริง
   - ลำโพงออกเสียงคำศัพท์สำเนียงเจ้าของภาษาด้วย Web Speech API (ในตัวเบราว์เซอร์ ฟรีและโหลดไว)
   - ปุ่มประเมินความจำ "ยังไม่แม่น (Focus)" 🔴 และ "จำได้แม่นแล้ว" 🟢

3. **🎯 ระบบกล่องความจำ Spaced Repetition (SRS Leitner 5 ระดับ):**
   - จัดสรรความถี่ในการทบทวนตามระดับความจำ (Box 1 = 1 วัน, Box 2 = 3 วัน, Box 3 = 7 วัน, Box 4 = 14 วัน, Box 5 = 30 วัน)
   - หากตอบผิดหรือจำไม่แม่น ระบบจะย้ายคำนั้นเข้า **Focus Zone** โดยอัตโนมัติ

4. **📝 โหมดแบบทดสอบ (Quiz):**
   - คำถาม 4 ตัวเลือกสุ่มจากคลังคำศัพท์
   - ตรวจคำตอบและเฉลยทันที หากตอบผิดจะส่งเข้า Focus Zone ให้อัตโนมัติ

5. **📖 คลังคำศัพท์ 500+ คำ (Word Bank):**
   - ค้นหาคำศัพท์ภาษาอังกฤษหรือความหมายภาษาไทยแบบ Real-time
   - กรองตามสถานะ (รู้แล้ว / ยังไม่แม่น / ทั้งหมด) และแยกตามหมวดหมู่ (Theme)

6. **☁️ Supabase Cloud & Local-First Hybrid:**
   - ใช้งานได้ทันทีแม้ยังไม่ได้เชื่อมต่อ Cloud (บันทึกความก้าวหน้าลงในเครื่องปลอดภัย 100%)
   - มี Modal ให้ใส่ Project URL และ Anon Key เพื่อ Sync ขึ้น Supabase Cloud ได้ทันที

---

## 🚀 วิธีเปิดใช้งานในเครื่อง (Local Development)

```bash
# 1. ติดตั้ง Dependencies (ทำเสร็จแล้ว)
npm install

# 2. เริ่มต้น Dev Server
npm run dev
```

เปิดเบราว์เซอร์ไปที่: `http://localhost:3000`

---

## 🗄️ ขั้นตอนการตั้งค่า Supabase (ใช้เวลา 2 นาที)

1. สมัครใช้งานฟรีที่ [supabase.com](https://supabase.com) แล้วกด **New Project**
2. ไปที่เมนู **SQL Editor** ในแดชบอร์ด Supabase:
   - นำโค้ดจากไฟล์ `supabase/schema.sql` ไปวางแล้วกด **Run** (สร้างตารางและสิทธิ์ RLS)
   - นำโค้ดจากไฟล์ `supabase/seed.sql` ไปวางแล้วกด **Run** (นำเข้าคำศัพท์ B1 500 คำ)
3. ไปที่เมนู **Project Settings > API**:
   - คัดลอก **Project URL**
   - คัดลอก **Project API Keys (anon public)**
4. นำไปกรอกได้ 2 วิธี:
   - **วิธีที่ 1:** กรอกผ่านปุ่มรูปก้อนเมฆ ☁️ มุมขวาบนในตัวเว็บแอปได้เลย
   - **วิธีที่ 2:** สร้างไฟล์ `.env.local` ในโปรเจกต์:
     ```env
     VITE_SUPABASE_URL=https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

---

## 🌐 ขั้นตอนการ Deploy บน Vercel

### วิธีที่ง่ายที่สุดผ่าน GitHub:
1. สร้าง GitHub Repository แล้ว Push โค้ดทั้งหมดขึ้น GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for PET B1 Vocabulary Academy"
   git branch -M main
   git remote add origin <URL-GITHUB-REPO-ของคุณ>
   git push -u origin main
   ```
2. ล็อกอินเข้า [vercel.com](https://vercel.com) แล้วกด **Add New > Project**
3. เลือก Repository นี้
4. ในส่วน **Environment Variables** ให้เพิ่ม 2 ค่า:
   - `VITE_SUPABASE_URL` = URL ของ Supabase คุณ
   - `VITE_SUPABASE_ANON_KEY` = Anon Key ของ Supabase คุณ
5. กด **Deploy** ภายใน 1 นาที เว็บแอปจะออนไลน์พร้อมแชร์ลิงก์ให้ทุกคนใช้งานได้ทันที!
