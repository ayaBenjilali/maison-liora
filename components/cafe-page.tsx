"use client";

import { FormEvent, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Coffee,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const stats = [
  ["20+", "cafés de spécialité"],
  ["4.9/5", "sur plus de 700 avis"],
  ["2018", "ouvert depuis"],
  ["100%", "grains sélectionnés"],
];

const coffees = [
  {
    name: "Flat White",
    price: "42 DH",
    origin: "Bresil · Colombie",
    image:
      "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=900&q=88",
    text: "Double espresso velouté, lait micro-moussé, notes de noisette et caramel brun.",
  },
  {
    name: "Cappuccino",
    price: "38 DH",
    origin: "Ethiopie · Maroc",
    image:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=88",
    text: "Mousse aérienne, espresso intense, cacao brut et finale longue en bouche.",
  },
  {
    name: "Espresso",
    price: "28 DH",
    origin: "Single origin",
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=900&q=88",
    text: "Extraction courte, crema dense, chocolat noir, datte et agrumes confits.",
  },
  {
    name: "Cold Brew",
    price: "46 DH",
    origin: "Infusion 18h",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=88",
    text: "Infusion lente, douceur naturelle, texture nette et fraîcheur très élégante.",
  },
  {
    name: "Mocha",
    price: "44 DH",
    origin: "Chocolat 64%",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=88",
    text: "Espresso, chocolat maison, lait soyeux et pointe de fleur de sel de l'Atlantique.",
  },
  {
    name: "Matcha Latte",
    price: "48 DH",
    origin: "Matcha ceremonial",
    image:
      "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=900&q=88",
    text: "Matcha fouetté à la main, lait au choix, texture douce, végétale et lumineuse.",
  },
];

const brunch = [
  ["Avocado Toast", "Pain au levain, avocat citronné, oeuf parfait, graines torréfiées", "76 DH"],
  ["Croissant Beurre", "Feuilletage pur beurre, confiture maison ou miel d'oranger", "24 DH"],
  ["Pancakes", "Crème légère, fruits rouges, sirop d'érable et noisettes", "68 DH"],
  ["Granola", "Yaourt grec, granola maison, fruits de saison et amlou", "54 DH"],
  ["Cheesecake", "Base sablée, vanille, coulis de fraise fraîche", "49 DH"],
  ["Cookies", "Chocolat noir, noix de pécan, coeur fondant", "29 DH"],
];

const gallery = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1100&q=88",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1100&q=88",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1100&q=88",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1100&q=88",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=88",
];

