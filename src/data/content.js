/**
 * Personalize the gift here.
 * Her name is used on the final page: "Happy Birthday, {name}".
 * Photos: drop files in src/assets/photos (see HOW_TO_ADD_PHOTOS.txt).
 * You can also set `src` on a photo to any image URL.
 */

export const site = {
  name: "Nidz",
  age: 22,
  birthdayLabel: "October 18",
  birthdayMonth: 10,
  birthdayDay: 18,
};

export const pages = [
  { to: "/home", label: "Home", title: "22 Reasons" },
  { to: "/about", label: "About Her", title: "About Her" },
  { to: "/memories", label: "Memory Lane", title: "Memory Lane" },
  { to: "/loves", label: "Things She Loves", title: "Things She Loves" },
  { to: "/architecture", label: "Architecture World", title: "Architecture World" },
  { to: "/letter", label: "Birthday Letter", title: "Birthday Letter" },
  { to: "/future", label: "Future Adventures", title: "Future Adventures" },
  { to: "/surprise", label: "Final Surprise", title: "Happy Birthday" },
];

export const reasons = [
  { title: "Kind", line: "You make people feel safe without even trying." },
  { title: "Caring", line: "You remember the little things, and that is a kind of love." },
  { title: "Intelligent", line: "Your mind is curious, sharp, and quietly brilliant." },
  { title: "Creative", line: "You find beauty in places other people walk past." },
  { title: "Funny", line: "Your laugh can turn an ordinary hour into a favorite story." },
  { title: "Supportive", line: "You stand beside people like it is the most natural promise." },
  { title: "Strong", line: "Soft and steady at once, which is its own kind of power." },
  { title: "Ambitious", line: "You dream in blueprints, then you actually build them." },
  { title: "Thoughtful", line: "You notice. The world is gentler for it." },
  { title: "Warm", line: "Being near you feels like sunlight through a window." },
  { title: "Gentle", line: "You move through people's lives with care." },
  { title: "Brave", line: "You keep choosing the life you want, even when it is new." },
  { title: "Curious", line: "Books, cities, details. You want to understand all of it." },
  { title: "Genuine", line: "The way you care is honest, all the way through." },
  { title: "Patient", line: "You give things, and people, time to bloom." },
  { title: "Radiant", line: "A room changes temperature when you walk in." },
  { title: "Loyal", line: "Once someone is yours, they are held." },
  { title: "Dreamy", line: "You carry whole worlds with you, and they are beautiful." },
  { title: "Graceful", line: "Even messy days look a little poetic on you." },
  { title: "Inspiring", line: "You make the people who love you want to be braver." },
  { title: "Passionate", line: "You love architecture, stories, and tiny joys with your whole heart." },
  { title: "Unforgettable", line: "Some people are a chapter. You are the feeling of the book." },
];

export const favorites = [
  {
    emoji: "🐱",
    title: "Cats",
    art: "cat",
    text: "Soft pawsteps, slow blinks, and a weakness for anything small and furry.",
  },
  {
    emoji: "🌻",
    title: "Sunflowers",
    art: "sunflower",
    text: "Golden, loyal to the light, and a little wild. Of course they belong to you.",
  },
  {
    emoji: "📚",
    title: "Reading Books",
    art: "books",
    text: "Whole afternoons that slip quietly between pages.",
  },
  {
    emoji: "👟",
    title: "Collecting Shoes",
    art: "shoe",
    text: "A pair for every kind of day she decides to walk into.",
  },
  {
    emoji: "🧢",
    title: "Collecting Caps",
    art: "cap",
    text: "Little crowns for ordinary days.",
  },
  {
    emoji: "🎬",
    title: "Jab We Met",
    art: "ticket",
    text: "Trains, diaries, and the courage to take the long way.",
  },
  {
    emoji: "🏛",
    title: "Architecture",
    art: "building",
    text: "The art of making spaces where life can unfold.",
  },
];

export const photos = [
  {
    id: "PHOTO_1",
    src: "",
    caption: "our little forever",
    rotate: -2.4,
    tape: "blush",
    sticker: "keep",
  },
  {
    id: "PHOTO_2",
    src: "",
    caption: "sun in the frame",
    rotate: 1.8,
    tape: "sun",
  },
  {
    id: "PHOTO_3",
    src: "",
    caption: "still laughing",
    rotate: -1.2,
    tape: "blush",
  },
  {
    id: "PHOTO_4",
    src: "",
    caption: "this day, please",
    rotate: 2.2,
    tape: "sun",
    sticker: "22",
  },
  {
    id: "PHOTO_5",
    src: "",
    caption: "yours and mine",
    rotate: -1.8,
    tape: "blush",
  },
  {
    id: "PHOTO_6",
    src: "",
    caption: "to be continued",
    rotate: 1.4,
    tape: "sun",
  },
];

