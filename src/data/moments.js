/**
 * Little Moments, Forever Us
 *
 * This is the only file to edit when the photographs and stories arrive.
 * Do not invent events here. Leave caption, story, and date empty until
 * the real memory is known.
 *
 * Adding a photograph:
 * 1. Put the file in src/assets/photos/moments/
 * 2. Set `image` to the filename, for example "window-seat.jpg".
 *    A file named the same as `id` (moment-01.jpg) is used when `image` is empty.
 * 3. Replace `title` with a short label.
 * 4. Write `caption` for the short line and `story` for the longer memory.
 *
 * Fields: id, image, title, date, caption, story, alt, layout.
 * layout is "featured", "portrait", "landscape", "wide", or "small".
 *
 * All 22 photographs are portrait, so every slot uses a portrait-safe frame.
 * "landscape" and "wide" are left in the stylesheet for any landscape
 * photograph added later; using them for these would crop heads off.
 */

export const momentsIntro = {
  title: "Little Moments, Forever Us",
  line: "Some of my favourite memories aren't just moments in time. They're little pieces of a story I'm glad we got to share.",
};

export const moments = [
  { id: "moment-01", image: "", title: "Photograph 01", date: "", caption: "", story: "", alt: "Lakhoti and me in a park, each with a yellow flower tucked behind an ear", layout: "featured" },
  { id: "moment-02", image: "", title: "Photograph 02", date: "", caption: "", story: "", alt: "Lakhoti and me sitting on the grass outside a building, mid conversation", layout: "small" },
  { id: "moment-03", image: "", title: "Photograph 03", date: "", caption: "", story: "", alt: "An upside-down selfie of four of us under green trees", layout: "portrait" },
  { id: "moment-04", image: "", title: "Photograph 04", date: "", caption: "", story: "", alt: "Lakhoti in a yellow and maroon outfit beside me at a busy outdoor event at night", layout: "portrait" },
  { id: "moment-05", image: "", title: "Photograph 05", date: "", caption: "", story: "", alt: "The two of us indoors with a chocolate cake on the floor in front of us", layout: "portrait" },
  { id: "moment-06", image: "", title: "Photograph 06", date: "", caption: "", story: "", alt: "Lakhoti and me in traditional clothes in a large hall full of seated people", layout: "portrait" },
  { id: "moment-07", image: "", title: "Photograph 07", date: "", caption: "", story: "", alt: "Lakhoti holding a pumpkin in front of Halloween decorations and a cobweb ghost", layout: "portrait" },
  { id: "moment-08", image: "", title: "Photograph 08", date: "", caption: "", story: "", alt: "Lakhoti and me standing in a cinema foyer in front of a balloon display", layout: "featured" },
  { id: "moment-09", image: "", title: "Photograph 09", date: "", caption: "", story: "", alt: "Lakhoti sitting with a takeaway container, eating", layout: "small" },
  { id: "moment-10", image: "", title: "Photograph 10", date: "", caption: "", story: "", alt: "Lakhoti holding a large bowl of food, sitting on an office chair", layout: "portrait" },
  { id: "moment-11", image: "", title: "Photograph 11", date: "", caption: "", story: "", alt: "Three tubs of ice cream held up to the camera", layout: "small" },
  { id: "moment-12", image: "", title: "Photograph 12", date: "", caption: "", story: "", alt: "Lakhoti in a pink outfit beside me in a teal kurta, outdoors at night", layout: "portrait" },
  { id: "moment-13", image: "", title: "Photograph 13", date: "", caption: "", story: "", alt: "The two of us leaning on a table in a room decorated with snowflakes", layout: "small" },
  { id: "moment-14", image: "", title: "Photograph 14", date: "", caption: "", story: "", alt: "Two figures walking away across an empty car park at night", layout: "portrait" },
  { id: "moment-15", image: "", title: "Photograph 15", date: "", caption: "", story: "", alt: "An upside-down selfie of the two of us, Lakhoti making a peace sign", layout: "portrait" },
  { id: "moment-16", image: "", title: "Photograph 16", date: "", caption: "", story: "", alt: "Lakhoti in a yellow dress holding a bouquet, standing beside me outdoors", layout: "portrait" },
  { id: "moment-17", image: "", title: "Photograph 17", date: "", caption: "", story: "", alt: "Lakhoti and me standing on rocks at the edge of a lake surrounded by pines", layout: "portrait" },
  { id: "moment-18", image: "", title: "Photograph 18", date: "", caption: "", story: "", alt: "Lakhoti and me in bright traditional outfits with a crowd behind us", layout: "featured" },
  { id: "moment-19", image: "", title: "Photograph 19", date: "", caption: "", story: "", alt: "Two hands holding a pair of small painted clay pieces", layout: "portrait" },
  { id: "moment-20", image: "", title: "Photograph 20", date: "", caption: "", story: "", alt: "A laptop screen showing Lakhoti on a video call", layout: "small" },
  { id: "moment-21", image: "", title: "Photograph 21", date: "", caption: "", story: "", alt: "A laptop on an office desk showing Lakhoti on a video call", layout: "portrait" },
  { id: "moment-22", image: "", title: "Photograph 22", date: "", caption: "", story: "", alt: "Lakhoti sitting cross-legged on a bed, concentrating on a small jar in her hands", layout: "featured" },
];
