// all the events live here, add or edit them in this one place
// (the data is dummy, dates and places are made up)
const events = [
  {id:1, title:"ورشة تطوير شبكات الحاسوب", cat:"تقنية", catClass:"cat-tech", date:"2026-11-12", time:"10:00 ص", place:"قاعة الشبكات - مبنى التقنية", loc:"دمشق", img:"assets/img/شبكات الحاسوب.jpeg", featured:true,
   short:"ورشة عملية لبناء شبكة محلية وضبط التوجيه والعناوين خطوة بخطوة.",
   long:"تمتد الورشة على يوم كامل يتعلم فيها المشاركون تصميم الشبكات المحلية، وتقسيم العناوين، وضبط أجهزة التوجيه والتبديل، ثم اختبار الاتصال وحل الأعطال الشائعة. يُنصح بإحضار حاسوب محمول."},
  {id:2, title:"بطولة الشطرنج الجامعية", cat:"رياضة", catClass:"cat-sport", date:"2026-11-20", time:"09:00 ص", place:"الصالة الرياضية المغلقة", loc:"حلب", img:"assets/img/الشطرنج.jpeg", featured:true,
   short:"منافسة بين طلاب الجامعة بنظام الإقصاء مع جوائز للمراكز الأولى.",
   long:"تقام البطولة بنظام الإقصاء المباشر على عدة أدوار، وتفتح باب التسجيل لجميع الطلاب. تُمنح كؤوس وشهادات تقدير للفائزين، وتُقام مباراة استعراضية في الختام مع أحد اللاعبين المخضرمين."},
  {id:3, title:"ندوة القراءة والابتكار", cat:"ثقافة", catClass:"cat-culture", date:"2026-11-27", time:"05:00 م", place:"مكتبة الجامعة", loc:"دمشق", img:"assets/img/القراءة.jpeg", featured:false,
   short:"حوار مفتوح عن أثر القراءة في تنمية التفكير الإبداعي لدى الطلاب.",
   long:"يستضيف اللقاء كتّابًا وأكاديميين يناقشون كيف تقود القراءة إلى الأفكار الجديدة، مع فقرة لتبادل الكتب بين الحضور ومسابقة قصيرة في نهاية الندوة."},
  {id:4, title:"المؤتمر العلمي السنوي للذكاء الاصطناعي", cat:"علمي", catClass:"cat-science", date:"2026-12-05", time:"09:30 ص", place:"عبر الإنترنت - منصة الجامعة", loc:"عبر الإنترنت", img:"assets/img/المؤتمر.jpeg", featured:true,
   short:"أبحاث وجلسات نقاش حول أحدث تطبيقات الذكاء الاصطناعي وأخلاقياته.",
   long:"يجمع المؤتمر باحثين ومتخصصين لعرض أوراق علمية وجلسات حوارية حول التعلم الآلي ومعالجة اللغة العربية والأخلاقيات. يمكن حضور الجلسات مباشرة أو مشاهدة التسجيلات لاحقًا."},
  {id:5, title:"معرض البرمجيات والمشاريع الطلابية", cat:"معارض", catClass:"cat-expo", date:"2026-12-15", time:"11:00 ص", place:"القاعة الكبرى", loc:"اللاذقية", img:"assets/img/معرض البرمجيات.jpeg", featured:true,
   short:"يعرض الطلاب مشاريعهم البرمجية أمام لجنة تحكيم وزوار من سوق العمل.",
   long:"معرض سنوي يقدّم فيه الطلاب تطبيقات ومواقع وأنظمة من تنفيذهم، وتقيّمها لجنة من أساتذة وخبراء. تتاح للزوار تجربة المشاريع والتحدث مع أصحابها."}
];

const $ = (s, r = document) => r.querySelector(s);
const fmt = d => new Date(d + "T00:00:00").toLocaleDateString("ar-SY", {year:"numeric", month:"long", day:"numeric"});
const today = new Date().toISOString().slice(0, 10);
const imgSrc = e => encodeURI(e.img);

// builds one event card (used on the home, events and related sections)
function cardHTML(e, cols = "col-md-6 col-lg-4") {
  const todayBadge = e.date === today ? '<span class="badge today-badge">الحدث اليوم</span>' : "";
  return `<div class="${cols}"><div class="card event-card h-100">
    <div class="img-box"><img src="${imgSrc(e)}" alt="${e.title}" onerror="this.classList.add('img-missing')">
      <span class="badge ${e.catClass}">${e.cat}</span>${todayBadge}</div>
    <div class="card-body d-flex flex-column">
      <h5>${e.title}</h5>
      <p class="meta mb-1"><i class="bi bi-calendar-event"></i> ${fmt(e.date)}</p>
      <p class="meta"><i class="bi bi-geo-alt"></i> ${e.place}</p>
      <p>${e.short}</p>
      <a class="btn btn-primary mt-auto" href="event.html?id=${e.id}">التفاصيل</a>
    </div></div></div>`;
}

/* ---------- theme (dark / light) ---------- */
const root = document.documentElement;
const themeBtn = $("#themeBtn");
function setTheme(t) {
  root.setAttribute("data-bs-theme", t);
  localStorage.setItem("theme", t);
  if (themeBtn) themeBtn.innerHTML = t === "dark" ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
}
setTheme(localStorage.getItem("theme") || "light");
if (themeBtn) themeBtn.addEventListener("click", () => setTheme(root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark"));

/* ---------- scroll to top arrow ---------- */
const toTop = $("#toTop");
window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 300));
toTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

