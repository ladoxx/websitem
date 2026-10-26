'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Globe,
  Film,
  Cpu,
  Mail,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  Database,
  Eye,
  X,
  Save,
  Check,
  AlertCircle,
  Settings,
  Send,
  Upload,
  Camera,
  Image as ImageIcon,
  Copy,
} from 'lucide-react';
import { ShowcaseProject, ShowcaseType } from '@/data/showcaseWebsites';

const PRESET_IMAGES = [
  {
    label: 'Studio Dark Master',
    url: '/assets/fmkal_design_alt1_studio_png_1792050145467.jpg',
  },
  {
    label: 'Modern UI Showcase',
    url: '/assets/fmkal_design_alt2_modern_ui_png_1792050167377.jpg',
  },
  {
    label: 'Clean Glass Platform',
    url: '/assets/fmkal_ui_showcase_png_1792038188349.jpg',
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [setupAvailable, setSetupAvailable] = useState(false);
  const [tokenRequired, setTokenRequired] = useState(false);
  const [setupToken, setSetupToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'media' | 'settings'>('projects');
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [contactEmail, setContactEmail] = useState('iletisim@fmkal.com');
  const [googleVerification, setGoogleVerification] = useState('');
  const [naverVerification, setNaverVerification] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [settingsError, setSettingsError] = useState('');

  // Media / Upload State
  const [mediaFiles, setMediaFiles] = useState<{ filename: string; url: string; size: number; mtime: number }[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [quickUploadingId, setQuickUploadingId] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // SMTP Configuration State
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('465');
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPass, setSmtpPass] = useState('');
  const [smtpSecure, setSmtpSecure] = useState(true);
  const [smtpFrom, setSmtpFrom] = useState('');
  const [smtpTo, setSmtpTo] = useState('');
  const [hasSmtpPass, setHasSmtpPass] = useState(false);
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [smtpTestResult, setSmtpTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [smtpSuccess, setSmtpSuccess] = useState(false);
  const [smtpError, setSmtpError] = useState('');
  const [savingSmtp, setSavingSmtp] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalVideos: 0,
    totalWebsites: 0,
    totalSaaS: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });

  // Project Modal State (Option 2: Tab Form System)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLang, setFormLang] = useState<'tr' | 'en' | 'ko'>('tr');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    id: '',
    client: '',
    year: '2026',
    type: 'Web Sitesi' as ShowcaseType,
    thumbnail: '/assets/fmkal_design_alt2_modern_ui_png_1792050167377.jpg',
    liveUrl: 'https://fmkal.com',
    videoUrl: '',
    duration: '',
    resolution: '4K Cinema // 60FPS',
    metrics: '99/100 PageSpeed',
    tagsInput: 'Next.js 15, TypeScript, Tailwind CSS',

    // Multilingual Tab Fields
    title_tr: '',
    title_en: '',
    title_ko: '',
    desc_tr: '',
    desc_en: '',
    desc_ko: '',
    highlights_tr_input: '99/100 Core Web Vitals, Mobil Öncelikli Tasarım, Tam SEO Altyapısı',
    highlights_en_input: '99/100 Core Web Vitals, Mobile-First Design, Full SEO Architecture',
    highlights_ko_input: '99/100 코어 웹 바이탈, 모바일 최적화 디자인, 검색엔진 최적화',
  });

  // Check auth on load
  useEffect(() => {
    fetch('/api/admin/check')
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.authenticated);
        setNeedsSetup(Boolean(data.needsSetup));
        setSetupAvailable(Boolean(data.setupAvailable));
        setTokenRequired(Boolean(data.tokenRequired));
        if (data.authenticated) {
          loadData();
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const loadData = async () => {
    try {
      const [projRes, msgRes, settingsRes] = await Promise.all([
        fetch('/api/projects').then((r) => r.json()),
        fetch('/api/admin/messages').then((r) => r.json()),
        fetch('/api/settings').then((r) => r.json()),
      ]);

      if (projRes.projects) setProjects(projRes.projects);
      if (msgRes.messages) setMessages(msgRes.messages);
      if (msgRes.stats) setStats(msgRes.stats);
      if (settingsRes.contactEmail) setContactEmail(settingsRes.contactEmail);
      if (typeof settingsRes.googleVerification === 'string') setGoogleVerification(settingsRes.googleVerification);
      if (typeof settingsRes.naverVerification === 'string') setNaverVerification(settingsRes.naverVerification);
      if (settingsRes.smtpHost) setSmtpHost(settingsRes.smtpHost);
      if (settingsRes.smtpPort) setSmtpPort(String(settingsRes.smtpPort));
      if (settingsRes.smtpUser) setSmtpUser(settingsRes.smtpUser);
      if (settingsRes.smtpSecure !== undefined) setSmtpSecure(settingsRes.smtpSecure);
      if (settingsRes.smtpFrom) setSmtpFrom(settingsRes.smtpFrom);
      if (settingsRes.smtpTo) setSmtpTo(settingsRes.smtpTo);
      if (settingsRes.hasSmtpPass) setHasSmtpPass(settingsRes.hasSmtpPass);
      loadMedia();
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        loadData();
      } else {
        setLoginError(data.error || 'Şifre hatalı.');
      }
    } catch (err) {
      setLoginError('Bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    if (password.length < 6) {
      setLoginError('Parola en az 6 karakter olmalıdır.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setLoginError('Parolalar eşleşmiyor.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setupToken: setupToken || undefined, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setIsAuthenticated(true);
        setNeedsSetup(false);
        setSetupToken('');
        setPassword('');
        setConfirmPassword('');
        loadData();
      } else {
        setLoginError(data.error || 'Admin kurulumu tamamlanamadı.');
      }
    } catch (err) {
      setLoginError('Bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword.length < 6) {
      setPasswordError('Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('Yeni şifreler birbiriyle eşleşmiyor.');
      return;
    }

    setSavingPassword(true);

    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setPasswordSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setTimeout(() => setPasswordSuccess(false), 4000);
      } else {
        setPasswordError(data.error || 'Şifre güncellenemedi.');
      }
    } catch (err) {
      setPasswordError('Bağlantı hatası oluştu.');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setPassword('');
  };

  // Open modal for Add
  const handleAddNew = () => {
    setEditingId(null);
    setUploadError('');
    setUploadSuccess(false);
    setShowUrlInput(false);
    setFormData({
      id: `project-${Date.now()}`,
      client: '',
      year: '2026',
      type: 'Web Sitesi',
      thumbnail: '/assets/fmkal_design_alt2_modern_ui_png_1792050167377.jpg',
      liveUrl: 'https://',
      videoUrl: '',
      duration: '',
      resolution: '4K Cinema // 60FPS',
      metrics: '99/100 Hız Skoru',
      tagsInput: 'Next.js 15, TypeScript, Tailwind CSS',
      title_tr: '',
      title_en: '',
      title_ko: '',
      desc_tr: '',
      desc_en: '',
      desc_ko: '',
      highlights_tr_input: 'Ultra Hızlı Açılış, Mobil Uyumlu, SEO Optimizasyonu',
      highlights_en_input: 'Sub-100ms Speeds, Mobile Ready, Full SEO',
      highlights_ko_input: '초고속 로딩, 모바일 최적화, 검색엔진 대응',
    });
    setFormLang('tr');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleEdit = (p: ShowcaseProject) => {
    setEditingId(p.id);
    setUploadError('');
    setUploadSuccess(false);
    setShowUrlInput(false);
    setFormData({
      id: p.id,
      client: p.client,
      year: p.year,
      type: p.type,
      thumbnail: p.thumbnail,
      liveUrl: p.liveUrl || '',
      videoUrl: p.videoUrl || '',
      duration: p.duration || '',
      resolution: p.resolution || '',
      metrics: p.metrics || '',
      tagsInput: p.tags.join(', '),
      title_tr: p.title,
      title_en: p.title,
      title_ko: p.title,
      desc_tr: p.description.tr,
      desc_en: p.description.en,
      desc_ko: p.description.ko,
      highlights_tr_input: p.highlights.tr.join(', '),
      highlights_en_input: p.highlights.en.join(', '),
      highlights_ko_input: p.highlights.ko.join(', '),
    });
    setFormLang('tr');
    setIsModalOpen(true);
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: formData.id,
      client: formData.client,
      year: formData.year,
      type: formData.type,
      thumbnail: formData.thumbnail,
      liveUrl: formData.liveUrl || null,
      videoUrl: formData.videoUrl || null,
      duration: formData.duration || null,
      resolution: formData.resolution || null,
      metrics: formData.metrics || null,
      tags: formData.tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      title_tr: formData.title_tr || formData.client,
      title_en: formData.title_en || formData.title_tr || formData.client,
      title_ko: formData.title_ko || formData.title_tr || formData.client,
      desc_tr: formData.desc_tr,
      desc_en: formData.desc_en || formData.desc_tr,
      desc_ko: formData.desc_ko || formData.desc_tr,
      highlights_tr: formData.highlights_tr_input.split(',').map((h) => h.trim()).filter(Boolean),
      highlights_en: formData.highlights_en_input.split(',').map((h) => h.trim()).filter(Boolean),
      highlights_ko: formData.highlights_ko_input.split(',').map((h) => h.trim()).filter(Boolean),
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
        setIsModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadData();
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // Mark message as read
  const handleMarkRead = async (id: number) => {
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadData();
  };

  // Delete message
  const handleDeleteMessage = async (id: number) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  // Save Site Settings (Contact Email, Google & Naver SEO, etc.)
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsError('');
    setSettingsSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactEmail,
          googleVerification,
          naverVerification,
          smtpHost,
          smtpPort,
          smtpUser,
          smtpPass: smtpPass || undefined,
          smtpSecure,
          smtpFrom,
          smtpTo,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSettingsSuccess(true);
        if (smtpPass) {
          setHasSmtpPass(true);
          setSmtpPass('');
        }
        setTimeout(() => setSettingsSuccess(false), 4000);
      } else {
        setSettingsError(data.error || 'Ayarlar kaydedilemedi.');
      }
    } catch (err) {
      setSettingsError('Bağlantı hatası oluştu.');
    } finally {
      setSavingSettings(false);
    }
  };

  // Save Dedicated SMTP Settings
  const handleSaveSmtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavingSmtp(true);
    setSmtpError('');
    setSmtpSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactEmail,
          googleVerification,
          naverVerification,
          smtpHost,
          smtpPort,
          smtpUser,
          smtpPass: smtpPass || undefined,
          smtpSecure,
          smtpFrom,
          smtpTo,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSmtpSuccess(true);
        if (smtpPass) {
          setHasSmtpPass(true);
          setSmtpPass('');
        }
        setTimeout(() => setSmtpSuccess(false), 4000);
      } else {
        setSmtpError(data.error || 'SMTP ayarları kaydedilemedi.');
      }
    } catch (err) {
      setSmtpError('Bağlantı hatası oluştu.');
    } finally {
      setSavingSmtp(false);
    }
  };

  // Test SMTP Email Delivery
  const handleTestSmtp = async () => {
    setTestingSmtp(true);
    setSmtpTestResult(null);
    try {
      const res = await fetch('/api/admin/smtp/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: smtpTo || contactEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setSmtpTestResult({
          success: true,
          message: data.message || 'Test e-postası başarıyla gönderildi!',
        });
      } else {
        setSmtpTestResult({
          success: false,
          message: data.error || 'Test e-postası gönderilemedi. Lütfen SMTP bilgilerinizi kontrol edip kaydedin.',
        });
      }
    } catch (err) {
      setSmtpTestResult({
        success: false,
        message: 'Bağlantı hatası oluştu. Sunucuya ulaşılamıyor.',
      });
    } finally {
      setTestingSmtp(false);
    }
  };

  // Media & Upload Operations
  const loadMedia = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch('/api/admin/upload');
      const data = await res.json();
      if (data.files && Array.isArray(data.files)) {
        setMediaFiles(data.files);
      }
    } catch (err) {
      console.error('Failed to load media files:', err);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError('');
    setUploadSuccess(false);

    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();

      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, thumbnail: data.url }));
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
        loadMedia();
      } else {
        setUploadError(data.error || 'Resim yüklenemedi.');
      }
    } catch (err) {
      setUploadError('Bağlantı hatası oluştu. Resim yüklenemedi.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>, project: ShowcaseProject) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setQuickUploadingId(project.id);
    try {
      const fd = new FormData();
      fd.append('file', file);

      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: fd,
      });
      const uploadData = await uploadRes.json();

      if (uploadRes.ok && uploadData.url) {
        const updatedProject = {
          ...project,
          thumbnail: uploadData.url,
          liveUrl: project.liveUrl || null,
          videoUrl: project.videoUrl || null,
        };

        const saveRes = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProject),
        });

        if (saveRes.ok) {
          loadData();
          loadMedia();
        } else {
          alert('Görsel yüklendi ancak proje veritabanında güncellenemedi.');
        }
      } else {
        alert(uploadData.error || 'Görsel yüklenemedi.');
      }
    } catch (err) {
      alert('Resim yüklenirken bağlantı hatası oluştu.');
    } finally {
      setQuickUploadingId(null);
      e.target.value = '';
    }
  };

  const handleDeleteMedia = async (filename: string) => {
    if (!confirm(`"${filename}" adlı görseli kalıcı olarak silmek istediğinizden emin misiniz?`)) return;
    try {
      const res = await fetch(`/api/admin/upload?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        loadMedia();
      } else {
        alert('Görsel silinemedi.');
      }
    } catch (err) {
      alert('Görsel silinirken hata oluştu.');
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // LOADING STATE
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] aura-glow-blue pointer-events-none opacity-30 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-3xl p-8 relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-950">
              {needsSetup ? 'Yönetici Şifresi Belirleme' : 'FMKAL Stüdyo Paneli'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {needsSetup
                ? 'Stüdyo paneline ilk kez giriş yapılıyor. Lütfen bir yönetici şifresi belirleyin.'
                : 'İçerik ve Proje Yönetim Sistemi (SQLite)'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={needsSetup ? handleSetup : handleLogin} className="space-y-4">
            {needsSetup && tokenRequired && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Kurulum Anahtarı (ADMIN_SETUP_TOKEN)
                </label>
                <input
                  type="password"
                  required
                  value={setupToken}
                  onChange={(e) => setSetupToken(e.target.value)}
                  autoComplete="off"
                  placeholder="Sunucu kurulum anahtarını girin"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {needsSetup ? 'Yeni Yönetici Şifresi' : 'Yönetici Şifresi'}
              </label>
              <input
                type="password"
                required
                minLength={needsSetup ? 6 : undefined}
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={needsSetup ? 'new-password' : 'current-password'}
                placeholder={needsSetup ? 'En az 6 karakter' : 'Şifrenizi girin...'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all"
              />
            </div>

            {needsSetup && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Yönetici Şifresi (Tekrar)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  maxLength={128}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Yeni şifreyi tekrar girin"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all"
                />
              </div>
            )}

            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-semibold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{needsSetup ? 'Şifreyi Belirle ve Giriş Yap' : 'Panele Giriş Yap'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </motion.div>
      </div>
    );
  }

  // 2. DASHBOARD SCREEN
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 overflow-x-hidden w-full">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/90 px-3 sm:px-8 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-950">FMKAL</span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-blue-600 text-white">
                ADMIN
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              <Database className="w-3 h-3 text-emerald-600" />
              <span>SQLite Veritabanı Aktif</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/web-siteleri"
              target="_blank"
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-slate-600 hover:text-blue-600 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-2xs transition-colors shrink-0"
            >
              <span className="hidden xs:inline">Canlı </span><span>Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-rose-600 hover:text-rose-700 px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-8 pt-5 sm:pt-8 w-full">
        
        {/* KPI Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase">Toplam Proje</span>
            <p className="text-xl sm:text-3xl font-extrabold text-slate-950 mt-0.5 sm:mt-1">{projects.length}</p>
            <span className="text-[10px] sm:text-[11px] font-mono text-blue-600 mt-1 block truncate">
              {stats.totalWebsites} Web &bull; {stats.totalVideos} Video
            </span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase">Video İşleri</span>
            <p className="text-xl sm:text-3xl font-extrabold text-purple-600 mt-0.5 sm:mt-1">{stats.totalVideos}</p>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-1 block truncate">4K Oynatıcılı</span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase">Web Siteleri</span>
            <p className="text-xl sm:text-3xl font-extrabold text-blue-600 mt-0.5 sm:mt-1">{stats.totalWebsites}</p>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-1 block truncate">Canlı Linkli</span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase">Gelen Mesajlar</span>
            <p className="text-xl sm:text-3xl font-extrabold text-slate-950 mt-0.5 sm:mt-1">
              {messages.length}{' '}
              {stats.unreadMessages > 0 && (
                <span className="text-[10px] sm:text-xs text-rose-600 font-mono font-bold bg-rose-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-rose-200">
                  {stats.unreadMessages} Yeni
                </span>
              )}
            </p>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-1 block truncate">Teklif Talepleri</span>
          </div>
        </div>

        {/* Navigation Tabs (Mobile-Friendly Horizontal Scroll) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 mb-6 gap-3 w-full">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto -mx-3 px-3 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
              }`}
            >
              <span>📁 Projeler ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'messages'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Gelen Mesajlar ({messages.length})</span>
              {stats.unreadMessages > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('media');
                loadMedia();
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'media'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>🖼️ Medya &amp; Resimler ({mediaFiles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>⚙️ Ayarlar</span>
            </button>
          </div>

          {activeTab === 'projects' && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer w-full sm:w-auto shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Proje Ekle</span>
            </button>
          )}
        </div>

        {/* TAB 1: PROJECTS LIST */}
        {activeTab === 'projects' && (
          <div className="space-y-3 sm:space-y-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-5 hover:border-slate-300 transition-all"
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 w-full">
                  <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-200 group">
                    <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
                    {quickUploadingId === p.id && (
                      <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                      <span
                        className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-semibold ${
                          p.type === 'Video'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : p.type === 'SaaS Uygulaması'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {p.type}
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                        {p.client} &bull; {p.year}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-950 leading-snug line-clamp-1 sm:line-clamp-none">{p.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{p.description.tr}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 justify-end w-full md:w-auto pt-2.5 border-t border-slate-100 md:border-0 md:pt-0">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Canlı Siteyi Aç"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <label
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors cursor-pointer shrink-0"
                    title="Bu projenin görselini doğrudan telefondan/bilgisayardan değiştirin"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{quickUploadingId === p.id ? 'Yükleniyor...' : 'Resim'}</span>
                    <span className="hidden sm:inline"> Değiştir</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={quickUploadingId === p.id}
                      className="hidden"
                      onChange={(e) => handleQuickUpload(e, p)}
                    />
                  </label>
                  <button
                    onClick={() => handleEdit(p)}
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Düzenle</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProject(p.id)}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer shrink-0"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: MESSAGES LIST */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <Mail className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">Henüz Mesaj Yok</h3>
                <p className="text-xs text-slate-400 mt-1">İletişim formundan gelen teklif talepleri burada listelenir.</p>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    m.is_read
                      ? 'bg-white border-slate-200 text-slate-800'
                      : 'bg-blue-50/40 border-blue-200 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {!m.is_read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                      )}
                      <h4 className="text-base font-bold text-slate-950">{m.name}</h4>
                      <span className="text-xs font-mono text-slate-400">&bull; {m.email}</span>
                      {m.service && (
                        <span className="text-[10px] font-mono font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                          {m.service}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-400">{m.created_at}</span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed bg-white/70 p-4 rounded-xl border border-slate-200/60 mb-4 whitespace-pre-wrap">
                    {m.message}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <a
                      href={`mailto:${m.email}?subject=FMKAL Proje Talebi Yanıtı`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>E-Posta ile Yanıtla</span>
                    </a>
                    <div className="flex items-center gap-3">
                      {!m.is_read ? (
                        <button
                          onClick={() => handleMarkRead(m.id)}
                          className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                        >
                          Okundu Olarak İşaretle
                        </button>
                      ) : (
                        <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Okundu
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="text-xs text-rose-600 hover:text-rose-700 cursor-pointer"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: MEDIA / IMAGES LIBRARY */}
        {activeTab === 'media' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 sm:pb-6 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-950">Medya &amp; Görsel Kütüphanesi</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Projelerinizde sergilenen tüm kapak fotoğrafları ve ekran görüntüleri (Kalıcı SQLite / Docker Alanı)
                    </p>
                  </div>
                </div>

                {/* Upload Button */}
                <label className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer w-full sm:w-auto">
                  {uploadingImage ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Yükleniyor...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Telefondan / PC'den Resim Yükle</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingImage}
                    onChange={async (e) => {
                      await handleUploadFile(e);
                      loadMedia();
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Upload status messages */}
              {uploadError && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}
              {uploadSuccess && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Görsel başarıyla yüklendi!</span>
                </div>
              )}

              {/* Grid of uploaded images */}
              <div className="mt-5 sm:mt-6">
                {loadingMedia ? (
                  <div className="py-16 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span>Görseller listeleniyor...</span>
                  </div>
                ) : mediaFiles.length === 0 ? (
                  <div className="py-12 sm:py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Henüz Yüklenmiş Görsel Yok</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Yukarıdaki butona tıklayarak telefonunuzdan veya bilgisayarınızdan proje kapak resimleri ekleyebilirsiniz.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {mediaFiles.map((file) => (
                      <div
                        key={file.filename}
                        className="group relative rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all shadow-2xs"
                      >
                        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={file.url}
                            alt={file.filename}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleDeleteMedia(file.filename)}
                              className="p-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white shadow-sm cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="p-3 bg-white space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                            <span className="truncate max-w-[140px]" title={file.filename}>
                              {file.filename}
                            </span>
                            <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopyUrl(file.url)}
                            className="w-full py-1.5 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {copiedUrl === file.url ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Kopyalandı!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-500" />
                                <span>URL Kopyala</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-8">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">Site İletişim &amp; E-Posta Ayarları</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Sitede görünen ve form bildirimlerinin iletildiği resmi iletişim adresi
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 border border-emerald-100">
                  <Database className="w-3.5 h-3.5" /> SQLite Canlı Kayıt
                </span>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Resmi İletişim E-Posta Adresi
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="iletisim@fmkal.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-mono text-slate-900 transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Bu e-posta adresi kaydedildiği anda sitenin tüm sayfalarında canlı olarak güncellenir.
                  </p>
                </div>

                {/* 3 Etki Alanı Kartları */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-mono font-bold text-slate-800 block mb-1">
                      📌 Footer Alanı
                    </span>
                    <span className="text-xs text-slate-500 leading-snug block">
                      Tüm sayfaların en altındaki mailto linki ve görünen e-posta anında değişir.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-mono font-bold text-slate-800 block mb-1">
                      📬 İletişim Sayfası
                    </span>
                    <span className="text-xs text-slate-500 leading-snug block">
                      İletişim bölümündeki doğrudan e-posta kutusu bu adrese bağlanır.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-mono font-bold text-slate-800 block mb-1">
                      ⚡ Teklif Bildirimleri
                    </span>
                    <span className="text-xs text-slate-500 leading-snug block">
                      Ziyaretçilerin ilettiği form bildirimleri bu adrese yönlendirilir.
                    </span>
                  </div>
                </div>

                {/* GOOGLE & NAVER SEO VERIFICATION SECTION */}
                <div className="pt-6 border-t border-slate-100 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <span>Google &amp; Naver SEO Doğrulama Kodları</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Google Search Console ve Naver Search Advisor (네이버 서치어드바이저) meta doğrulama anahtarları
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                      Global &amp; KR SEO
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Google Site Verification Kodu
                      </label>
                      <input
                        type="text"
                        value={googleVerification}
                        onChange={(e) => setGoogleVerification(e.target.value)}
                        placeholder="Örn: google-site-verification kodu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-900"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block font-mono">
                        &lt;meta name=&quot;google-site-verification&quot; /&gt;
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Naver Site Verification Kodu (네이버)
                      </label>
                      <input
                        type="text"
                        value={naverVerification}
                        onChange={(e) => setNaverVerification(e.target.value)}
                        placeholder="Örn: naver-site-verification kodu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs font-mono text-slate-900"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block font-mono">
                        &lt;meta name=&quot;naver-site-verification&quot; /&gt;
                      </span>
                    </div>
                  </div>

                  {/* Sitemap & RSS Feed Quick Links for Google & Naver */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                      href="/sitemap.xml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[11px] font-mono font-bold text-slate-900 block">
                          🗺️ Sitemap XML
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          /sitemap.xml
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    </a>

                    <a
                      href="/rss.xml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-200/70 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[11px] font-mono font-bold text-emerald-950 block">
                          📡 Naver RSS 2.0 Feed
                        </span>
                        <span className="text-[11px] font-mono text-emerald-700">
                          /rss.xml
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-800" />
                    </a>

                    <a
                      href="/robots.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[11px] font-mono font-bold text-slate-900 block">
                          🤖 Robots.txt (Google &amp; Yeti)
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          /robots.txt
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    </a>
                  </div>
                </div>

                {settingsSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Site iletişim ve Google/Naver SEO ayarları başarıyla güncellendi!</span>
                  </div>
                )}

                {settingsError && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{settingsError}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-mono">
                    Mevcut Değer: <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{contactEmail}</strong>
                  </div>

                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {savingSettings ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Kaydediliyor...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Ayarları Kaydet ve Yayınla</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>

            {/* SMTP EMAIL NOTIFICATION SECTION */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-8 mt-6 sm:mt-8">
              <div className="flex items-start justify-between border-b border-slate-100 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">SMTP E-Posta Bildirim Ayarları</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Sitedeki iletişim formu doldurulduğunda bildirimlerin anında kendi e-postanıza düşmesini sağlar
                    </p>
                  </div>
                </div>
                <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium ${
                  smtpHost && (smtpUser || hasSmtpPass)
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-100'
                    : 'text-amber-700 bg-amber-50 border border-amber-100'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${smtpHost && (smtpUser || hasSmtpPass) ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                  {smtpHost && (smtpUser || hasSmtpPass) ? 'SMTP Aktif' : 'SMTP Yapılandırılmadı'}
                </span>
              </div>

              {/* Informative tip banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Nasıl Çalışır?</span>
                </div>
                <p>
                  Bir ziyaretçi web sitesindeki formu doldurduğunda mesaj hem SQLite veritabanında saklanır (Gelen Mesajlar sekmesinde görünür), hem de aşağıdaki SMTP bilgileriyle anında e-posta adresinize yönlendirilir.
                </p>
                <p className="text-slate-500 text-[11px]">
                  💡 <strong>Gmail kullanıcıları için:</strong> Normal şifrenizi değil; Google Hesabınızdan <em>(Güvenlik &gt; 2 Adımlı Doğrulama &gt; Uygulama Şifreleri)</em> aldığınız 16 haneli Uygulama Şifresini girmelisiniz.
                </p>
              </div>

              <form onSubmit={handleSaveSmtp} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* SMTP Host */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      SMTP Sunucu Adresi (Host)
                    </label>
                    <input
                      type="text"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                      placeholder="Örn: smtp.gmail.com veya mail.fmkal.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-900"
                    />
                  </div>

                  {/* SMTP Port */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Port Numarası
                    </label>
                    <input
                      type="text"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                      placeholder="465 veya 587"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-900"
                    />
                  </div>

                  {/* SMTP User */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      SMTP Kullanıcı Adı / E-Posta
                    </label>
                    <input
                      type="text"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      placeholder="Örn: bildirim@fmkal.com veya kullanici@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-900"
                    />
                  </div>

                  {/* SSL / TLS Protocol */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Güvenlik Protokolü
                    </label>
                    <select
                      value={smtpSecure ? 'true' : 'false'}
                      onChange={(e) => setSmtpSecure(e.target.value === 'true')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-medium text-slate-900 cursor-pointer"
                    >
                      <option value="true">SSL / TLS (Port 465 - Güvenli)</option>
                      <option value="false">STARTTLS (Port 587 / 25)</option>
                    </select>
                  </div>

                  {/* SMTP Password */}
                  <div className="sm:col-span-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        SMTP Parolası / Uygulama Şifresi
                      </label>
                      {hasSmtpPass && (
                        <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ✓ Parola Kayıtlı (Değiştirmek istemiyorsanız boş bırakın)
                        </span>
                      )}
                    </div>
                    <input
                      type="password"
                      value={smtpPass}
                      onChange={(e) => setSmtpPass(e.target.value)}
                      placeholder={hasSmtpPass ? '•••••••••••••••• (Mevcut şifre korunuyor)' : 'SMTP şifrenizi veya Google Uygulama Şifresini girin'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-900"
                    />
                  </div>

                  {/* SMTP From */}
                  <div className="sm:col-span-1 md:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Gönderen Başlığı (From)
                    </label>
                    <input
                      type="text"
                      value={smtpFrom}
                      onChange={(e) => setSmtpFrom(e.target.value)}
                      placeholder="FMKAL Web <bildirim@fmkal.com>"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-900"
                    />
                  </div>

                  {/* SMTP To */}
                  <div className="sm:col-span-2 md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Bildirimlerin Düşeceği E-Posta (To)
                    </label>
                    <input
                      type="email"
                      value={smtpTo}
                      onChange={(e) => setSmtpTo(e.target.value)}
                      placeholder={contactEmail ? `Varsayılan: ${contactEmail}` : 'sahis@fmkal.com'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-900"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Boş bırakılırsa üstteki Genel İletişim E-Posta adresine ({contactEmail}) gönderilir.
                    </span>
                  </div>
                </div>

                {smtpSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>SMTP ayarları başarıyla kaydedildi! Artık test e-postası gönderebilirsiniz.</span>
                  </div>
                )}

                {smtpError && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{smtpError}</span>
                  </div>
                )}

                {smtpTestResult && (
                  <div className={`p-4 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                    smtpTestResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    {smtpTestResult.success ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{smtpTestResult.message}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleTestSmtp}
                    disabled={testingSmtp || (!smtpHost && !hasSmtpPass)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {testingSmtp ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
                        <span>Test E-Postası Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-blue-600" />
                        <span>Test E-Postası Gönder</span>
                      </>
                    )}
                  </button>

                  <button
                    type="submit"
                    disabled={savingSmtp}
                    className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {savingSmtp ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Kaydediliyor...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>SMTP Ayarlarını Kaydet</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* PASSWORD CHANGE SECTION */}
            <div className="studio-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 bg-white border border-slate-200/90 shadow-sm mt-6 sm:mt-8">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    Yönetici Şifresini Değiştir
                  </h2>
                  <p className="text-xs text-slate-500">
                    Panele giriş yaparken kullanılan şifreyi buradan istediğiniz zaman doğrudan güncelleyebilirsiniz.
                  </p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="pt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mevcut Şifre
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Mevcut şifreniz"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Yeni Şifre
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="En az 6 karakter"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Yeni Şifre (Tekrar)
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Yeni şifreyi tekrar girin"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-900"
                    />
                  </div>
                </div>

                {passwordSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Yönetici şifreniz başarıyla güncellendi!</span>
                  </div>
                )}

                {passwordError && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {savingPassword ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Güncelleniyor...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Şifreyi Güncelle</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* PROJECT ADD / EDIT MODAL (OPTION 2: TAB FORM SYSTEM) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 z-10 my-2 sm:my-8 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh]"
            >
              {/* Modal Top Bar */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-950">
                    {editingId ? 'Projeyi Düzenle' : 'Yeni Proje / Video Ekle'}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-mono">SQLite Veritabanı &bull; Çok Dilli İçerik Formu</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form Scrollable Body */}
              <form onSubmit={handleSaveProject} className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
                
                {/* 1. SECTION: GENEL / ORTAK BİLGİLER (SADECE 1 KEZ GİRİLİR) */}
                <div className="space-y-4 pb-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      1. ORTAK BİLGİLER (Tüm Diller İçin 1 Kez Girilir)
                    </span>
                    <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Ortak Alan
                    </span>
                  </div>

                  {/* Proje Türü Seçimi */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Proje Türü *
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                      {(['Web Sitesi', 'Video', 'SaaS Uygulaması'] as ShowcaseType[]).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: t })}
                          className={`py-2 sm:py-2.5 px-1 sm:px-3 rounded-xl border text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            formData.type === t
                              ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white'
                          }`}
                        >
                          {t === 'Web Sitesi' && <Globe className="w-3.5 h-3.5 shrink-0" />}
                          {t === 'Video' && <Film className="w-3.5 h-3.5 shrink-0" />}
                          {t === 'SaaS Uygulaması' && <Cpu className="w-3.5 h-3.5 shrink-0" />}
                          <span className="truncate">{t === 'SaaS Uygulaması' ? 'SaaS' : t}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Marka & Yıl */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Marka / Müşteri Adı *</label>
                      <input
                        type="text"
                        required
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        placeholder="Örn: Nexus Ventures"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Yıl</label>
                      <input
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="2026"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Linkler: Live URL vs Video URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.type !== 'Video' ? (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Canlı Web Sitesi Linki *
                        </label>
                        <input
                          type="url"
                          required
                          value={formData.liveUrl}
                          onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                          placeholder="https://musterisitesi.com"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-semibold text-purple-700 mb-1">
                          Video URL (MP4 / Web Video) *
                        </label>
                        <input
                          type="url"
                          required
                          value={formData.videoUrl}
                          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                          placeholder="https://assets.../video.mp4"
                          className="w-full px-3 py-2 rounded-xl border border-purple-200 text-xs focus:ring-2 focus:ring-purple-600 outline-none font-mono"
                        />
                      </div>
                    )}

                    {/* KAPAK RESMİ YÜKLEME VE ÖNİZLEME */}
                    <div className="space-y-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-blue-600" />
                          <span>Proje Kapak Resmi / Görseli *</span>
                        </label>
                        {formData.thumbnail ? (
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ✓ Görsel Seçili
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                            Resim Yok
                          </span>
                        )}
                      </div>

                      {/* Canlı Görsel Önizleme */}
                      {formData.thumbnail ? (
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={formData.thumbnail}
                            alt="Kapak Önizleme"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-2.5 sm:p-3">
                            <span className="text-[10px] font-mono text-white/90 truncate max-w-[65%] bg-black/50 px-2 py-1 rounded backdrop-blur-xs">
                              {formData.thumbnail}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, thumbnail: '' })}
                              className="px-2.5 py-1 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white text-[11px] font-medium backdrop-blur-sm transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <X className="w-3 h-3" />
                              <span>Kaldır</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video w-full rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center p-4 text-center">
                          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                            <Upload className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-semibold text-slate-700">Henüz kapak resmi seçilmedi</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Aşağıdaki butondan galerinizden veya bilgisayarınızdan resim yükleyin
                          </p>
                        </div>
                      )}

                      {/* Yükleme Butonları */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <label className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-bold shadow-xs cursor-pointer transition-all text-center">
                          {uploadingImage ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Resim Yükleniyor...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 shrink-0" />
                              <span className="truncate">📁 Telefondan / PC'den Resim Yükle</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingImage}
                            onChange={handleUploadFile}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => setShowUrlInput(!showUrlInput)}
                          className="w-full sm:w-auto px-3 sm:px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{showUrlInput ? 'Şablonları Gizle' : 'Hazır Şablonlar / URL'}</span>
                        </button>
                      </div>

                      <p className="text-[10px] sm:text-[11px] text-slate-500">
                        📱 <em>Mobil cihazlarda doğrudan kamera veya galerinizden fotoğraf seçebilirsiniz.</em>
                      </p>

                      {/* Bildirim Mesajları */}
                      {uploadError && (
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{uploadError}</span>
                        </div>
                      )}
                      {uploadSuccess && (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 shrink-0" />
                          <span>Resim başarıyla yüklendi ve kapak olarak ayarlandı!</span>
                        </div>
                      )}

                      {/* Manuel URL ve Hazır Şablonlar */}
                      {showUrlInput && (
                        <div className="pt-3 border-t border-slate-200/70 space-y-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              Manuel Resim Linki / URL:
                            </label>
                            <input
                              type="text"
                              value={formData.thumbnail}
                              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                              placeholder="/assets/... veya https://..."
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono focus:ring-2 focus:ring-blue-600 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                              Hazır Stüdyo Şablonlarından Seç:
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {PRESET_IMAGES.map((preset, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, thumbnail: preset.url })}
                                  className={`group relative aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                    formData.thumbnail === preset.url
                                      ? 'border-blue-600 ring-2 ring-blue-500/30'
                                      : 'border-slate-200 hover:border-slate-400'
                                  }`}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/75 p-1 text-[9px] font-mono text-white text-center truncate">
                                    {preset.label}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {mediaFiles.length > 0 && (
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                                Önceden Yüklediğiniz Görsellerden Seç ({mediaFiles.length}):
                              </label>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-white">
                                {mediaFiles.map((file) => (
                                  <button
                                    key={file.filename}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, thumbnail: file.url })}
                                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                      formData.thumbnail === file.url
                                        ? 'border-blue-600 ring-2 ring-blue-500/30'
                                        : 'border-slate-200 hover:border-slate-400'
                                    }`}
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={file.url} alt={file.filename} className="w-full h-full object-cover" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metrik & Teknolojiler */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Öne Çıkan Rozet/Metrik</label>
                      <input
                        type="text"
                        value={formData.metrics}
                        onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                        placeholder="Örn: 99/100 Hız Skoru veya 4K AI Master"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Teknolojiler (Virgülle ayırın)</label>
                      <input
                        type="text"
                        value={formData.tagsInput}
                        onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                        placeholder="Next.js 15, TypeScript, Tailwind"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. SECTION: DİL SEKMELİ FORM SİSTEMİ (OPTION 2: TAB FORM) */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      2. ÇOK DİLLİ İÇERİK (SEKMELER ARASI GEÇİŞ YAPIN)
                    </span>
                    
                    {/* Language Tabs */}
                    <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setFormLang('tr')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          formLang === 'tr' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        🇹🇷 Türkçe (TR)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormLang('en')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          formLang === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        🇬🇧 English (EN)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormLang('ko')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          formLang === 'ko' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        🇰🇷 한국어 (KO)
                      </button>
                    </div>
                  </div>

                  {/* Active Tab: TR */}
                  {formLang === 'tr' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 p-4 rounded-2xl bg-blue-50/30 border border-blue-100">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Türkçe Başlık *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title_tr}
                          onChange={(e) => setFormData({ ...formData, title_tr: e.target.value })}
                          placeholder="Örn: Global Yatırım & Holding Kurumsal Web Sitesi"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">Türkçe Açıklama *</label>
                        <textarea
                          rows={3}
                          required
                          value={formData.desc_tr}
                          onChange={(e) => setFormData({ ...formData, desc_tr: e.target.value })}
                          placeholder="Projenin amacını ve sağladığı faydayı anlatan kısa özet..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Öne Çıkan Özellikler (Virgülle ayırarak 3 madde)
                        </label>
                        <input
                          type="text"
                          value={formData.highlights_tr_input}
                          onChange={(e) => setFormData({ ...formData, highlights_tr_input: e.target.value })}
                          placeholder="99/100 PageSpeed, 3 Dilli Altyapı, Akıcı Mobil UX"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Active Tab: EN */}
                  {formLang === 'en' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 p-4 rounded-2xl bg-purple-50/30 border border-purple-100">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          English Title (İngilizce Başlık)
                        </label>
                        <input
                          type="text"
                          value={formData.title_en}
                          onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                          placeholder="e.g. Global Investment & Holding Corporate Portal"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-purple-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">English Description (İngilizce Açıklama)</label>
                        <textarea
                          rows={3}
                          value={formData.desc_en}
                          onChange={(e) => setFormData({ ...formData, desc_en: e.target.value })}
                          placeholder="Concise overview of the client solution and outcomes..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-purple-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          English Highlights (Virgülle ayrılmış 3 madde)
                        </label>
                        <input
                          type="text"
                          value={formData.highlights_en_input}
                          onChange={(e) => setFormData({ ...formData, highlights_en_input: e.target.value })}
                          placeholder="99/100 Google PageSpeed, TR/EN/KO Localization, Fluid Mobile UX"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-purple-600 outline-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Active Tab: KO */}
                  {formLang === 'ko' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          한국어 제목 (Korece Başlık)
                        </label>
                        <input
                          type="text"
                          value={formData.title_ko}
                          onChange={(e) => setFormData({ ...formData, title_ko: e.target.value })}
                          placeholder="예: 글로벌 투자 지주사 기업 웹사이트"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-emerald-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">한국어 설명 (Korece Açıklama)</label>
                        <textarea
                          rows={3}
                          value={formData.desc_ko}
                          onChange={(e) => setFormData({ ...formData, desc_ko: e.target.value })}
                          placeholder="프로젝트의 목적과 주요 성과에 대한 요약..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-emerald-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          한국어 핵심 포인트 (Virgülle ayrılmış 3 madde)
                        </label>
                        <input
                          type="text"
                          value={formData.highlights_ko_input}
                          onChange={(e) => setFormData({ ...formData, highlights_ko_input: e.target.value })}
                          placeholder="99/100 페이지스피드, 3개국어 다국어 지원, 모바일 최적화"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-emerald-600 outline-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Modal Footer Save Button */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2 sm:gap-3 sticky bottom-0 bg-white py-2.5 sm:py-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Kaydet (SQLite)</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
