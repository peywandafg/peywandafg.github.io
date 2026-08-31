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

  function socialButton(name, url, classes) {
    const element = document.createElement(url ? "a" : "span");
    if (url) {
      element.href = url;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
      element.setAttribute("aria-label", name + " öffnen");
    }
    element.textContent = name;
    element.className = "pointer-events-auto grid min-h-11 min-w-24 place-items-center rounded-2xl border border-white/25 px-3 py-2 text-[10px] font-black tracking-wider text-white shadow-lg transition duration-200 hover:-translate-y-1 " + classes;
    return element;
  }

  async function renderSocials() {
    const stage = document.querySelector(".logo-stage");
    if (!stage || document.querySelector("#peyvand-social-buttons")) return;
    stage.querySelectorAll(".logo-float-tag--afg,.logo-float-tag--deu").forEach(element => element.remove());
    const settings = await getSettings();
    const wrapper = document.createElement("div");
    wrapper.id = "peyvand-social-buttons";
    wrapper.className = "absolute inset-0 z-20 pointer-events-none";
    const instagram = socialButton("INSTAGRAM", settings.instagram_url, "absolute -left-5 top-16 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]");
    const tiktok = socialButton("TIKTOK", settings.tiktok_url, "absolute -right-5 top-24 bg-black");
    const facebook = socialButton("FACEBOOK", settings.facebook_url, "absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#1877F2]");
    wrapper.append(instagram, tiktok, facebook);
    stage.append(wrapper);
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
