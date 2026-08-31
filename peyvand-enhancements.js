(() => {
  const translations = {
    de: [
      "Direkter Kontakt",
      "Persönliche Beratung direkt aus Deutschland.",
      "Nach dem Absenden wird Ihre Anfrage direkt an unser Team weitergeleitet. Ihre Angaben werden persönlich vor Ort in Deutschland geprüft und sorgfältig eingeordnet. Anschließend erhalten Sie eine direkte und ehrliche Beratung zu passenden nächsten Schritten – individuell und nicht nach einem Standardschema.",
      "Wir geben keine Visa- oder Erfolgsgarantie. Sie erhalten eine realistische Einschätzung und klare Orientierung.",
      "Ihr Ansprechpartner",
      "Ansprechpartner und E-Mail können im Adminbereich ergänzt werden."
    ],
    en: [
      "Direct contact",
      "Personal consultation directly from Germany.",
      "After submitting the form, your request is forwarded directly to our team. Your information is personally reviewed and carefully assessed on site in Germany. You will then receive direct and honest advice on suitable next steps – individually and not according to a standard formula.",
      "We do not guarantee a visa or a successful outcome. You will receive a realistic assessment and clear guidance.",
      "Your contact person",
      "The contact person and email address can be added in the admin area."
    ],
    fa: [
      "تماس مستقیم",
      "مشاوره شخصی به‌صورت مستقیم از آلمان.",
      "پس از ارسال فورم، درخواست شما مستقیماً به تیم ما فرستاده می‌شود. معلومات شما به‌صورت شخصی در آلمان بررسی و با دقت ارزیابی می‌گردد. سپس درباره گام‌های مناسب بعدی، مشاوره مستقیم و صادقانه دریافت می‌کنید – به‌صورت فردی و نه بر اساس یک روش عمومی.",
      "ما ویزا یا موفقیت را تضمین نمی‌کنیم. شما یک ارزیابی واقع‌بینانه و راهنمایی روشن دریافت می‌کنید.",
      "مسئول تماس شما",
      "نام مسئول تماس و ایمیل را می‌توان در بخش مدیریت اضافه کرد."
    ],
    ps: [
      "مستقیمه اړیکه",
      "له آلمان څخه مستقیمه شخصي مشوره.",
      "د فورم له لېږلو وروسته، ستاسو غوښتنه مستقیم زموږ ټیم ته استول کېږي. ستاسو معلومات په آلمان کې په شخصي ډول او په پوره دقت ارزول کېږي. وروسته به د مناسبو راتلونکو ګامونو په اړه مستقیمه او رښتینې مشوره ترلاسه کړئ – ستاسو د شخصي حالت له مخې، نه د یوې عمومي طریقې پر بنسټ.",
      "موږ د ویزې یا بریا تضمین نه ورکوو. تاسو به واقعي ارزونه او روښانه لارښوونه ترلاسه کړئ.",
      "ستاسو د اړیکې مسئول",
      "د اړیکې مسئول نوم او برېښنالیک د مدیریت په برخه کې زیاتېدای شي."
    ]
  };

  function language() {
    const value = document.querySelector('[data-slot="select-value"]')?.textContent?.trim();
    return value === "English" ? "en" : value === "دری" ? "fa" : value === "پښتو" ? "ps" : "de";
  }

  function setText(element, value) {
    if (element && element.textContent !== value) element.textContent = value;
  }

  function applyTranslations() {
    const section = document.querySelector("#kontakt");
    if (!section) return;
    const text = translations[language()];
    const main = section.querySelector(":scope > div > div");
    const aside = section.querySelector("aside");
    setText(main?.children?.[0], text[0]);
    setText(main?.children?.[1], text[1]);
    setText(main?.children?.[2], text[2]);
    setText(main?.children?.[3], text[3]);
    setText(aside?.children?.[0], text[4]);
    const paragraphs = aside?.querySelectorAll("p");
    if (paragraphs?.length > 1) setText(paragraphs[paragraphs.length - 1], text[5]);
  }


  const SUPABASE_URL = "https://lakcmrzaqjrypztlkegx.supabase.co";
  const SUPABASE_KEY = "sb_publishable_3KkoA-9hVthbUzatMeGjZA_el0N5LK9";
  let settingsCache;

  async function getSettings() {
    if (settingsCache) return settingsCache;
    try {
      const response = await fetch(SUPABASE_URL + "/rest/v1/site_settings?id=eq.true&select=*", {
        headers: { apikey: SUPABASE_KEY }
      });
      settingsCache = response.ok ? (await response.json())[0] || {} : {};
    } catch {
      settingsCache = {};
    }
    return settingsCache;
  }

  function socialIcon(name) {
    const key = name.toLowerCase();
    if (key.includes("instagram") || key === "ig") {
      return '<svg class="social-icon social-icon-instagram" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>';
    }
    if (key.includes("tiktok") || key === "tk") {
      return '<svg class="social-icon social-icon-tiktok" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3v11.2a4.8 4.8 0 1 1-4-4.74"></path><path d="M15 3c.45 2.4 1.85 4.1 4.5 4.7"></path></svg>';
    }
    return '<svg class="social-icon social-icon-facebook" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z"></path></svg>';
  }

  function socialButton(name, url, classes) {
    const element = document.createElement(url ? "a" : "span");
    if (url) {
      element.href = url;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
      element.setAttribute("aria-label", name + " öffnen");
    }
    element.innerHTML = socialIcon(name) + '<span class="peyvand-social-label">' + name + '</span>';
    element.className = "pointer-events-auto grid min-h-11 min-w-24 place-items-center rounded-2xl border border-white/25 px-3 py-2 text-[10px] font-black tracking-wider text-white shadow-lg transition duration-200 " + classes;
    return element;
  }

  function injectSocialStyles() {
    if (document.querySelector("#peyvand-social-styles")) return;
    const style = document.createElement("style");
    style.id = "peyvand-social-styles";
    style.textContent = `
      #peyvand-social-desktop {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-right: 2px;
      }
      #peyvand-social-desktop a,
      #peyvand-social-desktop span {
        position: static !important;
        transform: none !important;
        animation: none !important;
        width: 36px;
        min-width: 36px !important;
        height: 36px;
        padding: 0 !important;
        border: 1px solid rgba(255,255,255,.18);
        transition: color .2s, background-color .2s, border-color .2s, box-shadow .2s, transform .12s !important;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 30px;
        height: 30px;
        padding: 0 7px;
        border: 0;
        border-radius: 999px;
        color: #fff;
        font: 800 9px/1 Arial, sans-serif;
        letter-spacing: .04em;
        text-decoration: none;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.38), 0 5px 12px rgba(0,0,0,.26), 0 2px 0 rgba(0,0,0,.24) !important;
        position: static !important;
        transform: none !important;
        animation: none !important;
        transition: color .2s, background-color .2s, border-color .2s !important;
      }
      #peyvand-social-desktop svg,
      #peyvand-social-mobile-links svg {
        width: 19px;
        height: 19px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      #peyvand-social-desktop .peyvand-social-label {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
      }
      #peyvand-social-mobile-menu,
      #peyvand-mobile-menu-button {
        display: none !important;
      }
      #peyvand-whatsapp-fallback {
        display: none;
      }
      #peyvand-mobile-social-stack {
        display: none;
      }
      #kontakt aside {
        color: #ffffff !important;
        background: #0d3b2e !important;
      }
      #kontakt aside > p:first-child {
        color: #f0cf72 !important;
      }
      #kontakt aside p:not(:first-child) {
        color: #f7fbf8 !important;
      }
      #kontakt aside a {
        color: #f5d77f !important;
        text-decoration-color: rgba(245,215,127,.55) !important;
      }
      #kontakt aside a:hover,
      #kontakt aside a:focus-visible {
        color: #ffffff !important;
      }
      .hero-luxury .trust-chip {
        cursor: pointer;
        transition: border-color .2s, background-color .2s, color .2s, box-shadow .2s, transform .15s;
      }
      .hero-luxury .trust-chip:hover,
      .hero-luxury .trust-chip:focus-visible {
        border-color: rgba(225,188,98,.55);
        background: rgba(225,188,98,.1);
        color: #fff7df;
        box-shadow: 0 10px 24px rgba(0,0,0,.18);
        outline: none;
      }
      .hero-luxury .trust-chip:active {
        transform: scale(.97);
      }
      #wege .journey-panel .mt-9.space-y-4 > div {
        align-items: flex-start;
      }
      #wege .journey-panel .mt-9.space-y-4 > div > span:last-child {
        max-width: 68%;
        text-align: right;
        line-height: 1.45;
      }
      #wege .journey-path p {
        line-height: 1.75;
      }
      @media (max-width: 767px) {
        .hero-luxury .peyvand-mobile-hero-logo {
          width: 100%;
          padding-left: 0;
          margin-top: 25px;
          margin-bottom: 4px;
        }
        .hero-luxury .peyvand-mobile-hero-logo .logo-card-3d {
          border-radius: 26px;
          padding: 8px;
          box-shadow: 0 24px 55px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.2);
        }
        .hero-luxury .peyvand-mobile-hero-logo .logo-orbit {
          display: none;
        }
        .hero-luxury .peyvand-mobile-hero-logo .logo-float-tag {
          top: 12px;
          bottom: auto;
          z-index: 2;
        }
        .hero-luxury .peyvand-mobile-hero-logo .logo-float-tag--afg {
          top: 14px !important;
          right: auto !important;
          bottom: auto !important;
          left: 14px !important;
          color: #fff !important;
          border-color: rgba(255,255,255,.55) !important;
          background: linear-gradient(135deg,#111 0 33%,#b91c1c 33% 66%,#166534 66%) !important;
          box-shadow: 0 8px 22px rgba(0,0,0,.38) !important;
        }
        .hero-luxury .peyvand-mobile-hero-logo .logo-float-tag--deu {
          top: auto !important;
          right: 14px !important;
          bottom: 14px !important;
          left: auto !important;
          color: #fff !important;
          border-color: rgba(255,221,90,.7) !important;
          background: linear-gradient(135deg,#111 0 33%,#c81e1e 33% 66%,#e9b949 66%) !important;
          box-shadow: 0 8px 22px rgba(0,0,0,.38) !important;
        }
      }
      #peyvand-mobile-social-stack a,
      #peyvand-mobile-social-stack span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        min-width: 44px !important;
        padding: 0 !important;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,.28);
        color: #fff;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.42), 0 7px 16px rgba(0,0,0,.28), 0 2px 0 rgba(0,0,0,.24) !important;
        transform: none !important;
        animation: none !important;
      }
      #peyvand-social-desktop a:hover,
      #peyvand-social-desktop span:hover {
        box-shadow: inset 0 1px 0 rgba(255,255,255,.5), 0 8px 18px rgba(0,0,0,.3), 0 2px 0 rgba(0,0,0,.2) !important;
      }
      #peyvand-social-desktop a:active,
      #peyvand-social-desktop span:active,
      #peyvand-mobile-social-stack a:active,
      #peyvand-mobile-social-stack span:active {
        transform: scale(.94) !important;
      }
      #peyvand-mobile-social-stack svg {
        display: block !important;
        width: 21px;
        height: 21px;
      }
      #peyvand-mobile-social-stack .social-icon-instagram,
      #peyvand-mobile-social-stack .social-icon-tiktok {
        fill: none;
        stroke: currentColor;
        stroke-width: 1.9;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      #peyvand-mobile-social-stack .social-icon-facebook {
        fill: currentColor;
        stroke: none;
      }
      #peyvand-mobile-social-stack .peyvand-social-label {
        display: none !important;
      }
      #peyvand-mobile-menu-button {
        display: none;
      }
      @media (max-width: 767px) {
        #peyvand-whatsapp-fallback {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 90;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 46px;
          padding: 0 17px;
          border: 0;
          border-radius: 999px;
          color: #fff;
          background: #22c55e;
          font: 800 13px/1 Arial, sans-serif;
          text-decoration: none;
          box-shadow: 0 16px 38px rgba(0,0,0,.3);
          animation: peyvandWhatsappFloat 2.8s ease-in-out infinite;
        }
        #peyvand-social-desktop { display: none; }
        #peyvand-mobile-social-stack {
          position: fixed;
          bottom: 76px;
          z-index: 89;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }
        #peyvand-mobile-menu-button {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 90;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 999px;
          background: rgba(255,255,255,.08);
          color: #fff;
          font-size: 21px;
          line-height: 1;
          cursor: pointer;
        }
        #peyvand-social-mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: none;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          background: rgba(3,18,15,.72);
          backdrop-filter: blur(10px);
        }
        #peyvand-social-mobile-menu.is-open { display: flex; }
      #peyvand-social-mobile-links a,
      #peyvand-social-mobile-links span {
        position: static !important;
        transform: none !important;
        animation: none !important;
      }
        #peyvand-social-mobile-panel {
          width: 100%;
          padding: 20px 16px 16px;
          border: 1px solid rgba(216,184,94,.3);
          border-radius: 24px;
          background: #08251f;
          box-shadow: 0 20px 60px rgba(0,0,0,.45);
        }
        #peyvand-social-mobile-close {
          float: right;
          border: 0;
          background: transparent;
          color: #d8b85e;
          font-size: 24px;
          cursor: pointer;
        }
        #peyvand-social-mobile-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          clear: both;
          padding-top: 16px;
        }
        #peyvand-social-mobile-links a,
        #peyvand-social-mobile-links span {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          border-radius: 12px;
          color: #fff;
          font: 800 10px/1 Arial, sans-serif;
          letter-spacing: .04em;
          text-decoration: none;
        }
      }
      @keyframes peyvandWhatsappFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @media (prefers-reduced-motion: reduce) {
        #peyvand-whatsapp-fallback { animation: none; }
      }
    `;
    document.head.append(style);
  }

  function styleSocialButton(element) {
    Object.assign(element.style, {
      color: "white",
      textDecoration: "none",
      fontFamily: "Arial, sans-serif",
      fontWeight: "800",
      background: "#1877F2",
      boxShadow: "none",
      position: "static",
      transform: "none",
      animation: "none",
      transition: "color .2s, background-color .2s, border-color .2s"
    });
  }

  async function renderSocials() {
    const header = document.querySelector("header");
    const languageButton = header?.querySelector('button[role="combobox"]');
    const controls = languageButton?.parentElement;
    if (!header || !controls) return;
    injectSocialStyles();
    const settings = await getSettings();

    if (!document.querySelector("#peyvand-social-desktop")) {
      const desktop = document.createElement("div");
      desktop.id = "peyvand-social-desktop";
      const instagram = socialButton("IG", settings.instagram_url, "");
      const tiktok = socialButton("TK", settings.tiktok_url, "");
      const facebook = socialButton("FB", settings.facebook_url, "");
      [instagram, tiktok, facebook].forEach(styleSocialButton);
      instagram.style.background = "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)";
      tiktok.style.background = "#050505";
      facebook.style.background = "#1877F2";
      desktop.append(instagram, tiktok, facebook);
      controls.insertBefore(desktop, languageButton);
    }

    // Falls React den WhatsApp-Button noch nicht erzeugt hat, wird derselbe Button zuverlässig ergänzt.
    const nativeWhatsapp = document.querySelector('main a[href^="https://wa.me/"]:not(#peyvand-whatsapp-fallback)');
    const fallbackWhatsapp = document.querySelector("#peyvand-whatsapp-fallback");
    if (nativeWhatsapp) {
      fallbackWhatsapp?.remove();
    } else if (window.matchMedia("(max-width: 767px)").matches && settings.whatsapp_number && !fallbackWhatsapp) {
      const whatsapp = document.createElement("a");
      whatsapp.id = "peyvand-whatsapp-fallback";
      whatsapp.href = "https://wa.me/" + String(settings.whatsapp_number).replace(/\\D/g, "");
      whatsapp.target = "_blank";
      whatsapp.rel = "noopener noreferrer";
      whatsapp.setAttribute("aria-label", "PEYWAND über WhatsApp kontaktieren");
      whatsapp.innerHTML = '<span aria-hidden="true">◔</span><span>WhatsApp</span>';
      document.body.append(whatsapp);
    }

    // Auf dem Handy liegen die kleinen Social-Buttons direkt über dem WhatsApp-Button.
    const oldMenu = document.querySelector("#peyvand-social-mobile-menu");
    const oldButton = document.querySelector("#peyvand-mobile-menu-button");
    oldMenu?.remove();
    oldButton?.remove();
    if (window.matchMedia("(max-width: 767px)").matches && !document.querySelector("#peyvand-mobile-social-stack")) {
      const stack = document.createElement("div");
      stack.id = "peyvand-mobile-social-stack";
      const isRtl = document.documentElement.dir === "rtl" || document.body.dir === "rtl" || document.querySelector("main")?.dir === "rtl";
      stack.style[isRtl ? "left" : "right"] = "20px";
      const tiktok = socialButton("TikTok", settings.tiktok_url, "");
      const instagram = socialButton("Instagram", settings.instagram_url, "");
      const facebook = socialButton("Facebook", settings.facebook_url, "");
      [tiktok, instagram, facebook].forEach(styleSocialButton);
      tiktok.style.background = "#050505";
      instagram.style.background = "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)";
      facebook.style.background = "#1877F2";
      stack.append(tiktok, instagram, facebook);
      document.body.append(stack);
    }
  }

  let heroLogoHome;
  let heroLogoNext;

  function arrangeMobileHero() {
    const grid = document.querySelector(".hero-luxury > .relative.mx-auto.grid");
    const text = grid?.firstElementChild;
    const logo = grid?.querySelector(".logo-stage");
    const heading = text?.querySelector("h1");
    if (!grid || !text || !logo || !heading) return;

    if (!heroLogoHome) {
      heroLogoHome = grid;
      heroLogoNext = logo.nextSibling;
    }

    if (window.matchMedia("(max-width: 767px)").matches) {
      if (logo.parentElement !== text) {
        heading.insertAdjacentElement("afterend", logo);
        logo.classList.add("peyvand-mobile-hero-logo");
      }
    } else if (logo.parentElement !== heroLogoHome) {
      heroLogoHome.insertBefore(logo, heroLogoNext);
      logo.classList.remove("peyvand-mobile-hero-logo");
    }
  }

  const journeyExplanations = {
    de: {
      intro: "Sprachniveaus zeigen, wie gut du Deutsch verstehen, sprechen, lesen und schreiben kannst. Hier siehst du einfach erklärt, was jede Stufe und jeder mögliche Weg bedeutet.",
      levels: [
        "Erste Wörter und sehr einfache Sätze",
        "Alltag verstehen und kurze Gespräche führen",
        "Im Alltag weitgehend selbstständig kommunizieren",
        "Sicher für viele Ausbildungen und Berufe kommunizieren",
        "Komplexe Fachsprache für Studium und anspruchsvolle Berufe"
      ],
      paths: [
        "Bei einer Ausbildung lernst du einen Beruf praktisch in einem Betrieb und zusätzlich in der Berufsschule. Sie dauert meistens 2 bis 3,5 Jahre. In der Regel bekommst du währenddessen eine monatliche Ausbildungsvergütung. Häufig wird Deutsch auf B1- oder B2-Niveau verlangt.",
        "Bei einem Studium lernst du an einer Universität oder Hochschule. Du brauchst einen passenden Schulabschluss und je nach Studiengang meistens Deutsch auf B2- oder C1-Niveau. Die genauen Voraussetzungen unterscheiden sich je nach Hochschule.",
        "Direkte Arbeit bedeutet, dass du dich mit deiner vorhandenen Ausbildung oder Berufserfahrung bei einem Arbeitgeber bewirbst. Je nach Beruf müssen deine Qualifikation anerkannt und bestimmte Deutschkenntnisse nachgewiesen werden."
      ]
    },
    en: {
      intro: "Language levels show how well you can understand, speak, read and write German. Here you can easily see what each level and each possible pathway means.",
      levels: [
        "First words and very simple sentences",
        "Understand everyday situations and hold short conversations",
        "Communicate independently in most everyday situations",
        "Communicate confidently for many training programmes and jobs",
        "Complex academic and professional language"
      ],
      paths: [
        "Vocational training means learning a profession in a company and at vocational school. It usually lasts 2 to 3.5 years and normally includes monthly training pay. German at B1 or B2 level is often required.",
        "Studying means learning at a university. You need a suitable school qualification and usually German at B2 or C1 level, depending on the programme. Exact requirements differ between universities.",
        "Direct employment means applying to an employer with your existing qualification or work experience. Depending on the profession, recognition of your qualification and proof of German may be required."
      ]
    },
    fa: {
      intro: "سطح‌های زبان نشان می‌دهند که تا چه اندازه می‌توانید آلمانی را بفهمید، صحبت کنید، بخوانید و بنویسید. در اینجا هر سطح و هر مسیر به زبان ساده توضیح داده شده است.",
      levels: [
        "واژه‌های نخست و جمله‌های بسیار ساده",
        "درک زندگی روزمره و گفت‌وگوهای کوتاه",
        "ارتباط نسبتاً مستقل در زندگی روزمره",
        "ارتباط مطمئن برای بسیاری از آوسبیلدونگ‌ها و کارها",
        "زبان تخصصی و پیچیده برای دانشگاه و مشاغل تخصصی"
      ],
      paths: [
        "آوسبیلدونگ یعنی یک حرفه را به‌صورت عملی در شرکت و هم‌زمان در مکتب مسلکی یاد می‌گیرید. معمولاً ۲ تا ۳٫۵ سال دوام می‌کند و در بیشتر موارد معاش آموزشی ماهانه دریافت می‌کنید. اغلب سطح B1 یا B2 آلمانی لازم است.",
        "تحصیل یعنی درس خواندن در دانشگاه یا مؤسسه تحصیلات عالی. به سند مکتب مناسب و بسته به رشته معمولاً سطح B2 یا C1 آلمانی نیاز دارید. شرایط دقیق در هر دانشگاه متفاوت است.",
        "کار مستقیم یعنی با تحصیلات یا تجربه کاری فعلی خود برای یک کارفرما درخواست می‌دهید. بسته به شغل، ممکن است تأیید مدرک و مدرک زبان آلمانی لازم باشد."
      ]
    },
    ps: {
      intro: "د ژبې کچې ښيي چې تاسې آلماني څومره درک کولای، ویلی، لوستلی او لیکلی شئ. دلته هره کچه او هره لاره په ساده ډول تشریح شوې ده.",
      levels: [
        "لومړني لغتونه او ډېرې ساده جملې",
        "د ورځني ژوند پوهه او لنډې خبرې",
        "په ورځني ژوند کې تر ډېره خپلواکه اړیکه",
        "د ډېرو مسلکي زده کړو او دندو لپاره ډاډمنې خبرې",
        "د پوهنتون او تخصصي کار لپاره پېچلې مسلکي ژبه"
      ],
      paths: [
        "آوسبیلدونګ یعنې یو مسلک په عملي ډول په شرکت او هم‌مهاله په مسلکي ښوونځي کې زده کول. عموماً له ۲ تر ۳٫۵ کلونو دوام کوي او اکثره میاشتنۍ روزنیزه تنخوا لري. ډېری وخت B1 یا B2 آلماني غوښتل کېږي.",
        "تحصیل یعنې په پوهنتون یا لوړو زده کړو موسسه کې زده کړه. مناسب د ښوونځي سند او د رشتې له مخې عموماً B2 یا C1 آلماني ته اړتیا وي. دقیق شرایط د هر پوهنتون له مخې توپیر لري.",
        "مستقیم کار یعنې له خپلې موجودې زده کړې یا کاري تجربې سره کارفرما ته غوښتنلیک ورکول. د مسلک له مخې ښايي د سند پېژندنه او د آلماني ژبې ثبوت اړین وي."
      ]
    }
  };

  function improveBeginnerJourney() {
    const heroNote = document.querySelector(".hero-luxury svg.lucide-shield-check")?.closest("p");
    if (heroNote) heroNote.style.display = "none";

    const contact = document.querySelector("#kontakt");
    const contactMain = contact?.querySelector(":scope > div > div");
    if (contactMain?.children?.[3]) contactMain.children[3].style.display = "none";

    const section = document.querySelector("#wege");
    if (!section) return;
    const copy = journeyExplanations[language()];
    const intro = section.querySelector(":scope > div > div:first-child > p:last-child");
    setText(intro, copy.intro);

    const levelRows = section.querySelectorAll(".journey-panel .mt-9.space-y-4 > div");
    levelRows.forEach((row, index) => {
      const label = row.querySelector("span:last-child");
      if (copy.levels[index]) setText(label, copy.levels[index]);
    });

    const pathCards = [...section.querySelectorAll(".journey-path")];
    const ids = ["peyvand-ausbildung", "peyvand-studium", "peyvand-arbeit"];
    pathCards.forEach((card, index) => {
      card.id = ids[index];
      const paragraph = card.querySelector("p");
      if (copy.paths[index]) setText(paragraph, copy.paths[index]);
    });

    const panel = section.querySelector(".journey-panel");
    if (panel) panel.id = "peyvand-sprache";

    const chips = [...document.querySelectorAll(".hero-luxury .trust-chip")];
    const targets = ["#peyvand-sprache", "#peyvand-studium", "#peyvand-ausbildung", "#unternehmen"];
    chips.forEach((chip, index) => {
      if (chip.dataset.peyvandLinked) return;
      chip.dataset.peyvandLinked = "true";
      chip.dataset.target = targets[index];
      chip.setAttribute("role", "link");
      chip.setAttribute("tabindex", "0");
      chip.setAttribute("aria-label", chip.textContent.trim() + " öffnen");
      const openTarget = () => document.querySelector(chip.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      chip.addEventListener("click", openTarget);
      chip.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openTarget();
        }
      });
    });
  }

  function accessToken() {
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      if (key?.startsWith("sb-") && key.endsWith("-auth-token")) {
        try {
          return JSON.parse(localStorage.getItem(key))?.access_token || "";
        } catch {}
      }
    }
    return "";
  }

  async function renderSocialAdmin() {
    if (!location.pathname.startsWith("/admin") || document.querySelector("#peyvand-social-admin")) return;
    const section = [...document.querySelectorAll("h2")].find(heading => heading.textContent.includes("Inhalte & WhatsApp"))?.closest("section");
    if (!section) return;
    const settings = await getSettings();
    const panel = document.createElement("div");
    panel.id = "peyvand-social-admin";
    panel.className = "mt-7 rounded-2xl border border-white/10 bg-white/5 p-5";
    panel.innerHTML = '<p class="text-sm font-bold text-[#f6eedb]">Instagram, TikTok & Facebook</p><p class="mt-2 text-xs leading-6 text-[#afc2ba]">Hier die vollständigen Profil-Links eintragen.</p>' +
      [["Instagram","instagram_url","https://instagram.com/..."],["TikTok","tiktok_url","https://tiktok.com/@..."],["Facebook","facebook_url","https://facebook.com/..."]].map(item =>
        '<label class="field-label admin-label mt-4"><span>' + item[0] + '-Link</span><input id="social-' + item[1] + '" class="field-input admin-input" type="url" dir="ltr" placeholder="' + item[2] + '"></label>'
      ).join("") +
      '<button type="button" class="button-primary mt-5 w-full justify-center">Social-Links speichern</button><p class="mt-3 text-xs text-[#afc2ba]"></p>';
    section.append(panel);
    ["instagram_url","tiktok_url","facebook_url"].forEach(name => {
      panel.querySelector("#social-" + name).value = settings[name] || "";
    });
    panel.querySelector("button").addEventListener("click", async () => {
      const message = panel.lastElementChild;
      const token = accessToken();
      if (!token) {
        message.textContent = "Bitte zuerst im Adminbereich anmelden.";
        return;
      }
      const values = {};
      ["instagram_url","tiktok_url","facebook_url"].forEach(name => {
        values[name] = panel.querySelector("#social-" + name).value.trim();
      });
      const response = await fetch(SUPABASE_URL + "/rest/v1/site_settings?id=eq.true", {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify(values)
      });
      if (response.ok) {
        settingsCache = undefined;
        message.textContent = "Alle Social-Links wurden gespeichert.";
      } else {
        message.textContent = "Speichern war nicht möglich. Bitte erneut anmelden.";
      }
    });
  }

  let timer;
  function applyAll() {
    // Kontaktbuttons zuerst und unabhängig vom restlichen Seiteninhalt laden.
    renderSocials().catch(() => {});
    try { applyTranslations(); } catch {}
    try { arrangeMobileHero(); } catch {}
    try { improveBeginnerJourney(); } catch {}
    try { renderSocialAdmin(); } catch {}
  }
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(applyAll, 100);
  }

  document.addEventListener("click", schedule);
  document.addEventListener("change", schedule);
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applyAll);
  else applyAll();
})();
