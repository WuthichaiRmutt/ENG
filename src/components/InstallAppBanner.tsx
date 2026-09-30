import React, { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare } from 'lucide-react';

export const InstallAppBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already in standalone app mode
    const isApp =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(isApp);

    // Check if user previously dismissed
    const dismissed = localStorage.getItem('pet_b1_install_dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    // Detect iOS Safari
    const ua = window.navigator.userAgent;
    const isIosDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Capture Android / Chrome beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('pet_b1_install_dismissed', 'true');
  };

  // Do not show if already installed as app or dismissed
  if (isStandalone || isDismissed) {
    return null;
  }

  // Only show if prompt is available OR on iOS
  if (!deferredPrompt && !isIOS) {
    return null;
  }

  return (
    <div className="bg-indigo-600 text-white px-3.5 py-2.5 rounded-2xl shadow-lg border border-indigo-400/40 mb-3 flex items-center justify-between gap-2.5 animate-fade-in">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
          <Download className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold leading-tight truncate">
            ติดตั้งแอปลงบนหน้าจอมือถือ
          </h4>
          <p className="text-[10px] text-indigo-100 leading-snug truncate mt-0.5">
            {isIOS ? (
              <span className="flex items-center gap-1">
                แตะ <Share className="w-3 h-3 inline" /> แล้วเลือก <PlusSquare className="w-3 h-3 inline" /> 'เพิ่มที่หน้าจอโฮม'
              </span>
            ) : (
              'เปิดใช้งานแบบเต็มจอ ไร้แถบ URL กวนใจ'
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {!isIOS && deferredPrompt && (
          <button
            onClick={handleInstallClick}
            className="bg-white text-indigo-700 font-extrabold text-[11px] px-3 py-1 rounded-xl shadow-xs active:scale-95 transition whitespace-nowrap"
          >
            ติดตั้ง
          </button>
        )}
        <button
          onClick={handleDismiss}
          className="p-1 rounded-full text-indigo-200 hover:text-white transition"
          title="ปิดการแจ้งเตือน"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
