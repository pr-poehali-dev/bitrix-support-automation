import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useInView, useCounter } from "@/lib/hooks";

const SEND_FORM_URL = "https://functions.poehali.dev/f4ab51cc-7b34-4cc3-a710-197e80da263f";

export const HERO_IMAGE = "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/86f33631-5ee0-4e05-b138-1cfce32a1f7b.jpg";

// ─── ANIMATED STAT ───────────────────────────────────────────────────────────

function AnimatedStat({ num, label, active }: { num: string; label: string; active: boolean }) {
  const isPercent = num.includes("%");
  const isYears = num.includes("лет");
  const rawNum = parseInt(num.replace(/\D/g, ""), 10);
  const count = useCounter(rawNum, 1800, active);
  let display = "";
  if (isPercent) display = `${count}%`;
  else if (isYears) display = `${count} лет`;
  else display = `${count}+`;
  return (
    <div>
      <div className="font-golos font-black text-3xl gradient-text">{active ? display : num}</div>
      <div className="font-ibm text-white/40 text-sm mt-0.5">{label}</div>
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

export function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const { ref, inView } = useInView(0.2);
  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden grid-bg">
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
              { label: "БотХелп", color: "bg-green-500/20 text-green-300 border-green-500/30" },
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
            Техническая поддержка и внедрение Битрикс24, U-ON, Геткурс и БотХелп.
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
              <AnimatedStat key={s.label} num={s.num} label={s.label} active={inView} />
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

// ─── SERVICES ────────────────────────────────────────────────────────────────

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
  {
    id: "bothelp",
    label: "БотХелп",
    color: "green",
    accent: "text-emerald-300",
    activeBg: "bg-emerald-500/20 border-emerald-500/40 text-emerald-200",
    inactiveBg: "bg-white/4 border-white/8 text-white/50 hover:text-white/80",
    desc: "Разработка и интеграция чат-ботов для Telegram, ВКонтакте и других платформ — автоматизируем продажи и поддержку через мессенджеры",
    services: [
      { icon: "Bot", title: "Боты в Telegram", desc: "Разработка ботов любой сложности: продажи, поддержка, квизы, запись.", tags: ["Telegram", "API"] },
      { icon: "MessageSquare", title: "Боты в ВКонтакте", desc: "Чат-боты для сообществ ВК: автоответы, воронки, рассылки.", tags: ["ВКонтакте"] },
      { icon: "Plug", title: "Интеграции по API", desc: "Подключение ботов к CRM, платёжным системам, Google Sheets и любым сервисам.", tags: ["CRM", "Оплата"] },
      { icon: "GitBranch", title: "Воронки в мессенджерах", desc: "Автоматические продающие цепочки: прогрев, квалификация, дожим.", tags: ["Воронки"] },
      { icon: "Bell", title: "Рассылки и уведомления", desc: "Массовые и триггерные рассылки клиентам через Telegram и ВКонтакте.", tags: ["Рассылки"] },
      { icon: "BarChart2", title: "Аналитика ботов", desc: "Настройка статистики: конверсии, воронки, поведение пользователей.", tags: ["Аналитика"] },
    ],
  },
];

export function Services({ onOpenModal }: { onOpenModal: (crm?: string) => void }) {
  const [activeTab, setActiveTab] = useState("bitrix");
  const tab = CRM_TABS.find((t) => t.id === activeTab)!;
  const { ref, inView } = useInView();

  const iconBg = (color: string) =>
    color === "blue" ? "bg-blue-500/15" : color === "purple" ? "bg-purple-500/15" : color === "green" ? "bg-emerald-500/15" : "bg-orange-500/15";
  const tagCls = (color: string) =>
    color === "blue" ? "bg-blue-500/10 text-blue-400" : color === "purple" ? "bg-purple-500/10 text-purple-400" : color === "green" ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400";

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
              className={`card-glass rounded-2xl p-6 border border-white/5 group hover:border-white/15 hover:-translate-y-1 transition-all duration-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`w-11 h-11 rounded-xl ${iconBg(tab.color)} flex items-center justify-center mb-4`}>
                <Icon name={s.icon} fallback="Star" size={20} className={tab.accent} />
              </div>
              <h3 className="font-golos font-bold text-white text-lg mb-2">{s.title}</h3>
              <p className="font-ibm text-white/45 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {s.tags.map((tag) => (
                  <span key={tag} className={`font-ibm text-xs px-2.5 py-1 rounded-lg font-medium ${tagCls(tab.color)}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-10 flex justify-center transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <button
            onClick={() => onOpenModal(tab.label)}
            className="btn-primary px-8 py-3.5 rounded-xl text-base"
          >
            Обсудить {tab.label}
          </button>
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
  {
    group: "БотХелп",
    icon: "Bot",
    color: "green",
    items: [
      { id: "bh_tg", label: "Бот в Telegram", desc: "Разработка бота под задачу", base: 24900, unit: "" },
      { id: "bh_vk", label: "Бот ВКонтакте", desc: "Чат-бот для сообщества", base: 19900, unit: "" },
      { id: "bh_api", label: "Интеграция по API", desc: "CRM, оплата, сервисы", base: 14900, unit: "" },
      { id: "bh_funnel", label: "Воронка в мессенджере", desc: "Автопродажи и прогрев", base: 17900, unit: "" },
      { id: "bh_send", label: "Рассылки", desc: "Массовые и триггерные", base: 9900, unit: "/мес" },
    ],
  },
];

const SIZES = [
  { label: "До 5 чел.", mult: 1.0 },
  { label: "5–20 чел.", mult: 1.4 },
  { label: "20–50 чел.", mult: 1.8 },
  { label: "50+ чел.", mult: 2.5 },
];

export function Calculator() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [calcSent, setCalcSent] = useState(false);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcForm, setCalcForm] = useState({ name: "", phone: "" });
  const { ref, inView } = useInView();

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const selectedItems = CALC_GROUPS.flatMap((g) => g.items).filter((s) => selected.includes(s.id));
  const total = selectedItems.reduce((acc, s) => acc + Math.round(s.base * SIZES[sizeIdx].mult), 0);

  const colorCls = (color: string, type: "header" | "check" | "on" | "off" | "tag") => {
    const map: Record<string, Record<string, string>> = {
      blue:   { header: "bg-blue-500/10", check: "bg-blue-400 border-blue-400", on: "bg-blue-500/10 border-blue-400/30", off: "border-white/20", tag: "text-blue-300" },
      purple: { header: "bg-purple-500/10", check: "bg-purple-400 border-purple-400", on: "bg-purple-500/10 border-purple-400/30", off: "border-white/20", tag: "text-purple-300" },
      orange: { header: "bg-orange-500/10", check: "bg-orange-400 border-orange-400", on: "bg-orange-500/10 border-orange-400/30", off: "border-white/20", tag: "text-orange-300" },
      green:  { header: "bg-emerald-500/10", check: "bg-emerald-400 border-emerald-400", on: "bg-emerald-500/10 border-emerald-400/30", off: "border-white/20", tag: "text-emerald-300" },
    };
    return map[color]?.[type] ?? "";
  };
  const iconCls = (color: string) =>
    color === "blue" ? "text-blue-400" : color === "purple" ? "text-purple-400" : color === "green" ? "text-emerald-400" : "text-orange-400";
  const labelCls = (color: string) =>
    color === "blue" ? "text-blue-300" : color === "purple" ? "text-purple-300" : color === "green" ? "text-emerald-300" : "text-orange-300";

  const handleCalcSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalcLoading(true);
    const servicesList = selectedItems.map((s) => `${s.label}: ${Math.round(s.base * SIZES[sizeIdx].mult).toLocaleString("ru")} ₽${s.unit}`).join(", ");
    try {
      await fetch(SEND_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: calcForm.name, phone: calcForm.phone, message: `Калькулятор. Итого: ${total.toLocaleString("ru")} ₽. Услуги: ${servicesList}`, source: "Калькулятор" }),
      });
    } catch (_e) { /* show success anyway */ }
    setCalcLoading(false);
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

          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {CALC_GROUPS.map((group) => (
              <div key={group.group} className="card-glass rounded-2xl border border-white/5 overflow-hidden">
                <div className={`px-5 py-3 border-b border-white/5 flex items-center gap-2 ${colorCls(group.color, "header")}`}>
                  <Icon name={group.icon} fallback="Star" size={16} className={iconCls(group.color)} />
                  <span className={`font-golos font-bold text-sm ${labelCls(group.color)}`}>{group.group}</span>
                </div>
                <div className="p-4 space-y-2">
                  {group.items.map((s) => {
                    const isOn = selected.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => toggle(s.id)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                          isOn ? colorCls(group.color, "on") : "bg-white/3 border-white/5 hover:border-white/12"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                          isOn ? colorCls(group.color, "check") : colorCls(group.color, "off")
                        }`}>
                          {isOn && <Icon name="Check" size={10} className="text-[hsl(220,20%,6%)]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-ibm text-sm ${isOn ? "text-white" : "text-white/60"}`}>{s.label}</div>
                          <div className="font-ibm text-xs text-white/30 mt-0.5">{s.desc}</div>
                        </div>
                        <div className={`font-golos font-semibold text-xs whitespace-nowrap ${isOn ? labelCls(group.color) : "text-white/25"}`}>
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
                        <button type="submit" disabled={calcLoading} className="btn-primary w-full py-2.5 rounded-xl text-sm disabled:opacity-60 flex items-center justify-center gap-2">
                          {calcLoading ? <><Icon name="Loader2" size={14} className="animate-spin" />Отправляем...</> : "Получить расчёт"}
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
