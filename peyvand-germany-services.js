(() => {
  const SUPABASE_URL = "https://lakcmrzaqjrypztlkegx.supabase.co";
  const SUPABASE_KEY = "sb_publishable_3KkoA-9hVthbUzatMeGjZA_el0N5LK9";
  let settingsCache;
  let teamCache;

  function language() {
    const value = document.querySelector('[data-slot="select-value"]')?.textContent?.trim() || "";
    if (value.includes("English")) return "en";
    if (value.includes("پښتو")) return "ps";
    if (value.includes("دری") || value.includes("فارسی")) return "fa";
    return "de";
  }

  function accessToken() {
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      if (key?.startsWith("sb-") && key.endsWith("-auth-token")) {
        try { return JSON.parse(localStorage.getItem(key))?.access_token || ""; } catch {}
      }
    }
    return "";
  }

  async function getSettings() {
    if (settingsCache) return settingsCache;
    try {
      const response = await fetch(SUPABASE_URL + "/rest/v1/site_settings?id=eq.true&select=*", {
        headers: { apikey: SUPABASE_KEY }
      });
      settingsCache = response.ok ? (await response.json())[0] || {} : {};
    } catch { settingsCache = {}; }
    return settingsCache;
  }

  async function getTeam(includeInactive) {
    if (teamCache && !includeInactive) return teamCache;
    const token = includeInactive ? accessToken() : "";
    const query = includeInactive
      ? "/rest/v1/team_members?select=*&order=sort_order.asc,created_at.asc"
      : "/rest/v1/team_members?active=eq.true&select=*&order=sort_order.asc,created_at.asc";
    try {
      const response = await fetch(SUPABASE_URL + query, {
        headers: {
          apikey: SUPABASE_KEY,
          ...(token ? { Authorization: "Bearer " + token } : {})
        }
      });
      const rows = response.ok ? await response.json() : [];
      if (!includeInactive) teamCache = rows;
      return rows;
    } catch { return []; }
  }

  const defaults = {
    de: {
      nav: "Hilfe in Deutschland",
      kicker: "Bereits in Deutschland?",
      intro: "Wenn Sprache im Alltag zum Problem wird, unterstützen wir dich verständlich und persönlich – beim Lernen sowie beim Verstehen und Vorbereiten wichtiger Unterlagen.",
      privateAction: "Privatunterricht anfragen",
      paperworkAction: "Hilfe bei Unterlagen anfragen",
      teamKicker: "Offiziell bestätigt",
      teamTitle: "Unser PEYWAND-Team",
      teamEmpty: "Aktive Teammitglieder werden hier mit ihrem vollständigen Namen veröffentlicht.",
      browser: "Du hast die Seite im TikTok- oder Instagram-Browser geöffnet. Für WhatsApp und Formulare öffne sie bitte im normalen Browser.",
      browserAction: "Im Browser öffnen",
      close: "Schließen"
    },
    en: {
      nav: "Help in Germany",
      kicker: "Already in Germany?",
      intro: "If language becomes a problem in everyday life, we support you clearly and personally with learning, understanding letters and preparing important documents.",
      privateAction: "Request private lessons",
      paperworkAction: "Request document help",
      teamKicker: "Officially confirmed",
      teamTitle: "Our PEYWAND team",
      teamEmpty: "Active team members are listed here by their full name.",
      browser: "You opened this page inside TikTok or Instagram. For WhatsApp and forms, please open it in your normal browser.",
      browserAction: "Open in browser",
      close: "Close"
    },
    fa: {
      nav: "کمک در آلمان",
      kicker: "آیا در آلمان زندگی می‌کنید؟",
      intro: "اگر زبان در زندگی روزمره برای شما مشکل ایجاد می‌کند، برای یادگیری، فهم نامه‌ها و آماده‌سازی اسناد مهم به‌صورت روشن و شخصی کمک می‌کنیم.",
      privateAction: "درخواست آموزش خصوصی",
      paperworkAction: "درخواست کمک برای اسناد",
      teamKicker: "تأییدشده رسمی",
      teamTitle: "تیم رسمی پیوند",
      teamEmpty: "اعضای فعال تیم با نام کامل در این بخش معرفی می‌شوند.",
      browser: "این صفحه را در مرورگر تیک‌تاک یا اینستاگرام باز کرده‌اید. برای واتساپ و فورم‌ها، لطفاً آن را در مرورگر اصلی باز کنید.",
      browserAction: "باز کردن در مرورگر",
      close: "بستن"
    },
    ps: {
      nav: "په آلمان کې مرسته",
      kicker: "ایا په آلمان کې اوسېږئ؟",
      intro: "که ژبه په ورځني ژوند کې ستونزه درته جوړوي، موږ د زده کړې، د لیکونو د پوهېدو او د مهمو اسنادو د چمتو کولو په برخه کې روښانه او شخصي مرسته کوو.",
      privateAction: "د خصوصي درس غوښتنه",
      paperworkAction: "د اسنادو د مرستې غوښتنه",
      teamKicker: "رسمي تایید شوی",
      teamTitle: "د پیوند رسمي ټیم",
      teamEmpty: "فعال ټیم غړي دلته په خپل بشپړ نوم معرفي کېږي.",
      browser: "تاسې دا پاڼه د ټیک‌ټاک یا انسټاګرام په براوزر کې پرانیستې ده. د واټساپ او فورمو لپاره یې په عادي براوزر کې خلاصه کړئ.",
      browserAction: "په براوزر کې خلاصول",
      close: "بندول"
    }
  };

  function localized(settings, prefix, lang) {
    return settings[prefix + "_" + lang] || settings[prefix + "_de"] || "";
  }

  function ensureStyles() {
    if (document.querySelector("#peyvand-germany-styles")) return;
    const style = document.createElement("style");
    style.id = "peyvand-germany-styles";
    style.textContent = [
      "#deutschland-hilfe{background:linear-gradient(145deg,#f5f0e4,#edf2ed);color:#14392e}",
      "#deutschland-hilfe .de-grid{display:grid;gap:18px;margin-top:34px}",
      "#deutschland-hilfe .de-card{border:1px solid rgba(20,57,46,.13);border-radius:28px;background:rgba(255,255,255,.82);padding:26px;box-shadow:0 18px 50px rgba(26,53,44,.1)}",
      "#deutschland-hilfe .de-card h3{font-family:Georgia,serif;font-size:27px;line-height:1.15;margin:0;color:#14392e}",
      "#deutschland-hilfe .de-card p{margin:14px 0 0;color:#53675e;line-height:1.8;font-size:14px}",
      "#deutschland-hilfe .de-action{display:inline-flex;margin-top:22px;border-radius:999px;background:linear-gradient(90deg,#c89b3f,#efd079);padding:12px 17px;color:#10271f;font-size:13px;font-weight:800;text-decoration:none;box-shadow:0 8px 22px rgba(197,151,54,.22)}",
      "#peyvand-official-team{background:#071b17;color:#fff}",
      "#peyvand-official-team .official-notice{border:1px solid rgba(225,188,98,.28);border-radius:28px;background:rgba(255,255,255,.06);padding:25px;box-shadow:0 18px 50px rgba(0,0,0,.22)}",
      "#peyvand-official-team .official-notice h3{font-family:Georgia,serif;font-size:27px;margin:0;color:#f2d27a}",
      "#peyvand-official-team .official-notice p{margin:14px 0 0;color:#cad8d2;line-height:1.8;font-size:14px}",
      "#peyvand-official-team .team-grid{display:grid;gap:16px;margin-top:28px}",
      "#peyvand-official-team .team-card{border:1px solid rgba(255,255,255,.12);border-radius:24px;background:rgba(255,255,255,.055);padding:22px}",
      "#peyvand-official-team .team-card img{width:68px;height:68px;border-radius:50%;object-fit:cover;margin-bottom:15px;border:2px solid rgba(225,188,98,.5)}",
      "#peyvand-official-team .team-card h4{font-family:Georgia,serif;font-size:22px;margin:0;color:#fff7e8}",
      "#peyvand-official-team .team-card strong{display:block;margin-top:8px;color:#e7c66c;font-size:13px}",
      "#peyvand-official-team .team-card p{margin:10px 0 0;color:#bdcec6;line-height:1.7;font-size:13px}",
      "#peyvand-inapp-note{position:fixed;left:12px;right:12px;bottom:12px;z-index:130;border:1px solid rgba(240,207,114,.45);border-radius:18px;background:#08251f;color:#fff;padding:16px;box-shadow:0 20px 60px rgba(0,0,0,.45)}",
      "#peyvand-inapp-note p{margin:0;font:600 13px/1.6 Arial,sans-serif;color:#e7eee9}",
      "#peyvand-inapp-note .actions{display:flex;gap:9px;margin-top:12px}",
      "#peyvand-inapp-note a,#peyvand-inapp-note button{border:0;border-radius:999px;padding:10px 13px;font:800 11px Arial,sans-serif;cursor:pointer}",
      "#peyvand-inapp-note a{background:#e8c96f;color:#10271f;text-decoration:none}",
      "#peyvand-inapp-note button{background:rgba(255,255,255,.1);color:#fff}",
      "#peyvand-germany-admin textarea{min-height:110px;resize:vertical}",
      "#peyvand-germany-chip{grid-column:span 2;cursor:pointer}",
      "#peyvand-team-admin .member-editor{margin-top:14px;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:rgba(255,255,255,.04);padding:15px}",
      "@media(min-width:640px){#peyvand-germany-chip{grid-column:auto}}",
      "@media(min-width:700px){#deutschland-hilfe .de-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#peyvand-official-team .team-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}",
      "@media(min-width:1024px){.hero-luxury .peyvand-trust-grid{grid-template-columns:repeat(6,minmax(0,1fr))!important}}"
    ].join("");
    document.head.append(style);
  }

  function setPathway(value, label) {
    const select = document.querySelector('#bewerbung select[name="pathway"]');
    if (!select) return;
    let option = [...select.options].find(item => item.value === value);
    if (!option) {
      option = document.createElement("option");
      option.value = value;
      select.append(option);
    }
    option.textContent = label;
    select.value = value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  async function renderGermanySection() {
    if (location.pathname.startsWith("/admin")) return;
    ensureStyles();
    const settings = await getSettings();
    const lang = language();
    const copy = defaults[lang];

    let chip = document.querySelector("#peyvand-germany-chip");
    const trustGrid = document.querySelector(".hero-luxury .trust-chip")?.parentElement;
    if (settings.germany_services_enabled && trustGrid && !chip) {
      chip = document.createElement("div");
      chip.id = "peyvand-germany-chip";
      chip.className = "trust-chip flex items-center justify-center gap-2 px-3 py-5 text-xs font-bold tracking-[.08em] text-[#d7e2dc] sm:text-sm";
      chip.innerHTML = '<span class="grid h-7 w-7 place-items-center rounded-full border border-[#e1bc62]/40 text-[10px] font-black text-[#e1bc62]">DE</span><span></span>';
      chip.setAttribute("role", "link");
      chip.setAttribute("tabindex", "0");
      const open = () => document.querySelector("#deutschland-hilfe")?.scrollIntoView({behavior:"smooth",block:"start"});
      chip.addEventListener("click", open);
      chip.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
      });
      trustGrid.append(chip);
    }
    if (chip) {
      chip.style.display = settings.germany_services_enabled ? "" : "none";
      chip.querySelector("span:last-child").textContent = copy.nav;
    }

    let section = document.querySelector("#deutschland-hilfe");
    if (!settings.germany_services_enabled) {
      section?.remove();
      return;
    }
    if (!section) {
      section = document.createElement("section");
      section.id = "deutschland-hilfe";
      section.className = "scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32";
      document.querySelector("#ablauf")?.before(section);
    }

    const privateVisible = settings.private_lessons_enabled !== false;
    const paperworkVisible = settings.paperwork_help_enabled !== false;
    section.innerHTML =
      '<div class="mx-auto max-w-7xl">' +
        '<div class="mx-auto max-w-3xl text-center">' +
          '<p class="section-kicker">' + copy.kicker + '</p>' +
          '<h2 class="mt-4 font-serif text-4xl leading-[1.08] tracking-[-.025em] sm:text-5xl text-[#14392e]">' + localized(settings,"germany_title",lang) + '</h2>' +
          '<p class="mt-5 text-base leading-8 sm:text-lg text-[#5b6d65]">' + copy.intro + '</p>' +
        '</div>' +
        '<div class="de-grid">' +
          (privateVisible ? '<article class="de-card"><h3>' + localized(settings,"private_title",lang) + '</h3><p>' + localized(settings,"private_body",lang) + '</p><a class="de-action" href="#bewerbung" data-pathway="private_lessons">' + copy.privateAction + '</a></article>' : '') +
          (paperworkVisible ? '<article class="de-card"><h3>' + localized(settings,"paperwork_title",lang) + '</h3><p>' + localized(settings,"paperwork_body",lang) + '</p><a class="de-action" href="#bewerbung" data-pathway="paperwork_help">' + copy.paperworkAction + '</a></article>' : '') +
        '</div>' +
      '</div>';

    section.querySelectorAll("[data-pathway]").forEach(link => {
      link.addEventListener("click", () => setPathway(link.dataset.pathway, link.textContent));
    });
  }

  async function renderOfficialTeam() {
    if (location.pathname.startsWith("/admin")) return;
    ensureStyles();
    const settings = await getSettings();
    const lang = language();
    const copy = defaults[lang];
    const members = await getTeam(false);
    const footer = document.querySelector("footer");
    if (!footer) return;

    let section = document.querySelector("#peyvand-official-team");
    if (!section) {
      section = document.createElement("section");
      section.id = "peyvand-official-team";
      section.className = "scroll-mt-24 px-5 py-20 sm:px-8";
      footer.before(section);
    }

    const notice = settings.official_notice_enabled !== false
      ? '<div class="official-notice"><h3>' + localized(settings,"official_title",lang) + '</h3><p>' + localized(settings,"official_body",lang) + '</p></div>'
      : '';
    const cards = members.map(member => {
      const role = member["role_" + lang] || member.role_de || "";
      const qualification = member["qualification_" + lang] || member.qualification_de || "";
      return '<article class="team-card">' +
        (member.photo_url ? '<img src="' + member.photo_url.replace(/"/g,"&quot;") + '" alt="">' : '') +
        '<h4>' + member.full_name + '</h4>' +
        (role ? '<strong>' + role + '</strong>' : '') +
        (qualification ? '<p>' + qualification + '</p>' : '') +
      '</article>';
    }).join("");
    section.innerHTML =
      '<div class="mx-auto max-w-7xl">' +
        notice +
        '<div class="mt-12 text-center"><p class="section-kicker">' + copy.teamKicker + '</p><h2 class="mt-4 font-serif text-4xl text-[#fff7e8]">' + copy.teamTitle + '</h2></div>' +
        (cards ? '<div class="team-grid">' + cards + '</div>' : '<p class="mt-7 text-center text-sm text-[#b9cbc3]">' + copy.teamEmpty + '</p>') +
      '</div>';

    const founder = settings.founder_name || "Muhammad Ali Tajikzei";
    const founderNode = [...document.querySelectorAll("#ueber-uns aside p")].find(node => node.textContent.includes("Muhammad Ali"));
    if (founderNode) founderNode.textContent = founder;
  }

  function renderInAppNotice() {
    if (location.pathname.startsWith("/admin") || sessionStorage.getItem("peyvand-inapp-dismissed")) return;
    const ua = navigator.userAgent || "";
    if (!/(Instagram|FBAN|FBAV|TikTok|musical_ly)/i.test(ua) || document.querySelector("#peyvand-inapp-note")) return;
    ensureStyles();
    const copy = defaults[language()];
    const note = document.createElement("div");
    note.id = "peyvand-inapp-note";
    note.innerHTML = '<p>' + copy.browser + '</p><div class="actions"><a href="' + location.href + '" target="_blank" rel="noopener noreferrer">' + copy.browserAction + '</a><button type="button">' + copy.close + '</button></div>';
    note.querySelector("button").addEventListener("click", () => {
      sessionStorage.setItem("peyvand-inapp-dismissed","1");
      note.remove();
    });
    document.body.append(note);
  }

  const editableFields = [
    "founder_name",
    "germany_title_de","germany_title_en","germany_title_fa","germany_title_ps",
    "private_title_de","private_title_en","private_title_fa","private_title_ps",
    "private_body_de","private_body_en","private_body_fa","private_body_ps",
    "paperwork_title_de","paperwork_title_en","paperwork_title_fa","paperwork_title_ps",
    "paperwork_body_de","paperwork_body_en","paperwork_body_fa","paperwork_body_ps",
    "official_title_de","official_title_en","official_title_fa","official_title_ps",
    "official_body_de","official_body_en","official_body_fa","official_body_ps"
  ];

  function inputHtml(name, value) {
    const longField = name.includes("_body_");
    const safe = String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
    return '<label class="field-label admin-label mt-3"><span>' + name + '</span>' +
      (longField ? '<textarea class="field-input admin-input" data-setting="' + name + '">' + safe + '</textarea>' : '<input class="field-input admin-input" data-setting="' + name + '" value="' + safe + '">') +
    '</label>';
  }

  async function renderGermanyAdmin() {
    if (!location.pathname.startsWith("/admin") || document.querySelector("#peyvand-germany-admin")) return;
    const host = [...document.querySelectorAll("h2")].find(heading => heading.textContent.includes("Inhalte & WhatsApp"))?.closest("section");
    if (!host) return;
    const settings = await getSettings();
    const panel = document.createElement("div");
    panel.id = "peyvand-germany-admin";
    panel.className = "mt-7 rounded-2xl border border-white/10 bg-white/5 p-5";
    panel.innerHTML =
      '<h3 class="text-lg font-bold text-[#f6eedb]">Deutschland-Angebote & offizieller Hinweis</h3>' +
      '<div class="mt-4 grid gap-3 sm:grid-cols-2">' +
        ["germany_services_enabled","private_lessons_enabled","paperwork_help_enabled","official_notice_enabled"].map(name =>
          '<label class="flex items-center gap-3 text-sm text-[#f6eedb]"><input type="checkbox" data-setting="' + name + '"' + (settings[name] !== false ? ' checked' : '') + '><span>' + name + '</span></label>'
        ).join("") +
      '</div>' +
      editableFields.map(name => inputHtml(name, settings[name])).join("") +
      '<button type="button" class="button-primary mt-5 w-full justify-center">Einstellungen speichern</button><p class="mt-3 text-xs text-[#afc2ba]"></p>';
    host.append(panel);
    panel.querySelector("button").addEventListener("click", async () => {
      const token = accessToken();
      const message = panel.lastElementChild;
      if (!token) { message.textContent = "Bitte zuerst anmelden."; return; }
      const values = {};
      panel.querySelectorAll("[data-setting]").forEach(field => {
        values[field.dataset.setting] = field.type === "checkbox" ? field.checked : field.value.trim();
      });
      const response = await fetch(SUPABASE_URL + "/rest/v1/site_settings?id=eq.true", {
        method:"PATCH",
        headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+token,"Content-Type":"application/json",Prefer:"return=minimal"},
        body:JSON.stringify(values)
      });
      message.textContent = response.ok ? "Deutschland-Angebote wurden gespeichert." : "Speichern nicht möglich.";
      if (response.ok) settingsCache = undefined;
    });
  }

  function memberEditor(member) {
    const box = document.createElement("div");
    box.className = "member-editor";
    box.dataset.id = member.id || "";
    box.innerHTML =
      inputHtml("full_name",member.full_name) +
      inputHtml("role_de",member.role_de) + inputHtml("role_en",member.role_en) + inputHtml("role_fa",member.role_fa) + inputHtml("role_ps",member.role_ps) +
      inputHtml("qualification_de",member.qualification_de) + inputHtml("qualification_en",member.qualification_en) + inputHtml("qualification_fa",member.qualification_fa) + inputHtml("qualification_ps",member.qualification_ps) +
      inputHtml("photo_url",member.photo_url) +
      '<label class="field-label admin-label mt-3"><span>Reihenfolge</span><input class="field-input admin-input" data-setting="sort_order" type="number" value="' + (member.sort_order || 0) + '"></label>' +
      '<label class="mt-3 flex items-center gap-3 text-sm text-[#f6eedb]"><input data-setting="active" type="checkbox"' + (member.active !== false ? ' checked' : '') + '><span>Auf Webseite sichtbar</span></label>' +
      '<div class="mt-4 flex gap-2"><button type="button" data-action="save" class="button-primary flex-1 justify-center">Speichern</button>' +
      (member.id ? '<button type="button" data-action="delete" class="rounded-full border border-red-300/30 px-4 text-xs font-bold text-red-200">Löschen</button>' : '') +
      '</div><p class="mt-2 text-xs text-[#afc2ba]"></p>';
    return box;
  }

  async function renderTeamAdmin() {
    if (!location.pathname.startsWith("/admin") || document.querySelector("#peyvand-team-admin")) return;
    const host = [...document.querySelectorAll("h2")].find(heading => heading.textContent.includes("Inhalte & WhatsApp"))?.closest("section");
    if (!host || !accessToken()) return;
    const panel = document.createElement("div");
    panel.id = "peyvand-team-admin";
    panel.className = "mt-7 rounded-2xl border border-white/10 bg-white/5 p-5";
    panel.innerHTML = '<h3 class="text-lg font-bold text-[#f6eedb]">Offizielles Personal</h3><p class="mt-2 text-xs leading-6 text-[#afc2ba]">Nur hier eingetragene und aktivierte Personen erscheinen als offizielles Team.</p><div data-team-list></div><button type="button" data-add class="button-primary mt-5 w-full justify-center">Neue Person hinzufügen</button>';
    host.append(panel);
    const list = panel.querySelector("[data-team-list]");
    const members = await getTeam(true);
    members.forEach(member => list.append(memberEditor(member)));
    panel.querySelector("[data-add]").addEventListener("click", () => list.prepend(memberEditor({active:true,sort_order:0})));
    panel.addEventListener("click", async event => {
      const action = event.target.dataset.action;
      if (!action) return;
      const editor = event.target.closest(".member-editor");
      const token = accessToken();
      const message = editor.lastElementChild;
      if (!token) { message.textContent = "Bitte erneut anmelden."; return; }
      if (action === "delete") {
        const response = await fetch(SUPABASE_URL + "/rest/v1/team_members?id=eq." + editor.dataset.id, {
          method:"DELETE",headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+token,Prefer:"return=minimal"}
        });
        if (response.ok) editor.remove(); else message.textContent = "Löschen nicht möglich.";
        return;
      }
      const values = {};
      editor.querySelectorAll("[data-setting]").forEach(field => {
        values[field.dataset.setting] = field.type === "checkbox" ? field.checked : field.type === "number" ? Number(field.value || 0) : field.value.trim();
      });
      const existing = Boolean(editor.dataset.id);
      const response = await fetch(SUPABASE_URL + "/rest/v1/team_members" + (existing ? "?id=eq." + editor.dataset.id : ""), {
        method: existing ? "PATCH" : "POST",
        headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+token,"Content-Type":"application/json",Prefer:existing?"return=minimal":"return=representation"},
        body:JSON.stringify(values)
      });
      if (response.ok) {
        if (!existing) {
          const rows = await response.json();
          editor.dataset.id = rows[0]?.id || "";
        }
        teamCache = undefined;
        message.textContent = "Gespeichert.";
      } else message.textContent = "Speichern nicht möglich.";
    });
  }


  const structureCopy = {
    de: {
      contactKicker: "Persönliche Beratung",
      contactTitle: "Direkt aus Deutschland für dich da.",
      contactBody: "Nach deinem Profil prüfen wir deine Angaben persönlich und erklären dir verständlich, welcher nächste Schritt zu deinem Ziel passt.",
      contactPerson: "Dein Ansprechpartner",
      whatsapp: "Über WhatsApp kontaktieren",
      germanyTitle: "Hilfe in Deutschland",
      germanyBody: "Deutschunterricht sowie Hilfe beim Verstehen von Briefen und Formularen.",
      germanyAction: "Mehr erfahren",
      familyOffer: ["Familiennachzug", "Sprachliche Vorbereitung und verständliche Orientierung für den nächsten Schritt."],
      companyOffer: ["Für Unternehmen", "Bedarf mitteilen und passende Profile strukturiert kennenlernen."]
    },
    en: {
      contactKicker: "Personal advice",
      contactTitle: "Direct support from Germany.",
      contactBody: "After receiving your profile, we personally review your information and clearly explain the next step that fits your goal.",
      contactPerson: "Your contact person",
      whatsapp: "Contact via WhatsApp",
      germanyTitle: "Help in Germany",
      germanyBody: "German lessons and help understanding letters and forms.",
      germanyAction: "Learn more",
      familyOffer: ["Family reunification", "Language preparation and clear guidance for the next step."],
      companyOffer: ["For companies", "Share your needs and review suitable profiles in a structured way."]
    },
    fa: {
      contactKicker: "مشاوره شخصی",
      contactTitle: "همراهی مستقیم از آلمان.",
      contactBody: "پس از دریافت پروفایل، اطلاعات شما را شخصاً بررسی می‌کنیم و گام بعدی مناسب هدفتان را به زبان ساده توضیح می‌دهیم.",
      contactPerson: "مسئول تماس شما",
      whatsapp: "تماس از طریق واتساپ",
      germanyTitle: "کمک در آلمان",
      germanyBody: "آموزش زبان آلمانی و کمک برای فهم نامه‌ها و فورم‌ها.",
      germanyAction: "اطلاعات بیشتر",
      familyOffer: ["پیوستن به خانواده", "آمادگی زبانی و راهنمایی روشن برای گام بعدی."],
      companyOffer: ["برای شرکت‌ها", "نیاز خود را اعلام کنید و پروفایل‌های مناسب را منظم بررسی نمایید."]
    },
    ps: {
      contactKicker: "شخصي مشوره",
      contactTitle: "له آلمان څخه مستقیمه مرسته.",
      contactBody: "ستاسې د پروفایل له ترلاسه کولو وروسته معلومات په شخصي ډول ګورو او ستاسې موخې ته مناسب راتلونکی ګام په ساده ژبه تشریح کوو.",
      contactPerson: "ستاسې د اړیکې مسئول",
      whatsapp: "د واټساپ له لارې اړیکه",
      germanyTitle: "په آلمان کې مرسته",
      germanyBody: "د آلماني ژبې درسونه او د لیکونو او فورمو په پوهېدو کې مرسته.",
      germanyAction: "نور معلومات",
      familyOffer: ["د کورنۍ یوځای کېدل", "ژبنی چمتووالی او د راتلونکي ګام لپاره روښانه لارښوونه."],
      companyOffer: ["د شرکتونو لپاره", "خپله اړتیا شریکه او مناسب پروفایلونه په منظم ډول وپېژنئ."]
    }
  };

  function safeText(value) {
    return String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function ensureStructureStyles() {
    if (document.querySelector("#peyvand-structure-styles")) return;
    const style = document.createElement("style");
    style.id = "peyvand-structure-styles";
    style.textContent = [
      "#peyvand-contact{background:linear-gradient(145deg,#f5f0e4,#eef3ed);color:#14392e}",
      "#peyvand-contact .contact-wrap{max-width:850px;margin:auto;text-align:center}",
      "#peyvand-contact .contact-card{margin-top:28px;border-radius:26px;background:#0b342a;color:#fff;padding:25px;box-shadow:0 20px 55px rgba(10,43,35,.18)}",
      "#peyvand-contact .contact-card strong{display:block;color:#e8cb78;font-family:Georgia,serif;font-size:23px}",
      "#peyvand-contact .contact-card a{display:inline-flex;margin-top:17px;border-radius:999px;background:#e3c66f;color:#102b23;padding:11px 17px;font-weight:800;text-decoration:none}",
      "#peyvand-de-summary{border-color:rgba(225,188,98,.24)}",
      "@media(max-width:767px){.hero-luxury .max-w-2xl>.mt-9.flex{display:none!important}.hero-luxury .peyvand-trust-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}.hero-luxury .peyvand-trust-grid .trust-chip,.hero-luxury #peyvand-family-chip,.hero-luxury #peyvand-germany-chip{grid-column:auto!important;min-height:58px!important;height:58px!important;padding:10px 7px!important;font-size:10px!important;opacity:1!important}#angebote,#wege,#ablauf,#bewerbung,#peyvand-contact,#ueber-uns,#peyvand-official-team,#deutschland-hilfe{padding-top:72px!important;padding-bottom:72px!important}#peyvand-official-team .official-notice p{font-size:13px!important;line-height:1.65!important}#peyvand-official-team .team-card{padding:18px!important}#peyvand-official-team .team-card p{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}}"
    ].join("");
    document.head.append(style);
  }

  async function renderContactSection() {
    if (location.pathname.startsWith("/admin")) return;
    const settings = await getSettings();
    const copy = structureCopy[language()];
    const main = document.querySelector("main");
    if (!main) return;
    let section = document.querySelector("#peyvand-contact");
    if (!section) {
      section = document.createElement("section");
      section.id = "peyvand-contact";
      section.className = "scroll-mt-24 px-5 py-20 sm:px-8";
      main.append(section);
    }
    const name = settings.contact_name || settings.founder_name || "Muhammad Ali Tajikzei";
    const email = settings.contact_email || "peywand.afg@gmail.com";
    const phone = String(settings.whatsapp_number || "").replace(/\D/g,"");
    section.innerHTML =
      '<div class="contact-wrap">' +
        '<p class="section-kicker">' + copy.contactKicker + '</p>' +
        '<h2 class="mt-4 font-serif text-4xl leading-[1.08] tracking-[-.025em] sm:text-5xl">' + copy.contactTitle + '</h2>' +
        '<p class="mt-5 text-base leading-8 text-[#5b6d65]">' + copy.contactBody + '</p>' +
        '<div class="contact-card"><span>' + copy.contactPerson + '</span><strong>' + safeText(name) + '</strong>' +
        '<p class="mt-2 text-sm text-[#d1ded8]"><a style="margin-top:0;background:none;color:#d1ded8;padding:0" href="mailto:' + safeText(email) + '">' + safeText(email) + '</a></p>' +
        (phone ? '<a href="https://wa.me/' + phone + '" target="_blank" rel="noopener noreferrer">' + copy.whatsapp + '</a>' : '') +
        '</div>' +
      '</div>';
  }

  function addGermanySummaryCard() {
    const grid = document.querySelector("#wege .peyvand-path-grid");
    if (!grid) return;
    let card = document.querySelector("#peyvand-de-summary");
    if (!card) {
      card = document.createElement("article");
      card.id = "peyvand-de-summary";
      card.className = "journey-path rounded-[2rem] p-6";
      card.innerHTML = '<span class="text-xs font-black tracking-[.18em] text-[#dfbd67]">05</span><h3 class="mt-7 font-serif text-2xl text-[#fff7e8]"></h3><p class="mt-3 text-sm leading-7 text-[#b9cbc3]"></p><a href="#deutschland-hilfe" class="mt-6 inline-flex items-center text-sm font-bold text-[#efd07a]"></a>';
      grid.append(card);
    }
    const copy = structureCopy[language()];
    card.querySelector("h3").textContent = copy.germanyTitle;
    card.querySelector("p").textContent = copy.germanyBody;
    card.querySelector("a").textContent = copy.germanyAction;
  }


  function renderExtraOfferCards() {
    const grid = document.querySelector("#angebote .mt-14.grid");
    if (!grid) return;
    const copy = structureCopy[language()];
    const items = [
      ["peyvand-offer-family", "Familie", copy.familyOffer[0], copy.familyOffer[1], "#peyvand-familie"],
      ["peyvand-offer-germany", "Deutschland", copy.germanyTitle, copy.germanyBody, "#deutschland-hilfe"],
      ["peyvand-offer-company", "Unternehmen", copy.companyOffer[0], copy.companyOffer[1], "#unternehmen"]
    ];
    items.forEach(item => {
      let card = document.querySelector("#" + item[0]);
      if (!card) {
        card = document.createElement("article");
        card.id = item[0];
        card.className = "premium-card group relative overflow-hidden rounded-[2rem] p-7 sm:p-8";
        card.innerHTML = '<div class="premium-card__glow"></div><div class="relative"><p class="mt-2 text-xs font-bold uppercase tracking-[.2em] text-[#dcb65d]"></p><h3 class="mt-3 font-serif text-3xl text-[#fbf5e6]"></h3><p class="mt-4 text-sm leading-7 text-[#afc3ba]"></p><a class="mt-6 inline-flex text-sm font-bold text-[#efd07a]"></a></div>';
        grid.append(card);
      }
      card.querySelector("p:first-of-type").textContent = item[1];
      card.querySelector("h3").textContent = item[2];
      card.querySelector("p:last-of-type").textContent = item[3];
      card.querySelector("a").href = item[4];
      card.querySelector("a").textContent = structureCopy[language()].germanyAction;
    });
  }

  function normalizePathNumbers() {
    const cards = [...document.querySelectorAll("#wege .peyvand-path-grid > .journey-path")].slice(0, 5);
    cards.forEach((card, index) => {
      const number = card.querySelector(":scope > span");
      if (number) number.textContent = String(index + 1).padStart(2, "0");
    });
  }

  function orderHeroChips() {
    const grid = document.querySelector(".hero-luxury .peyvand-trust-grid");
    if (!grid) return;
    const chips = [...grid.querySelectorAll(".trust-chip")];
    const languageChip = chips.find(chip => chip.dataset.target === "#peyvand-sprache") || chips[0];
    const trainingChip = chips.find(chip => chip.dataset.target === "#peyvand-ausbildung");
    const studyChip = chips.find(chip => chip.dataset.target === "#peyvand-studium");
    const companyChip = chips.find(chip => chip.dataset.target === "#unternehmen");
    const familyChip = document.querySelector("#peyvand-family-chip");
    const germanyChip = document.querySelector("#peyvand-germany-chip");
    [languageChip, trainingChip, studyChip, companyChip, familyChip, germanyChip].filter(Boolean).forEach(chip => grid.append(chip));
  }

  function reorderMobileSections() {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const main = document.querySelector("main");
    const footer = main?.querySelector("footer");
    if (!main || !footer) return;
    const ordered = [
      "#angebote",
      "#wege",
      "#ablauf",
      "#bewerbung",
      "#deutschland-hilfe",
      "#ueber-uns",
      "#peyvand-official-team",
      "#unternehmen"
    ];
    ordered.forEach(selector => {
      const section = document.querySelector(selector);
      if (section) main.insertBefore(section, footer);
    });
  }

  async function renderStructuredPage() {
    if (location.pathname.startsWith("/admin")) return;
    ensureStructureStyles();
    document.querySelector("#peyvand-contact")?.remove();
    addGermanySummaryCard();
    renderExtraOfferCards();
    normalizePathNumbers();
    orderHeroChips();
    reorderMobileSections();
  }

  let timer;
  function apply() {
    renderGermanySection();
    renderOfficialTeam();
    renderInAppNotice();
    renderGermanyAdmin();
    renderTeamAdmin();
    renderStructuredPage();
  }
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(apply,120);
  }
  document.addEventListener("click",schedule);
  document.addEventListener("change",schedule);
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",apply);
  else apply();
})();