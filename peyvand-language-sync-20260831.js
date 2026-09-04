(() => {
  const URL = "https://lakcmrzaqjrypztlkegx.supabase.co";
  const KEY = "sb_publishable_3KkoA-9hVthbUzatMeGjZA_el0N5LK9";
  let settings = null;
  let team = [];
  let current = "de";
  let timer;

  const ui = {
    de: {
      adviceKicker:"Persönliche Beratung", germanyNav:"Hilfe in Deutschland",
      germanyKicker:"Bereits in Deutschland?", germanyIntro:"Wenn Sprache bei Briefen, Formularen oder Behörden zum Problem wird, unterstützen wir dich beim Verstehen und Vorbereiten wichtiger Unterlagen.",
      germanyAction:"Hilfe bei Unterlagen anfragen", more:"Mehr erfahren",
      germanySummary:"Hilfe beim Verstehen von Briefen, Formularen und Unterlagen für Behörden und andere Stellen.",
      contact:"Kontaktperson", email:"E-Mail schreiben", whatsapp:"WhatsApp öffnen",
      officialKicker:"Offiziell bestätigt", teamTitle:"Unser PEYWAND-Team",
      teamEmpty:"Aktive Teammitglieder werden hier mit ihrem vollständigen Namen veröffentlicht.",
      company:"Unternehmen / Arbeitgeber", paperwork:"Hilfe in Deutschland", teamButton:"Offizielles PEYWAND-Team ansehen",
      firstLanguage:"Sprache ist der erste Schritt", trust:["Sprache","Studium","Ausbildung","Unternehmen"],
      companyNote:"Gute Vermittlung beginnt mit klaren Erwartungen und sorgfältiger Prüfung.", companyFields:["Unternehmen","Ansprechperson","E-Mail","Telefon (optional)","Welche Profile suchen Sie?","Weitere Informationen (optional)"], companyPlaceholder:"Beruf, Anzahl und wichtige Voraussetzungen", companyConsent:"Ich stimme zu, dass die Unternehmensangaben zur Bearbeitung der Anfrage gespeichert und zur Kontaktaufnahme verwendet werden."
      ,pathNav:"Wege & Ziele", offerKickers:["Familie","Deutschland","Unternehmen"], footerSlogan:"SPRACHE · BILDUNG · ZUKUNFT", apply:"Bewerben", classroom:"Lernen"
    },
    en: {
      adviceKicker:"Personal consultation", germanyNav:"Help in Germany",
      germanyKicker:"Already in Germany?", germanyIntro:"If language makes letters, forms or communication with authorities difficult, we help you understand and prepare important documents.",
      germanyAction:"Request document help", more:"Learn more",
      germanySummary:"Help understanding letters, forms and documents for authorities and other organisations.",
      contact:"Contact person", email:"Send email", whatsapp:"Open WhatsApp",
      officialKicker:"Officially confirmed", teamTitle:"Our PEYWAND team",
      teamEmpty:"Active team members are listed here by their full name.",
      company:"Company / employer", paperwork:"Help in Germany", teamButton:"View the official PEYWAND team",
      firstLanguage:"Language is the first step", trust:["Language","University study","Vocational training","Companies"],
      companyNote:"Good connections begin with clear expectations and careful review.", companyFields:["Company","Contact person","Email","Phone (optional)","Which profiles are you looking for?","Additional information (optional)"], companyPlaceholder:"Role, number of people and important requirements", companyConsent:"I agree that the company information may be stored to process the enquiry and used to contact me."
      ,pathNav:"Pathways & goals", offerKickers:["Family","Germany","Companies"], footerSlogan:"LANGUAGE · EDUCATION · FUTURE", apply:"Apply", classroom:"Classroom"
    },
    fa: {
      adviceKicker:"مشاوره شخصی", germanyNav:"کمک در آلمان",
      germanyKicker:"آیا در آلمان زندگی می‌کنید؟", germanyIntro:"اگر زبان در فهم نامه‌ها، فورم‌ها یا ارتباط با ادارات مشکل ایجاد می‌کند، برای درک و آماده‌سازی اسناد مهم کمک می‌کنیم.",
      germanyAction:"درخواست کمک برای اسناد", more:"اطلاعات بیشتر",
      germanySummary:"کمک برای فهم نامه‌ها، فورم‌ها و اسناد مربوط به ادارات و مراکز دیگر.",
      contact:"مسئول تماس", email:"ارسال ایمیل", whatsapp:"باز کردن واتساپ",
      officialKicker:"تأییدشده رسمی", teamTitle:"تیم رسمی پیوند",
      teamEmpty:"اعضای فعال تیم با نام کامل در این بخش معرفی می‌شوند.",
      company:"شرکت / کارفرما", paperwork:"کمک در آلمان", teamButton:"مشاهده تیم رسمی پیوند",
      firstLanguage:"زبان نخستین گام است", trust:["زبان","تحصیل","آوسبیلدونگ","شرکت‌ها"],
      companyNote:"ارتباط خوب با توقعات روشن و بررسی دقیق آغاز می‌شود.", companyFields:["نام شرکت","شخص تماس","ایمیل","شماره تماس (اختیاری)","به کدام پروفایل‌ها نیاز دارید؟","معلومات بیشتر (اختیاری)"], companyPlaceholder:"رشته، تعداد و شرایط مهم", companyConsent:"می‌پذیرم که معلومات شرکت برای بررسی درخواست ذخیره و برای تماس استفاده شود."
      ,pathNav:"مسیرها و هدف‌ها", offerKickers:["خانواده","آلمان","شرکت‌ها"], footerSlogan:"زبان · آموزش · آینده", apply:"ثبت درخواست", classroom:"صنف"
    },
    ps: {
      adviceKicker:"شخصي مشوره", germanyNav:"په آلمان کې مرسته",
      germanyKicker:"ایا په آلمان کې اوسېږئ؟", germanyIntro:"که ژبه د لیکونو، فورمو یا ادارو سره په اړیکه کې ستونزه جوړوي، موږ د مهمو اسنادو په پوهېدو او چمتو کولو کې مرسته کوو.",
      germanyAction:"د اسنادو د مرستې غوښتنه", more:"نور معلومات",
      germanySummary:"د ادارو او نورو ځایونو د لیکونو، فورمو او اسنادو په پوهېدو کې مرسته.",
      contact:"د اړیکې مسئول", email:"برېښنالیک", whatsapp:"واټساپ پرانیزئ",
      officialKicker:"رسمي تایید شوی", teamTitle:"د پیوند رسمي ټیم",
      teamEmpty:"فعال ټیم غړي دلته په خپل بشپړ نوم معرفي کېږي.",
      company:"شرکت / کار ورکوونکی", paperwork:"په آلمان کې مرسته", teamButton:"د پیوند رسمي ټیم وګورئ",
      firstLanguage:"ژبه لومړی ګام دی", trust:["ژبه","پوهنتون","مسلکي روزنه","شرکتونه"],
      companyNote:"ښه اړیکه له روښانه تمو او دقیقې ارزونې څخه پیلېږي.", companyFields:["د شرکت نوم","د اړیکې شخص","برېښنالیک","تلیفون (اختیاري)","تاسې کوم کسان غواړئ؟","نور معلومات (اختیاري)"], companyPlaceholder:"دنده، شمېر او مهم شرطونه", companyConsent:"زه منم چې د شرکت معلومات د غوښتنې د ارزونې او اړیکې لپاره خوندي شي."
      ,pathNav:"لارې او موخې", offerKickers:["کورنۍ","آلمان","شرکتونه"], footerSlogan:"ژبه · زده کړه · راتلونکی", apply:"غوښتنه ولېږئ", classroom:"ټولګی"
    }
  };

  function detect(value) {
    const text = String(value || "").trim().toLowerCase();
    if (text.includes("english")) return "en";
    if (text.includes("پښتو") || text.includes("pashto") || text.includes("paschtu") || text.includes("pachto")) return "ps";
    if (text.includes("دری") || text.includes("فارسی") || text.includes("دري") || text.includes("dari") || text.includes("farsi") || text.includes("persian")) return "fa";
    if (text.includes("deutsch")) return "de";
    return "";
  }

  function set(selector, value) {
    const node = document.querySelector(selector);
    if (node && value && node.textContent !== value) node.textContent = value;
  }

  function translateCompanyForm(copy) {
    const form = document.querySelector("#unternehmen form");
    if (!form) return;
    const names = ["company_name","contact_name","email","company_phone","roles_needed","company_message"];
    names.forEach((name,index) => {
      const field = form.elements.namedItem(name);
      const label = field?.closest("label")?.querySelector("span");
      if (label) label.textContent = copy.companyFields[index];
    });
    const roles = form.elements.namedItem("roles_needed");
    if (roles) roles.placeholder = copy.companyPlaceholder;
    const consent = form.elements.namedItem("company_consent")?.closest("label")?.querySelector("span");
    if (consent) consent.textContent = copy.companyConsent;
    const note = [...document.querySelectorAll("#unternehmen p")].find(node => /Vermittlung|connections|ارتباط|اړیکه/.test(node.textContent));
    if (note) note.textContent = copy.companyNote;
  }

  function localized(prefix, lang) {
    return settings?.[prefix + "_" + lang] || settings?.[prefix + "_de"] || "";
  }

  async function loadData() {
    if (settings) return;
    try {
      const [settingsResponse, teamResponse] = await Promise.all([
        fetch(URL + "/rest/v1/site_settings?id=eq.true&select=*", {headers:{apikey:KEY}}),
        fetch(URL + "/rest/v1/team_members?active=eq.true&select=*&order=sort_order.asc,created_at.asc", {headers:{apikey:KEY}})
      ]);
      settings = settingsResponse.ok ? (await settingsResponse.json())[0] || {} : {};
      team = teamResponse.ok ? await teamResponse.json() : [];
    } catch {
      settings = {};
      team = [];
    }
  }

  function ensureTeamButton() {
    const grid = document.querySelector(".hero-luxury .peyvand-trust-grid");
    if (!grid) return null;
    let button = document.querySelector("#peyvand-official-team-button");
    if (!button) {
      const style = document.createElement("style");
      style.id = "peyvand-team-button-style";
      style.textContent = "#peyvand-official-team-button{display:flex;align-items:center;justify-content:center;gap:10px;max-width:760px;margin:0 auto 38px;padding:14px 20px;border:1px solid rgba(241,207,115,.7);border-radius:999px;background:linear-gradient(90deg,#c99c3d,#efd17a);color:#102b23;font:800 13px/1.3 Arial,sans-serif;text-align:center;text-decoration:none;box-shadow:0 12px 30px rgba(207,165,69,.25)}#peyvand-official-team-button:active{transform:scale(.98)}";
      document.head.append(style);
      button = document.createElement("a");
      button.id = "peyvand-official-team-button";
      button.href = "#peyvand-official-team";
      button.innerHTML = '<span aria-hidden="true">✓</span><span></span>';
      grid.insertAdjacentElement("afterend", button);
    }
    return button;
  }

  function applyPreferredLanguage() {
    if (!localStorage.getItem("peyvand-dari-default-v3")) {
      localStorage.setItem("peyvand-preferred-language", "fa");
      localStorage.setItem("peyvand-dari-default-v3", "1");
    }
    const preferred = localStorage.getItem("peyvand-preferred-language") || "fa";
    current = preferred;
    let attempts = 0;
    const trySelect = () => {
      attempts += 1;
      const visible = detect(document.querySelector('[data-slot="select-value"]')?.textContent);
      if (visible === preferred) { sync(); return true; }
      const trigger = document.querySelector('button[data-slot="select-trigger"]');
      if (!trigger) return false;
      if (trigger.getAttribute("aria-expanded") !== "true") trigger.click();
      setTimeout(() => {
        const option = [...document.querySelectorAll('[role="option"]')].find(item => detect(item.textContent) === preferred);
        if (option) {
          option.click();
          setTimeout(sync,120);
        } else if (attempts < 8) {
          setTimeout(trySelect,180);
        }
      },120);
      return true;
    };
    if (!trySelect()) {
      setTimeout(trySelect,300);
      setTimeout(trySelect,900);
      setTimeout(trySelect,1600);
    }
  }

  async function sync() {
    await loadData();
    const visible = document.querySelector('[data-slot="select-value"]')?.textContent || "";
    current = detect(visible) || current;
    const lang = current;
    const copy = ui[lang];

    const navLinks = document.querySelectorAll("nav a");
    if (navLinks[1]) navLinks[1].textContent = copy.pathNav;
    ["#peyvand-offer-family","#peyvand-offer-germany","#peyvand-offer-company"].forEach((selector,index) => set(selector+" p:first-of-type",copy.offerKickers[index]));
    const entryLabel = document.querySelector(".peyvand-classroom-entry .entry-label");
    if (entryLabel) entryLabel.textContent = copy.classroom;
    const footerSlogan = [...document.querySelectorAll("footer p")].find(node => /SPRACHE|LANGUAGE|زبان|ژبه/.test(node.textContent));
    if (footerSlogan) footerSlogan.textContent = copy.footerSlogan;
    document.querySelectorAll('footer a[href="#bewerbung"]').forEach(link => link.textContent = copy.apply);
    set("#peyvand-sprache .section-kicker", copy.firstLanguage);
    const trustChips = [...document.querySelectorAll(".hero-luxury .peyvand-trust-grid .trust-chip")].filter(chip => !chip.id);
    trustChips.slice(0,4).forEach((chip,index) => {
      const label = chip.querySelector("span:last-child") || chip;
      if (copy.trust[index]) label.textContent = copy.trust[index];
    });
    translateCompanyForm(copy);

    const teamButton = ensureTeamButton();
    if (teamButton) {
      const label = teamButton.querySelector("span:last-child");
      if (label && label.textContent !== copy.teamButton) label.textContent = copy.teamButton;
      teamButton.setAttribute("aria-label", copy.teamButton);
    }
    const officialSection = document.querySelector("#peyvand-official-team");
    const aboutSection = document.querySelector("#ueber-uns");
    if (officialSection && aboutSection && officialSection.nextElementSibling !== aboutSection) aboutSection.before(officialSection);

    document.documentElement.lang = lang === "fa" ? "fa" : lang === "ps" ? "ps" : lang;
    const rtl = lang === "fa" || lang === "ps";
    ["#peyvand-personal-advice","#deutschland-hilfe","#peyvand-contact-person","#peyvand-official-team"].forEach(selector => {
      const section = document.querySelector(selector);
      if (section) section.dir = rtl ? "rtl" : "ltr";
    });

    set("#peyvand-germany-chip span:last-child", copy.germanyNav);
    const germanyChip = document.querySelector("#peyvand-germany-chip");
    if (germanyChip) germanyChip.setAttribute("aria-label", copy.germanyNav);

    set("#peyvand-de-summary h3", copy.germanyNav);
    set("#peyvand-de-summary p", copy.germanySummary);
    set("#peyvand-de-summary a", copy.more);

    set("#peyvand-personal-advice .section-kicker", copy.adviceKicker);
    set("#peyvand-personal-advice h2", localized("personal_advice_title",lang));
    set("#peyvand-personal-advice .advice-wrap > p:last-child", localized("personal_advice_body",lang));

    set("#deutschland-hilfe .section-kicker", copy.germanyKicker);
    set("#deutschland-hilfe h2", localized("germany_title",lang));
    set("#deutschland-hilfe .mx-auto.max-w-3xl > p:last-child", copy.germanyIntro);
    set("#deutschland-hilfe .de-card h3", localized("paperwork_title",lang));
    set("#deutschland-hilfe .de-card p", localized("paperwork_body",lang));
    set("#deutschland-hilfe .de-card a", copy.germanyAction);

    set("#peyvand-contact-person .section-kicker", copy.contact);
    set("#peyvand-contact-person .person-role", localized("contact_role",lang));
    const contactLinks = document.querySelectorAll("#peyvand-contact-person .person-actions a");
    contactLinks.forEach(link => {
      if (link.href.startsWith("mailto:")) link.textContent = copy.email;
      if (link.href.includes("wa.me")) link.textContent = copy.whatsapp;
    });

    set("#peyvand-official-team .official-notice h3", localized("official_title",lang));
    set("#peyvand-official-team .official-notice p", localized("official_body",lang));
    set("#peyvand-official-team .mt-12 .section-kicker", copy.officialKicker);
    set("#peyvand-official-team .mt-12 h2", copy.teamTitle);
    const empty = document.querySelector("#peyvand-official-team .mt-7.text-center");
    if (empty && !team.length) empty.textContent = copy.teamEmpty;

    document.querySelectorAll("#peyvand-official-team .team-card").forEach(card => {
      const name = card.querySelector("h4")?.textContent?.trim();
      const member = team.find(item => item.full_name === name);
      if (!member) return;
      const role = card.querySelector("strong");
      const qualification = card.querySelector("p");
      const roleText = member["role_" + lang] || member.role_de || "";
      const qualificationText = member["qualification_" + lang] || member.qualification_de || "";
      if (role && role.textContent !== roleText) role.textContent = roleText;
      if (qualification && qualification.textContent !== qualificationText) qualification.textContent = qualificationText;
    });

    const pathway = document.querySelector('#bewerbung select[name="pathway"]');
    if (pathway) {
      [...pathway.options].filter(option => option.value === "private_lessons").forEach(option => option.remove());
      const paperwork = [...pathway.options].find(option => option.value === "paperwork_help");
      if (paperwork) paperwork.textContent = copy.paperwork;
      const company = [...pathway.options].find(option => option.value === "unternehmen");
      if (company) company.textContent = copy.company;
    }
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(sync, 180);
  }

  document.addEventListener("click", event => {
    const option = event.target.closest?.('[role="option"]');
    const detected = option ? detect(option.textContent) : "";
    if (detected) {
      current = detected;
      localStorage.setItem("peyvand-preferred-language", detected);
      setTimeout(sync, 30);
      setTimeout(sync, 350);
      setTimeout(sync, 900);
    }
  }, true);
  document.addEventListener("change", schedule);
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",() => { sync(); applyPreferredLanguage(); });
  else { sync(); applyPreferredLanguage(); }
})();
