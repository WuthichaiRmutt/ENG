/**
 * Native Web Speech API Text-to-Speech (TTS)
 * Works directly in modern mobile browsers (iOS Safari, Android Chrome) and Desktop without external APIs.
 * Supports crystal-clear natural male voice prioritization and adjustable speech speed.
 */

class TextToSpeechService {
  private synth: SpeechSynthesis | null = null;
  private maleVoice: SpeechSynthesisVoice | null = null;
  private femaleVoice: SpeechSynthesisVoice | null = null;
  private preferredGender: 'male' | 'female' = 'male';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    const englishVoices = voices.filter((v) => v.lang.startsWith('en'));

    // Male voice keywords across Windows, macOS/iOS, and Android
    const maleKeywords = [
      'male',
      'david',
      'george',
      'daniel',
      'oliver',
      'guy',
      'ryan',
      'james',
      'brian',
      'arthur',
      'alec',
      'richard',
      'thomas',
    ];

    // Female voice keywords
    const femaleKeywords = [
      'female',
      'zira',
      'susan',
      'hazel',
      'samantha',
      'karen',
      'victoria',
      'fiona',
      'moira',
      'catherine',
    ];

    // Find best male English voice
    this.maleVoice =
      englishVoices.find((v) =>
        maleKeywords.some((k) => v.name.toLowerCase().includes(k)) &&
        (v.name.includes('Natural') || v.name.includes('Online'))
      ) ||
      englishVoices.find((v) =>
        maleKeywords.some((k) => v.name.toLowerCase().includes(k))
      ) ||
      englishVoices.find((v) => v.lang === 'en-GB' && !femaleKeywords.some((k) => v.name.toLowerCase().includes(k))) ||
      englishVoices.find((v) => v.lang === 'en-US' && !femaleKeywords.some((k) => v.name.toLowerCase().includes(k))) ||
      null;

    // Find best female English voice
    this.femaleVoice =
      englishVoices.find((v) =>
        femaleKeywords.some((k) => v.name.toLowerCase().includes(k))
      ) ||
      englishVoices.find((v) => v.lang === 'en-GB') ||
      englishVoices[0] ||
      null;
  }

  public setGender(gender: 'male' | 'female') {
    this.preferredGender = gender;
  }

  public getGender(): 'male' | 'female' {
    return this.preferredGender;
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public speak(
    text: string,
    rate: number = 0.85,
    gender: 'male' | 'female' = 'male'
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve();
        return;
      }

      this.synth.cancel(); // Stop any pending speech

      if (!this.maleVoice && !this.femaleVoice) {
        this.initVoices();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';

      // 0.82 - 0.85 rate produces clear, articulate pronunciation for exam listening
      utterance.rate = rate;

      if (gender === 'male') {
        if (this.maleVoice) {
          utterance.voice = this.maleVoice;
        }
        // Slightly deeper pitch creates a rich, clear masculine tone
        utterance.pitch = 0.88;
      } else {
        if (this.femaleVoice) {
          utterance.voice = this.femaleVoice;
        }
        utterance.pitch = 1.05;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      this.synth.speak(utterance);
    });
  }
}

export const ttsService = new TextToSpeechService();
export const tts = ttsService;
