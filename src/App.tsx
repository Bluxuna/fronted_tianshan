import { motion } from 'motion/react';
import { Heart, Music, Image as ImageIcon, Video, Share2, CheckCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';

const MountainLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 6L2 26H22L12 6Z" fill="url(#blue-grad-1)" />
    <path d="M22 12L14 26H30L22 12Z" fill="url(#blue-grad-2)" />
    <defs>
      <linearGradient id="blue-grad-1" x1="12" y1="6" x2="12" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0ea5e9" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="blue-grad-2" x1="22" y1="12" x2="22" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
  </svg>
);

// Floating Background
const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-300/20 rounded-full blur-3xl mix-blend-multiply" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-3xl mix-blend-multiply" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-indigo-300/20 rounded-full blur-3xl mix-blend-multiply" />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] glass-panel p-3 rounded-xl shadow-lg shadow-sky-500/10 flex items-center gap-2"
      >
        <CheckCircle className="w-5 h-5 text-sky-500" />
        <span className="text-xs font-medium text-slate-700">Post Scheduled</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] right-[15%] glass-panel p-4 rounded-2xl shadow-lg shadow-blue-500/10"
      >
        <Heart className="w-8 h-8 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] left-[15%] glass-panel p-4 rounded-2xl shadow-lg shadow-indigo-500/10"
      >
        <Music className="w-8 h-8 text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[60%] left-[40%] flex items-center gap-2"
      >
        <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
        <div className="h-px w-16 bg-gradient-to-r from-sky-400 to-transparent" />
        <span className="text-xs font-mono text-sky-600">Processing...</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-[25%] right-[30%] glass-panel w-24 h-32 rounded-lg shadow-lg shadow-blue-500/10 flex flex-col items-center justify-center gap-2 opacity-60"
      >
        <Video className="w-6 h-6 text-blue-400" />
        <div className="w-12 h-2 bg-slate-200 rounded-full" />
        <div className="w-8 h-2 bg-slate-200 rounded-full" />
      </motion.div>
    </div>
  );
};

