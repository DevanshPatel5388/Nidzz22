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
  {
    id: "moment-01",
    image: "",
    title: "Chaddi Baddi",
    date: "April 26, 2024",
    caption: "The day you made me your Chaddi Baddi 💛",
    story: "How can I forget one of the cutest pictures of us when I'm writing down our memories. On April 26, 2024 we came to your apartment to play badminton. Ketla mast divaso hata — we were just chillin. Tu bahu j kharab ramti hati badminton, but it was still fun playing with you. And pachi aapde thakiya hata and badhi vaato karta hata, and that's when you made me your Chaddi Baddi and said we'd be friends forever. After that we clicked this cutu picture. We were both glowing, but you were glowing more, tbh. 🥹💛",
    alt: "Lakhoti and me in a park, each with a yellow flower tucked behind an ear",
    layout: "featured",
  },
  {
    id: "moment-02",
    image: "",
    title: "The bracelet",
    date: "",
    caption: "A promise that stayed a promise 🤍",
    story: "I hope you remember this moment. It was a Tuesday and we had planned to play badminton again, but bahu j kharab wind hato. Atle aapde ae to nata rami sakiya, but I gave you the hand bracelet. I remember that day — tu ae time par khota khota promise kari rahi hati k we would go out someday. But we didn't. 🤍",
    alt: "Lakhoti and me sitting on the grass outside a building, mid conversation",
    layout: "small",
  },
  {
    id: "moment-03",
    image: "",
    title: "Hair rubber hairstyle",
    date: "",
    caption: "My hairstyle, your hair rubber 😂",
    story: "Oyy, remember this?? Mara matha ni hairstyle te tara hair rubber thi kari hati. No one had ever done that, and you were the one who did it to me. After that we played Ludo, and tya bi tu cheating karti hati — have kehti na k tu cheat nati karti, ik. 😜 And pachi we did the dance on Pinky hai paise walon ki. And Baby Doll na dance par tu and Mahek mane and Krupal ne dhanki rahiya hata. 🤣",
    alt: "An upside-down selfie of four of us under green trees",
    layout: "portrait",
  },
  {
    id: "moment-04",
    image: "",
    title: "Hum Tum",
    date: "",
    caption: "Prasad, a fight, and that pose 🧡",
    story: "This used to be a favourite picture of mine as well. Tu Albion rehti hati, and Navratri ma hu tara mate prasad sachvi rakhto hato and tara ghare aapto hato. Aa divase aapdo jaghdo bi thayo hato, as you had ignored me with your friends (as usual), but pachi te mane manayo hato and then we clicked this picture. Whenever I look at it I remember the movie Hum Tum — aema bi cartoons na pics kaii aava j pose ma rehta hata. 🧡",
    alt: "Lakhoti in a yellow and maroon outfit beside me at a busy outdoor event at night",
    layout: "portrait",
  },
  {
    id: "moment-05",
    image: "",
    title: "Your 20th birthday",
    date: "",
    caption: "A tiny room and a big surprise 🥳",
    story: "Ohh, so this one is from your 20th birthday. We had planned to give you a surprise, so hu, Disha and Harsh aavya hata tane surprise aapva. The room was too small, but Disha still managed to decorate it with papers. And I got the cake for you. Next memory loading, Lakhoti!! 🎂",
    alt: "The two of us indoors with a chocolate cake on the floor in front of us",
    layout: "portrait",
  },
  {
    id: "moment-06",
    image: "",
    title: "Manda mohi lidha",
    date: "",
    caption: "Haii bhagwan, naii bhoolay 🙈",
    story: "Hayyyyyy!!! Manda mohi lidha would be fully justified for this one. Somehow this became another favourite picture of us from your birthday. And aana pachi to madam ae je rup dekhadiyu hatu… haii bhagwan, naii bhoolay!!!! Harsh ae masti kari and hu khali khoto levay gayo hato. 😂",
    alt: "Lakhoti and me in traditional clothes in a large hall full of seated people",
    layout: "portrait",
  },
  {
    id: "moment-07",
    image: "",
    title: "Pumpkin decorating",
    date: "",
    caption: "Your first time, and still better than mine 🎃",
    story: "Halloween was coming and there was an event for decorating pumpkins, and you messaged me to come. We started decorating. I was making mine so badly and you were making yours so well, even though it was your first time. You kept asking me to take your pictures, and while I was taking them, tari lat were coming out, and ae time bi maru magaj hang mari gayu hatu, tbh. 🎃",
    alt: "Lakhoti holding a pumpkin in front of Halloween decorations and a cobweb ghost",
    layout: "portrait",
  },
  {
    id: "moment-08",
    image: "",
    title: "Jigra",
    date: "",
    caption: "Watched the whole movie alone, sitting next to you 🎬",
    story: "Aa yaad che kayu movie jova gaya hata aapde? If not, it was Jigra. Aakha movie ma te Heer sathe j vaat kari hati and mane corner ma besadi rakhiyo hato. Aakhu movie ekla ekla joyu hatu without talking. Next time, if you have time, we will go for a movie again — but please mane ignore na karti. 🎬",
    alt: "Lakhoti and me standing in a cinema foyer in front of a balloon display",
    layout: "featured",
  },
  {
    id: "moment-09",
    image: "",
    title: "Thursday Treats",
    date: "",
    caption: "Where Thursday Treats began 💛",
    story: "This picture is from the time when we had started the Thursday Treats. Those were some of the best days of my life — I was working, and then spending time with you and making memories. Sometimes I used to close my work early just so I could go home with you. Best time of those years!! 💛",
    alt: "Lakhoti sitting with a takeaway container, eating",
    layout: "small",
  },
  {
    id: "moment-10",
    image: "",
    title: "Pizza from Honest",
    date: "",
    caption: "Chal chaddi, kaii mast order kar 🍕",
    story: "Another picture from our Thursday Treats. On this day you had got that black tote bag kinda bag from an event — I still remember. And then you told me, chal chaddi k kaii mast order kar. And we ordered pizza from Honest. 🍕",
    alt: "Lakhoti holding a large bowl of food, sitting on an office chair",
    layout: "portrait",
  },
  {
    id: "moment-11",
    image: "",
    title: "Baskin Robbins",
    date: "",
    caption: "The day I learned your ice cream order 🍦",
    story: "This one is from Navratri time. I had waited with Vraj and Heer for you to come back from work. When you were back, aapde Baskin Robbins gaya hata ice cream khava. At that moment I came to know that you liked Baskin Robbins. 🍦",
    alt: "Three tubs of ice cream held up to the camera",
    layout: "small",
  },
  {
    id: "moment-12",
    image: "",
    title: "Sheri garba",
    date: "",
    caption: "The chaniya choli that finally arrived ✨",
    story: "I cannot forget this Navratri day from sheri garba. I have good memories of it, as I was recording your garba and admiring you. But someone else had eyes on you, and the rest is the story. And about this chaniya choli — you were waiting a long time for it to arrive in the parcel, but it kept getting delayed and your mood was off before the delivery. Once the parcel came, you were so happy, and I could see that happiness on your face. ✨",
    alt: "Lakhoti in a pink outfit beside me in a teal kurta, outdoors at night",
    layout: "portrait",
  },
  {
    id: "moment-13",
    image: "",
    title: "8th April",
    date: "8 April 2026",
    caption: "The first gift I ever claimed from you 🎁",
    story: "8th April 2026, someone's birthday. This boy was the first one to claim a gift from you — the white Tommy Hilfiger polo t-shirt. Then we visited Fancy Dosa, and you tried something new in your dosa, but you didn't like the change. 😄",
    alt: "The two of us leaning on a table in a room decorated with snowflakes",
    layout: "small",
  },
  {
    id: "moment-14",
    image: "",
    title: "The candid one",
    date: "",
    caption: "My wallpaper for the longest time 🤍",
    story: "Uff, my most favourite candid picture. I wasn't even aware of this picture, it was just clicked. It was my wallpaper for a long time. We had watched the movie The Drama (idk whose choice it was to watch this one, ifykyk 😅). The story wasn't good, but I still enjoyed spending my birthday with you. Whenever I wear this t-shirt, I always recall you. 🤍",
    alt: "Two figures walking away across an empty car park at night",
    layout: "portrait",
  },
  {
    id: "moment-15",
    image: "",
    title: "Visa day",
    date: "",
    caption: "First party from Nidhee, lol 😄",
    story: "Ohh, it's the US visa date. I still remember the whole process — applying for the visa, changing the form details, going for the visa, and the after-visa party that you had given me. First party from Nidhee to me, lol… 😄",
    alt: "An upside-down selfie of the two of us, Lakhoti making a peace sign",
    layout: "portrait",
  },
  {
    id: "moment-16",
    image: "",
    title: "Graduation",
    date: "",
    caption: "Three years, and then this day 🎓",
    story: "Gurl is graduating!!! After 3 years of struggles and sleepless nights, you were graduating. I wanted to be there for this moment of yours, so I made sure to see you — I took an illegal break from work and came running to greet you without a gift. But in the evening, I wrote a letter for you. 🎓💛",
    alt: "Lakhoti in a yellow dress holding a bouquet, standing beside me outdoors",
    layout: "portrait",
  },
  {
    id: "moment-17",
    image: "",
    title: "The kayaker",
    date: "",
    caption: "I paddled, you napped 🛶",
    story: "That's the kayaker's picture. You were with one of the most trained kayakers. After too many flop plans, we made sure to make this one happen. Savare bhale te late kariyu hatu, but still I was not angry at you. Ae vakhat to je mara hath dukhta hata, as I was the only one waving the paddles and taking your pictures and videos. After that we did a quick trail, and by that time you were tired and taking a nap. And sanjhe return trip ma, as usual, aapda vache jaghdo!! 🛶",
    alt: "Lakhoti and me standing on rocks at the edge of a lake surrounded by pines",
    layout: "portrait",
  },
  {
    id: "moment-18",
    image: "",
    title: "Latest garba",
    date: "",
    caption: "Don't leave me here, she said 💃",
    story: "That's the latest garba with you!!! We had almost matched our outfits. I remember you telling me not to leave you in the garba, as you were not knowing anyone there — and then you went off with your Walmart group, lol!! 💃",
    alt: "Lakhoti and me in bright traditional outfits with a crowd behind us",
    layout: "featured",
  },
  {
    id: "moment-19",
    image: "",
    title: "The stone",
    date: "",
    caption: "Still in my bag 🤍",
    story: "After your dental appointment, we had visited the mandir on this day and then went back to college. We were preparing for the interview and had done too many manifestations, and then while leaving, we took these stones from college. I am still carrying this stone with me in my bag and it reminds me of you all the time. Also the jacket, which you were wearing, is mine. 🤍",
    alt: "Two hands holding a pair of small painted clay pieces",
    layout: "portrait",
  },
  {
    id: "moment-20",
    image: "",
    title: "Interview prep 1",
    date: "",
    caption: "Round one with JR",
    story: "That's interview prep 1, which we were doing for your first round with JR. I do not wanna say more for this pic.",
    alt: "A laptop screen showing Lakhoti on a video call",
    layout: "small",
  },
  {
    id: "moment-21",
    image: "",
    title: "Interview prep 2",
    date: "",
    caption: "Gud for the final round 🍯",
    story: "Interview prep 2 — hu savare tara ghare gud laine aavyo hato for your final round. Taro mood nato malvano atle tu gusse bi thaii hati, but still mali hati mane. God has some different plans, and he gave you the job offer from Sudbury. 💛",
    alt: "A laptop on an office desk showing Lakhoti on a video call",
    layout: "portrait",
  },
  {
    id: "moment-22",
    image: "",
    title: "Skin care",
    date: "",
    caption: "You don't even need it 🫶",
    story: "Sorry and not sorry for taking this picture and sending it to Jyoti. I was feeling heavy and wanted to see you, so I had come to see you. Skin care tari khasi moti che. But you do not even need skin care, as you are already Miss Universe. Btw, did you have the Oreo shake? 🫶",
    alt: "Lakhoti sitting cross-legged on a bed, concentrating on a small jar in her hands",
    layout: "featured",
  },
];

/** The last words on the page, after all twenty-two. */
export const momentsClosing = {
  line: "Hope you will remember me and all these memories.",
  note: "My fav incomplete wish",
};
