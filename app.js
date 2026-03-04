/* eslint-disable no-console */

// -----------------------------
// Data (same pillars as your Flask version)
// -----------------------------
const PILLAR_TO_FOOTAGE = {
    BEGINNER: ["warmups", "drilling"],
    KIDS: ["kids class"],
    CULTURE: ["warmups", "rolling"],
    HUMOUR: ["rolling"],
    STUDENT: ["student interview", "rolling"],
};
const PILLARS = Object.keys(PILLAR_TO_FOOTAGE);

const HOOKS = {
    CULTURE: [
        "A normal night at a BJJ gym.",
        "What most people misunderstand about BJJ gyms.",
        "What makes a great jiu-jitsu gym.",
        "Why people stay training BJJ for years.",
        "The best part of BJJ isn’t the techniques.",
    ],
    BEGINNER: [
        "What your first BJJ class actually feels like.",
        "Most people think they're too unfit to start BJJ.",
        "The biggest myth about starting jiu-jitsu.",
        "The moment BJJ finally starts making sense.",
        "What I wish I knew before my first class.",
        "Everyone feels awkward on their first day. That's normal.",
    ],
    KIDS: [
        "Why parents choose BJJ for their kids.",
        "What parents are surprised by in kids BJJ.",
        "The confidence difference after a few months of kids BJJ.",
        "What a kids BJJ class really looks like.",
        "How BJJ helps kids build confidence.",
        "What kids actually learn in BJJ class.",
    ],
    HUMOUR: [
        "White belt brain during rolling.",
        "When you forget every technique mid roll.",
        "Every beginner experiences this moment.",
        "Things BJJ coaches see every class.",
        "The moment you realise BJJ is addictive.",
    ],
    STUDENT: [
        "Meet the newest member of the team.",
        "Why this student started training.",
        "From nervous beginner to confident teammate.",
        "What surprised this student about BJJ.",
        "The story behind starting jiu-jitsu.",
    ],
};

const BENEFIT_LINES = {
    CULTURE: [
        "Good training. Good people. No egos.",
        "A gym that feels like a team.",
        "Show up, train, improve - simple.",
    ],
    BEGINNER: [
        "Beginners welcome - you don’t need to be fit to start.",
        "Your first class isn’t supposed to feel smooth - just show up.",
        "Nervous is normal. Starting is the win.",
    ],
    KIDS: [
        "Kids build confidence, focus, and discipline.",
        "Fun classes that quietly build strong kids.",
        "More confidence - on and off the mats.",
    ],
    HUMOUR: [
        "Train hard. Laugh harder. Come be part of it.",
        "No ego. Just good rounds and good people.",
        "If you can laugh, you can learn.",
    ],
    STUDENT: [
        "Real people. Real progress. One class at a time.",
        "You don’t have to be ready. You just have to start.",
        "Consistency beats talent. We’ll help you stick with it.",
    ],
};

const CTAS = [
    "DM us to book a free trial.",
    "Book a free trial class this week.",
    "Message us and we’ll get you started.",
    "Keen to try it? Send us a DM.",
    "Kids program enquiries - DM us.",
];

const CAROUSEL_LIBRARY = [
    {
        pillar: "BEGINNER",
        title: "5 things people worry about before their first BJJ class",
        slides: [
            "I’m too unfit",
            "I’ll embarrass myself",
            "Everyone will be better than me",
            "I’ll get injured",
            "I won’t understand anything",
            "Final: You’ll be fine. Try one class.",
        ],
        shoot: ["warmups", "drilling"],
    },
    {
        pillar: "KIDS",
        title: "What kids really learn in BJJ",
        slides: [
            "Confidence",
            "Discipline",
            "Problem solving",
            "Respect",
            "Friendship",
            "Final: Kids classes running - message us for a trial.",
        ],
        shoot: ["kids class"],
    },
    {
        pillar: "CULTURE",
        title: "What makes a great BJJ gym",
        slides: [
            "Supportive teammates",
            "Beginner-friendly culture",
            "Coaches who care",
            "Consistency over intensity",
            "A place you can bring your family",
            "Final: Come try a class.",
        ],
        shoot: ["warmups", "rolling"],
    },
    {
        pillar: "HUMOUR",
        title: "5 White Belt Moments Everyone Has",
        slides: [
            "1) Forget everything",
            "2) Hold your breath",
            "3) Grab sleeves for dear life",
            "4) Get swept by nothing",
            "5) Still come back",
            "Final: Laugh, learn, come back tomorrow - DM for a free trial.",
        ],
        shoot: ["rolling"],
    },
    {
        pillar: "STUDENT",
        title: "Student Spotlight: What Changed After Starting BJJ",
        slides: [
            "Confidence",
            "Fitness",
            "Focus",
            "Community",
            "Progress",
            "Final: Want the same change? DM us and we’ll get you started.",
        ],
        shoot: ["student interview", "rolling"],
    },
];