const translations = {
  en: {
    heroTitle: "Your Social Media, Fully Automated.",
    heroSubtitle: "Send us your page link. Our AI agent analyzes your full content, automatically creates brand-suitable posts, Reels, and TikToks. First 3 videos are free!",
    scanLink: "Page Analysis",
    scanLinkDesc: "Drop your link. We learn your brand voice.",
    aiCreative: "Brand Content",
    aiCreativeDesc: "Auto-generates posts, Reels & TikToks.",
    autoPost: "Smart Scheduling",
    autoPostDesc: "Schedules posts for optimal engagement.",
    dailyAnalysis: "Growth Tracking",
    dailyAnalysisDesc: "Monitors engagement and optimizes.",
    techStackTitle: "How It Works",
    techStackDesc: "From a single link to a fully managed social media presence.",
    step1: "Analyze Page Content",
    step2: "Generate Brand Content",
    step3: "Schedule & Automate",
    step4: "Schedule Posts",
    platformReach: "Platform Reach",
    contactTitle: "Request a Demo",
    contactSubtitle: "See the Living Automation Engine in action.",
    name: "Name",
    email: "Email",
    website: "Website / Page Link",
    image: "Upload Image",
    message: "Message",
    startAutomation: "Start My Automation",
    facebook: "Facebook",
    instagram: "Instagram",
    tiktok: "TikTok",
    contactTelegram: "Contact us on Telegram",
  },
  ka: {
    heroTitle: "თქვენი სოციალური მედია, სრულად ავტომატიზირებული.",
    heroSubtitle: "გამოგვიგზავნეთ თქვენი გვერდის ბმული. ჩვენი AI აგენტი აანალიზებს თქვენს კონტენტს, ავტომატურად ქმნის ბრენდზე მორგებულ პოსტებს, Reels-ებს და TikTok-ებს. პირველი 3 ვიდეო უფასოა!",
    scanLink: "გვერდის ანალიზი",
    scanLinkDesc: "ჩააგდეთ ბმული. ჩვენ ვსწავლობთ თქვენს სტილს.",
    aiCreative: "ბრენდის კონტენტი",
    aiCreativeDesc: "ქმნის პოსტებს, Reels და TikTok-ებს.",
    autoPost: "ჭკვიანი დაგეგმვა",
    autoPostDesc: "დაგეგმავს პოსტებს ოპტიმალური ჩართულობისთვის.",
    dailyAnalysis: "ზრდის კონტროლი",
    dailyAnalysisDesc: "აკონტროლებს ჩართულობას და აუმჯობესებს.",
    techStackTitle: "როგორ მუშაობს",
    techStackDesc: "ერთი ბმულიდან სრულად მართულ სოციალურ მედიამდე.",
    step1: "გვერდის კონტენტის ანალიზი",
    step2: "ბრენდის კონტენტის გენერაცია",
    step3: "დაგეგმვა და ავტომატიზაცია",
    step4: "პოსტების დაგეგმვა",
    platformReach: "პლატფორმის წვდომა",
    contactTitle: "დემოს მოთხოვნა",
    contactSubtitle: "ნახეთ ცოცხალი ავტომატიზაციის ძრავი მოქმედებაში.",
    name: "სახელი",
    email: "ელ. ფოსტა",
    website: "ვებ-გვერდის ბმული",
    image: "სურათის ატვირთვა",
    message: "შეტყობინება",
    startAutomation: "ჩემი ავტომატიზაციის დაწყება",
    facebook: "Facebook",
    instagram: "Instagram",
    tiktok: "TikTok",
    contactTelegram: "დაგვიკავშირდით Telegram-ზე",
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ka'>('en');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const t = translations[lang];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      if (formData.website) data.append('website', formData.website);
      if (imageFile) data.append('image', imageFile);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', website: '' });
        setImageFile(null);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900">
      <FloatingBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center drop-shadow-md">
              <MountainLogo className="w-full h-full" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-800">Tianshani</span>
          </div>

          <div className="flex items-center gap-2 bg-white/50 p-1 rounded-full border border-white/40 shadow-sm">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${lang === 'en' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ka')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${lang === 'ka' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              KA
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-32">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-gradient">
                {t.heroTitle}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
          </motion.div>

          {/* Interactive Preview */}
          <div className="relative w-full max-w-3xl mt-16 h-[500px] flex items-center justify-center">
            {/* Phone Mockup */}
            <motion.div
              className="relative z-20 w-64 h-[450px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-xl w-32 mx-auto z-30" />

              {/* Screen Content */}
              <div className="flex-1 bg-slate-50 relative overflow-hidden p-4 pt-10">
                <motion.div
                  animate={{ y: [0, -100, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="space-y-4"
                >
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-400" />
                        <div className="space-y-1">
                          <div className="w-20 h-2 bg-slate-200 rounded" />
                          <div className="w-12 h-2 bg-slate-100 rounded" />
                        </div>
                      </div>
                      <div className="w-full h-32 bg-slate-100 rounded-lg" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Flying Inputs */}
            <motion.div
              className="absolute left-0 md:left-10 top-1/4 z-10 glass-panel p-3 rounded-xl shadow-lg flex items-center gap-2"
              animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeIn" }}
            >
              <ImageIcon className="w-5 h-5 text-sky-500" />
              <div className="w-16 h-2 bg-slate-200 rounded" />
            </motion.div>

            <motion.div
              className="absolute left-10 md:left-20 bottom-1/3 z-10 glass-panel p-3 rounded-xl shadow-lg flex items-center gap-2"
              animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeIn", delay: 1 }}
            >
              <Video className="w-5 h-5 text-blue-500" />
              <div className="w-16 h-2 bg-slate-200 rounded" />
            </motion.div>

            {/* Flying Outputs */}
            <motion.div
              className="absolute right-0 md:right-10 top-1/3 z-30 glass-panel p-3 rounded-xl shadow-lg flex items-center gap-2 border-blue-200"
              animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
            >
              <Heart className="w-5 h-5 text-blue-500" />
              <span className="text-xs font-semibold text-slate-700">Instagram Reel</span>
            </motion.div>

            <motion.div
              className="absolute right-10 md:right-20 bottom-1/4 z-30 glass-panel p-3 rounded-xl shadow-lg flex items-center gap-2 border-indigo-200"
              animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 2.5 }}
            >
              <Music className="w-5 h-5 text-indigo-500" />
              <span className="text-xs font-semibold text-slate-700">TikTok Post</span>
            </motion.div>
          </div>

          {/* Bento Grid Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-16">
            {[
              { title: t.scanLink, desc: t.scanLinkDesc, icon: Share2, bgLight: "bg-sky-100", text: "text-sky-500", borderHover: "group-hover:border-sky-400/50", gradient: "from-sky-400/10" },
              { title: t.aiCreative, desc: t.aiCreativeDesc, icon: Video, bgLight: "bg-blue-100", text: "text-blue-500", borderHover: "group-hover:border-blue-400/50", gradient: "from-blue-400/10" },
              { title: t.autoPost, desc: t.autoPostDesc, icon: CheckCircle, bgLight: "bg-indigo-100", text: "text-indigo-500", borderHover: "group-hover:border-indigo-400/50", gradient: "from-indigo-400/10" },
              { title: t.dailyAnalysis, desc: t.dailyAnalysisDesc, icon: Heart, bgLight: "bg-cyan-100", text: "text-cyan-500", borderHover: "group-hover:border-cyan-400/50", gradient: "from-cyan-400/10" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-panel p-6 rounded-2xl relative group overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`w-12 h-12 rounded-xl ${feature.bgLight} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.text}`} />
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.desc}</p>
                <div className={`absolute inset-0 border-2 border-transparent ${feature.borderHover} rounded-2xl transition-colors duration-500 pointer-events-none`} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Info (The Tech Stack) */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t.techStackTitle}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.techStackDesc}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Step-by-step animation */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-sky-300 before:via-blue-300 before:to-transparent">
              {[
                { step: 1, title: t.step1 },
                { step: 2, title: t.step2 },
                { step: 3, title: t.step3 },
                { step: 4, title: t.step4 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-slate-100 text-slate-500 group-hover:bg-white group-hover:border-blue-400 group-hover:text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 z-10">
                    <span className="font-bold">{item.step}</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel p-4 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Platform Reach */}
            <div className="glass-panel p-8 rounded-3xl space-y-8">
              <h3 className="font-display text-2xl font-bold text-slate-800">{t.platformReach}</h3>

              <div className="space-y-6">
                {[
                  { name: t.instagram, icon: Heart, colorClass: "bg-indigo-500", textClass: "text-indigo-500", progress: "92%" },
                  { name: t.tiktok, icon: Music, colorClass: "bg-cyan-500", textClass: "text-cyan-500", progress: "88%" },
                  { name: t.facebook, icon: Share2, colorClass: "bg-blue-500", textClass: "text-blue-500", progress: "75%" },
                ].map((platform, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                      <div className="flex items-center gap-2">
                        <platform.icon className={`w-4 h-4 ${platform.textClass}`} />
                        {platform.name}
                      </div>
                      <span>{platform.progress}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: platform.progress }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${platform.colorClass}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Request a Demo (Conversion) */}
        <section className="py-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-[2.5rem] w-full max-w-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-800 mb-2">{t.contactTitle}</h2>
                <p className="text-slate-500">{t.contactSubtitle}</p>
              </div>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Message Sent!</h3>
                  <p className="text-slate-600">We have received your request and we will answer soon.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 ml-1">{t.name}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 ml-1">{t.email}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 ml-1">{t.website}</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 ml-1">{t.image}</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium file:px-4 file:py-1 file:rounded-full file:mr-4 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 ml-1">{t.message}</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all resize-none"
                      placeholder="Tell us about your goals..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-xs ml-1">Something went wrong. Please try again.</p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'sending'}
                    className={`w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white font-bold text-lg shadow-lg shadow-blue-500/30 relative overflow-hidden group ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <span className="relative z-10">
                      {status === 'sending' ? 'Sending...' : t.startAutomation}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    {/* Pulse effect */}
                    <div className="absolute inset-0 rounded-xl border-2 border-white/50 animate-ping opacity-20" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/20 glass-panel">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-600 mb-4">{t.contactTelegram}</p>
          <a
            href="https://t.me/GMblx123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            @GMblx123
          </a>
        </div>
      </footer>
    </div>
  );
}

