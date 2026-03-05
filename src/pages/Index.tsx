import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/86f33631-5ee0-4e05-b138-1cfce32a1f7b.jpg";
const TEAM_IMAGE = "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/fdf59d59-b44c-486d-997f-58c055a12062.jpg";

const CASE_IMAGES = {
  bi: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/5dcc5614-3db3-407c-8bd0-5b0a50d2dbba.jpg",
  bp: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/c8c72feb-8339-4607-b4be-eed24f0a0cd7.jpg",
  sales: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/a55a8041-e043-49f8-831d-6d36b8aabff7.jpg",
  integration: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/e7a26874-b9ed-49a9-bfc0-4a2aafc554ba.jpg",
  estate: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/65c55bed-804f-4d1a-9db3-7d966c0ead47.jpg",
  clinic: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/e47d7c7a-b466-46b7-88db-efd54f0b6ea2.jpg",
};

// ─── INTERSECTION OBSERVER HOOK ─────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── MODAL FORM ──────────────────────────────────────────────────────────────

function ModalForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md card-glass rounded-2xl border border-white/10 p-8 shadow-[0_0_80px_rgba(139,92,246,0.2)] animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {sent ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-400/15 flex items-center justify-center mb-4">
              <Icon name="CheckCircle" size={32} className="text-purple-400" />
            </div>
            <h3 className="font-golos font-bold text-white text-2xl mb-2">Заявка отправлена!</h3>
            <p className="font-ibm text-white/50 mb-6">Свяжемся с вами в ближайшее время</p>
            <button onClick={onClose} className="btn-outline px-6 py-2.5 rounded-xl text-sm">Закрыть</button>
          </div>
        ) : (
          <>
            <h3 className="font-golos font-bold text-white text-2xl mb-1">Получить консультацию</h3>
            <p className="font-ibm text-white/40 text-sm mb-6">Ответим в течение часа</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-ibm text-sm text-white/60 block mb-2">Имя</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-white placeholder-white/20 focus:outline-none focus:border-purple-400/60 transition-colors"
                />
              </div>
              <div>
                <label className="font-ibm text-sm text-white/60 block mb-2">Телефон</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (999) 000-00-00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-white placeholder-white/20 focus:outline-none focus:border-purple-400/60 transition-colors"
                />
              </div>
              <div>
                <label className="font-ibm text-sm text-white/60 block mb-2">Задача (необязательно)</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Расскажите о вашем проекте..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-white placeholder-white/20 focus:outline-none focus:border-purple-400/60 transition-colors resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full py-3.5 rounded-xl text-base">
                Отправить заявку
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Услуги", href: "#services" },
    { label: "Кейсы", href: "#cases" },
    { label: "Портфолио", href: "#portfolio" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Обучение", href: "#education" },
    { label: "О нас", href: "#about" },
    { label: "Контакты", href: "#contacts" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[hsl(220,20%,6%,0.95)] backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img
            src="https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/bucket/39cf89f9-e068-4ca7-81a6-b30477dfd19e.png"
            alt="IT25"
            className="h-8 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-ibm text-white/60 hover:text-purple-400 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button onClick={onOpenModal} className="hidden md:block btn-primary px-5 py-2 rounded-xl text-sm">
          Получить консультацию
        </button>

        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[hsl(220,18%,9%)] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-purple-400 transition-colors py-1 font-ibm"
            >
              {l.label}
            </a>
          ))}
          <button onClick={() => { setMenuOpen(false); onOpenModal(); }} className="btn-primary px-5 py-2.5 rounded-xl text-sm text-center mt-2">
            Получить консультацию
          </button>
        </div>
      )}
    </header>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "hsl(258,90%,66%)" }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{ background: "hsl(28,100%,58%)" }} />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="animate-slide-up">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {[
              { label: "Битрикс24", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
              { label: "U-ON", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
              { label: "Геткурс", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
            ].map((crm) => (
              <span key={crm.label} className={`font-ibm text-xs font-semibold px-3 py-1.5 rounded-lg border ${crm.color}`}>
                {crm.label}
              </span>
            ))}
          </div>

          <h1 className="font-golos text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6">
            Автоматизация<br />
            <span className="gradient-text">бизнеса</span><br />
            под ключ
          </h1>

          <p className="font-ibm text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
            Техническая поддержка и внедрение Битрикс24, U-ON и Геткурс.
            Настройка бизнес-процессов, интеграции и обучение сотрудников.
          </p>

          <div className="flex flex-wrap gap-4">
            <button onClick={onOpenModal} className="btn-primary px-7 py-3.5 rounded-xl text-base">
              Получить консультацию
            </button>
            <a href="#services" className="btn-outline px-7 py-3.5 rounded-xl text-base">
              Наши услуги
            </a>
          </div>

          <div className="flex gap-10 mt-12 pt-12 border-t border-white/8">
            {[
              { num: "150+", label: "Проектов" },
              { num: "5 лет", label: "Опыта" },
              { num: "98%", label: "Довольных клиентов" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-golos font-black text-3xl gradient-text">{s.num}</div>
                <div className="font-ibm text-white/40 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-in-scale delay-300 hidden lg:block">
          <div className="relative rounded-2xl overflow-hidden glow-purple">
            <img
              src={HERO_IMAGE}
              alt="IT25 Dashboard"
              className="w-full h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,6%,0.5)] to-transparent" />
          </div>

          <div className="absolute -bottom-5 -left-5 card-glass rounded-2xl px-5 py-3 border border-white/10 animate-float">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-400/20 flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-orange-400" />
              </div>
              <div>
                <div className="font-golos font-bold text-white text-sm">Автоматизация</div>
                <div className="font-ibm text-white/50 text-xs">Настройка за 3 дня</div>
              </div>
            </div>
          </div>

          <div className="absolute -top-5 -right-5 card-glass rounded-2xl px-4 py-3 border border-white/10 animate-float" style={{ animationDelay: "2s" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="font-ibm text-white/70 text-xs font-medium">На связи 24/7</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="font-ibm text-xs tracking-widest uppercase">Прокрутить</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

// ─── SERVICES ───────────────────────────────────────────────────────────────

const CRM_TABS = [
  {
    id: "bitrix",
    label: "Битрикс24",
    color: "blue",
    accent: "text-blue-300",
    activeBg: "bg-blue-500/20 border-blue-500/40 text-blue-200",
    inactiveBg: "bg-white/4 border-white/8 text-white/50 hover:text-white/80",
    desc: "Полный спектр услуг по внедрению, настройке и поддержке Битрикс24 — самой популярной CRM в России",
    services: [
      { icon: "Headphones", title: "Техподдержка", desc: "Оперативное решение задач. SLA до 4 часов, личный менеджер.", tags: ["24/7", "SLA 4ч"] },
      { icon: "GitBranch", title: "Бизнес-процессы", desc: "Автоматизация воронок, роботы, триггеры, сделки под ключ.", tags: ["Воронки", "Роботы"] },
      { icon: "Plug", title: "Интеграции", desc: "1С, телефония, мессенджеры, email, маркетплейсы и API.", tags: ["1С", "API"] },
      { icon: "Wrench", title: "Обслуживание", desc: "Обновления, мониторинг, бэкапы и оптимизация портала.", tags: ["Обновления", "Бэкапы"] },
      { icon: "GraduationCap", title: "Обучение", desc: "Тренинги для команды: от азов до продвинутых функций.", tags: ["Тренинги"] },
      { icon: "Rocket", title: "Внедрение с нуля", desc: "Аудит, настройка, запуск и обучение сотрудников.", tags: ["Под ключ"] },
    ],
  },
  {
    id: "uon",
    label: "U-ON",
    color: "purple",
    accent: "text-purple-300",
    activeBg: "bg-purple-500/20 border-purple-500/40 text-purple-200",
    inactiveBg: "bg-white/4 border-white/8 text-white/50 hover:text-white/80",
    desc: "Специализированная CRM для туристического бизнеса — настроим и автоматизируем работу турагентства",
    services: [
      { icon: "Headphones", title: "Техподдержка", desc: "Поддержка U-ON: настройка, ошибки, вопросы по функционалу.", tags: ["Онлайн"] },
      { icon: "Settings", title: "Настройка CRM", desc: "Воронки туров, работа с клиентами, автоуведомления.", tags: ["Воронки"] },
      { icon: "Plug", title: "Интеграции", desc: "Подбор туров, онлайн-оплата, email и мессенджеры.", tags: ["Оплата", "Боты"] },
      { icon: "BarChart2", title: "Аналитика", desc: "Настройка отчётов, дашбордов и KPI-метрик для руководителя.", tags: ["KPI"] },
      { icon: "GraduationCap", title: "Обучение", desc: "Обучение менеджеров и руководителей работе в U-ON.", tags: ["Онлайн"] },
      { icon: "Rocket", title: "Внедрение", desc: "Полный переезд на U-ON: перенос базы, настройка, запуск.", tags: ["Под ключ"] },
    ],
  },
  {
    id: "getcourse",
    label: "Геткурс",
    color: "orange",
    accent: "text-orange-300",
    activeBg: "bg-orange-500/20 border-orange-500/40 text-orange-200",
    inactiveBg: "bg-white/4 border-white/8 text-white/50 hover:text-white/80",
    desc: "Платформа для онлайн-школ и инфобизнеса — запустим, настроим и автоматизируем вашу школу",
    services: [
      { icon: "BookOpen", title: "Настройка школы", desc: "Создание курсов, уроков, домашних заданий и тестов.", tags: ["Курсы"] },
      { icon: "TrendingUp", title: "Воронки продаж", desc: "Автоматизация продаж, вебинарные воронки, апселлы.", tags: ["Воронки"] },
      { icon: "Plug", title: "Интеграции", desc: "Оплата, рассылки, Telegram-боты, CRM и аналитика.", tags: ["Боты", "CRM"] },
      { icon: "Mail", title: "Email & рассылки", desc: "Настройка цепочек писем, автосегментация базы.", tags: ["Email"] },
      { icon: "GraduationCap", title: "Обучение", desc: "Обучим команду эффективно работать с платформой.", tags: ["Онлайн"] },
      { icon: "Cpu", title: "Автоматизация", desc: "Бизнес-процессы, автосегменты, триггерные сценарии.", tags: ["Авто"] },
    ],
  },
];

function Services() {
  const [activeTab, setActiveTab] = useState("bitrix");
  const tab = CRM_TABS.find((t) => t.id === activeTab)!;
  const { ref, inView } = useInView();

  return (
    <section id="services" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label mb-3 block">Услуги</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Что мы делаем</h2>
          <p className="font-ibm text-white/50 text-lg max-w-xl">{tab.desc}</p>
        </div>

        <div className="flex gap-3 mb-10 flex-wrap">
          {CRM_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`font-ibm text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all duration-200 ${
                activeTab === t.id ? t.activeBg : t.inactiveBg
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tab.services.map((s, i) => (
            <div
              key={s.title}
              className={`card-glass rounded-2xl p-6 border border-white/5 card-hover group transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                tab.color === "blue" ? "bg-blue-500/15" :
                tab.color === "purple" ? "bg-purple-500/15" : "bg-orange-500/15"
              }`}>
                <Icon name={s.icon} fallback="Star" size={20} className={tab.accent} />
              </div>
              <h3 className="font-golos font-bold text-white text-lg mb-2 group-hover:text-purple-300 transition-colors">{s.title}</h3>
              <p className="font-ibm text-white/45 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {s.tags.map((tag) => (
                  <span key={tag} className={`font-ibm text-xs px-2.5 py-1 rounded-lg ${
                    tab.color === "blue" ? "bg-blue-500/10 text-blue-400" :
                    tab.color === "purple" ? "bg-purple-500/10 text-purple-400" :
                    "bg-orange-500/10 text-orange-400"
                  }`}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CALCULATOR ──────────────────────────────────────────────────────────────

const CALC_GROUPS = [
  {
    group: "Битрикс24",
    icon: "LayoutDashboard",
    color: "blue",
    items: [
      { id: "b_support", label: "Техподдержка", desc: "Личный менеджер, SLA 4ч", base: 9900, unit: "/мес" },
      { id: "b_bp", label: "Бизнес-процессы", desc: "Роботы, воронки, триггеры", base: 14900, unit: "" },
      { id: "b_int", label: "Интеграции (1С, телефония)", desc: "Любые внешние системы", base: 19900, unit: "" },
      { id: "b_maint", label: "Обслуживание портала", desc: "Обновления, бэкапы", base: 7900, unit: "/мес" },
      { id: "b_impl", label: "Внедрение с нуля", desc: "Аудит, настройка, запуск", base: 49900, unit: "" },
      { id: "b_edu", label: "Обучение сотрудников", desc: "Онлайн-тренинги", base: 12000, unit: "" },
    ],
  },
  {
    group: "U-ON",
    icon: "Plane",
    color: "purple",
    items: [
      { id: "u_support", label: "Техподдержка U-ON", desc: "Решение вопросов и ошибок", base: 7900, unit: "/мес" },
      { id: "u_setup", label: "Настройка CRM", desc: "Воронки, уведомления", base: 12900, unit: "" },
      { id: "u_int", label: "Интеграции", desc: "Оплата, мессенджеры, email", base: 14900, unit: "" },
      { id: "u_impl", label: "Внедрение под ключ", desc: "Перенос базы, запуск", base: 34900, unit: "" },
      { id: "u_edu", label: "Обучение команды", desc: "Онлайн-обучение", base: 8000, unit: "" },
    ],
  },
  {
    group: "Геткурс",
    icon: "GraduationCap",
    color: "orange",
    items: [
      { id: "g_school", label: "Настройка школы", desc: "Курсы, уроки, тесты", base: 19900, unit: "" },
      { id: "g_funnel", label: "Воронки продаж", desc: "Вебинарные, автоматические", base: 24900, unit: "" },
      { id: "g_int", label: "Интеграции", desc: "Оплата, Telegram, CRM", base: 14900, unit: "" },
      { id: "g_email", label: "Email-маркетинг", desc: "Цепочки писем, сегменты", base: 12900, unit: "" },
      { id: "g_auto", label: "Автоматизация", desc: "Бизнес-процессы, триггеры", base: 17900, unit: "" },
    ],
  },
];

const SIZES = [
  { label: "До 5 чел.", mult: 1.0 },
  { label: "5–20 чел.", mult: 1.4 },
  { label: "20–50 чел.", mult: 1.8 },
  { label: "50+ чел.", mult: 2.5 },
];

function Calculator() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [calcSent, setCalcSent] = useState(false);
  const [calcForm, setCalcForm] = useState({ name: "", phone: "" });
  const { ref, inView } = useInView();

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const selectedItems = CALC_GROUPS.flatMap((g) => g.items).filter((s) => selected.includes(s.id));
  const total = selectedItems.reduce((acc, s) => acc + Math.round(s.base * SIZES[sizeIdx].mult), 0);

  const handleCalcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCalcSent(true);
  };

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-12 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label mb-3 block">Стоимость</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Калькулятор услуг</h2>
          <p className="font-ibm text-white/50 text-lg">Выберите нужные услуги — получите предварительную стоимость</p>
        </div>

        <div className={`transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-6">
            <div className="font-ibm text-white/50 text-sm mb-3">Размер команды</div>
            <div className="flex gap-3 flex-wrap">
              {SIZES.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setSizeIdx(i)}
                  className={`font-ibm text-sm px-4 py-2 rounded-xl border transition-all ${
                    sizeIdx === i
                      ? "bg-purple-400/20 border-purple-400/50 text-purple-300"
                      : "bg-white/4 border-white/8 text-white/50 hover:text-white/80"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {CALC_GROUPS.map((group) => (
              <div key={group.group} className="card-glass rounded-2xl border border-white/5 overflow-hidden">
                <div className={`px-5 py-3 border-b border-white/5 flex items-center gap-2 ${
                  group.color === "blue" ? "bg-blue-500/10" :
                  group.color === "purple" ? "bg-purple-500/10" : "bg-orange-500/10"
                }`}>
                  <Icon name={group.icon} fallback="Star" size={16} className={
                    group.color === "blue" ? "text-blue-400" :
                    group.color === "purple" ? "text-purple-400" : "text-orange-400"
                  } />
                  <span className={`font-golos font-bold text-sm ${
                    group.color === "blue" ? "text-blue-300" :
                    group.color === "purple" ? "text-purple-300" : "text-orange-300"
                  }`}>{group.group}</span>
                </div>
                <div className="p-4 space-y-2">
                  {group.items.map((s) => {
                    const isOn = selected.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => toggle(s.id)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                          isOn
                            ? group.color === "blue" ? "bg-blue-500/10 border-blue-400/30" :
                              group.color === "purple" ? "bg-purple-500/10 border-purple-400/30" :
                              "bg-orange-500/10 border-orange-400/30"
                            : "bg-white/3 border-white/5 hover:border-white/12"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                          isOn
                            ? group.color === "blue" ? "bg-blue-400 border-blue-400" :
                              group.color === "purple" ? "bg-purple-400 border-purple-400" :
                              "bg-orange-400 border-orange-400"
                            : "border-white/20"
                        }`}>
                          {isOn && <Icon name="Check" size={10} className="text-[hsl(220,20%,6%)]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-ibm text-sm ${isOn ? "text-white" : "text-white/60"}`}>{s.label}</div>
                          <div className="font-ibm text-xs text-white/30 mt-0.5">{s.desc}</div>
                        </div>
                        <div className={`font-golos font-semibold text-xs whitespace-nowrap ${
                          isOn
                            ? group.color === "blue" ? "text-blue-300" :
                              group.color === "purple" ? "text-purple-300" : "text-orange-300"
                            : "text-white/25"
                        }`}>
                          {Math.round(s.base * SIZES[sizeIdx].mult).toLocaleString("ru")} ₽{s.unit}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {selected.length > 0 && (
            <div className="card-glass rounded-2xl border border-purple-400/20 p-6 bg-purple-400/5">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="font-ibm text-white/50 text-sm mb-3">Выбранные услуги:</div>
                  <div className="space-y-2 mb-4">
                    {selectedItems.map((s) => (
                      <div key={s.id} className="flex justify-between text-sm">
                        <span className="font-ibm text-white/60">{s.label}</span>
                        <span className="font-golos font-semibold text-white/80">
                          {Math.round(s.base * SIZES[sizeIdx].mult).toLocaleString("ru")} ₽{s.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between items-baseline">
                    <div className="font-ibm text-white/50 text-sm">Итого</div>
                    <div className="font-golos font-black text-3xl gradient-text">
                      {total.toLocaleString("ru")} ₽
                      <span className="text-base text-white/40 font-normal">/мес</span>
                    </div>
                  </div>
                </div>

                <div className="card-glass rounded-xl border border-white/8 p-5">
                  {calcSent ? (
                    <div className="flex flex-col items-center py-4 text-center">
                      <div className="w-12 h-12 rounded-xl bg-purple-400/15 flex items-center justify-center mb-3">
                        <Icon name="CheckCircle" size={24} className="text-purple-400" />
                      </div>
                      <p className="font-golos font-bold text-white mb-1">Заявка отправлена!</p>
                      <p className="font-ibm text-white/40 text-sm">Свяжемся с вами в ближайшее время</p>
                    </div>
                  ) : (
                    <>
                      <p className="font-ibm text-white/50 text-sm mb-4">Оставьте контакты — рассчитаем точную стоимость</p>
                      <form onSubmit={handleCalcSubmit} className="space-y-3">
                        <input
                          type="text"
                          required
                          value={calcForm.name}
                          onChange={(e) => setCalcForm({ ...calcForm, name: e.target.value })}
                          placeholder="Ваше имя"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-ibm text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-400/60 transition-colors"
                        />
                        <input
                          type="tel"
                          required
                          value={calcForm.phone}
                          onChange={(e) => setCalcForm({ ...calcForm, phone: e.target.value })}
                          placeholder="+7 (999) 000-00-00"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-ibm text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-400/60 transition-colors"
                        />
                        <button type="submit" className="btn-primary w-full py-2.5 rounded-xl text-sm">
                          Получить расчёт
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {selected.length === 0 && (
            <div className="text-center py-8">
              <p className="font-ibm text-white/25">Выберите услуги выше, чтобы увидеть стоимость</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO ──────────────────────────────────────────────────────────────

const PORTFOLIO_TABS = [
  {
    id: "bitrix",
    label: "Битрикс24",
    cases: [
      { tag: "Интеграция", title: "CRM + Телефония", desc: "Интеграция Битрикс24 с IP-телефонией и автоматическая фиксация всех звонков в CRM для торговой компании.", result: "Конверсия +35%", icon: "Phone", color: "purple" },
      { tag: "Автоматизация", title: "Воронка продаж", desc: "Автоматизация полного цикла сделки для агентства недвижимости: от заявки до подписания договора.", result: "Скорость сделки ×2", icon: "TrendingUp", color: "orange" },
      { tag: "Внедрение", title: "CRM для клиники", desc: "Полное внедрение Битрикс24 для медицинской клиники: расписание, пациенты, напоминания.", result: "ROI за 3 месяца", icon: "HeartPulse", color: "purple" },
      { tag: "Интеграция", title: "1С + Битрикс24", desc: "Двусторонняя синхронизация товаров, заказов и клиентской базы между 1С и Битрикс24 для оптовика.", result: "0 ошибок данных", icon: "RefreshCw", color: "orange" },
      { tag: "Автоматизация", title: "Роботы и триггеры", desc: "Настройка 27 роботов и триггеров в CRM строительной компании — уведомления, задачи, документы.", result: "Рутина −70%", icon: "Cpu", color: "purple" },
      { tag: "Аналитика", title: "BI-дашборды", desc: "Настройка аналитики и отчётности для руководства: воронки, конверсии, план-факт по менеджерам.", result: "Решения быстрее ×3", icon: "BarChart2", color: "orange" },
    ],
  },
  {
    id: "uon",
    label: "U-ON",
    cases: [
      { tag: "Внедрение", title: "Турагентство под ключ", desc: "Полный переезд турагентства на U-ON: перенос базы клиентов, настройка воронок, обучение менеджеров.", result: "3 дня на запуск", icon: "Plane", color: "purple" },
      { tag: "Автоматизация", title: "Автоуведомления", desc: "Настройка цепочки автоуведомлений клиентам: подтверждение брони, напоминания, документы.", result: "Отказы −40%", icon: "Bell", color: "orange" },
      { tag: "Интеграция", title: "Онлайн-оплата", desc: "Подключение онлайн-оплаты и автоматического выставления счётов прямо из U-ON.", result: "Оплаты быстрее ×4", icon: "CreditCard", color: "purple" },
      { tag: "Обучение", title: "Команда 40 человек", desc: "Корпоративное обучение сотрудников производственной компании и турагентства работе в U-ON.", result: "Внедрено за 2 недели", icon: "Users", color: "orange" },
    ],
  },
  {
    id: "getcourse",
    label: "Геткурс",
    cases: [
      { tag: "Запуск школы", title: "Онлайн-школа с нуля", desc: "Запуск онлайн-школы английского языка: курсы, уроки, автоматические домашние задания и сертификаты.", result: "100+ учеников в 1 мес.", icon: "BookOpen", color: "purple" },
      { tag: "Воронки", title: "Вебинарная воронка", desc: "Сборка автовебинарной воронки с автоматическими дожимами, апселлами и сегментацией базы.", result: "Конверсия +28%", icon: "TrendingUp", color: "orange" },
      { tag: "Интеграция", title: "Telegram-бот + Геткурс", desc: "Интеграция с Telegram-ботом: доступ к урокам, домашние задания и коммуникация с учеником внутри мессенджера.", result: "Вовлечённость ×2", icon: "MessageSquare", color: "purple" },
      { tag: "Автоматизация", title: "Email-маркетинг", desc: "Настройка цепочек продающих писем, автосегментации базы и триггерных рассылок для инфобизнеса.", result: "LTV +45%", icon: "Mail", color: "orange" },
    ],
  },
];

function Portfolio() {
  const [activeTab, setActiveTab] = useState("bitrix");
  const tab = PORTFOLIO_TABS.find((t) => t.id === activeTab)!;
  const { ref, inView } = useInView();

  return (
    <section id="portfolio" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label mb-3 block">Наши работы</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Портфолио</h2>
          <p className="font-ibm text-white/50 text-lg max-w-xl">Реальные результаты для реальных бизнесов</p>
        </div>

        <div className="flex gap-3 mb-10 flex-wrap">
          {PORTFOLIO_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`font-ibm text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all duration-200 ${
                activeTab === t.id
                  ? "bg-purple-400/20 border-purple-400/50 text-purple-200"
                  : "bg-white/4 border-white/8 text-white/50 hover:text-white/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tab.cases.map((p, i) => (
            <div
              key={p.title}
              className={`card-glass rounded-2xl p-7 border border-white/5 group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_8px_40px_rgba(139,92,246,0.15)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 group-hover:h-1 ${
                p.color === "purple" ? "bg-gradient-to-r from-purple-400 to-transparent" : "bg-gradient-to-r from-orange-400 to-transparent"
              }`} />
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    p.color === "purple" ? "bg-purple-400/15" : "bg-orange-400/15"
                  }`}>
                    <Icon name={p.icon} fallback="Star" size={18} className={p.color === "purple" ? "text-purple-400" : "text-orange-400"} />
                  </div>
                  <span className={`font-ibm text-xs font-medium px-2.5 py-1 rounded-full ${
                    p.color === "purple" ? "bg-purple-400/15 text-purple-400" : "bg-orange-400/15 text-orange-400"
                  }`}>{p.tag}</span>
                </div>
                <span className="font-golos font-bold text-sm text-white/30 group-hover:text-orange-400 transition-colors whitespace-nowrap">{p.result}</span>
              </div>
              <h3 className="font-golos font-bold text-white text-xl mb-3 group-hover:text-purple-300 transition-colors">{p.title}</h3>
              <p className="font-ibm text-white/45 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASES ───────────────────────────────────────────────────────────────────

const CASES = [
  {
    id: "bi-wholesale",
    category: "BI-аналитика",
    tag: "Оптовая торговля",
    title: "BI-дашборды для оптовика: от интуиции к данным",
    image: CASE_IMAGES.bi,
    accent: "purple",
    client: "ООО «МеталлКомплект», 120 сотрудников",
    problem: "Руководитель принимал решения «на глаз» — непонятно кто из 18 менеджеров эффективен, какие товары в стоке зависают, где теряются деньги. Данные жили в 4 разных Excel-файлах.",
    solution: "Связали Битрикс24, 1С и складскую систему в единый поток. Построили BI-дашборды в режиме реального времени: воронка продаж по менеджерам, остатки склада, маржинальность по категориям, план-факт выручки.",
    results: [
      { metric: "+41%", label: "рост выручки за полгода" },
      { metric: "×3", label: "быстрее управленческие решения" },
      { metric: "−28%", label: "сокращение стока на складе" },
      { metric: "2 дня", label: "время внедрения дашбордов" },
    ],
    quote: "Раньше я узнавал о проблемах постфактум. Теперь открываю дашборд утром — вижу всё и сразу. Это изменило то, как я управляю компанией.",
    quoteAuthor: "Алексей В., генеральный директор",
  },
  {
    id: "bp-construction",
    category: "Бизнес-процессы",
    tag: "Строительство",
    title: "Автоматизация строительной компании: 0 потерянных заявок",
    image: CASE_IMAGES.bp,
    accent: "orange",
    client: "СК «СтройПроект», 85 сотрудников",
    problem: "Заявки падали в мессенджеры, на почту, по телефону — и терялись. Менеджеры вручную создавали задачи, забывали перезванивать. Из 100 заявок до сделки доходила 21.",
    solution: "Выстроили единую воронку в Битрикс24: все каналы → одна CRM. Настроили 34 робота: автоназначение менеджера, напоминания на каждом этапе, автоматическая генерация КП и договора по шаблону, SMS-уведомления клиенту.",
    results: [
      { metric: "0", label: "потерянных заявок" },
      { metric: "+58%", label: "конверсия из заявки в сделку" },
      { metric: "−70%", label: "времени на операционку" },
      { metric: "34", label: "автоматических робота" },
    ],
    quote: "Раньше менеджеры тратили 3 часа в день на ручную работу. Теперь система сама ставит задачи, напоминает и генерирует документы. Люди занимаются продажами, а не бумагами.",
    quoteAuthor: "Ирина М., коммерческий директор",
  },
  {
    id: "bi-sales",
    category: "BI + Продажи",
    tag: "Производство",
    title: "Рост продаж на 63% после внедрения BI и CRM",
    image: CASE_IMAGES.sales,
    accent: "purple",
    client: "Завод «ПластПром», 200 сотрудников",
    problem: "Отдел продаж из 22 человек работал без единой системы: кто-то вёл Excel, кто-то блокнот. Руководитель не понимал почему одни продают, а другие нет. Среднее время закрытия сделки — 47 дней.",
    solution: "Внедрили Битрикс24 с нуля: полная настройка CRM, воронок, прав доступа. Обучили всех 22 менеджера. Построили BI-аналитику: рейтинг эффективности, воронка конверсий, причины отказов, сравнение менеджеров.",
    results: [
      { metric: "+63%", label: "рост продаж за 4 месяца" },
      { metric: "19 дней", label: "средний цикл сделки (было 47)" },
      { metric: "×4", label: "прозрачность работы отдела" },
      { metric: "22", label: "обученных менеджера" },
    ],
    quote: "Через месяц после внедрения я впервые увидел, кто реально работает, а кто имитирует. Слабых подтянули, сильных — замотивировали. Результат не заставил ждать.",
    quoteAuthor: "Виктор С., директор по продажам",
  },
  {
    id: "integration-1c",
    category: "Интеграция",
    tag: "Ритейл",
    title: "1С + Битрикс24: синхронизация без дублей и ошибок",
    image: CASE_IMAGES.integration,
    accent: "orange",
    client: "Торговый дом «Мастер», 65 сотрудников",
    problem: "Склад жил в 1С, клиенты — в CRM, заказы — в Excel. Менеджеры вручную переносили данные между системами. Ошибки в номенклатуре, дубли клиентов, задержки отгрузки — всё из-за ручного ввода.",
    solution: "Настроили двустороннюю интеграцию 1С ↔ Битрикс24: товары и остатки из 1С в реальном времени, заказы из CRM автоматически в 1С, синхронизация клиентской базы без дублей. Добавили автоматическое выставление счётов.",
    results: [
      { metric: "0", label: "ошибок ввода данных" },
      { metric: "−90%", label: "ручной работы менеджеров" },
      { metric: "2 часа", label: "время отгрузки (было 2 дня)" },
      { metric: "100%", label: "актуальность остатков" },
    ],
    quote: "Раньше на reconciliation данных уходил целый день каждую пятницу. Теперь всё синхронизируется само — менеджеры занимаются клиентами, бухгалтер доволен.",
    quoteAuthor: "Светлана К., финансовый директор",
  },
  {
    id: "estate-crm",
    category: "CRM под ключ",
    tag: "Недвижимость",
    title: "CRM для агентства: цикл сделки сократился вдвое",
    image: CASE_IMAGES.estate,
    accent: "purple",
    client: "АН «Простор», 38 агентов",
    problem: "Агенты вели клиентов кто в заметках телефона, кто в мессенджерах. Повторные касания не фиксировались, показы назначались вручную, горячие клиенты остывали пока менеджеры разбирали входящие.",
    solution: "Полное внедрение Битрикс24 для агентства: воронка от первого звонка до подписания договора, интеграция с сайтом и Авито, автоматические напоминания о показах, шаблоны документов, мобильное приложение для агентов.",
    results: [
      { metric: "×2", label: "быстрее закрытие сделки" },
      { metric: "+44%", label: "конверсия лидов в сделку" },
      { metric: "−60%", label: "потерянных горячих клиентов" },
      { metric: "3 дня", label: "обучение всех агентов" },
    ],
    quote: "Агенты поначалу сопротивлялись — «зачем нам CRM». Через месяц сами не представляют как работали без неё. Показы не пропадают, клиенты не теряются.",
    quoteAuthor: "Дмитрий Р., руководитель АН «Простор»",
  },
  {
    id: "clinic-bp",
    category: "Бизнес-процессы",
    tag: "Медицина",
    title: "Медцентр: автоматизация записи и напоминаний",
    image: CASE_IMAGES.clinic,
    accent: "orange",
    client: "МЦ «Здоровье+», 3 филиала, 90 сотрудников",
    problem: "Администраторы 3 часа в день обзванивали пациентов вручную — напоминания о визитах, подтверждения записи. Процент неявок — 23%. Расписание врачей велось в бумажных журналах.",
    solution: "Настроили Битрикс24 для клиники: единое расписание всех врачей, автоматические SMS и звонки с напоминанием за 24 ч и 2 ч до визита, воронка повторных обращений, отчётность по загрузке врачей и выручке по услугам.",
    results: [
      { metric: "−18%", label: "снижение неявок пациентов" },
      { metric: "3 ч/день", label: "освобождено у администраторов" },
      { metric: "+31%", label: "рост повторных обращений" },
      { metric: "×2.5", label: "скорость обработки расписания" },
    ],
    quote: "Администраторы наконец занимаются пациентами в клинике, а не телефоном. Система сама напоминает, сама фиксирует, сама строит отчёт для меня на утро.",
    quoteAuthor: "Екатерина Н., главный врач",
  },
];

type CaseItem = typeof CASES[number];

function CaseCard({ c, onOpen }: { c: CaseItem; onOpen: (c: CaseItem) => void }) {
  return (
    <div
      className="card-glass rounded-2xl overflow-hidden border border-white/5 group cursor-pointer hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_8px_60px_rgba(139,92,246,0.18)] transition-all duration-400"
      onClick={() => onOpen(c)}
    >
      <div className="relative overflow-hidden h-52">
        <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,6%,0.85)] via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`font-ibm text-xs font-semibold px-3 py-1.5 rounded-lg border backdrop-blur-sm ${
            c.accent === "purple"
              ? "bg-purple-500/25 border-purple-400/40 text-purple-200"
              : "bg-orange-500/25 border-orange-400/40 text-orange-200"
          }`}>{c.category}</span>
          <span className="font-ibm text-xs px-3 py-1.5 rounded-lg border backdrop-blur-sm bg-white/10 border-white/20 text-white/70">{c.tag}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-golos font-bold text-white text-lg leading-snug mb-2 group-hover:text-purple-300 transition-colors">{c.title}</h3>
        <p className="font-ibm text-white/40 text-sm leading-relaxed mb-5 line-clamp-2">{c.problem}</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {c.results.slice(0, 4).map((r) => (
            <div key={r.label} className={`rounded-xl px-3 py-2.5 ${
              c.accent === "purple" ? "bg-purple-400/10" : "bg-orange-400/10"
            }`}>
              <div className={`font-golos font-black text-xl ${
                c.accent === "purple" ? "text-purple-300" : "text-orange-300"
              }`}>{r.metric}</div>
              <div className="font-ibm text-white/40 text-xs">{r.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-ibm text-white/30 text-xs">{c.client}</span>
          <span className={`flex items-center gap-1.5 font-ibm text-xs font-medium group-hover:gap-2.5 transition-all ${
            c.accent === "purple" ? "text-purple-400" : "text-orange-400"
          }`}>
            Подробнее <Icon name="ArrowRight" size={13} />
          </span>
        </div>
      </div>
    </div>
  );
}

function CaseModal({ c, onClose }: { c: CaseItem | null; onClose: () => void }) {
  useEffect(() => {
    if (c) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [c]);

  if (!c) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto card-glass rounded-2xl border border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.2)]">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/30 hover:text-white/70 transition-colors bg-black/40 rounded-lg p-1.5">
          <Icon name="X" size={18} />
        </button>

        <div className="relative h-60 overflow-hidden rounded-t-2xl">
          <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,8%,0.95)] via-[hsl(220,20%,8%,0.3)] to-transparent" />
          <div className="absolute bottom-5 left-6 flex gap-2">
            <span className={`font-ibm text-xs font-semibold px-3 py-1.5 rounded-lg border backdrop-blur-sm ${
              c.accent === "purple"
                ? "bg-purple-500/30 border-purple-400/50 text-purple-200"
                : "bg-orange-500/30 border-orange-400/50 text-orange-200"
            }`}>{c.category}</span>
            <span className="font-ibm text-xs px-3 py-1.5 rounded-lg border backdrop-blur-sm bg-white/10 border-white/20 text-white/70">{c.tag}</span>
          </div>
        </div>

        <div className="p-7">
          <div className="font-ibm text-white/35 text-xs mb-2">{c.client}</div>
          <h2 className="font-golos font-black text-white text-2xl mb-6 leading-snug">{c.title}</h2>

          <div className="grid grid-cols-2 gap-3 mb-7">
            {c.results.map((r) => (
              <div key={r.label} className={`rounded-xl p-4 ${c.accent === "purple" ? "bg-purple-400/10" : "bg-orange-400/10"}`}>
                <div className={`font-golos font-black text-2xl mb-0.5 ${c.accent === "purple" ? "text-purple-300" : "text-orange-300"}`}>{r.metric}</div>
                <div className="font-ibm text-white/50 text-xs">{r.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-5 mb-7">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="AlertCircle" size={12} className="text-red-400" />
                </div>
                <span className="font-golos font-bold text-white text-sm">Проблема</span>
              </div>
              <p className="font-ibm text-white/55 text-sm leading-relaxed pl-7">{c.problem}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${c.accent === "purple" ? "bg-purple-500/20" : "bg-orange-500/20"}`}>
                  <Icon name="Lightbulb" size={12} className={c.accent === "purple" ? "text-purple-400" : "text-orange-400"} />
                </div>
                <span className="font-golos font-bold text-white text-sm">Решение</span>
              </div>
              <p className="font-ibm text-white/55 text-sm leading-relaxed pl-7">{c.solution}</p>
            </div>
          </div>

          <blockquote className={`rounded-xl p-5 border-l-2 ${c.accent === "purple" ? "bg-purple-400/8 border-purple-400" : "bg-orange-400/8 border-orange-400"}`}>
            <p className="font-ibm text-white/65 text-sm leading-relaxed italic mb-3">"{c.quote}"</p>
            <div className="font-golos font-semibold text-white/40 text-xs">— {c.quoteAuthor}</div>
          </blockquote>

          <a href="#contacts" onClick={onClose} className="btn-primary w-full py-3.5 rounded-xl text-base text-center block mt-6">
            Обсудить похожий проект
          </a>
        </div>
      </div>
    </div>
  );
}

function Cases() {
  const [activeCase, setActiveCase] = useState<CaseItem | null>(null);
  const [filter, setFilter] = useState("all");
  const { ref, inView } = useInView();

  const filters = [
    { id: "all", label: "Все кейсы" },
    { id: "bi", label: "BI-аналитика" },
    { id: "bp", label: "Бизнес-процессы" },
    { id: "int", label: "Интеграции" },
    { id: "crm", label: "CRM" },
  ];

  const filterMap: Record<string, string[]> = {
    all: CASES.map((c) => c.id),
    bi: ["bi-wholesale", "bi-sales"],
    bp: ["bp-construction", "clinic-bp"],
    int: ["integration-1c"],
    crm: ["estate-crm", "integration-1c", "clinic-bp"],
  };

  const visible = CASES.filter((c) => filterMap[filter].includes(c.id));

  return (
    <section id="cases" className="py-24 relative" ref={ref}>
      <CaseModal c={activeCase} onClose={() => setActiveCase(null)} />
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label mb-3 block">Кейсы</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Реальные проекты</h2>
          <p className="font-ibm text-white/50 text-lg max-w-xl">Конкретные задачи, конкретные решения и измеримые результаты</p>
        </div>

        <div className="flex gap-3 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`font-ibm text-sm font-medium px-5 py-2.5 rounded-xl border transition-all duration-200 ${
                filter === f.id
                  ? "bg-purple-400/20 border-purple-400/50 text-purple-200"
                  : "bg-white/4 border-white/8 text-white/50 hover:text-white/80"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((c, i) => (
            <div
              key={c.id}
              className={`transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <CaseCard c={c} onOpen={setActiveCase} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────

const REVIEWS_TABS = [
  {
    id: "bitrix",
    label: "Битрикс24",
    reviews: [
      { name: "Андрей Соколов", role: "Коммерческий директор, ООО «ТехноТрейд»", text: "Настроили нам Битрикс24 за неделю — воронки, роботы, интеграция с 1С. До этого три месяца пытались сами. Теперь менеджеры не теряют заявки, всё видно в дашборде. Конверсия выросла на 35%.", stars: 5, initials: "АС" },
      { name: "Марина Козлова", role: "Руководитель отдела продаж, АН «Простор»", text: "Внедрили Битрикс24 для нашего агентства недвижимости. Команда IT25 разобралась в специфике нашего бизнеса с первой встречи. Сделки теперь закрываются в два раза быстрее.", stars: 5, initials: "МК" },
      { name: "Дмитрий Назаров", role: "Генеральный директор, МЦ «Здоровье»", text: "Полное внедрение Битрикс24 для клиники: расписание врачей, карточки пациентов, автонапоминания. Сотрудники обучены, всё работает без сбоев. Отличная команда!", stars: 5, initials: "ДН" },
      { name: "Елена Фёдорова", role: "Операционный директор, «СтройГрупп»", text: "Настроили 27 роботов в CRM. Раньше менеджеры тратили 3 часа в день на рутину — теперь всё автоматически. Экономим около 70% времени команды на операционке.", stars: 5, initials: "ЕФ" },
    ],
  },
  {
    id: "uon",
    label: "U-ON",
    reviews: [
      { name: "Ольга Петрова", role: "Директор, турагентство «Мир путешествий»", text: "Переехали на U-ON за 3 дня — перенесли всю базу клиентов, настроили воронки туров. Теперь менеджеры не звонят вручную, а система сама напоминает клиентам о поездке.", stars: 5, initials: "ОП" },
      { name: "Сергей Волков", role: "Владелец, «SunTravel»", text: "Подключили онлайн-оплату прямо в U-ON. Клиенты теперь оплачивают тур за 5 минут, не выходя из мессенджера. Количество отказов снизилось почти вдвое.", stars: 5, initials: "СВ" },
      { name: "Наталья Смирнова", role: "Менеджер, «Coral Travel»", text: "Прошла онлайн-обучение у ребят из IT25. Очень доступно объяснили все функции U-ON, которые я раньше вообще не использовала. Теперь работаю вдвое эффективнее.", stars: 5, initials: "НС" },
    ],
  },
  {
    id: "getcourse",
    label: "Геткурс",
    reviews: [
      { name: "Арина Белова", role: "Основатель, онлайн-школа «SpeakUp»", text: "Запустили школу английского с нуля за 2 недели. IT25 настроили курсы, автоматические домашние задания и сертификаты. В первый месяц набрали 100+ учеников!", stars: 5, initials: "АБ" },
      { name: "Максим Иванов", role: "Инфопродюсер, «MaxProfit»", text: "Построили автовебинарную воронку с дожимами и апселлами. Конверсия в покупку выросла на 28% по сравнению с предыдущей воронкой. Ребята знают Геткурс как свои пять пальцев.", stars: 5, initials: "МИ" },
      { name: "Татьяна Орлова", role: "Методолог, курс по маркетингу", text: "Настроили интеграцию Геткурса с Telegram-ботом. Ученики проходят уроки прямо в Телеграм, вовлечённость выросла в 2 раза. Очень довольна результатом!", stars: 5, initials: "ТО" },
      { name: "Виктор Лебедев", role: "Коуч, «LevelUp Academy»", text: "Email-маркетинг настроили под ключ: цепочки прогрева, автосегментация, триггерные письма. LTV вырос на 45%. Теперь старые ученики покупают новые курсы сами.", stars: 5, initials: "ВЛ" },
    ],
  },
];

function Reviews() {
  const [activeTab, setActiveTab] = useState("bitrix");
  const [activeIdx, setActiveIdx] = useState(0);
  const tab = REVIEWS_TABS.find((t) => t.id === activeTab)!;
  const { ref, inView } = useInView();

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setActiveIdx(0);
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute -left-32 top-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "hsl(258,90%,66%)" }} />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label mb-3 block">Отзывы</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Что говорят клиенты</h2>
          <p className="font-ibm text-white/50 text-lg max-w-xl">Реальные отзывы от реальных людей</p>
        </div>

        <div className="flex gap-3 mb-10 flex-wrap">
          {REVIEWS_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTabChange(t.id)}
              className={`font-ibm text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all duration-200 ${
                activeTab === t.id
                  ? "bg-purple-400/20 border-purple-400/50 text-purple-200"
                  : "bg-white/4 border-white/8 text-white/50 hover:text-white/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tab.reviews.map((r, i) => (
            <div
              key={r.name}
              className={`card-glass rounded-2xl p-7 border border-white/5 group transition-all duration-500 hover:border-purple-400/20 hover:-translate-y-1 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, si) => (
                  <Icon key={si} name="Star" size={16} className="text-orange-400 fill-orange-400" />
                ))}
              </div>
              <p className="font-ibm text-white/65 text-sm leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/40 to-orange-500/40 flex items-center justify-center flex-shrink-0">
                  <span className="font-golos font-bold text-white text-xs">{r.initials}</span>
                </div>
                <div>
                  <div className="font-golos font-semibold text-white text-sm">{r.name}</div>
                  <div className="font-ibm text-white/35 text-xs">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ──────────────────────────────────────────────────────────────

const COURSES = [
  {
    level: "Базовый",
    title: "Битрикс24 для сотрудников",
    duration: "4 часа",
    format: "Онлайн",
    topics: ["Задачи и проекты", "CRM основы", "Коммуникации", "Документы"],
    price: "от 5 000 ₽",
    accent: "cyan",
    featured: false,
  },
  {
    level: "Продвинутый",
    title: "CRM и автоматизация",
    duration: "8 часов",
    format: "Онлайн",
    topics: ["Воронки продаж", "Бизнес-процессы", "Интеграции", "Аналитика"],
    price: "от 12 000 ₽",
    accent: "lime",
    featured: true,
  },
  {
    level: "Корпоративный",
    title: "Полное внедрение команды",
    duration: "Под ключ",
    format: "Онлайн",
    topics: ["Индивидуальная программа", "База знаний", "Видеоинструкции", "Поддержка 3 мес."],
    price: "По запросу",
    accent: "purple",
    featured: false,
  },
];

function Education() {
  const { ref, inView } = useInView();
  return (
    <section id="education" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute -right-64 top-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
        style={{ background: "hsl(28,100%,58%)" }} />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label mb-3 block">Обучение</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Программы обучения</h2>
          <p className="font-ibm text-white/50 text-lg max-w-xl">
            Обучаем сотрудников эффективно работать в CRM — от основ до экспертного уровня
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {COURSES.map((c, i) => (
            <div
              key={c.title}
              className={`rounded-2xl p-7 border transition-all duration-500 hover:-translate-y-2 relative ${
                c.featured
                  ? "border-orange-400/40 bg-gradient-to-b from-orange-400/8 to-transparent shadow-[0_0_40px_rgba(255,140,0,0.08)]"
                  : "card-glass border-white/5 hover:border-white/15"
              } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {c.featured && (
                <div className="absolute -top-3 left-6 bg-orange-400 text-[hsl(220,20%,6%)] font-golos font-bold text-xs px-3 py-1 rounded-full">
                  Популярный
                </div>
              )}
              <div className="mb-6">
                <span className={`font-ibm text-xs font-semibold uppercase tracking-wider ${
                  c.accent === "cyan" ? "text-purple-400" :
                  c.accent === "lime" ? "text-orange-400" : "text-purple-400"
                }`}>{c.level}</span>
                <h3 className="font-golos font-bold text-white text-xl mt-1 mb-3">{c.title}</h3>
                <div className="flex gap-3 text-sm text-white/40 font-ibm">
                  <span className="flex items-center gap-1.5">
                    <Icon name="Clock" size={14} className="text-white/30" /> {c.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="Monitor" size={14} className="text-white/30" /> {c.format}
                  </span>
                </div>
              </div>
              <ul className="space-y-2 mb-8">
                {c.topics.map((t) => (
                  <li key={t} className="flex items-center gap-2.5 font-ibm text-sm text-white/60">
                    <Icon name="CheckCircle" size={14} className={
                      c.accent === "cyan" ? "text-purple-400" :
                      c.accent === "lime" ? "text-orange-400" : "text-purple-400"
                    } />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <div className={`font-golos font-bold text-xl ${
                  c.accent === "cyan" ? "text-purple-400" :
                  c.accent === "lime" ? "text-orange-400" : "text-purple-400"
                }`}>{c.price}</div>
                <a href="#contacts" className={`px-4 py-2 rounded-xl text-sm font-golos font-semibold transition-all hover:-translate-y-0.5 ${
                  c.featured ? "btn-primary" : "btn-outline"
                }`}>
                  Записаться
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BLOG ────────────────────────────────────────────────────────────────────

const BLOG_POSTS = [
  { category: "Битрикс24", title: "Топ-5 настроек CRM для роста продаж в 2026", excerpt: "Разбираем ключевые инструменты Битрикс24, которые позволяют увеличить конверсию воронки и сократить цикл сделки.", date: "20 января 2026", readTime: "5 мин", url: "https://habr.com/ru/articles/716482/", color: "purple" },
  { category: "Интеграции", title: "Как подключить 1С к Битрикс24: пошаговый гайд", excerpt: "Полная инструкция по синхронизации номенклатуры, заказов и клиентской базы между системами.", date: "14 февраля 2026", readTime: "8 мин", url: "https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=43", color: "orange" },
  { category: "Автоматизация", title: "Бизнес-процессы в Битрикс24: с чего начать", excerpt: "Простые и эффективные бизнес-процессы, которые избавят команду от рутины и ошибок уже в первую неделю.", date: "5 марта 2026", readTime: "6 мин", url: "https://helpdesk.bitrix24.ru/open/14736534/", color: "purple" },
  { category: "U-ON", title: "Как автоматизировать турагентство за 3 дня", excerpt: "Пошаговый план внедрения U-ON: от регистрации до первой автоматической сделки с клиентом.", date: "1 февраля 2026", readTime: "7 мин", url: "https://u-on.ru/blog/", color: "orange" },
  { category: "Геткурс", title: "Запуск онлайн-школы: 10 ошибок начинающих", excerpt: "Разбираем самые частые ошибки при запуске школы на Геткурсе и как их избежать без потери денег.", date: "10 марта 2026", readTime: "9 мин", url: "https://getcourse.ru/blog", color: "purple" },
  { category: "CRM", title: "Почему менеджеры не работают в CRM — и как это исправить", excerpt: "Разбираемся с главной проблемой внедрения CRM: саботаж сотрудников и способы его преодолеть.", date: "25 февраля 2026", readTime: "6 мин", url: "https://vc.ru/marketing/crm", color: "orange" },
];

function Blog() {
  const { ref, inView } = useInView();
  return (
    <section id="blog" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-end justify-between mb-16 flex-wrap gap-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <span className="section-label mb-3 block">Блог</span>
            <h2 className="font-golos text-4xl md:text-5xl font-black text-white">Полезные статьи</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-glass rounded-2xl overflow-hidden border border-white/5 group cursor-pointer block transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(139,92,246,0.12)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`h-1.5 transition-all duration-300 group-hover:h-2 ${
                post.color === "purple" ? "bg-gradient-to-r from-purple-400 to-orange-400" : "bg-gradient-to-r from-orange-400 to-purple-400"
              }`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-ibm text-xs text-purple-400 font-medium uppercase tracking-wider">{post.category}</span>
                  <Icon name="ExternalLink" size={14} className="text-white/20 group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="font-golos font-bold text-white text-lg mt-1 mb-3 group-hover:text-purple-300 transition-colors leading-snug">{post.title}</h3>
                <p className="font-ibm text-white/40 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between text-white/30 font-ibm text-xs">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1.5"><Icon name="Clock" size={12} /> {post.readTime}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  const values = [
    { icon: "Zap", label: "Быстро", desc: "Берёмся за задачу сразу, без бюрократии" },
    { icon: "Shield", label: "Надёжно", desc: "Фиксируем договорённости и держим слово" },
    { icon: "Target", label: "На результат", desc: "Измеряем успех вашими показателями" },
    { icon: "Users", label: "Командно", desc: "Вы не одни — мы рядом на каждом шаге" },
  ];
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute -left-64 top-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
        style={{ background: "hsl(258,90%,66%)" }} />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          <span className="section-label mb-3 block">О компании</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-6">
            Кто такие<br /><span className="gradient-text-purple">IT25?</span>
          </h2>
          <p className="font-ibm text-white/60 text-lg leading-relaxed mb-6">
            Мы — команда экспертов по автоматизации бизнеса. Уже 5 лет помогаем компаниям
            настраивать Битрикс24, U-ON и Геткурс так, чтобы они работали на вас, а не вы на них.
          </p>
          <p className="font-ibm text-white/40 leading-relaxed">
            Наши клиенты — малый и средний бизнес: агентства, производственные компании,
            медицина, онлайн-школы, ритейл. Мы говорим на языке бизнеса, а не IT.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-10">
            {values.map((v, i) => (
              <div
                key={v.label}
                className={`flex gap-3 items-start transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                <div className="w-9 h-9 rounded-lg bg-purple-400/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={v.icon} fallback="Star" size={16} className="text-purple-400" />
                </div>
                <div>
                  <div className="font-golos font-semibold text-white text-sm">{v.label}</div>
                  <div className="font-ibm text-white/40 text-xs leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`relative transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <div className="rounded-2xl overflow-hidden border border-white/8 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
            <img src={TEAM_IMAGE} alt="Команда IT25" className="w-full h-[440px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,6%,0.4)] to-transparent rounded-2xl" />
          </div>
          <div className="absolute -bottom-6 -right-6 card-glass rounded-2xl p-5 border border-white/10 animate-float">
            <div className="font-golos font-black text-3xl text-purple-400 mb-0.5">150+</div>
            <div className="font-ibm text-white/50 text-sm">успешных проектов</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACTS ────────────────────────────────────────────────────────────────

function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const { ref, inView } = useInView();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacts" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className={`mb-12 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label mb-3 block">Контакты</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Обсудим ваш проект</h2>
          <p className="font-ibm text-white/50 text-lg max-w-xl mx-auto">
            Оставьте заявку и мы свяжемся в течение часа
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="card-glass rounded-2xl p-8 border border-white/8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-400/15 flex items-center justify-center mb-4">
                  <Icon name="CheckCircle" size={32} className="text-purple-400" />
                </div>
                <h3 className="font-golos font-bold text-white text-2xl mb-2">Отправлено!</h3>
                <p className="font-ibm text-white/50">Свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-ibm text-sm text-white/60 block mb-2">Имя</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-white placeholder-white/20 focus:outline-none focus:border-purple-400/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-ibm text-sm text-white/60 block mb-2">Телефон</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-white placeholder-white/20 focus:outline-none focus:border-purple-400/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-ibm text-sm text-white/60 block mb-2">Описание задачи</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Расскажите о вашем проекте..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-white placeholder-white/20 focus:outline-none focus:border-purple-400/60 transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-3.5 rounded-xl text-base">
                  Отправить заявку
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-5">
            {[
              { icon: "Mail", label: "Email", value: "info@it25.ru", sub: "Ответим в течение часа", href: "mailto:info@it25.ru" },
              { icon: "Send", label: "Telegram", value: "@denisbrsv", sub: "Быстрая связь 24/7", href: "https://t.me/denisbrsv" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glass rounded-2xl p-5 border border-white/5 flex items-center gap-4 hover:border-purple-400/30 hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-400/15 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-400/25 transition-colors">
                  <Icon name={c.icon} fallback="Mail" size={20} className="text-purple-400" />
                </div>
                <div>
                  <div className="font-ibm text-white/40 text-xs mb-0.5">{c.label}</div>
                  <div className="font-golos font-semibold text-white group-hover:text-purple-300 transition-colors">{c.value}</div>
                  <div className="font-ibm text-white/30 text-xs">{c.sub}</div>
                </div>
              </a>
            ))}

            <div className="card-glass rounded-2xl p-6 border border-white/5 mt-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-orange-400/15 flex items-center justify-center">
                  <Icon name="Globe" size={16} className="text-orange-400" />
                </div>
                <div className="font-golos font-semibold text-white">Работаем по всей России</div>
              </div>
              <p className="font-ibm text-white/40 text-sm leading-relaxed">
                Все услуги оказываем онлайн — настройка, внедрение, обучение и поддержка без ограничений по географии.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/8 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center">
          <img
            src="https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/bucket/39cf89f9-e068-4ca7-81a6-b30477dfd19e.png"
            alt="IT25"
            className="h-7 w-auto opacity-70"
          />
        </div>

        <div className="flex gap-8 flex-wrap justify-center">
          {[
            { label: "Услуги", href: "#services" },
            { label: "Кейсы", href: "#cases" },
            { label: "Портфолио", href: "#portfolio" },
            { label: "Отзывы", href: "#reviews" },
            { label: "Обучение", href: "#education" },
            { label: "Контакты", href: "#contacts" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="font-ibm text-sm text-white/30 hover:text-white/70 transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="font-ibm text-white/20 text-sm">© 2026 IT25</div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} />
      <Nav onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <Services />
      <Calculator />
      <Cases />
      <Portfolio />
      <Reviews />
      <Education />
      <Blog />
      <About />
      <Contacts />
      <Footer />
    </div>
  );
}