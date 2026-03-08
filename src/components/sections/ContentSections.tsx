import Icon from "@/components/ui/icon";
import { useInView } from "@/lib/hooks";

const TEAM_IMAGE = "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/files/fdf59d59-b44c-486d-997f-58c055a12062.jpg";

// ─── EDUCATION ───────────────────────────────────────────────────────────────

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

export function Education() {
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
  { category: "БотХелп", title: "Telegram-бот для бизнеса: с чего начать в 2026", excerpt: "Разбираем, каким бизнесам боты приносят деньги, а каким — нет, и как выстроить первую воронку за 3 дня.", date: "28 февраля 2026", readTime: "7 мин", url: "https://bothelp.io/blog", color: "green" },
  { category: "CRM", title: "Почему менеджеры не работают в CRM — и как это исправить", excerpt: "Разбираемся с главной проблемой внедрения CRM: саботаж сотрудников и способы его преодолеть.", date: "25 февраля 2026", readTime: "6 мин", url: "https://vc.ru/marketing/crm", color: "orange" },
];

export function Blog() {
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
                post.color === "purple" ? "bg-gradient-to-r from-purple-400 to-orange-400" :
                post.color === "green" ? "bg-gradient-to-r from-green-400 to-teal-400" :
                "bg-gradient-to-r from-orange-400 to-purple-400"
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

export function About() {
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
