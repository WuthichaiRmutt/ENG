import React, { useState } from 'react';
import { X, Cloud, Key, Link2, CheckCircle2, AlertCircle, RefreshCw, Trash2, ExternalLink } from 'lucide-react';
import {
  getStoredSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
} from '../lib/supabaseClient';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  cloudStatus: 'offline' | 'connected' | 'syncing' | 'error';
  isCloudSyncing: boolean;
  onSync: () => Promise<{ success: boolean; message: string }>;
  onRefreshStatus: () => void;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  isOpen,
  onClose,
  cloudStatus,
  isCloudSyncing,
  onSync,
  onRefreshStatus,
}) => {
  const currentConfig = getStoredSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url);
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!url.trim() || !anonKey.trim()) {
      setStatusMsg({ type: 'error', text: 'กรุณากรอกทั้ง Supabase URL และ Anon Key' });
      return;
    }

    saveSupabaseConfig(url, anonKey);
    onRefreshStatus();
    setStatusMsg({ type: 'info', text: 'กำลังทดสอบเชื่อมต่อและซิงค์ข้อมูล...' });

    const res = await onSync();
    if (res.success) {
      setStatusMsg({ type: 'success', text: res.message });
    } else {
      setStatusMsg({ type: 'error', text: res.message });
    }
  };

  const handleClear = () => {
    clearSupabaseConfig();
    setUrl('');
    setAnonKey('');
    onRefreshStatus();
    setStatusMsg({ type: 'info', text: 'ลบการเชื่อมต่อคลาวด์แล้ว (ข้อมูลยังคงบันทึกในเครื่องตามปกติ)' });
  };

  const handleManualSync = async () => {
    setStatusMsg({ type: 'info', text: 'กำลังซิงค์ข้อมูลล่าสุดขึ้น Cloud...' });
    const res = await onSync();
    if (res.success) {
      setStatusMsg({ type: 'success', text: res.message });
    } else {
      setStatusMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                ตั้งค่า Supabase Cloud
              </h3>
              <p className="text-xs text-slate-400">บันทึกความก้าวหน้าข้ามอุปกรณ์</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Connection Status Banner */}
        <div
          className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between ${
            cloudStatus === 'connected'
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
              : cloudStatus === 'syncing'
              ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400'
              : cloudStatus === 'error'
              ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400'
              : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                cloudStatus === 'connected'
                  ? 'bg-emerald-500'
                  : cloudStatus === 'syncing'
                  ? 'bg-indigo-500 animate-pulse'
                  : cloudStatus === 'error'
                  ? 'bg-rose-500'
                  : 'bg-slate-400'
              }`}
            />
            <span>
              {cloudStatus === 'connected'
                ? 'เชื่อมต่อ Supabase สำเร็จ'
                : cloudStatus === 'syncing'
                ? 'กำลังเชื่อมต่อและซิงค์ข้อมูล...'
                : cloudStatus === 'error'
                ? 'ไม่สามารถเชื่อมต่อได้ ตรวจสอบ Key'
                : 'โหมดออฟไลน์ (บันทึกในเครื่องปลอดภัย 100%)'}
            </span>
          </div>

          {cloudStatus === 'connected' && (
            <button
              onClick={handleManualSync}
              disabled={isCloudSyncing}
              className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg transition flex items-center gap-1 active:scale-95"
            >
              <RefreshCw className={`w-3 h-3 ${isCloudSyncing ? 'animate-spin' : ''}`} />
              <span>ซิงค์เดี๋ยวนี้</span>
            </button>
          )}
        </div>

        {/* Input Fields */}
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
              Project URL:
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
              Anon Public Key:
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-slate-200 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Status message */}
        {statusMsg && (
          <div
            className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
              statusMsg.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                : statusMsg.type === 'error'
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleSave}
            disabled={isCloudSyncing}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition shadow-md shadow-indigo-600/20"
          >
            บันทึกและเชื่อมต่อ
          </button>

          {(url || anonKey) && (
            <button
              onClick={handleClear}
              className="p-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 transition"
              title="ลบข้อมูลการเชื่อมต่อ"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Setup Guide Link */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 space-y-1">
          <p className="font-semibold text-slate-500 dark:text-slate-300">💡 วิธีตั้งค่า Supabase ฟรีใน 1 นาที:</p>
          <ol className="list-decimal list-inside space-y-0.5 pl-1">
            <li>สร้างโปรเจกต์ฟรีที่ <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline">supabase.com</a></li>
            <li>ไปที่ SQL Editor แล้วรันโค้ดจากไฟล์ <code>supabase/schema.sql</code></li>
            <li>คัดลอก Project URL และ Anon Key จากหน้า Settings &gt; API มาวางที่นี่</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
