/**
 * The 22 chapters of the memory book.
 *
 * TO CHANGE A PHOTO: drop a new file into src/assets/memories/ named
 * memory-01.jpg through memory-22.jpg. Nothing else needs touching — the
 * images are picked up automatically, and a missing file shows an empty
 * journal page rather than a broken image.
 *
 * TO CHANGE THE WORDS: edit `title`, `caption`, `emoji` and `alt` below.
 * Any of them may be left as an empty string without breaking the layout.
 *
 * The titles come from the file names you gave the photos; the captions are
 * placeholders in that style, meant to be replaced with the real thing.
 * `ratio` keeps space reserved while a photo loads, so nothing jumps.
 */

const files = import.meta.glob("../assets/memories/*.jpg", {
  eager: true,
  import: "default",
});

/** Resolves a file name to its built URL, or null when it is not there yet. */
function image(name) {
  const found = Object.entries(files).find(([path]) => path.endsWith(`/${name}`));
  return found ? found[1] : null;
}

/** Builds one chapter, filling in the parts that follow a pattern. */
function chapter(n, title, caption, emoji, ratio) {
  return {
    id: `memory-${String(n).padStart(2, "0")}`,
    chapter: n,
    image: image(`memory-${String(n).padStart(2, "0")}.jpg`),
    title,
    caption,
    emoji,
    ratio,
    alt: title ? `A photo of Lakhoti — ${title}` : "A photo of Lakhoti",
  };
}

export const memories = [
  chapter(1, "Model", "A little moment worth remembering! 💗✨", "💗", "900 / 1200"),
  chapter(2, "Heroine", "Another beautiful page in the story! 📖💕", "✨", "900 / 1200"),
  chapter(3, "Beach vibes", "Some memories just make you smile! 🥹💖", "🌊", "900 / 1200"),
  chapter(4, "Sunkissed", "This one deserves a special place in the book! 💌", "🌞", "1200 / 900"),
  chapter(5, "Uff yeh zulfaien", "Core memory unlocked! ✨🫶", "💫", "1200 / 900"),
  chapter(6, "Pro kayaker", "A little snapshot of happiness! 📸🌷", "🛶", "675 / 1200"),
  chapter(7, "Traditional diva", "One for the memory books! 💫💕", "👑", "675 / 1200"),
  chapter(8, "Hayyy mein marjawan", "And the story gets even sweeter! 🥹✨", "💝", "900 / 1200"),
  chapter(9, "Graduation!!", "A moment frozen in time! ⏳💗", "🎓", "900 / 1200"),
  chapter(10, "Mein apni fav hoon", "Pure main character energy! 🌟", "🌟", "731 / 1200"),
  chapter(11, "Aww", "Keeping this one forever! 🧡", "🥹", "900 / 1200"),
  chapter(12, "Bear", "Certified happy place! 🏡💛", "🧸", "621 / 1200"),
  chapter(13, "Artist", "The kind of day you want to rewind! ⏪💕", "🎨", "900 / 1200"),
  chapter(14, "Try Not to Laugh", "Still one of my favourites! 💖", "😂", "900 / 1200"),
  chapter(15, "Multitasker", "Caught mid-sparkle! ✨😄", "🌀", "900 / 1200"),
  chapter(16, "One shoes ok", "Filed under: absolute joy! 📁💗", "👟", "900 / 1200"),
  chapter(17, "At crib", "This one needs no caption! 🫶", "🏠", "675 / 1200"),
  chapter(18, "Foody", "Small moment, big smile! 😊🌸", "🍜", "900 / 1200"),
  chapter(19, "Cyclist", "Adding this to the highlight reel! 🎞️💫", "🚲", "900 / 1200"),
  chapter(20, "Ik jacket", "Proof that the best days are ordinary ones! 🌼", "🧥", "900 / 1200"),
  chapter(21, "Makeup queen", "A page I keep coming back to! 📖💘", "💄", "675 / 1200"),
  chapter(22, "Working prof", "And here's to many more! 🥂💝", "💼", "675 / 1200"),
];

/** The words on the opening page of the book. */
export const bookOpening = {
  title: "Cheers to 22!! 🥂✨",
  blurb:
    "Every picture tells a story, every little moment becomes a memory, and every memory becomes a part of a beautiful journey. Today, we celebrate 22 years of life, laughter, growth, and all the wonderful moments still waiting to unfold. Here's to the memories we've made and the beautiful chapters yet to come! 💗📖",
  cta: "Open the Memory Book 💌",
};

/** The words on the closing page. */
export const bookClosing = {
  title: "And the Story Continues… 💗📖",
  blurb:
    "22 memories celebrated, countless smiles collected, and so many beautiful chapters still waiting to be written. Here's to new adventures, unforgettable moments, and a future filled with reasons to smile. Cheers to 22, Lakhoti!! 🥂🎂✨💕",
};