const STORY_PACKS = [
    { film: "warmups", length: "6s", overlay: "Beginner friendly classes", sticker: null },
    { film: "drilling", length: "6s", overlay: "You don’t need to be fit to start", sticker: "POLL: Ever thought about trying BJJ? (Yes / Not yet)" },
    { film: "rolling", length: "6s", overlay: "Normal night at the gym", sticker: null },
    { film: "kids class", length: "6s", overlay: "Kids classes running", sticker: "POLL: Would your kid enjoy BJJ? (Yep / Maybe)" },
    { film: "gym vibe (high fives / handshake)", length: "6s", overlay: "Good people. Good training.", sticker: "CTA: DM us to book a free trial" },
];

const INTERVIEW_QUESTIONS = [
    "What made you try BJJ?",
    "What surprised you most about your first class?",
    "What would you say to someone nervous about starting?",
];

const FILM_SESSION_PLAN = {
    kids_minutes: 10,
    adult_minutes: 10,
    interview_minutes: 3,
    kids: [
        ["Kids warmup/game", "3 clips", "3 seconds each"],
        ["Kids technique", "2 clips", "3 seconds each"],
        ["Kids high fives / lineup", "1 clip", "2 seconds"],
    ],
    adults: [
        ["Warmups", "3 clips", "3 seconds each"],
        ["Technique drilling", "3 clips", "3 seconds each"],
        ["Rolling", "3 clips", "3 seconds each"],
        ["High fives / handshake line", "1 clip", "2 seconds"],
    ],
    interview: [
        ["Pick 1 student", "2 questions", "20 seconds each"],
        ["Film vertical", "quiet corner", "natural light"],
    ],
};

