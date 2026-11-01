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
      this.refreshVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.refreshVoices();
      }
    }
  }

  public refreshVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));

    // Comprehensive list of male voice names across Windows, Android, macOS, and iOS
    const maleNames = [
      'david',
      'george',
      'daniel',
      'oliver',
      'guy',
      'ryan',
      'james',
      'alex',
      'fred',
      'aaron',
      'arthur',
      'brian',
      'mark',
      'richard',
      'tom',
      'thomas',
      'john',
      'paul',
      'andrew',
      'steven',
      'matthew',
      'william',
      'edward',
      'charles',
      'male',
    ];

    // Explicit female identifiers to strictly avoid
    const femaleNames = [
      'female',
      'woman',
      'zira',
      'susan',
      'hazel',
      'samantha',
      'karen',
      'victoria',
      'fiona',
      'moira',
      'catherine',
      'jenny',
      'ava',
      'aria',
      'emma',
      'serena',
      'stephanie',
      'linda',
      'heather',
      'kendra',
      'kimberly',
      'salli',
      'joanna',
      'ivy',
      'amy',
    ];

    // 1. First priority: English voice containing explicit male name or "male"
    let candidateMale = englishVoices.find((v) => {
      const name = v.name.toLowerCase();
      const isExplicitFemale = femaleNames.some((f) => name.includes(f));
      if (isExplicitFemale) return false;
      return maleNames.some((m) => name.includes(m));
    });

    // 2. Second priority: If no explicit male name found, pick any English voice that is NOT in femaleNames
    if (!candidateMale) {
      candidateMale = englishVoices.find((v) => {
        const name = v.name.toLowerCase();
        return !femaleNames.some((f) => name.includes(f));
      });
    }

    this.maleVoice = candidateMale || englishVoices[0] || null;

    // Pick a female voice for comparison
    this.femaleVoice =
      englishVoices.find((v) => {
        const name = v.name.toLowerCase();
        return femaleNames.some((f) => name.includes(f));
      }) ||
      englishVoices.find((v) => v !== this.maleVoice) ||
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
    rate: number = 0.82,
    gender: 'male' | 'female' = 'male'
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve();
        return;
      }

      this.synth.cancel(); // Stop any pending speech

      // Re-fetch voices in case browser loaded voices asynchronously
      this.refreshVoices();

      const utterance = new SpeechSynthesisUtterance(text);

      let targetVoice: SpeechSynthesisVoice | null = null;

      if (gender === 'male') {
        targetVoice = this.maleVoice;
        // Deep masculine pitch (0.76 produces a distinctly clear male tone on any device)
        utterance.pitch = 0.76;
      } else {
        targetVoice = this.femaleVoice;
        utterance.pitch = 1.05;
      }

      if (targetVoice) {
        utterance.voice = targetVoice;
        // CRITICAL FIX: utterance.lang MUST match the voice's lang!
        // If they mismatch (e.g. en-GB vs en-US voice), the browser ignores the voice and falls back to default female!
        utterance.lang = targetVoice.lang;
      } else {
        utterance.lang = 'en-US';
        utterance.pitch = gender === 'male' ? 0.72 : 1.0;
      }

      // Slightly slower speed for clear exam listening
      utterance.rate = rate;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      this.synth.speak(utterance);
    });
  }
}

export const ttsService = new TextToSpeechService();
export const tts = ttsService;
