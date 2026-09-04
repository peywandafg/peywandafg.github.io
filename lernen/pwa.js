(() => {
  "use strict";
  const button = document.querySelector("#install-app");
  if (!button) return;
  const text = {
    fa: { button: "نصب برنامه", ios: "در Safari روی اشتراک‌گذاری بزنید و «Add to Home Screen» را انتخاب کنید." },
    ps: { button: "اپ نصب کړئ", ios: "په Safari کې Share ووهئ او «Add to Home Screen» وټاکئ." },
    de: { button: "App installieren", ios: "In Safari auf Teilen tippen und „Zum Home-Bildschirm“ auswählen." },
    en: { button: "Install app", ios: "In Safari, tap Share and choose “Add to Home Screen”." }
  };
  let promptEvent = null;
  const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const language = () => document.querySelector("#language")?.value || "fa";
  const label = () => { button.textContent = text[language()]?.button || text.fa.button; };
  if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("/lernen/sw.js", {scope:"/lernen/"}).catch(() => {}));
  if (!standalone && isIos) button.hidden = false;
  addEventListener("beforeinstallprompt", event => { event.preventDefault(); promptEvent = event; button.hidden = false; });
  addEventListener("appinstalled", () => { promptEvent = null; button.hidden = true; });
  document.querySelector("#language")?.addEventListener("change", label);
  button.addEventListener("click", async () => {
    if (promptEvent) { promptEvent.prompt(); await promptEvent.userChoice; promptEvent = null; button.hidden = true; return; }
    alert(text[language()]?.ios || text.fa.ios);
  });
  label();
})();