// -----------------------------
// Seeded RNG
// -----------------------------
function mulberry32(seed) {
    let t = seed >>> 0;
    return function () {
        t += 0x6D2B79F5;
        let x = Math.imul(t ^ (t >>> 15), 1 | t);
        x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
}
function makeRng(seed) {
    const r = mulberry32(seed);
    return {
        rand: () => r(),
        choice: (arr) => arr[Math.floor(r() * arr.length)],
        shuffle: (arr) => {
            const a = arr.slice();
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(r() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        },
    };
}
function todaySeed() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return Number(`${y}${m}${day}`);
}

// -----------------------------
// Engine
// -----------------------------
function pickUnique(items, k, rng) {
    return rng.shuffle(items).slice(0, k);
}
function pickHook(pillar, rng) {
    if (pillar === "KIDS" && rng.rand() < 0.70) return HOOKS.KIDS[Math.floor(rng.rand() * 2)];
    if (pillar === "CULTURE" && rng.rand() < 0.70) return HOOKS.CULTURE[Math.floor(rng.rand() * 2)];
    return rng.choice(HOOKS[pillar]);
}
function formatCaption(pillar, ctx, rng) {
    const benefit = rng.choice(BENEFIT_LINES[pillar]);
    const local = ctx.location.trim() ? `In ${ctx.location.trim()}.` : "";
    const cta = rng.choice(CTAS);
    return [benefit, local, cta].filter(Boolean).join("\n").trim();
}
function makeReel(pillar, ctx, rng) {
    const hook = pickHook(pillar, rng);
    const caption = formatCaption(pillar, ctx, rng);
    const cta = rng.choice(CTAS);
    const footage = PILLAR_TO_FOOTAGE[pillar];

    const filmLines = [];
    filmLines.push(`${footage[0]} - 3 clips (3 seconds each)`);
    if (footage.length > 1) filmLines.push(`${footage[1]} - 2 clips (3 seconds each)`);
    if (pillar === "CULTURE" || pillar === "BEGINNER") filmLines.push("high fives / handshake line - 1 clip (2 seconds)");

    const film = filmLines.map((l, i) => `${i + 1}. ${l}`).join("\n");
    return { pillar, film, hook, caption, cta };
}
function pickCarousel(pillar, rng) {
    const candidates = CAROUSEL_LIBRARY.filter(c => c.pillar === pillar);
    return rng.choice(candidates.length ? candidates : CAROUSEL_LIBRARY.filter(c => c.pillar === "CULTURE"));
}
function localiseCarousel(carousel, ctx, rng) {
    const c = { ...carousel, slides: carousel.slides.slice() };
    if (ctx.location.trim() && rng.rand() < 0.60) {
        for (let i = 0; i < c.slides.length; i++) {
            const s = c.slides[i];
            if (typeof s === "string" && s.startsWith("Final:") && !s.toLowerCase().includes(ctx.location.toLowerCase())) {
                c.slides[i] = s.replace(/\.$/, "") + ` in ${ctx.location}.`;
                break;
            }
        }
    }
    return c;
}
function buildCalendar(rng) {
    const satCar = rng.choice(["CULTURE", "KIDS"]);
    return [
        ["MON", "REEL", "CULTURE"],
        ["TUE", "CAROUSEL", "BEGINNER"],
        ["WED", "REEL", "BEGINNER"],
        ["THU", "STORIES", "MIX"],
        ["FRI", "REEL", "KIDS"],
        ["SAT", "CAROUSEL", satCar],
        ["SUN", "STORIES", "CTA"],
    ];
}
function calendarSatPillar(calendar) {
    for (const [day, kind, pillar] of calendar) {
        if (day === "SAT" && kind === "CAROUSEL") return pillar;
    }
    return "CULTURE";
}
function buildFilmChecklist(ctx) {
    const totalMinutes = FILM_SESSION_PLAN.kids_minutes + FILM_SESSION_PLAN.adult_minutes + FILM_SESSION_PLAN.interview_minutes;
    const lines = [];
    lines.push(`TOTAL TIME: ~${totalMinutes} minutes`);
    lines.push("");
    lines.push(`KIDS CLASS (~${FILM_SESSION_PLAN.kids_minutes} mins)`);
    FILM_SESSION_PLAN.kids.forEach((x, i) => lines.push(`${i + 1}. ${x[0]} - ${x[1]} (${x[2]})`));
    lines.push("");
    lines.push(`ADULTS CLASS (~${FILM_SESSION_PLAN.adult_minutes} mins)`);
    FILM_SESSION_PLAN.adults.forEach((x, i) => lines.push(`${i + 1}. ${x[0]} - ${x[1]} (${x[2]})`));
    lines.push("");
    lines.push(`INTERVIEW (~${FILM_SESSION_PLAN.interview_minutes} mins)`);
    FILM_SESSION_PLAN.interview.forEach((x, i) => lines.push(`${i + 1}. ${x.join(" - ")}`));
    if (ctx.location.trim()) {
        lines.push("");
        lines.push(`LOCAL NOTE: Mention '${ctx.location}' once in a caption this week.`);
    }
    return { total_minutes: totalMinutes, lines };
}
function generateWeek(ctx, seed) {
    const s = (seed == null) ? todaySeed() : seed;
    const rng = makeRng(s);

    const calendar = buildCalendar(rng);
    const satPillar = calendarSatPillar(calendar);

    const reels = {};
    PILLARS.forEach(p => { reels[p] = makeReel(p, ctx, rng); });

    const carousel_beginner = localiseCarousel(pickCarousel("BEGINNER", rng), ctx, rng);
    const carousel_saturday = localiseCarousel(pickCarousel(satPillar, rng), ctx, rng);

    const stories = STORY_PACKS.map((sp, idx) => {
        let line = `Story ${idx + 1}: Film ${sp.film} (${sp.length}) - Overlay: “${sp.overlay}”`;
        if (sp.sticker) line += ` - ${sp.sticker}`;
        if (idx === 4 && ctx.location.trim()) line += ` - Local: ${ctx.location}`;
        return line;
    });

    const interview_qs = pickUnique(INTERVIEW_QUESTIONS, 2, rng);

    return {
        film_checklist: buildFilmChecklist(ctx),
        calendar,
        reels,
        carousel_beginner,
        carousel_saturday,
        stories,
        interview_qs,
        sat_carousel_pillar: satPillar,
        _seed: s,
    };
}
function generateMonth(ctx, baseVariation) {
    const seeds = (baseVariation == null) ? [1, 2, 3, 4] : [baseVariation, baseVariation + 1, baseVariation + 2, baseVariation + 3];
    return seeds.map((seed, i) => ({ week_number: i + 1, variation: seed, result: generateWeek(ctx, seed) }));
}
function renderWeekPackText(ctx, result) {
    const lines = [];
    lines.push(`${ctx.gym} - WEEK CONTENT PACK\n`);
    lines.push(`Location: ${ctx.location}\n`);
    lines.push("Goal: Trial class bookings + kids program signups\n");
    lines.push("=".repeat(60) + "\n");

    lines.push("FILM THIS SESSION FIRST (ONE VISIT THIS WEEK)\n");
    result.film_checklist.lines.forEach(l => lines.push(l + "\n"));
    lines.push("\n" + "=".repeat(60) + "\n");

    lines.push("POSTING CALENDAR (Mon-Sun)\n");
    result.calendar.forEach(([day, kind, pillar]) => {
        lines.push(`- ${day}: ${kind}${pillar ? ` (${pillar})` : ""}\n`);
    });

    lines.push("\n" + "=".repeat(60) + "\n");
    lines.push("REELS (3)\n");
    ["CULTURE", "BEGINNER", "KIDS"].forEach(key => {
        const r = result.reels[key];
        lines.push(`\nREEL - ${key}\n`);
        lines.push("FILM THIS:\n" + r.film + "\n\n");
        lines.push("TEXT ON SCREEN:\n" + r.hook + "\n\n");
        lines.push("CAPTION:\n" + r.caption + "\n\n");
        lines.push("CTA:\n" + r.cta + "\n");
    });

    lines.push("\n" + "=".repeat(60) + "\n");
    lines.push("CAROUSELS (2)\n");

    const cb = result.carousel_beginner;
    lines.push("\nCAROUSEL - BEGINNER\n");
    lines.push(`TITLE: ${cb.title}\n`);
    lines.push("HOW TO BUILD: Text-only slides. 1080x1350. Keep each slide under 8 words.\n");
    lines.push("SLIDES:\n- " + cb.slides.join("\n- ") + "\n");
    lines.push("BACKGROUND FOOTAGE TO FILM:\n- " + cb.shoot.join("\n- ") + "\n");

    const cs = result.carousel_saturday;
    lines.push("\nCAROUSEL - SATURDAY\n");
    lines.push(`TITLE: ${cs.title}\n`);
    lines.push("HOW TO BUILD: Text-only slides. 1080x1350. Keep each slide under 8 words.\n");
    lines.push("SLIDES:\n- " + cs.slides.join("\n- ") + "\n");
    lines.push("BACKGROUND FOOTAGE TO FILM:\n- " + cs.shoot.join("\n- ") + "\n");

    lines.push("\n" + "=".repeat(60) + "\n");
    lines.push("STORIES (5)\n");
    result.stories.forEach(s => lines.push("- " + s + "\n"));

    lines.push("\n" + "=".repeat(60) + "\n");
    lines.push("INTERVIEW (2 questions)\n");
    result.interview_qs.forEach(q => lines.push("- " + q + "\n"));

    return lines.join("");
}
function safeFilename(name) {
    const s = (name || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    return (s || "gym").slice(0, 64);
}

// -----------------------------
// Render
// -----------------------------
function sectionSummary(icon, title, pillText) {
    return `
    <summary>
      <span class="section-title"><span class="ico">${icon}</span>${title}</span>
      ${pillText ? `<span class="pill">${pillText}</span>` : ""}
    </summary>
  `;
}

function renderWeekHTML(result, prefixId = "") {
    const id = (x) => prefixId ? `${prefixId}-${x}` : x;

    const calDays = result.calendar.map(([day, kind, pillar]) => {
        let jump = "";
        if (kind === "REEL") jump = `<a class="jump" href="#${id(`reel-${pillar}`)}">POST THIS: ${pillar} REEL</a>`;
        else if (kind === "CAROUSEL" && pillar === "BEGINNER") jump = `<a class="jump" href="#${id("carousel-beginner")}">POST THIS: BEGINNER CAROUSEL</a>`;
        else if (kind === "CAROUSEL") jump = `<a class="jump" href="#${id("carousel-saturday")}">POST THIS: SATURDAY CAROUSEL</a>`;
        else if (kind === "STORIES") jump = `<a class="jump" href="#${id("stories")}">POST THIS: STORIES</a>`;

        return `
      <div class="day">
        <div class="d">${day}</div>
        <div class="t">${kind}</div>
        ${pillar ? `<div class="tag">${pillar}</div>` : ""}
        ${jump}
      </div>
    `;
    }).join("");

    const reels = ["CULTURE", "BEGINNER", "KIDS"].map((key) => {
        const r = result.reels[key];
        return `
      <div class="block" id="${id(`reel-${key}`)}">
        <div class="k">${key} REEL</div>

        <div class="k">FILM THIS</div>
        <div class="v">${escapeHtml(r.film)}</div>

        <div style="height:10px"></div>
        <div class="k">TEXT ON SCREEN</div>
        <div class="v">${escapeHtml(r.hook)}</div>

        <div style="height:10px"></div>
        <div class="k">CAPTION (COPY/PASTE)</div>
        <div class="v">${escapeHtml(r.caption)}</div>

        <div style="height:10px"></div>
        <div class="k">CTA</div>
        <div class="v">${escapeHtml(r.cta)}</div>
      </div>
    `;
    }).join("");

    const carouselSlides = (slides) => slides.map(s => `<li>${escapeHtml(String(s))}</li>`).join("");
    const shootLines = (shoot) => shoot.map(s => `- ${s}`).join("\n");

    return `
    <details class="section film" open>
      ${sectionSummary("🎬", "Film This Session First", "one visit per week")}
      <div class="section-body">
        <div class="block">
          <div class="k">DO THIS ONCE, THEN YOU'RE DONE FOR THE WEEK</div>
          <div class="v">${escapeHtml(result.film_checklist.lines.join("\n"))}</div>
        </div>
      </div>
    </details>

    <details class="section calendarSec" open>
      ${sectionSummary("📅", "Posting Calendar", "click to jump")}
      <div class="section-body">
        <div class="calendar">${calDays}</div>
      </div>
    </details>

    <details class="section reels" open>
      ${sectionSummary("🎥", "Reels (3)", "film + post")}
      <div class="section-body">
        <div class="grid3">${reels}</div>
      </div>
    </details>

    <details class="section carousels">
      ${sectionSummary("🧩", "Carousels (2)", "build + post")}
      <div class="section-body">
        <div class="grid3">
          <div class="block" id="${id("carousel-beginner")}">
            <div class="k">BEGINNER CAROUSEL</div>
            <div class="v"><strong>${escapeHtml(result.carousel_beginner.title)}</strong></div>

            <div style="height:10px"></div>
            <div class="k">HOW TO BUILD</div>
            <div class="v">Text-only slides (clean background). 1080x1350. Keep each slide under 8 words.</div>

            <div style="height:10px"></div>
            <div class="k">SLIDES</div>
            <ul class="list">${carouselSlides(result.carousel_beginner.slides)}</ul>

            <div style="height:10px"></div>
            <div class="k">OPTIONAL BACKGROUND FOOTAGE</div>
            <div class="v">${escapeHtml(shootLines(result.carousel_beginner.shoot))}</div>
          </div>

          <div class="block" id="${id("carousel-saturday")}">
            <div class="k">SATURDAY CAROUSEL (${escapeHtml(result.sat_carousel_pillar)})</div>
            <div class="v"><strong>${escapeHtml(result.carousel_saturday.title)}</strong></div>

            <div style="height:10px"></div>
            <div class="k">HOW TO BUILD</div>
            <div class="v">Text-only slides (clean background). 1080x1350. Keep each slide under 8 words.</div>

            <div style="height:10px"></div>
            <div class="k">SLIDES</div>
            <ul class="list">${carouselSlides(result.carousel_saturday.slides)}</ul>

            <div style="height:10px"></div>
            <div class="k">OPTIONAL BACKGROUND FOOTAGE</div>
            <div class="v">${escapeHtml(shootLines(result.carousel_saturday.shoot))}</div>
          </div>

          <div class="block">
            <div class="k">CAROUSEL TEMPLATE TIP</div>
            <div class="v">Use the same font + layout for every carousel. Don’t redesign each week.</div>
          </div>
        </div>
      </div>
    </details>

    <details class="section stories" id="${id("stories")}">
      ${sectionSummary("📚", "Stories (5)", "film + post")}
      <div class="section-body">
        <div class="block">
          <ul class="list">${result.stories.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
        </div>
      </div>
    </details>

    <details class="section interview" id="${id("interview")}">
      ${sectionSummary("🎤", "Interview (2)", "quick clips")}
      <div class="section-body">
        <div class="block">
          <div class="k">FILM THIS</div>
          <div class="v">1 student. 20-30 seconds per answer. Film vertical. Quiet corner. Natural light.</div>
          <div style="height:10px"></div>
          <div class="k">QUESTIONS</div>
          <ul class="list">${result.interview_qs.map(q => `<li>${escapeHtml(q)}</li>`).join("")}</ul>
        </div>
      </div>
    </details>
  `;
}

function escapeHtml(s) {
    return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// -----------------------------
// UI glue
// -----------------------------
let lastWeekResult = null;
let lastCtx = null;

function readInputs() {
    const gym = (document.getElementById("gym").value || "BJJ Gym").trim();
    const location = (document.getElementById("location").value || "Old Bar, NSW").trim();
    const variationRaw = (document.getElementById("variation").value || "").trim();
    const variation = variationRaw ? Number.parseInt(variationRaw, 10) : null;
    return { gym, location, variation: Number.isFinite(variation) ? variation : null };
}

function showTools(show) {
    document.getElementById("tools").style.display = show ? "flex" : "none";
}

function renderWeek(result, ctx) {
    lastWeekResult = result;
    lastCtx = ctx;

    const out = document.getElementById("output");
    out.innerHTML = `
    <details class="week card" open>
      <summary>
        <div class="week-title">Week Output <span class="pill">Seed ${result._seed}</span></div>
        <div class="chev">click to collapse</div>
      </summary>
      <div class="week-body">
        ${renderWeekHTML(result)}
      </div>
    </details>
  `;
    showTools(true);
}

function renderMonth(weeks, ctx) {
    lastWeekResult = weeks?.[0]?.result || null; // for download convenience
    lastCtx = ctx;

    const out = document.getElementById("output");
    out.innerHTML = weeks.map(w => `
    <details class="week card" ${w.week_number === 1 ? "open" : ""}>
      <summary>
        <div class="week-title">
          Week ${w.week_number}
          <span class="pill">Variation ${w.variation}</span>
        </div>
        <div class="chev">click to open</div>
      </summary>
      <div class="week-body">
        ${renderWeekHTML(w.result, `w${w.week_number}`)}
      </div>
    </details>
  `).join("");
    showTools(true);
}

function downloadWeekPack() {
    if (!lastWeekResult || !lastCtx) return;

    const text = renderWeekPackText(lastCtx, lastWeekResult);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeFilename(lastCtx.gym)}_week_pack.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
}

document.getElementById("genWeek").addEventListener("click", () => {
    const ctx = readInputs();
    const result = generateWeek(ctx, ctx.variation);
    renderWeek(result, ctx);
});

document.getElementById("genMonth").addEventListener("click", () => {
    const ctx = readInputs();
    const weeks = generateMonth(ctx, ctx.variation);
    renderMonth(weeks, ctx);
});

document.getElementById("download").addEventListener("click", () => {
    // If nothing generated yet, auto-generate a week first so download always works.
    if (!lastWeekResult) {
        const ctx = readInputs();
        const result = generateWeek(ctx, ctx.variation);
        renderWeek(result, ctx);
    }
    downloadWeekPack();
});

// Optional: set defaults on load
document.getElementById("gym").value = "BJJ Gym";
document.getElementById("location").value = "Old Bar, NSW";