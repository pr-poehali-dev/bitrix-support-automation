import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useInView } from "@/lib/hooks";

const CASE_IMAGES = {
  bi: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/5dcc5614-3db3-407c-8bd0-5b0a50d2dbba.jpg",
  bp: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/c8c72feb-8339-4607-b4be-eed24f0a0cd7.jpg",
  sales: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/a55a8041-e043-49f8-831d-6d36b8aabff7.jpg",
  integration: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/e7a26874-b9ed-49a9-bfc0-4a2aafc554ba.jpg",
  estate: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/65c55bed-804f-4d1a-9db3-7d966c0ead47.jpg",
  clinic: "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/e47d7c7a-b466-46b7-88db-efd54f0b6ea2.jpg",
};

export const CASES = [
  {
    id: "bi-wholesale",
    category: "BI-аналитика",
    tag: "Оптовая торговля",
    title: "BI-дашборд сократил время на отчётность с 3 дней до 20 минут",
    image: CASE_IMAGES.bi,
    accent: "purple",
    client: "ООО «ОптТрейд», 120 сотрудников",
    problem: "Коммерческий директор тратил 3 рабочих дня в месяц на сведение отчётов из Excel-файлов менеджеров. Данные устаревали, решения принимались с опозданием. Непонятно было кто из 15 менеджеров работает эффективно.",
    solution: "Внедрили Битрикс24 с настройкой CRM и встроенной BI-аналитикой. Настроили автоматические дашборды: воронка продаж, план-факт по каждому менеджеру, динамика выручки, ABC-анализ клиентов. Всё обновляется в реальном времени.",
    results: [
      { metric: "20 мин", label: "вместо 3 дней на отчёт" },
      { metric: "+27%", label: "рост выручки за квартал" },
      { metric: "×3", label: "скорость принятия решений" },
      { metric: "15", label: "менеджеров под контролем" },
    ],
    quote: "Раньше я видел картину прошлого месяца только через неделю после его окончания. Теперь открываю дашборд утром и сразу знаю, где горим и кому надо помочь.",
    quoteAuthor: "Алексей М., коммерческий директор",
  },
  {
    id: "bp-construction",
    category: "Бизнес-процессы",
    tag: "Строительство",
    title: "Строительная компания избавилась от 70% ручной работы за 6 недель",
    image: CASE_IMAGES.bp,
    accent: "orange",
    client: "СК «СтройМастер», 85 сотрудников",
    problem: "Отдел продаж из 12 человек тратил 40% времени на ручное создание КП, договоров и счётов. Согласование документов шло через мессенджеры — терялось, затягивалось. Клиенты ждали КП по 3–5 дней.",
    solution: "Настроили Битрикс24: шаблоны документов с автозаполнением, роботы для генерации КП в один клик, маршруты согласования внутри CRM. Добавили интеграцию с 1С для автовыставления счётов.",
    results: [
      { metric: "−70%", label: "ручных операций в продажах" },
      { metric: "4 часа", label: "среднее время подготовки КП (было 3 дня)" },
      { metric: "+38%", label: "пропускная способность отдела" },
      { metric: "6 нед.", label: "срок внедрения под ключ" },
    ],
    quote: "Менеджеры наконец занимаются продажами, а не бумажной работой. КП теперь уходит клиенту за 4 часа — раньше это было невозможно.",
    quoteAuthor: "Ирина К., РОП СК «СтройМастер»",
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

export type CaseItem = typeof CASES[number];

// ─── CASE CARD ───────────────────────────────────────────────────────────────

function CaseCard({ c }: { c: CaseItem }) {
  return (
    <Link
      to={`/cases/${c.id}`}
      className="card-glass rounded-2xl overflow-hidden border border-white/5 group cursor-pointer hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_8px_60px_rgba(139,92,246,0.18)] transition-all duration-400 block"
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
    </Link>
  );
}

// ─── CASES ───────────────────────────────────────────────────────────────────

export function Cases() {
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
              <CaseCard c={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO ───────────────────────────────────────────────────────────────

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
  {
    id: "bothelp",
    label: "БотХелп",
    cases: [
      { tag: "Telegram-бот", title: "Бот для салона красоты", desc: "Запись на услуги, напоминания перед визитом и повторные записи — всё через Telegram без звонков и администратора.", result: "Запись ×3", icon: "Scissors", color: "purple" },
      { tag: "ВКонтакте", title: "Бот в ВКонтакте для интернет-магазина", desc: "Автоматические ответы на вопросы покупателей, каталог товаров и оформление заказа прямо в переписке.", result: "Конверсия +40%", icon: "ShoppingBag", color: "orange" },
      { tag: "Воронка", title: "Прогревающая воронка", desc: "Цепочка сообщений для онлайн-школы: знакомство с продуктом, контент, прогрев и продажа курса через бота.", result: "Продажи ×2.5", icon: "Flame", color: "purple" },
      { tag: "Интеграция", title: "Бот + CRM + оплата", desc: "Полная связка: бот собирает заявки, передаёт в Битрикс24, выставляет счёт и принимает оплату без участия менеджера.", result: "Рутина −80%", icon: "Zap", color: "orange" },
      { tag: "Рассылки", title: "Сегментированные рассылки", desc: "Настройка умных рассылок по сегментам аудитории: реактивация «спящих» клиентов и апселл активным.", result: "Открываемость 60%", icon: "Send", color: "purple" },
      { tag: "Аналитика", title: "Дашборд по боту", desc: "Подключение аналитики: конверсии по шагам воронки, точки отвала и A/B-тест сообщений для роста продаж.", result: "Решения быстрее ×4", icon: "BarChart2", color: "orange" },
    ],
  },
];

export function Portfolio() {
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
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${
                p.color === "purple" ? "bg-gradient-to-r from-purple-400/0 via-purple-400/60 to-purple-400/0" : "bg-gradient-to-r from-orange-400/0 via-orange-400/60 to-orange-400/0"
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${
                p.color === "purple" ? "bg-purple-400/15" : "bg-orange-400/15"
              }`}>
                <Icon name={p.icon} fallback="Star" size={20} className={p.color === "purple" ? "text-purple-400" : "text-orange-400"} />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`font-ibm text-xs font-semibold px-2.5 py-1 rounded-lg ${
                  p.color === "purple" ? "bg-purple-400/15 text-purple-300" : "bg-orange-400/15 text-orange-300"
                }`}>{p.tag}</span>
              </div>

              <h3 className="font-golos font-bold text-white text-lg mb-2 group-hover:text-purple-300 transition-colors">{p.title}</h3>
              <p className="font-ibm text-white/40 text-sm leading-relaxed mb-5">{p.desc}</p>

              <div className={`flex items-center gap-2 font-golos font-bold text-sm ${
                p.color === "purple" ? "text-purple-300" : "text-orange-300"
              }`}>
                <Icon name="TrendingUp" size={14} />
                {p.result}
              </div>
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
  {
    id: "bothelp",
    label: "БотХелп",
    reviews: [
      { name: "Ирина Захарова", role: "Владелец, студия красоты «Bloom»", text: "Сделали бота для записи в салон. Теперь клиенты записываются сами в любое время, приходят напоминания. Администратор занимается работой, а не телефоном. Записей стало в 3 раза больше!", stars: 5, initials: "ИЗ" },
      { name: "Павел Громов", role: "Директор, интернет-магазин «ТехноДом»", text: "Запустили бота в ВКонтакте для продаж. Теперь бот отвечает на вопросы, показывает каталог и принимает заказы. Конверсия выросла на 40%, менеджеры занимаются только сложными клиентами.", stars: 5, initials: "ПГ" },
      { name: "Алина Романова", role: "Продюсер онлайн-курсов, «SmartLearn»", text: "Выстроили прогревающую воронку в Telegram через БотХелп. Холодная аудитория плавно прогревается и покупает курс без звонков. Продажи выросли в 2.5 раза за первый месяц!", stars: 5, initials: "АР" },
      { name: "Константин Миронов", role: "Собственник, юридическая фирма «ЛексПро»", text: "Связали бота с CRM и онлайн-оплатой. Клиент оставляет заявку боту, оплачивает консультацию — и всё автоматически падает в Битрикс24. Экономим 80% времени на операционке.", stars: 5, initials: "КМ" },
    ],
  },
];

export function Reviews() {
  const [activeTab, setActiveTab] = useState("bitrix");
  const [activeIdx, setActiveIdx] = useState(0);
  const tab = REVIEWS_TABS.find((t) => t.id === activeTab)!;
  const { ref, inView } = useInView();

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setActiveIdx(0);
  };

  void activeIdx;

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
