import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/eedaac6e-b123-41e6-872c-52beb0e61ee3.jpg";
const TEAM_IMAGE = "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/1ba8b785-57a1-4ef2-a1f1-a6c46b1d80f5.jpg";

// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Услуги", href: "#services" },
    { label: "Портфолио", href: "#portfolio" },
    { label: "Обучение", href: "#education" },
    { label: "Блог", href: "#blog" },
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
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
            <span className="text-[hsl(220,20%,6%)] font-golos font-black text-sm leading-none">IT</span>
          </div>
          <span className="font-golos font-bold text-xl text-white">25</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-ibm text-white/60 hover:text-cyan-400 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contacts" className="hidden md:block btn-primary px-5 py-2 rounded-xl text-sm">
          Получить консультацию
        </a>

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
              className="text-white/70 hover:text-cyan-400 transition-colors py-1 font-ibm"
            >
              {l.label}
            </a>
          ))}
          <a href="#contacts" className="btn-primary px-5 py-2.5 rounded-xl text-sm text-center mt-2">
            Получить консультацию
          </a>
        </div>
      )}
    </header>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "hsl(174,100%,50%)" }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{ background: "hsl(258,90%,66%)" }} />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="animate-slide-up">
          <span className="section-label mb-4 block">Битрикс24 & U-ON</span>

          <h1 className="font-golos text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6">
            Автоматизация<br />
            <span className="gradient-text">бизнеса</span><br />
            под ключ
          </h1>

          <p className="font-ibm text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
            Техническая поддержка Битрикс24 и U-ON, настройка бизнес-процессов,
            интеграции сервисов и обучение сотрудников. Работаем быстро и на результат.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#contacts" className="btn-primary px-7 py-3.5 rounded-xl text-base">
              Получить консультацию
            </a>
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
                <div className="font-golos font-black text-3xl text-cyan-400">{s.num}</div>
                <div className="font-ibm text-white/40 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-in-scale delay-300 hidden lg:block">
          <div className="relative rounded-2xl overflow-hidden glow-cyan">
            <img
              src={HERO_IMAGE}
              alt="IT25 Dashboard"
              className="w-full h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,6%,0.6)] to-transparent" />
          </div>

          <div className="absolute -bottom-5 -left-5 card-glass rounded-2xl px-5 py-3 border border-white/10 animate-float">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lime-400/20 flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-lime-400" />
              </div>
              <div>
                <div className="font-golos font-bold text-white text-sm">Автоматизация</div>
                <div className="font-ibm text-white/50 text-xs">Настройка за 3 дня</div>
              </div>
            </div>
          </div>

          <div className="absolute -top-5 -right-5 card-glass rounded-2xl px-4 py-3 border border-white/10 animate-float" style={{ animationDelay: "2s" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
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

const SERVICES = [
  {
    icon: "Headphones",
    color: "cyan",
    title: "Техническая поддержка",
    desc: "Оперативное решение технических проблем Битрикс24 и U-ON. SLA до 4 часов, поддержка 24/7.",
    tags: ["Битрикс24", "U-ON", "24/7"],
  },
  {
    icon: "GitBranch",
    color: "lime",
    title: "Бизнес-процессы",
    desc: "Автоматизация рутинных задач, настройка воронок продаж, CRM-стратегии для роста бизнеса.",
    tags: ["CRM", "Воронки", "Автоматизация"],
  },
  {
    icon: "Plug",
    color: "purple",
    title: "Интеграции сервисов",
    desc: "Подключение 1С, телефонии, мессенджеров, email-маркетинга и сотен других сервисов.",
    tags: ["1С", "Телефония", "API"],
  },
  {
    icon: "Wrench",
    color: "cyan",
    title: "Техническое обслуживание",
    desc: "Регулярное обновление, мониторинг, резервное копирование и оптимизация производительности.",
    tags: ["Обновления", "Мониторинг", "Бэкапы"],
  },
  {
    icon: "GraduationCap",
    color: "lime",
    title: "Обучение персонала",
    desc: "Индивидуальные и групповые тренинги по Битрикс24. Видеоинструкции и базы знаний.",
    tags: ["Тренинги", "Видео", "База знаний"],
  },
  {
    icon: "Settings",
    color: "purple",
    title: "Внедрение с нуля",
    desc: "Полное внедрение CRM: от аудита до запуска и обучения команды. Под ключ.",
    tags: ["Аудит", "Внедрение", "Запуск"],
  },
];

function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-label mb-3 block">Что мы делаем</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Услуги IT25</h2>
          <p className="font-ibm text-white/50 text-lg max-w-xl">
            Полный цикл работы с Битрикс24 и U-ON — от внедрения до постоянной поддержки
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="card-glass rounded-2xl p-6 card-hover border border-white/5 group">
              <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center ${
                s.color === "cyan" ? "bg-cyan-400/15" :
                s.color === "lime" ? "bg-emerald-400/15" : "bg-purple-400/15"
              }`}>
                <Icon name={s.icon} fallback="Star" size={22} className={
                  s.color === "cyan" ? "text-cyan-400" :
                  s.color === "lime" ? "text-emerald-400" : "text-purple-400"
                } />
              </div>
              <h3 className="font-golos font-bold text-white text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                {s.title}
              </h3>
              <p className="font-ibm text-white/50 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="font-ibm text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">{t}</span>
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

const CALC_ITEMS = [
  { id: "support", label: "Техподдержка", desc: "До 10 обращений/мес", price: 9900 },
  { id: "bp", label: "Бизнес-процессы", desc: "Настройка воронок и авто", price: 14900 },
  { id: "integration", label: "Интеграция", desc: "Подключение 1 сервиса", price: 19900 },
  { id: "maintenance", label: "Тех. обслуживание", desc: "Ежемесячный пакет", price: 7900 },
  { id: "training", label: "Обучение", desc: "Группа до 5 человек", price: 12000 },
  { id: "implementation", label: "Внедрение с нуля", desc: "Полный цикл", price: 49900 },
];

const MULTIPLIERS = [
  { id: "s", label: "До 5 чел.", mult: 1 },
  { id: "m", label: "5–20 чел.", mult: 1.4 },
  { id: "l", label: "20+ чел.", mult: 2 },
];

function Calculator() {
  const [selected, setSelected] = useState<string[]>([]);
  const [size, setSize] = useState("s");

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const baseTotal = CALC_ITEMS.filter((i) => selected.includes(i.id)).reduce((sum, i) => sum + i.price, 0);
  const mult = MULTIPLIERS.find((m) => m.id === size)?.mult ?? 1;
  const total = Math.round(baseTotal * mult);

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(ellipse 800px 400px at 50% 50%, hsl(174,100%,50%,0.06), transparent)" }} />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="mb-12 text-center">
          <span className="section-label mb-3 block">Калькулятор</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">
            Рассчитайте стоимость
          </h2>
          <p className="font-ibm text-white/50 text-lg">
            Выберите нужные услуги — мы подберём оптимальный пакет
          </p>
        </div>

        <div className="card-glass rounded-3xl p-8 border border-white/8">
          <div className="mb-8">
            <div className="font-golos font-semibold text-white mb-4">Размер компании</div>
            <div className="flex gap-3 flex-wrap">
              {MULTIPLIERS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSize(m.id)}
                  className={`px-5 py-2.5 rounded-xl font-ibm text-sm font-medium transition-all duration-200 ${
                    size === m.id
                      ? "bg-cyan-400 text-[hsl(220,20%,6%)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/8"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {CALC_ITEMS.map((item) => {
              const active = selected.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                    active
                      ? "border-cyan-400/60 bg-cyan-400/8 shadow-[0_0_20px_rgba(0,255,213,0.08)]"
                      : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-golos font-semibold text-white text-sm leading-tight">{item.label}</div>
                    <div className={`w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all ${
                      active ? "bg-cyan-400 border-cyan-400" : "border-white/20"
                    }`}>
                      {active && <Icon name="Check" size={12} className="text-[hsl(220,20%,6%)]" />}
                    </div>
                  </div>
                  <div className="font-ibm text-white/40 text-xs mb-3">{item.desc}</div>
                  <div className="font-golos font-bold text-cyan-400">от {item.price.toLocaleString("ru")} ₽</div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/8">
            <div>
              {selected.length === 0 ? (
                <div className="font-ibm text-white/40">Выберите услуги для расчёта</div>
              ) : (
                <>
                  <div className="font-ibm text-white/50 text-sm mb-1">
                    Итого за {selected.length} услугу(и) · коэф. ×{mult}
                  </div>
                  <div className="font-golos font-black text-4xl gradient-text">
                    {total.toLocaleString("ru")} ₽
                    <span className="text-xl text-white/40 font-normal">/мес</span>
                  </div>
                </>
              )}
            </div>
            <a href="#contacts" className="btn-primary px-8 py-3.5 rounded-xl whitespace-nowrap">
              Обсудить проект
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO ──────────────────────────────────────────────────────────────

const PORTFOLIO = [
  {
    tag: "Интеграция",
    title: "CRM + Телефония",
    desc: "Интеграция Битрикс24 с IP-телефонией и автоматическая фиксация всех звонков в CRM для торговой компании.",
    result: "Конверсия +35%",
    color: "cyan",
  },
  {
    tag: "Автоматизация",
    title: "Воронка продаж",
    desc: "Автоматизация полного цикла сделки для агентства недвижимости: от заявки до подписания договора.",
    result: "Скорость сделки ×2",
    color: "lime",
  },
  {
    tag: "Обучение",
    title: "Команда 40 человек",
    desc: "Корпоративное обучение сотрудников производственной компании работе с U-ON и Битрикс24.",
    result: "Внедрено за 2 недели",
    color: "purple",
  },
  {
    tag: "Внедрение",
    title: "CRM с нуля",
    desc: "Полное внедрение Битрикс24 для медицинской клиники: расписание, пациенты, напоминания.",
    result: "ROI за 3 месяца",
    color: "cyan",
  },
];

function Portfolio() {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-label mb-3 block">Наши работы</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Портфолио</h2>
          <p className="font-ibm text-white/50 text-lg max-w-xl">Реальные результаты для реальных бизнесов</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PORTFOLIO.map((p) => (
            <div key={p.title} className="card-glass rounded-2xl p-7 card-hover border border-white/5 group relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${
                p.color === "cyan" ? "bg-gradient-to-r from-cyan-400 to-transparent" :
                p.color === "lime" ? "bg-gradient-to-r from-emerald-400 to-transparent" :
                "bg-gradient-to-r from-purple-400 to-transparent"
              }`} />
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className={`font-ibm text-xs font-medium px-3 py-1 rounded-full ${
                  p.color === "cyan" ? "bg-cyan-400/15 text-cyan-400" :
                  p.color === "lime" ? "bg-emerald-400/15 text-emerald-400" :
                  "bg-purple-400/15 text-purple-400"
                }`}>{p.tag}</span>
                <span className="font-golos font-bold text-sm text-white/30 group-hover:text-white/60 transition-colors">{p.result}</span>
              </div>
              <h3 className="font-golos font-bold text-white text-2xl mb-3 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
              <p className="font-ibm text-white/50 text-sm leading-relaxed">{p.desc}</p>
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
    format: "Онлайн / Офис",
    topics: ["Задачи и проекты", "CRM основы", "Коммуникации", "Документы"],
    price: "от 5 000 ₽",
    accent: "cyan",
    featured: false,
  },
  {
    level: "Продвинутый",
    title: "CRM и автоматизация",
    duration: "8 часов",
    format: "Онлайн / Офис",
    topics: ["Воронки продаж", "Бизнес-процессы", "Интеграции", "Аналитика"],
    price: "от 12 000 ₽",
    accent: "lime",
    featured: true,
  },
  {
    level: "Корпоративный",
    title: "Полное внедрение команды",
    duration: "Под ключ",
    format: "На вашей площадке",
    topics: ["Индивидуальная программа", "База знаний", "Видеоинструкции", "Поддержка 3 мес."],
    price: "По запросу",
    accent: "purple",
    featured: false,
  },
];

function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute -right-64 top-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
        style={{ background: "hsl(142,100%,50%)" }} />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mb-16">
          <span className="section-label mb-3 block">Обучение</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Программы обучения</h2>
          <p className="font-ibm text-white/50 text-lg max-w-xl">
            Обучаем сотрудников эффективно работать в CRM — от основ до экспертного уровня
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {COURSES.map((c) => (
            <div key={c.title} className={`rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-2 relative ${
              c.featured
                ? "border-emerald-400/40 bg-gradient-to-b from-emerald-400/8 to-transparent shadow-[0_0_40px_rgba(0,255,100,0.08)]"
                : "card-glass border-white/5"
            }`}>
              {c.featured && (
                <div className="absolute -top-3 left-6 bg-emerald-400 text-[hsl(220,20%,6%)] font-golos font-bold text-xs px-3 py-1 rounded-full">
                  Популярный
                </div>
              )}
              <div className="mb-6">
                <span className={`font-ibm text-xs font-semibold uppercase tracking-wider ${
                  c.accent === "cyan" ? "text-cyan-400" :
                  c.accent === "lime" ? "text-emerald-400" : "text-purple-400"
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
                      c.accent === "cyan" ? "text-cyan-400" :
                      c.accent === "lime" ? "text-emerald-400" : "text-purple-400"
                    } />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <div className={`font-golos font-bold text-xl ${
                  c.accent === "cyan" ? "text-cyan-400" :
                  c.accent === "lime" ? "text-emerald-400" : "text-purple-400"
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
  {
    category: "Битрикс24",
    title: "Топ-5 настроек CRM для роста продаж в 2024",
    excerpt: "Разбираем ключевые инструменты Битрикс24, которые позволяют увеличить конверсию воронки.",
    date: "15 ноября 2024",
    readTime: "5 мин",
    i: 0,
  },
  {
    category: "Интеграции",
    title: "Как подключить 1С к Битрикс24: пошаговый гайд",
    excerpt: "Полная инструкция по синхронизации номенклатуры, заказов и клиентской базы между системами.",
    date: "8 ноября 2024",
    readTime: "8 мин",
    i: 1,
  },
  {
    category: "Автоматизация",
    title: "Бизнес-процессы в Битрикс24: с чего начать",
    excerpt: "Простые и эффективные бизнес-процессы, которые избавят команду от рутины и ошибок.",
    date: "1 ноября 2024",
    readTime: "6 мин",
    i: 2,
  },
];

function Blog() {
  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <span className="section-label mb-3 block">Блог</span>
            <h2 className="font-golos text-4xl md:text-5xl font-black text-white">Полезные статьи</h2>
          </div>
          <a href="#" className="btn-outline px-5 py-2.5 rounded-xl text-sm">Все статьи →</a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.title} className="card-glass rounded-2xl overflow-hidden card-hover border border-white/5 group cursor-pointer">
              <div className={`h-2 ${
                post.i === 0 ? "bg-gradient-to-r from-cyan-400 to-emerald-400" :
                post.i === 1 ? "bg-gradient-to-r from-emerald-400 to-cyan-400" :
                "bg-gradient-to-r from-purple-400 to-cyan-400"
              }`} />
              <div className="p-6">
                <span className="font-ibm text-xs text-cyan-400 font-medium uppercase tracking-wider">{post.category}</span>
                <h3 className="font-golos font-bold text-white text-lg mt-2 mb-3 group-hover:text-cyan-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="font-ibm text-white/40 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between text-white/30 font-ibm text-xs">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="Clock" size={12} /> {post.readTime}
                  </span>
                </div>
              </div>
            </article>
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

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute -left-64 top-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
        style={{ background: "hsl(258,90%,66%)" }} />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="section-label mb-3 block">О компании</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-6">
            Кто такие<br /><span className="gradient-text-purple">IT25?</span>
          </h2>
          <p className="font-ibm text-white/60 text-lg leading-relaxed mb-6">
            Мы — команда экспертов по автоматизации бизнеса. Уже 5 лет помогаем компаниям
            настраивать Битрикс24 и U-ON так, чтобы они работали на вас, а не вы на них.
          </p>
          <p className="font-ibm text-white/40 leading-relaxed">
            Наши клиенты — малый и средний бизнес: агентства, производственные компании,
            медицина, ритейл. Мы говорим на языке бизнеса, а не IT.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-10">
            {values.map((v) => (
              <div key={v.label} className="flex gap-3 items-start">
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

        <div className="relative">
          <div className="rounded-2xl overflow-hidden border border-white/8">
            <img src={TEAM_IMAGE} alt="Команда IT25" className="w-full h-[440px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,6%,0.5)] to-transparent rounded-2xl" />
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacts" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="mb-12 text-center">
          <span className="section-label mb-3 block">Контакты</span>
          <h2 className="font-golos text-4xl md:text-5xl font-black text-white mb-4">Обсудим ваш проект</h2>
          <p className="font-ibm text-white/50 text-lg max-w-xl mx-auto">
            Оставьте заявку и мы свяжемся в течение часа
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-glass rounded-2xl p-8 border border-white/8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-400/15 flex items-center justify-center mb-4">
                  <Icon name="CheckCircle" size={32} className="text-cyan-400" />
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/60 transition-colors"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-ibm text-sm text-white/60 block mb-2">Описание задачи</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Расскажите о вашем проекте..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
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
              { icon: "Phone", label: "Телефон", value: "+7 (XXX) XXX-XX-XX", sub: "Пн–Пт, 9:00–18:00" },
              { icon: "Mail", label: "Email", value: "info@it25.ru", sub: "Ответим в течение часа" },
              { icon: "MessageCircle", label: "Telegram", value: "@it25_support", sub: "Быстрая связь 24/7" },
            ].map((c) => (
              <div key={c.label} className="card-glass rounded-2xl p-5 border border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/15 flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon} fallback="Phone" size={20} className="text-cyan-400" />
                </div>
                <div>
                  <div className="font-ibm text-white/40 text-xs mb-0.5">{c.label}</div>
                  <div className="font-golos font-semibold text-white">{c.value}</div>
                  <div className="font-ibm text-white/30 text-xs">{c.sub}</div>
                </div>
              </div>
            ))}

            <div className="card-glass rounded-2xl p-6 border border-white/5 mt-2">
              <div className="font-golos font-semibold text-white mb-2">Работаем по всей России</div>
              <p className="font-ibm text-white/40 text-sm leading-relaxed">
                Онлайн-поддержка и настройка систем без выезда.
                При необходимости — выезд к клиенту в вашем городе.
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
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
            <span className="text-[hsl(220,20%,6%)] font-golos font-bold text-xs">IT</span>
          </div>
          <span className="font-golos font-bold text-white text-lg">25</span>
          <span className="font-ibm text-white/30 text-sm ml-2">— Автоматизация бизнеса</span>
        </div>

        <div className="flex gap-8 flex-wrap justify-center">
          {[
            { label: "Услуги", href: "#services" },
            { label: "Портфолио", href: "#portfolio" },
            { label: "Обучение", href: "#education" },
            { label: "Блог", href: "#blog" },
            { label: "Контакты", href: "#contacts" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="font-ibm text-sm text-white/30 hover:text-white/70 transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="font-ibm text-white/20 text-sm">© 2024 IT25</div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Services />
      <Calculator />
      <Portfolio />
      <Education />
      <Blog />
      <About />
      <Contacts />
      <Footer />
    </div>
  );
}
