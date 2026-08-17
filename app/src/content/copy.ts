/* ============================================================
   ALL TEXT IN THE SITE LIVES HERE.
   Edit this file to change wording — no component changes needed.
   ============================================================ */

export const RECIPIENT = "Bukola";
export const CLASS_OF = "Class of 2026";

/* ---------------- Screen 1 — the door ---------------- */

export const door = {
  /**
   * The knock-knock, played as a call and response. Nothing advances on its
   * own — `reply` is what she taps to answer, and only then does the next
   * beat land.
   */
  beats: [
    { id: "knock1", line: "knock knock", sub: "...", reply: "who's there? 👀" },
    {
      id: "knock2",
      line: "knock knock 👀",
      sub: "they knocked again",
      reply: "okay, who IS that? 😭",
    },
    { id: "name", line: `Hey, ${RECIPIENT}...`, sub: null, reply: "...yes? 🥹" },
  ],
  ask: "Can I come in? 🥹",
  yes: "YES 💜",
  no: "NO 🙈",
  /** Shown once NO has run off, so she never wonders where it went. */
  noHint: "(it's still here somewhere 👀)",

  /** The NO ladder. One line per tap, in order. */
  noLadder: [
    "Hmm... are you sure? 🥹",
    `${RECIPIENT}... think about this carefully 😭`,
    "You're really choosing “no”? 🥺",
    "I came all this way... 😔",
    "Okay, this is getting embarrassing for both of us 😂",
    "Fine... I'll just stand here and wait. 🧍🏽‍♂️🥹",
  ],

  /** Shown after the ladder runs out. NO is gone; one warm way forward. */
  giveUp: {
    whisper: "Fine... I'll just stand here and wait. 🧍🏽‍♂️🥹",
    line: "Okay, okay...",
    lineAccent: "I'll take that as a “yes.” 😌💜",
    cta: "LET ME IN →",
  },
};

/* ---------------- Screen 2 — the reveal ---------------- */

export const reveal = {
  eyebrow: CLASS_OF,
  headline: "SHE DID IT! 🎓",
  sub: `Congratulations, ${RECIPIENT}! 💜`,
  caption: `${CLASS_OF} ✨`,
  caption2: "signed out ✍🏽",
  scrollHint: "keep going",
};

/* ---------------- The Journey ---------------- */

export const journey = {
  beginning: {
    number: "Chapter 1",
    title: "The Beginning",
    notebook: `${RECIPIENT}'s University Story`,
    photoCaption: "along the way 💜",
    lead: "Every big achievement starts with a small beginning.",
    body: [
      "Somewhere along the way,",
      `a university student named ${RECIPIENT} Ogundipe`,
      "started writing her own story. 💜",
    ],
  },

  work: {
    number: "Chapter 2",
    title: "The Work",
    chips: ["ASSIGNMENT.DOCX", "DEADLINE: TOMORROW", "SUBMISSION: 11:59 PM"],
    progressLabel: "Surviving university...",
    progressTarget: 87,
    lead: "There were lectures. Assignments. Deadlines. Projects.",
    body: "And probably a few “I can't do this anymore” moments. 😭",
    photoCaption: "the grind 🏫📖",
    photoCaption2: "heads down 📚",
    badge: "PROJECT MODE: ACTIVATED 📝",
  },

  struggle: {
    number: "Chapter 3",
    title: "The Struggle",
    banner: "📱 You have new notifications",
    /* General university life — deliberately NOT attributed to Bukola. */
    messages: [
      { from: "CLASS GROUP", time: "9:12 PM", text: "Please submit your project before 11:59 PM." },
      { from: "LECTURER", time: "10:40 PM", text: "Your project needs some corrections." },
      { from: "GROUP CHAT", time: "11:04 PM", text: "Guys, has anyone finished?" },
      { from: "UNIVERSITY PORTAL", time: "11:31 PM", text: "Deadline updated." },
    ],
    /* Universal student refrains — nobody in particular is speaking. */
    refrains: ["“I'm almost done.”", "“Almost.”", "“Okay, NOW I'm done.”", "...one more correction."],
    photoCaption: "“I'm almost done.”",
    /* The quiet turn: the jokes stop here. Nothing is claimed about how she
       felt — please reword this caption however you think is right. */
    hardDaysLead: "And it wasn't always deadlines.",
    photoCaption2: "the hard days counted too 💜",
    closer: ["Some days were easy.", "Some were... definitely not."],
  },

  calm: {
    number: "Chapter 4",
    title: "Somehow, we made it",
    /* Edit these to her real university years. */
    years: ["2023", "2024", "2025", "2026"],
    lead: ["One day at a time.", "One semester at a time.", "One “I'll figure it out” at a time."],
    outro: ["And somehow...", "the finish line got closer."],
  },

  finish: {
    number: "Chapter 5",
    title: "The Finish Line",
    beat1: "Until one day...",
    beat2: "It was time to put on the gown. 🎓",
    photoCaption: "the day it became real ✨",
    closer: ["No more “almost.”", "No more “one day.”", "You made it."],
    finale: `YOU'RE A GRADUATE, OGUNDIPE ${RECIPIENT.toUpperCase()} ESTHER. 🎓💜`,
  },
};

/* ---------------- Look at you now ---------------- */

export const gallery = {
  title: "Look at you now 🥹",
  sub: "Seriously... look at you.",
  footnote: "okayyyy miss graduate 💅🏽",
  fullBleedLine: "you really did that.",
};

/* ---------------- A few words for you ---------------- */

export const letter = {
  eyebrow: "A letter",
  title: "A few words for you 💌",
  greeting: `Hiii ${RECIPIENT},`,
  paragraphs: [
    "You did it. Not by luck and not overnight — you did it by showing up on the hard days, and on the days nobody was watching.",
  ],
  /* This line is deliberately set apart. Please keep it. */
  pullQuote:
    "I may not have been there with you for every chapter, but I know you worked for this moment.",
  paragraphsAfter: [
    "One chapter closes here. Whatever you go after next, I hope you go after it exactly the way you went after this — stubbornly, and all the way to the end.",
    "I'm proud of you, and I'm glad I get to watch what comes next.",
  ],
  signOff: "Congratulations, my fine graduate. 💜",
};

/* ---------------- Final scene ---------------- */

export const finale = {
  beat1: "This is only the beginning.",
  beat2: "Here's to everything waiting for you next. 💜",

  /* The ceremony beat. Change these two lines the day after. */
  ceremony: "And tomorrow, they finally call your name.",
  party: "So go on — let's get this party started. 🎉",
};

/* ---------------- The sign-off ---------------- *
 * ⚠️ SET YOUR NAME BELOW before you send this to her.
 *
 * `intro` is the warmth dial. Cooler → warmer:
 *   "from me,"  ·  "with love,"  ·  "yours,"  ·  "always yours,"
 */
export const signature = {
  intro: "with love,",
  name: "Oluwaseyi(Temmy_Otsutsuki)",
  note: "have the best day tomorrow. 💜",
};