export const timeline = [
  {
    title: "When we met",
    text: "The beginning of a friendship that still feels like the best kind of luck.",
  },
  {
    title: "Favorite memory",
    text: "One of those ordinary days that became extraordinary because you were there.",
  },
  {
    title: "Funniest moment",
    text: "The kind of laughter that still shows up whenever the story gets retold.",
  },
  {
    title: "Most chaotic moment",
    text: "A little mess, a lot of us, and a story that only got better with time.",
  },
  {
    title: "Best conversation",
    text: "The one where time disappeared and everything felt honest.",
  },
  {
    title: "Many more to come",
    text: "This page stays open. The best chapters are still unwritten.",
  },
];

export const books = [
  {
    title: "Window Seats",
    spine: "#6b4f3a",
    ink: "#fffaf3",
    height: "78%",
    note: "For the afternoons that disappear in the best way.",
  },
  {
    title: "Soft Cities",
    spine: "#e3a19a",
    ink: "#3e2c22",
    height: "92%",
    note: "Streets you have not met yet, already dog-eared in your mind.",
  },
  {
    title: "Field Notes",
    spine: "#6f8f5c",
    ink: "#fffaf3",
    height: "70%",
    note: "Little observations. The kind you notice first.",
  },
  {
    title: "Golden Hour",
    spine: "#e0b03a",
    ink: "#3e2c22",
    height: "86%",
    note: "A whole book of light, and you would still look up to watch the real thing.",
  },
  {
    title: "Little Joys",
    spine: "#c47d74",
    ink: "#fffaf3",
    height: "74%",
    note: "Cats, cups, corners, conversations.",
  },
  {
    title: "Open Pages",
    spine: "#8c6e58",
    ink: "#fffaf3",
    height: "96%",
    note: "There is always room for one more story.",
  },
];

export const shoes = [
  { name: "Sunday Cream", upper: "#f7f1e6", sole: "#5c4332", lace: "#e7d8c4" },
  { name: "Blush Walk", upper: "#f4c7c3", sole: "#5c4332", lace: "#fffaf3" },
  { name: "Bookstore Brown", upper: "#8c6e58", sole: "#3e2c22", lace: "#f0e2cf" },
  { name: "Golden Loafer", upper: "#f0c14b", sole: "#6b4f3a", lace: "#fff6d8" },
  { name: "Soft Sneaker", upper: "#fffaf3", sole: "#6f8f5c", lace: "#e3a19a" },
  { name: "Evening Flat", upper: "#d9b2a8", sole: "#4e382a", lace: "#fffaf3" },
];

export const caps = [
  { name: "Cream", crown: "#fffaf3", brim: "#f0e2cf" },
  { name: "Sunflower", crown: "#f0c14b", brim: "#e0b03a" },
  { name: "Blush", crown: "#f4c7c3", brim: "#e7b2ac" },
  { name: "Cocoa", crown: "#6b4f3a", brim: "#4e382a" },
  { name: "Sage", crown: "#c9d5bc", brim: "#a8ba98" },
];

export const diaryEntries = [
  "Some days are a train window and a quiet song. Keep the ticket anyway.",
  "If the plan changes, let it. The best scenes were never on the itinerary.",
];

export const stamps = ["window seat", "golden hour", "again, please", "scenic route"];

export const dreams = [
  {
    emoji: "☕",
    title: "Visit a cozy café",
    line: "Something warm, a window seat, nowhere else to be.",
    rotate: -1.6,
    pin: "#e3a19a",
  },
  {
    emoji: "📚",
    title: "Discover a new bookstore",
    line: "Get lost on purpose. Leave with one book too many.",
    rotate: 1.4,
    pin: "#f0c14b",
  },
  {
    emoji: "🌻",
    title: "See a sunflower field",
    line: "Stand in the gold until the light gets low.",
    rotate: -0.8,
    pin: "#6f8f5c",
  },
  {
    emoji: "✈",
    title: "Explore a new city",
    line: "New streets, new bakeries, the good kind of wandering.",
    rotate: 1.8,
    pin: "#8c6e58",
  },
  {
    emoji: "📸",
    title: "Make more memories",
    line: "The kind you will want a whole page for.",
    rotate: -1.3,
    pin: "#e3a19a",
  },
  {
    emoji: "🎬",
    title: "Movie night",
    line: "Blankets, a familiar story, and your commentary.",
    rotate: 0.9,
    pin: "#f0c14b",
  },
  {
    emoji: "🐱",
    title: "Meet more cats",
    line: "Obviously. This one is a promise.",
    rotate: -1.7,
    pin: "#6f8f5c",
  },
];

export const letter = `Happy Birthday!

I honestly don't know how to put into words how grateful I am to have you in my life.

You bring warmth, laughter, comfort, and countless good memories wherever you go. Whether we're talking about random things, sharing stories, laughing over silly moments, or simply spending time together, every memory becomes special because you're part of it.

I admire your creativity, your passion for architecture, your love for the little things, and the way you care about people around you.

I hope this year brings you happiness, success, exciting adventures, beautiful books, new places to explore, lots of sunflowers, countless cat encounters, and everything you've been wishing for.

Thank you for being you.

Happy 22nd Birthday.

You deserve the most beautiful year ahead ❤️`;
