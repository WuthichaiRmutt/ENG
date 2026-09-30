-- ==============================================================================
-- Cambridge PET B1 Vocabulary Academy - Supabase Schema
-- ==============================================================================

-- 1. Create Vocabularies Table
CREATE TABLE IF NOT EXISTS public.vocabularies (
    id TEXT PRIMARY KEY,
    word TEXT NOT NULL,
    pos TEXT NOT NULL,
    ipa TEXT,
    meaning TEXT NOT NULL,
    example TEXT,
    category TEXT DEFAULT 'General',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for searching and filtering
CREATE INDEX IF NOT EXISTS idx_vocab_word ON public.vocabularies(word);
CREATE INDEX IF NOT EXISTS idx_vocab_category ON public.vocabularies(category);

-- 2. Create User Word Progress Table (Spaced Repetition & Status)
CREATE TABLE IF NOT EXISTS public.user_word_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    vocab_id TEXT NOT NULL REFERENCES public.vocabularies(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'normal' CHECK (status IN ('normal', 'focus', 'mastered')),
    box_level INT DEFAULT 1 CHECK (box_level BETWEEN 1 AND 5),
    next_review_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    correct_count INT DEFAULT 0,
    wrong_count INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, vocab_id)
);

CREATE INDEX IF NOT EXISTS idx_uwp_user_vocab ON public.user_word_progress(user_id, vocab_id);
CREATE INDEX IF NOT EXISTS idx_uwp_status ON public.user_word_progress(user_id, status);

-- 3. Create User Profiles Table (Streak & Goals)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    streak_days INT DEFAULT 0,
    last_study_date DATE,
    daily_goal INT DEFAULT 15,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- Row Level Security (RLS)
-- ==============================================================================
ALTER TABLE public.vocabularies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_word_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Vocabularies: Everyone can read
CREATE POLICY "Allow public read access to vocabularies"
ON public.vocabularies FOR SELECT
TO anon, authenticated
USING (true);

-- User Progress: Users can only view and update their own records
CREATE POLICY "Users can view own word progress"
ON public.user_word_progress FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own word progress"
ON public.user_word_progress FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own word progress"
ON public.user_word_progress FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- User Profiles: Users can only view and update their own profile
CREATE POLICY "Users can view own profile"
ON public.user_profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
ON public.user_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON public.user_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
