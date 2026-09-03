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
    const value = document.querySelector('[data-slot="select-value"]')?.textContent?.trim() || "";
    if (value.includes("English")) return "en";
    if (value.includes("پښتو")) return "ps";
    if (value.includes("دری") || value.includes("فارسی")) return "fa";
    return "de";
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
    const icon = key.includes("instagram") || key === "ig"
      ? "instagram"
      : key.includes("tiktok") || key === "tk"
        ? "tiktok"
        : "facebook";
    return '<img class="social-brand-logo social-brand-logo--' + icon + '" src="/assets/social-' + icon + '.svg" alt="" aria-hidden="true">';
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
        gap: 8px;
        margin-right: 4px;
      }
      #peyvand-social-desktop a,
      #peyvand-social-desktop span {
        position: static !important;
        transform: none !important;
        animation: none !important;
        width: 38px !important;
        min-width: 38px !important;
        max-width: 38px !important;
        height: 38px !important;
        min-height: 38px !important;
        padding: 0 !important;
        flex: 0 0 38px;
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid rgba(255,255,255,.3);
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
      .social-brand-logo {
        display: block !important;
        width: 19px !important;
        height: 19px !important;
        max-width: 19px !important;
        object-fit: contain;
        filter: brightness(0) invert(1);
        pointer-events: none;
      }
      #peyvand-social-desktop .social-brand-logo--facebook {
        width: 18px !important;
        height: 18px !important;
      }
      #peyvand-mobile-social-stack .social-brand-logo {
        display: block !important;
        width: 19px !important;
        height: 19px !important;
      }
      #peyvand-social-desktop svg,
      #peyvand-social-mobile-links svg {
        display: block;
        width: 19px;
        height: 19px;
        flex: 0 0 19px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.9;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      #peyvand-social-desktop .social-icon-instagram,
      #peyvand-social-desktop .social-icon-tiktok {
        fill: none;
        stroke: currentColor;
      }
      #peyvand-social-desktop .social-icon-facebook {
        width: 20px;
        height: 20px;
        fill: currentColor;
        stroke: none;
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
      @media (min-width: 768px) {
        header .brand-logo__image {
          object-fit: contain !important;
        }
        .hero-luxury .logo-stage .logo-card-3d {
          transform: none !important;
          animation: none !important;
          padding: 10px !important;
          background: rgba(8,37,31,.78) !important;
          box-shadow: 0 26px 65px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.18) !important;
        }
        .hero-luxury .logo-stage .logo-card-3d img {
          object-fit: contain !important;
          background: #0b2d24 !important;
        }
        .hero-luxury .logo-stage .logo-orbit {
          display: none !important;
        }
        .hero-luxury .logo-stage .logo-float-tag {
          animation: none !important;
          transform: none !important;
        }
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
      #wege .peyvand-path-grid {
        grid-template-columns: 1fr;
      }
      #peyvand-family-chip {
        grid-column: span 2;
      }
      @media (min-width: 640px) {
        .hero-luxury .peyvand-trust-grid {
          grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
        }
        #peyvand-family-chip {
          grid-column: auto;
        }
        #wege .peyvand-path-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
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
        display: none !important;
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
        main > a[href^="https://wa.me/"] {
          right: 20px !important;
          left: auto !important;
        }
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
      stack.style.right = "20px";
      stack.style.left = "auto";
      const tiktok = socialButton("TikTok", settings.tiktok_url, "");
      const instagram = socialButton("Instagram", settings.instagram_url, "");
      const facebook = socialButton("Facebook", settings.facebook_url, "");
      [tiktok, instagram, facebook].forEach(styleSocialButton);
      tiktok.style.background = "#050505";
      [tiktok, instagram, facebook].forEach(button => {
        button.style.width = "40px";
        button.style.height = "40px";
        button.style.minWidth = "40px";
      });
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

  const profileFormTranslations = {
    de: {
      full_name: ["Vollständiger Name", "Vor- und Nachname"],
      phone: ["Telefon / WhatsApp", "+93 …"],
      age_range: ["Altersgruppe", {"":"Bitte wählen","under_18":"Unter 18","18_24":"18–24","25_34":"25–34","35_plus":"35 oder älter"}],
      education_level: ["Bildungsstand", {"":"Bitte wählen","school":"Schule","high_school":"Schulabschluss","vocational":"Berufsausbildung","university":"Universität","other":"Sonstiges"}],
      german_level: ["Deutschniveau", {"A0":"A0 – noch nicht begonnen"}],
      pathway: ["Mein Ziel", {"":"Bitte wählen","ausbildung":"Ausbildung","studium":"Studium","arbeit":"Arbeit","familiennachzug":"B1 für Familiennachzug","private_lessons":"Privater Deutschunterricht","paperwork_help":"Hilfe bei Briefen und Formularen","mitarbeit":"Als Lehrkraft / Unterstützer mitarbeiten","unsicher":"Noch unsicher"}],
      work_experience: ["Berufserfahrung (optional)", "In welchen Bereichen hast du gearbeitet?"],
      preferred_language: ["Bevorzugte Sprache"],
      message: ["Nachricht (optional)", "Was ist dir besonders wichtig?"],
      consent: "Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage gespeichert und zur Kontaktaufnahme verwendet werden."
    },
    en: {
      full_name: ["Full name", "First and last name"],
      phone: ["Phone / WhatsApp", "+93 …"],
      age_range: ["Age group", {"":"Please select","under_18":"Under 18","18_24":"18–24","25_34":"25–34","35_plus":"35 or older"}],
      education_level: ["Education level", {"":"Please select","school":"School","high_school":"High-school diploma","vocational":"Vocational qualification","university":"University","other":"Other"}],
      german_level: ["German level", {"A0":"A0 – not started yet"}],
      pathway: ["My goal", {"":"Please select","ausbildung":"Vocational training","studium":"University studies","arbeit":"Employment","familiennachzug":"B1 for family reunification","private_lessons":"Private German lessons","paperwork_help":"Help with letters and forms","mitarbeit":"Work with us as a teacher / supporter","unsicher":"Not sure yet"}],
      work_experience: ["Work experience (optional)", "Which fields have you worked in?"],
      preferred_language: ["Preferred contact language"],
      message: ["Message (optional)", "What is especially important to you?"],
      consent: "I agree that my information may be stored to process my request and used to contact me."
    },
    fa: {
      full_name: ["نام کامل", "نام و نام خانوادگی"],
      phone: ["شماره تماس / واتساپ", "+93 …"],
      age_range: ["گروه سنی", {"":"انتخاب کنید","under_18":"کمتر از ۱۸ سال","18_24":"۱۸–۲۴","25_34":"۲۵–۳۴","35_plus":"۳۵ سال یا بیشتر"}],
      education_level: ["سطح تحصیلات", {"":"انتخاب کنید","school":"مکتب","high_school":"فارغ مکتب","vocational":"آموزش مسلکی","university":"دانشگاه","other":"سایر"}],
      german_level: ["سطح زبان آلمانی", {"A0":"A0 – هنوز آغاز نکرده‌ام"}],
      pathway: ["هدف من", {"":"انتخاب کنید","ausbildung":"آوسبیلدونگ","studium":"تحصیل","arbeit":"کار","familiennachzug":"B1 برای پیوستن خانواده","private_lessons":"آموزش خصوصی زبان آلمانی","paperwork_help":"کمک برای نامه‌ها و فورم‌ها","mitarbeit":"همکاری به‌عنوان آموزگار یا حامی","unsicher":"هنوز مطمئن نیستم"}],
      work_experience: ["تجربه کاری (اختیاری)", "در کدام بخش‌ها کار کرده‌اید؟"],
      preferred_language: ["زبان ترجیحی برای تماس"],
      message: ["پیام (اختیاری)", "چه چیزی برای شما اهمیت ویژه دارد؟"],
      consent: "می‌پذیرم که معلومات من برای بررسی درخواست ذخیره شود و برای تماس با من استفاده گردد."
    },
    ps: {
      full_name: ["بشپړ نوم", "نوم او تخلص"],
      phone: ["د ټیلیفون / واټساپ شمېره", "+93 …"],
      age_range: ["د عمر ډله", {"":"مهرباني وکړئ وټاکئ","under_18":"له ۱۸ کلونو کم","18_24":"۱۸–۲۴","25_34":"۲۵–۳۴","35_plus":"۳۵ کاله یا ډېر"}],
      education_level: ["د زده کړو کچه", {"":"مهرباني وکړئ وټاکئ","school":"ښوونځی","high_school":"د ښوونځي فراغت","vocational":"مسلکي زده کړې","university":"پوهنتون","other":"نور"}],
      german_level: ["د آلماني ژبې کچه", {"A0":"A0 – لا مې نه ده پیل کړې"}],
      pathway: ["زما موخه", {"":"مهرباني وکړئ وټاکئ","ausbildung":"مسلکي روزنه (آوسبیلدونګ)","studium":"پوهنتوني زده کړې","arbeit":"کار","familiennachzug":"د کورنۍ یوځای کېدو لپاره B1","private_lessons":"خصوصي آلماني درسونه","paperwork_help":"د لیکونو او فورمو مرسته","mitarbeit":"د ښوونکي یا ملاتړي په توګه همکاري","unsicher":"لا ډاډه نه یم"}],
      work_experience: ["کاري تجربه (اختیاري)", "تاسې په کومو برخو کې کار کړی؟"],
      preferred_language: ["د اړیکې غوره ژبه"],
      message: ["پیغام (اختیاري)", "تاسې ته کومه موضوع ډېره مهمه ده؟"],
      consent: "زه موافق یم چې زما معلومات د غوښتنې د څېړلو لپاره وساتل شي او له ما سره د اړیکې لپاره وکارول شي."
    }
  };

  function translateProfileForm() {
    const form = document.querySelector("#bewerbung form");
    if (!form) return;
    const copy = profileFormTranslations[language()];

    const setField = (name, data) => {
      const field = form.elements.namedItem(name);
      if (!field) return;
      const title = field.closest("label")?.querySelector(":scope > span");
      setText(title, data[0]);
      if (typeof data[1] === "string" && "placeholder" in field) field.placeholder = data[1];
      if (data[1] && typeof data[1] === "object" && field.tagName === "SELECT") {
        [...field.options].forEach(option => {
          if (data[1][option.value] !== undefined) option.textContent = data[1][option.value];
        });
      }
    };

    ["full_name","phone","age_range","education_level","german_level","pathway","work_experience","preferred_language","message"]
      .forEach(name => setField(name, copy[name]));

    const consent = form.elements.namedItem("consent")?.closest("label")?.querySelector("span");
    setText(consent, copy.consent);
  }

  const familyPathTranslations = {
    de: {
      label: "Familiennachzug",
      title: "Familiennachzug",
      body: "Wenn du zu deiner Ehepartnerin oder deinem Ehepartner nach Deutschland ziehen möchtest, können je nach Fall Deutschkenntnisse und weitere Nachweise erforderlich sein. Wir erklären dir die Vorbereitung und helfen dir, den passenden Sprachweg zu verstehen.",
      action: "Beratung anfragen"
    },
    en: {
      label: "Family reunification",
      title: "Family reunification",
      body: "If you want to join your spouse in Germany, German-language skills and other documents may be required depending on your case. We explain the preparation and help you understand the appropriate language pathway.",
      action: "Request advice"
    },
    fa: {
      label: "پیوستن به خانواده",
      title: "پیوستن به خانواده",
      body: "اگر می‌خواهید نزد همسر خود به آلمان بروید، بسته به پرونده ممکن است مدرک زبان آلمانی و اسناد دیگری لازم باشد. ما مراحل آمادگی و مسیر مناسب زبان را به‌صورت روشن توضیح می‌دهیم.",
      action: "درخواست مشاوره"
    },
    ps: {
      label: "د کورنۍ یوځای کېدل",
      title: "د کورنۍ یوځای کېدل",
      body: "که غواړئ په آلمان کې له خپل مېړه یا مېرمنې سره یوځای شئ، د قضیې له مخې د آلماني ژبې سند او نور اسناد اړین کېدای شي. موږ د چمتووالي پړاوونه او مناسبه ژبنۍ لاره په ساده ډول تشریح کوو.",
      action: "مشوره وغواړئ"
    }
  };

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

    const pathCards = [...section.querySelectorAll(".journey-path")].filter(card => card.id !== "peyvand-familie" && card.id !== "peyvand-de-summary").slice(0, 3);
    const ids = ["peyvand-ausbildung", "peyvand-studium", "peyvand-arbeit"];
    pathCards.forEach((card, index) => {
      card.id = ids[index];
      const paragraph = card.querySelector("p");
      if (copy.paths[index]) setText(paragraph, copy.paths[index]);
    });

    const pathGrid = pathCards[0]?.parentElement;
    if (pathGrid) pathGrid.classList.add("peyvand-path-grid");
    let familyCard = document.querySelector("#peyvand-familie");
    if (!familyCard && pathGrid) {
      familyCard = document.createElement("article");
      familyCard.id = "peyvand-familie";
      familyCard.className = "journey-path rounded-[2rem] p-6";
      familyCard.innerHTML = '<span class="text-xs font-black tracking-[.18em] text-[#dfbd67]">04</span><h3 class="mt-7 font-serif text-2xl text-[#fff7e8]"></h3><p class="mt-3 text-sm leading-7 text-[#b9cbc3]"></p><a href="#bewerbung" class="mt-6 inline-flex items-center text-sm font-bold text-[#efd07a]"></a>';
      pathGrid.append(familyCard);
    }
    const familyCopy = familyPathTranslations[language()];
    setText(familyCard?.querySelector("h3"), familyCopy.title);
    setText(familyCard?.querySelector("p"), familyCopy.body);
    setText(familyCard?.querySelector("a"), familyCopy.action);

    const oldFamilyCallout = section.querySelector(".family-callout");
    if (oldFamilyCallout) oldFamilyCallout.style.display = "none";

    const panel = section.querySelector(".journey-panel");
    if (panel) panel.id = "peyvand-sprache";

    const trustGrid = document.querySelector(".hero-luxury .trust-chip")?.parentElement;
    if (trustGrid) trustGrid.classList.add("peyvand-trust-grid");
    let familyChip = document.querySelector("#peyvand-family-chip");
    if (!familyChip && trustGrid) {
      familyChip = document.createElement("div");
      familyChip.id = "peyvand-family-chip";
      familyChip.className = "trust-chip flex items-center justify-center gap-2 px-3 py-5 text-xs font-bold tracking-[.08em] text-[#d7e2dc] sm:text-sm";
      familyChip.innerHTML = '<span class="grid h-7 w-7 place-items-center rounded-full border border-[#e1bc62]/40 text-[10px] font-black text-[#e1bc62]">B1</span><span></span>';
      trustGrid.append(familyChip);
    }
    setText(familyChip?.querySelector("span:last-child"), familyCopy.label);

    const chips = [...document.querySelectorAll(".hero-luxury .trust-chip")];
    const targets = ["#peyvand-sprache", "#peyvand-studium", "#peyvand-ausbildung", "#unternehmen", "#peyvand-familie"];
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
    try { translateProfileForm(); } catch {}
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
