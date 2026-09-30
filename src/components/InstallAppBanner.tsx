import React, { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, Smartphone, Laptop, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

interface InstallAppBannerProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const InstallAppBanner: React.FC<InstallAppBannerProps> = ({
  isOpenModal = false,
  onCloseModal,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'desktop'>('android');

  useEffect(() => {
    // Check if running in standalone mode
    const isApp =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(isApp);

    // Detect iOS
    const ua = window.navigator.userAgent;
    const isIosDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    setIsIOS(isIosDevice);
    if (isIosDevice) {
      setActiveTab('ios');
    }

    // Capture Android / Chrome beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).__pwaDeferredPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Sync external isOpenModal prop
  useEffect(() => {
    if (isOpenModal) {
      setShowModal(true);
    }
  }, [isOpenModal]);

  const handleInstallClick = async () => {
    const prompt = deferredPrompt || (window as any).__pwaDeferredPrompt;
    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        (window as any).__pwaDeferredPrompt = null;
        setShowModal(false);
        if (onCloseModal) onCloseModal();
      }
    } else {
      // If prompt is not directly available, open guide modal
      setShowModal(true);
    }
  };

  const handleCloseGuide = () => {
    setShowModal(false);
    if (onCloseModal) onCloseModal();
  };

  return (
    <>
      {/* Top Banner (Only if not already installed as app and not dismissed) */}
      {!isStandalone && !isBannerDismissed && (
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-brand-600 text-white p-3 sm:p-3.5 rounded-2xl shadow-md border border-indigo-400/40 mb-4 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-white shadow-xs">
              <Download className="w-5 h-5 animate-bounce" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold leading-tight">
                ติดตั้งแอปลงบนจอมือถือ (PWA)
              </h4>
              <p className="text-[10px] sm:text-xs text-indigo-100 mt-0.5 truncate">
                เปิดแบบเต็มจอ ไร้แถบ URL เรียนลื่นไหลไม่มีสะดุด
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-black text-xs px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition whitespace-nowrap flex items-center gap-1"
            >
              <span>{deferredPrompt ? 'ติดตั้งทันที' : 'วิธีติดตั้ง'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsBannerDismissed(true)}
              className="p-1 rounded-full text-indigo-200 hover:text-white transition"
              title="ซ่อนแถบแจ้งเตือน"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Full Installation Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                    วิธีติดตั้งแอปลงหน้าจอ
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    ใช้งานได้เหมือนแอปจาก App Store / Play Store
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseGuide}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct 1-Tap Install Button if Browser Supports */}
            {deferredPrompt && (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-3.5 rounded-2xl flex items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    เบราว์เซอร์ของคุณพร้อมติดตั้ง 1-Tap!
                  </h4>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    กดปุ่มเพื่อเริ่มติดตั้งลงหน้าจอมือถือได้ทันที
                  </p>
                </div>
                <button
                  onClick={handleInstallClick}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xs active:scale-95 transition whitespace-nowrap"
                >
                  ติดตั้งตอนนี้
                </button>
              </div>
            )}

            {/* Device Switcher Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              <button
                onClick={() => setActiveTab('android')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'android'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android</span>
              </button>
              <button
                onClick={() => setActiveTab('ios')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'ios'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Share className="w-3.5 h-3.5" />
                <span>iPhone / iOS</span>
              </button>
              <button
                onClick={() => setActiveTab('desktop')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'desktop'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>คอมพิวเตอร์</span>
              </button>
            </div>

            {/* Steps Content */}
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              {activeTab === 'android' && (
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="leading-relaxed">
                      เปิดเว็บนี้ด้วย <strong>Google Chrome</strong> หรือ <strong>Samsung Internet</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="leading-relaxed">
                      แตะปุ่มจุดสามจุด <strong>(⋮)</strong> ที่มุมขวาบนของเบราว์เซอร์
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="leading-relaxed">
                      เลือก <strong>"ติดตั้งแอป (Install app)"</strong> หรือ <strong>"เพิ่มลงในหน้าจอหลัก (Add to Home screen)"</strong>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'ios' && (
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="leading-relaxed">
                      เปิดเว็บนี้ด้วย <strong>Safari</strong> บน iPhone หรือ iPad
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="leading-relaxed flex items-center gap-1.5 flex-wrap">
                      แตะปุ่ม <strong>แชร์ (Share)</strong>
                      <span className="inline-flex p-1 bg-slate-200 dark:bg-slate-700 rounded-md">
                        <Share className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      </span>
                      ที่แถบเมนูด้านล่าง
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="leading-relaxed flex items-center gap-1.5 flex-wrap">
                      เลื่อนลงมาแล้วเลือก <strong>"เพิ่มไปยังหน้าจอโฮม (Add to Home Screen)"</strong>
                      <span className="inline-flex p-1 bg-slate-200 dark:bg-slate-700 rounded-md">
                        <PlusSquare className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      </span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      4
                    </span>
                    <p className="leading-relaxed">
                      แตะปุ่ม <strong>"เพิ่ม (Add)"</strong> ที่มุมขวาบน เป็นอันเสร็จสิ้น!
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'desktop' && (
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="leading-relaxed">
                      ใช้งานบน <strong>Google Chrome</strong> หรือ <strong>Microsoft Edge</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="leading-relaxed">
                      สังเกตที่ <strong>แถบที่อยู่ URL (ขวาบน)</strong> จะมีไอคอนคอมพิวเตอร์พร้อมลูกศรลง <Download className="w-3.5 h-3.5 inline text-indigo-600" />
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="leading-relaxed">
                      กดปุ่ม <strong>"ติดตั้ง (Install)"</strong> ตัวแอปจะเปิดเป็นหน้าต่างแยกอิสระทันที
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Warning Note for Facebook/LINE/Messenger */}
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-3 rounded-2xl flex items-start gap-2.5 text-[11px] text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <strong>ข้อควรระวัง:</strong> หากเปิดเว็บนี้มาจาก Facebook, Messenger หรือ LINE ระบบจะไม่ยอมให้ติดตั้งแอป ให้แตะจุด 3 จุดแล้วเลือก <strong>"เปิดในเบราว์เซอร์ภายนอก (Open in Chrome / Safari)"</strong> ก่อนเสมอครับ
              </div>
            </div>

            <button
              onClick={handleCloseGuide}
              className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs py-2.5 rounded-2xl active:scale-98 transition shadow-xs"
            >
              เข้าใจแล้ว ปิดหน้าต่างนี้
            </button>
          </div>
        </div>
      )}
    </>
  );
};
