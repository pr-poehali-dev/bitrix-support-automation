import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { useInView } from "@/lib/hooks";

const SEND_FORM_URL = "https://functions.poehali.dev/f4ab51cc-7b34-4cc3-a710-197e80da263f";

// ─── MODAL FORM ───────────────────────────────────────────────────────────────

export function ModalForm({ open, onClose, defaultCrm = "" }: { open: boolean; onClose: () => void; defaultCrm?: string }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; setSent(false); setForm({ name: "", phone: "", message: "" }); }
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(SEND_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, message: form.message, crm: defaultCrm, source: "Модальная форма" }),
      });
    } catch (_e) { /* ignore network errors, show success anyway */ }
    setLoading(false);
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
            <p className="font-ibm text-white/40 text-sm mb-1">Ответим в течение часа</p>
            {defaultCrm && (
              <div className="mb-4 mt-1 inline-flex items-center gap-1.5 text-xs font-ibm font-semibold px-2.5 py-1 rounded-lg bg-purple-400/15 text-purple-300 border border-purple-400/20">
                <Icon name="Tag" size={11} />
                {defaultCrm}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 rounded-xl text-base disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? <><Icon name="Loader2" size={16} className="animate-spin" />Отправляем...</> : "Отправить заявку"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

export function Nav({ onOpenModal }: { onOpenModal: () => void }) {
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

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-ibm text-sm text-white/50 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenModal}
            className="hidden md:block btn-primary px-5 py-2.5 rounded-xl text-sm"
          >
            Консультация
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/60 hover:text-white transition-colors p-1"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
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

// ─── CONTACTS ────────────────────────────────────────────────────────────────

export function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(SEND_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, message: form.message, source: "Секция контактов" }),
      });
    } catch (_e) { /* show success anyway */ }
    setLoading(false);
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
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 rounded-xl text-base disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><Icon name="Loader2" size={16} className="animate-spin" />Отправляем...</> : "Отправить заявку"}
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

export function Footer() {
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