const reviews = [
  ["Nora El Mansouri", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=88", "Le flat white est exceptionnel. On sent un niveau de détail rare à Casablanca."],
  ["Yassine Bennani", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=88", "J'y travaille deux matinées par semaine. Calme, confortable et service discret."],
  ["Camille Laurent", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=88", "Adresse parfaite après une balade dans Gauthier. Belle lumière et patisseries fraîches."],
  ["Mehdi Ait Omar", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=88", "Brunch familial fluide, généreux, avec une vraie attention aux enfants."],
  ["Salma Rachidi", "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=88", "Le cold brew et le cheesecake valent le détour. Le lieu donne envie de ralentir."],
  ["Thomas Moreau", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=88", "Design superbe, café précis, accueil chaleureux. Je le recommande aux clients étrangers."],
];

function SectionIntro({ eyebrow, title, text, tone = "light" }: { eyebrow: string; title: string; text?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65 }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className={dark ? "text-xs font-black uppercase tracking-[0.24em] text-crema" : "text-xs font-black uppercase tracking-[0.24em] text-espresso"}>{eyebrow}</p>
      <h2 className={dark ? "mt-4 font-serif text-4xl font-bold leading-[1.02] text-foam sm:text-5xl lg:text-6xl" : "mt-4 font-serif text-4xl font-bold leading-[1.02] text-charcoal sm:text-5xl lg:text-6xl"}>{title}</h2>
      {text ? <p className={dark ? "mt-5 text-base leading-8 text-crema sm:text-lg" : "mt-5 text-base leading-8 text-coffee sm:text-lg"}>{text}</p> : null}
    </motion.div>
  );
}

export function CafePage() {
  const [sent, setSent] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isDateFocused, setIsDateFocused] = useState(false);
  const [isTimeFocused, setIsTimeFocused] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 760], [0, 120]);
  const headerBg = useTransform(scrollY, [0, 360], ["rgba(255, 248, 237, 1)", "rgba(255, 248, 237, 0.58)"]);
  const headerShadow = useTransform(scrollY, [0, 360], ["0 14px 36px rgba(26,18,13,0.16)", "0 10px 26px rgba(26,18,13,0.08)"]);
  const headerBorder = useTransform(scrollY, [0, 360], ["rgba(215,185,149,1)", "rgba(215,185,149,0.24)"]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 4200);
  }

  return (
    <main className="overflow-hidden bg-cream font-sans text-espresso">
      <motion.header style={{ backgroundColor: headerBg, boxShadow: headerShadow, borderColor: headerBorder }} className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl">
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Navigation principale">
          <a href="#accueil" className="group leading-none" aria-label="Maison Liora - accueil">
            <span className="block font-serif text-[1.7rem] font-semibold tracking-[0.02em] text-[#1a120d] sm:text-[2rem]">Maison Liora</span>
            <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.28em] text-[#68442f] sm:block">Café de spécialité</span>
          </a>

          <div className="hidden items-center gap-9 text-[13px] font-black uppercase tracking-[0.16em] text-[#1a120d] lg:flex">
            {[
              ["Histoire", "#histoire"],
              ["Carte", "#carte"],
              ["Brunch", "#brunch"],
              ["Avis", "#avis"],
              ["Accès", "#contact"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="relative py-2 transition hover:text-[#1a120d] after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[#5b3a29] after:transition after:duration-300 hover:after:scale-x-100">{label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+212522481976" className="hidden text-[13px] font-black text-[#1a120d] transition hover:text-[#1a120d] sm:inline-flex">+212 522 48 19 76</a>
            <a href="#reservation" className="inline-flex items-center justify-center rounded-full bg-[#3f281d] px-5 py-2.5 text-sm font-semibold text-[#fff8ed] shadow-[0_12px_30px_rgba(63,40,29,0.18)] transition hover:bg-[#1a120d]">Réserver</a>
            <a href="#reservation" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#3f281d]/45 bg-[#efe0ce] text-[#1a120d] lg:hidden" aria-label="Aller à la réservation"><Menu className="h-5 w-5" /></a>
          </div>
        </nav>
        
      </motion.header>

      <section id="accueil" className="relative min-h-screen bg-charcoal pt-20 text-foam">
        <motion.div style={{ y: heroY }} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=2400&q=88')] bg-cover bg-center opacity-75" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0.35),rgba(17,16,14,0.7)_48%,rgba(17,16,14,0.94)),linear-gradient(90deg,rgba(17,16,14,0.94),rgba(31,23,18,0.62),rgba(31,23,18,0.25))]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-end px-4 pb-8 sm:px-6 sm:pb-14 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={stagger} className="grid w-full gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl">
              <motion.p variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-crema/50 bg-charcoal/70 px-4 py-2 text-sm font-semibold text-crema backdrop-blur-md"><Coffee className="h-4 w-4" /> Café de spécialité à Casablanca</motion.p>
              <motion.h1 variants={fadeUp} className="mt-6 max-w-5xl font-serif text-5xl font-bold leading-[0.94] text-foam sm:text-7xl lg:text-8xl">Le café qui transforme chaque pause en moment d'exception.</motion.h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-crema sm:text-xl">Maison Liora marie grains rares, brunch maison et hospitalité chaleureuse dans un décor minimaliste inspiré de Paris, Milan et Casablanca.</motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#carte" className="inline-flex items-center justify-center gap-2 rounded-full bg-foam px-6 py-3 font-bold text-espresso shadow-glow transition hover:bg-crema">Voir notre carte <ArrowRight className="h-4 w-4" /></a>
                <a href="#reservation" className="inline-flex items-center justify-center rounded-full border border-crema/60 bg-charcoal/35 px-6 py-3 font-bold text-foam backdrop-blur transition hover:bg-espresso">Réserver une table</a>
              </motion.div>
            </div>
            <motion.aside variants={fadeUp} className="border border-crema/35 bg-foam p-5 text-espresso shadow-glow sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-coffee">Sélection du matin</p>
              <p className="mt-3 font-serif text-3xl font-semibold leading-tight">Flat white, pancakes, place au soleil.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-semibold text-coffee">
                <span className="border-t border-coffee/20 pt-3">08h00 service</span>
                <span className="border-t border-coffee/20 pt-3">18h cold brew</span>
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-cream px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(([number, label]) => (
            <motion.div key={label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="border border-coffee/25 bg-foam p-5 shadow-card">
              <p className="font-serif text-4xl font-semibold text-espresso">{number}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-coffee">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="histoire" className="bg-[linear-gradient(90deg,#efe0ce_0%,#f8f0e5_58%,#dcc2a3_100%)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative min-h-[460px] overflow-hidden shadow-glow">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=88" alt="Barista Maison Liora preparant un cafe" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-5 left-5 right-5 bg-foam p-5 text-espresso shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-coffee">Torréfaction partenaire</p>
              <p className="mt-2 font-serif text-2xl font-semibold">Petits lots, profils ajustés chaque semaine.</p>
            </div>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.24em] text-coffee">Notre histoire</motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 font-serif text-4xl font-bold leading-[1.03] text-charcoal sm:text-6xl">Un café pensé comme une maison ouverte.</motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-lg font-medium leading-8 text-coffee">Depuis 2018, Maison Liora travaille avec des torréfacteurs indépendants et des producteurs sélectionnés au Maroc, en Ethiopie, en Colombie et au Bresil. Chaque origine est choisie pour sa traçabilité, son équilibre et la manière dont elle raconte une terre.</motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-lg font-medium leading-8 text-coffee">Nos baristas calibrent les moulins chaque matin, goûtent les extractions et ajustent les recettes selon l'humidité, la fraîcheur du grain et le moment de la journée. Le résultat : une tasse précise, mais jamais froide.</motion.p>
            <motion.div variants={fadeUp} className="mt-8 grid gap-3 sm:grid-cols-3">
              {['Origines traçables', 'Lait texture minute', 'Pâtisserie maison'].map((item) => <span key={item} className="border border-coffee/25 bg-foam px-4 py-3 text-sm font-bold text-espresso">{item}</span>)}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="carte" className="bg-foam px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Nos spécialités" title="Une carte courte, exigeante et mémorable." text="Des classiques impeccables, des recettes signature et une attention constante à la texture." />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coffees.map((item, index) => (
              <motion.article key={item.name} variants={fadeUp} whileHover={{ y: -8 }} className={index === 0 ? "group overflow-hidden border border-coffee/25 bg-cream shadow-glow sm:col-span-2 lg:col-span-1" : "group overflow-hidden border border-coffee/25 bg-cream shadow-card"}>
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 bg-foam px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-coffee shadow-card">{item.origin}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-3xl font-bold text-charcoal">{item.name}</h3>
                    <span className="rounded-full bg-espresso px-3 py-1 text-sm font-bold text-foam">{item.price}</span>
                  </div>
                  <p className="mt-4 font-medium leading-7 text-coffee">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="brunch" className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-coffee">Brunch</p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-[1.03] text-charcoal sm:text-6xl">Des assiettes solaires pour prendre le temps.</h2>
            <p className="mt-6 text-lg font-medium leading-8 text-coffee">Chaque brunch est préparé à la commande avec pain au levain, fruits de saison, oeufs fermiers et pâtisseries sorties du four.</p>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-3">
            {brunch.map(([name, text, price]) => (
              <motion.div key={name} variants={fadeUp} className="grid grid-cols-[1fr_auto] gap-5 border border-coffee/22 bg-foam p-4 shadow-card">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal">{name}</h3>
                  <p className="mt-1 font-medium leading-6 text-coffee">{text}</p>
                </div>
                <span className="font-bold text-coffee">{price}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-espresso px-4 py-16 text-foam sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionIntro tone="dark" eyebrow="Galerie" title="Lumière douce, bois naturel, gestes precis." text="Un lieu pensé pour un espresso rapide, une matinée de travail ou un brunch en famille." />
          <div className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((image, index) => (
              <motion.div key={image} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className={(index === 0 || index === 4 ? "lg:col-span-2 " : "") + "group relative overflow-hidden bg-charcoal"}>
                <img src={image} alt={"Ambiance Maison Liora " + (index + 1)} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute inset-0 border border-crema/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="avis" className="bg-[linear-gradient(180deg,#f8f0e5,#ead8c0)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Avis clients" title="Ils viennent pour le café, ils reviennent pour le rituel." />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map(([name, avatar, text]) => (
              <motion.article key={name} variants={fadeUp} className="border border-coffee/22 bg-foam p-6 shadow-card">
                <div className="flex gap-1 text-wood">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-5 font-medium leading-7 text-coffee">"{text}"</p>
                <div className="mt-6 flex items-center gap-3"><img src={avatar} alt={name} className="h-11 w-11 rounded-full object-cover" /><p className="font-bold text-espresso">{name}</p></div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="reservation" className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-coffee">Réservation</p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-[1.03] text-charcoal sm:text-6xl">Votre table vous attend.</h2>
            <p className="mt-6 text-lg font-medium leading-8 text-coffee">Réservez pour un brunch, un rendez-vous client ou une pause au calme. Notre équipe confirme chaque demande rapidement.</p>
          </div>
          <form onSubmit={handleSubmit} className="border border-coffee/25 bg-foam p-5 shadow-glow sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Nom" aria-label="Nom" className="border border-coffee/35 bg-cream px-4 py-3 h-[50px] font-semibold text-espresso outline-none transition placeholder:text-coffee focus:border-espresso" />
              <input required placeholder="Téléphone" aria-label="Téléphone" className="border border-coffee/35 bg-cream px-4 py-3 h-[50px] font-semibold text-espresso outline-none transition placeholder:text-coffee focus:border-espresso" />
              
              <div className="relative w-full">
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onFocus={() => setIsDateFocused(true)}
                  onBlur={() => setIsDateFocused(false)}
                  className={`border border-coffee/35 bg-cream px-4 py-3 font-semibold text-espresso outline-none transition focus:border-espresso w-full h-[50px] custom-datetime-input ${
                    date || isDateFocused ? "has-value" : ""
                  }`}
                  style={{ colorScheme: "light" }}
                />
                {!date && !isDateFocused && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-coffee font-semibold">
                    Date de réservation
                  </span>
                )}
                <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-coffee pointer-events-none" />
              </div>

              <div className="relative w-full">
                <input
                  required
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  onFocus={() => setIsTimeFocused(true)}
                  onBlur={() => setIsTimeFocused(false)}
                  className={`border border-coffee/35 bg-cream px-4 py-3 font-semibold text-espresso outline-none transition focus:border-espresso w-full h-[50px] custom-datetime-input ${
                    time || isTimeFocused ? "has-value" : ""
                  }`}
                  style={{ colorScheme: "light" }}
                />
                {!time && !isTimeFocused && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-coffee font-semibold">
                    Heure de réservation
                  </span>
                )}
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-coffee pointer-events-none" />
              </div>

              <select required aria-label="Nombre de personnes" className="border border-coffee/35 bg-cream px-4 py-3 h-[50px] font-semibold text-espresso outline-none transition focus:border-espresso reservation-field"><option>2 personnes</option><option>3 personnes</option><option>4 personnes</option><option>5 personnes</option><option>6 personnes ou plus</option></select>
              <input placeholder="Message" aria-label="Message" className="border border-coffee/35 bg-cream px-4 py-3 h-[50px] font-semibold text-espresso outline-none transition placeholder:text-coffee focus:border-espresso" />
            </div>
            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3 font-bold text-foam transition hover:bg-coffee" type="submit">Confirmer la réservation <CalendarDays className="h-4 w-4" /></button>
            <motion.p animate={sent ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} className="mt-4 flex items-center gap-2 text-sm font-bold text-coffee"><Check className="h-4 w-4" /> Demande envoyée. Maison Liora vous recontacte très vite.</motion.p>
          </form>
        </div>
      </section>

      <section id="contact" className="bg-foam px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.82fr]">
          <div className="min-h-[360px] overflow-hidden border border-coffee/25 bg-crema shadow-card">
            <iframe title="Carte de Maison Liora à Casablanca" src="https://www.google.com/maps?q=33.5928,-7.6192&z=15&output=embed" className="h-full min-h-[360px] w-full border-0" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center bg-espresso p-7 text-foam shadow-glow sm:p-10">
            <p className="font-serif text-4xl font-bold text-foam">Maison Liora</p>
            <div className="mt-7 space-y-4 text-crema">
              <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-crema" /> 18 Rue Jalal Eddine Sayouti, Quartier Gauthier, Casablanca 20250</p>
              <p className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-crema" /> Lundi - vendredi : 08h00 - 20h00 · Week-end : 09h00 - 22h00</p>
              <p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-crema" /> +212 522 48 19 76</p>
              <p className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-crema" /> bonjour@maisonliora.ma</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1a120d] px-5 py-8 text-[#fff8ed] sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 border-b border-[#e8d8c4]/18 pb-6 lg:grid-cols-[1.05fr_0.95fr_0.8fr] lg:items-start">
            <div>
              <p className="font-serif text-3xl font-semibold leading-none text-[#fff8ed] sm:text-4xl">Maison Liora</p>
              <p className="mt-3 max-w-md text-sm font-medium leading-6 text-[#e8d8c4]">Café de spécialité, brunch maison et atmosphère chaleureuse au coeur de Casablanca.</p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm text-[#e8d8c4] sm:grid-cols-3 lg:grid-cols-2">
              <a href="#histoire" className="transition hover:text-[#fff8ed]">Histoire</a>
              <a href="#carte" className="transition hover:text-[#fff8ed]">Carte</a>
              <a href="#brunch" className="transition hover:text-[#fff8ed]">Brunch</a>
              <a href="#avis" className="transition hover:text-[#fff8ed]">Avis</a>
              <a href="#reservation" className="transition hover:text-[#fff8ed]">Réservation</a>
              <a href="#contact" className="transition hover:text-[#fff8ed]">Accès</a>
            </div>

            <div className="text-sm leading-7 text-[#e8d8c4] lg:text-right">
              <p>18 Rue Jalal Eddine Sayouti</p>
              <p>Quartier Gauthier, Casablanca</p>
              <p className="mt-3">08h00 - 20h00 · Lun - Ven</p>
              <p>09h00 - 22h00 · Week-end</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-5 text-sm font-medium text-[#e8d8c4] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Maison Liora. Tous droits réservés.</p>
            <div className="flex items-center gap-5">
              <a href="mailto:bonjour@maisonliora.ma" className="transition hover:text-[#fff8ed]">bonjour@maisonliora.ma</a>
              <a href="https://instagram.com" aria-label="Instagram" className="transition hover:text-[#fff8ed]"><Instagram className="h-5 w-5" /></a>
              <a href="https://facebook.com" aria-label="Facebook" className="transition hover:text-[#fff8ed]"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
