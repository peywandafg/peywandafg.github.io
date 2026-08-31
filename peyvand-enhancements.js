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
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>';
    }
    if (key.includes("tiktok") || key === "tk") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3v11.2a4.8 4.8 0 1 1-4-4.74"></path><path d="M15 3c.45 2.4 1.85 4.1 4.5 4.7"></path></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z"></path></svg>';
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
        transition: color .2s, background-color .2s, border-color .2s !important;
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
        box-shadow: none !important;
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
      #peyvand-social-mobile-menu {
        display: none;
      }
      #peyvand-mobile-menu-button {
        display: none;
      }
      @media (max-width: 767px) {
        #peyvand-social-desktop { display: none; }
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
    if (document.querySelector("#peyvand-social-desktop")) return;
    const header = document.querySelector("header");
    const languageButton = header?.querySelector('button[role="combobox"]');
    const controls = languageButton?.parentElement;
    if (!header || !controls) return;
    injectSocialStyles();
    const settings = await getSettings();
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

    const mobileButton = document.createElement("button");
    mobileButton.id = "peyvand-mobile-menu-button";
    mobileButton.type = "button";
    mobileButton.setAttribute("aria-label", "Menü öffnen");
    mobileButton.setAttribute("aria-expanded", "false");
    mobileButton.textContent = "☰";
    document.body.append(mobileButton);

    const mobileMenu = document.createElement("div");
    mobileMenu.id = "peyvand-social-mobile-menu";
    mobileMenu.innerHTML = '<div id="peyvand-social-mobile-panel"><button id="peyvand-social-mobile-close" type="button" aria-label="Menü schließen">×</button><p style="margin:0;color:#f0d27c;font:700 14px Arial,sans-serif">Social Media</p><div id="peyvand-social-mobile-links"></div></div>';
    const mobileLinks = mobileMenu.querySelector("#peyvand-social-mobile-links");
    const mobileInstagram = socialButton("Instagram", settings.instagram_url, "");
    const mobileTiktok = socialButton("TikTok", settings.tiktok_url, "");
    const mobileFacebook = socialButton("Facebook", settings.facebook_url, "");
    [mobileInstagram, mobileTiktok, mobileFacebook].forEach(styleSocialButton);
    mobileInstagram.style.background = "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)";
    mobileTiktok.style.background = "#050505";
    mobileFacebook.style.background = "#1877F2";
    mobileLinks.append(mobileInstagram, mobileTiktok, mobileFacebook);
    document.body.append(mobileMenu);

    const closeMenu = () => {
      mobileMenu.classList.remove("is-open");
      mobileButton.setAttribute("aria-expanded", "false");
    };
    mobileButton.addEventListener("click", event => {
      event.stopPropagation();
      mobileMenu.classList.toggle("is-open");
      mobileButton.setAttribute("aria-expanded", mobileMenu.classList.contains("is-open") ? "true" : "false");
    });
    mobileMenu.querySelector("#peyvand-social-mobile-close").addEventListener("click", closeMenu);
    mobileMenu.addEventListener("click", event => {
      if (event.target === mobileMenu) closeMenu();
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
    applyTranslations();
    renderSocials();
    renderSocialAdmin();
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