/* ---------- home page ---------- */
function initHome() {
  // slider made from the featured events
  const feat = events.filter(e => e.featured);
  $("#slides").innerHTML = feat.map((e, i) => `<div class="carousel-item ${i ? "" : "active"}" data-bs-interval="4500">
    <div class="hero-slide"><img src="${imgSrc(e)}" alt="${e.title}" onerror="this.classList.add('img-missing')">
    <div class="hero-caption"><div class="container"><span class="badge ${e.catClass} mb-2">${e.cat}</span>
    <h2>${e.title}</h2><p class="mb-2">${fmt(e.date)} - ${e.place}</p>
    <a href="event.html?id=${e.id}" class="btn btn-accent">شاهد التفاصيل</a></div></div></div></div>`).join("");
  $("#indicators").innerHTML = feat.map((e, i) => `<button type="button" data-bs-target="#featured" data-bs-slide-to="${i}" class="${i ? "" : "active"}"></button>`).join("");
  // newest 3 events
  const latest = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  $("#latest").innerHTML = latest.map(e => cardHTML(e)).join("");
}

/* ---------- events page ---------- */
function initEvents() {
  const q = $("#q"), cat = $("#cat"), loc = $("#loc"), from = $("#from"), list = $("#list");
  [...new Set(events.map(e => e.cat))].forEach(c => cat.add(new Option(c, c)));
  [...new Set(events.map(e => e.loc))].forEach(c => loc.add(new Option(c, c)));

  // category can come from the url (home badges) or from the last choice saved
  const urlCat = new URLSearchParams(location.search).get("cat");
  cat.value = urlCat || localStorage.getItem("lastCat") || "";

  function render() {
    localStorage.setItem("lastCat", cat.value);
    const res = events.filter(e =>
      (!q.value || e.title.includes(q.value.trim()) || e.short.includes(q.value.trim())) &&
      (!cat.value || e.cat === cat.value) &&
      (!loc.value || e.loc === loc.value) &&
      (!from.value || e.date >= from.value));
    list.innerHTML = res.length ? res.map(e => cardHTML(e)).join("")
      : '<div class="col-12"><div class="alert alert-warning">لا توجد فعاليات مطابقة، جرّب تغيير خيارات البحث.</div></div>';
    $("#count").textContent = res.length;
  }
  [q, cat, loc, from].forEach(el => el.addEventListener("input", render));
  $("#reset").addEventListener("click", () => { q.value = cat.value = loc.value = from.value = ""; render(); });
  render();
}

/* ---------- single event page ---------- */
function initEvent() {
  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const e = events.find(x => x.id === id) || events[0];
  document.title = e.title + " | دليل فعاليات الجامعة";
  $("#evTitle").textContent = e.title;
  $("#evCat").textContent = e.cat;
  $("#evCat").className = "badge mb-2 " + e.catClass;
  $("#evDate").textContent = fmt(e.date) + " - " + e.time;
  $("#evPlace").textContent = e.place;
  $("#evDesc").textContent = e.long;
  $("#evImg").src = imgSrc(e);
  // gallery pictures per event: gallery1-1.jpg, gallery1-2.jpg ... (event id, then picture number)
for (let i = 1; i <= 3; i++) $("#g" + i).src = "assets/img/gallery" + e.id + "-" + i + ".jpg";
  $("#modalTitle").textContent = e.title;

  // add to calendar -> download a small .ics file (all day event)
  $("#calBtn").addEventListener("click", () => {
    const d = e.date.replace(/-/g, "");
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${e.title}\nLOCATION:${e.place}\nDTSTART;VALUE=DATE:${d}\nEND:VEVENT\nEND:VCALENDAR`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], {type: "text/calendar"}));
    a.download = "event.ics";
    a.click();
  });

  // share: use the phone share sheet if there is one, otherwise copy the link
  $("#shareBtn").addEventListener("click", () => {
    if (navigator.share) navigator.share({title: e.title, url: location.href});
    else navigator.clipboard.writeText(location.href).then(() => alert("تم نسخ رابط الفعالية"));
  });

  // fake booking from the modal (bonus)
  $("#bookForm").addEventListener("submit", ev => {
    ev.preventDefault();
    const n = $("#bookName").value.trim();
    $("#bookMsg").innerHTML = n.length < 3
      ? '<div class="alert alert-danger">اكتب اسمك الكامل (3 أحرف على الأقل).</div>'
      : `<div class="alert alert-success">تم حجز مقعد باسم ${n}. نراك في الفعالية!</div>`;
  });

  // related = same category first, then fill with the others
  const rel = [...events.filter(x => x.id !== e.id && x.cat === e.cat), ...events.filter(x => x.id !== e.id && x.cat !== e.cat)].slice(0, 3);
  $("#related").innerHTML = rel.map(x => cardHTML(x, "col-md-4")).join("");
}

/* ---------- contact form ---------- */
function initContact() {
  const form = $("#contactForm"), box = $("#formAlert");
  form.addEventListener("submit", ev => {
    ev.preventDefault();
    const name = $("#name").value.trim(), mail = $("#email").value.trim(), msg = $("#msg").value.trim();
    const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    const errors = [];
    if (name.length < 3) errors.push("الاسم مطلوب (3 أحرف على الأقل)");
    if (!mailOk) errors.push("صيغة البريد الإلكتروني غير صحيحة");
    if (msg.length < 10) errors.push("الرسالة قصيرة جدًا (10 أحرف على الأقل)");
    if (errors.length) {
      box.innerHTML = '<div class="alert alert-danger"><ul class="mb-0"><li>' + errors.join("</li><li>") + "</li></ul></div>";
    } else {
      box.innerHTML = '<div class="alert alert-success">تم إرسال رسالتك بنجاح، سنرد عليك قريبًا.</div>';
      form.reset();
    }
  });
}

const page = document.body.dataset.page;
if (page === "home") initHome();
if (page === "events") initEvents();
if (page === "event") initEvent();
if (page === "contact") initContact();
