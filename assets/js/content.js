/* ============================================================
   HANNAH RICHMAN — PORTFOLIO CONTENT
   ============================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE WEBSITE.

   Just change the text inside the "quotes" or replace image paths
   and save. Everything is grouped by page. Each section has notes
   above it telling you what it controls.

   RULES OF THUMB
   --------------
   1. Keep the quotes around any text you change.
   2. Keep the commas at the end of each line.
   3. Image paths look like:  "assets/images/folder/file.jpg"
      Drop your image into that folder with that exact name and it
      shows up. Or change the path to point at any file you like.
   4. To add a new project, copy a whole project block (everything
      between { and }) and paste it inside the projects [ ... ]
      list, then change the values.
   ============================================================ */

window.SITE_CONTENT = {

  /* ============================================================
     SITE-WIDE
     ------------------------------------------------------------
     Shows up in the header, footer, and browser tab.
     ============================================================ */
  site: {
    name: "HANNAH RICHMAN",
    short: "H.R.",
    role: "2D FX ANIMATOR",
    year: "2026",
    location: "SCAD",
    copyright: "ALL WORK © HANNAH RICHMAN 2026",

    /* Favicon — the tiny image shown in the browser tab.
       Replace the file or change the path to use a different one. */
    favicon: "assets/images/Browser_Icon.jpg",

    /* Header logo — shown next to your name in the top-left of
       every page. Set to "" (empty) to hide it. */
    logo:    "assets/images/Colored_Logo.png"
  },

  /* ============================================================
     COLORS
     ------------------------------------------------------------
     Change any of these hex codes (the #abc123 things) to recolor
     the whole site. Use a color picker like https://colorpicker.me
     to grab new ones.
     ============================================================ */
  colors: {
    background: "#1a1714",  /* dark warm black behind everything   */
    cream:      "#f4ead5",  /* off-white text and panels           */
    accent:     "#ee3923",  /* fiery red-orange (the loud color)   */
    yellow:     "#f5c518",  /* tape / sticker accent               */
    muted:      "#8a8378",  /* meta text, dates, version numbers   */
    ink:        "#0d0b09"   /* deepest black for shadows           */
  },

  /* ============================================================
     NAVIGATION
     ------------------------------------------------------------
     The links across the top of every page.
     ============================================================ */
  nav: [
    { label: "HOME",    href: "index.html"   },
    { label: "DESIGN",  href: "design.html"  },
    { label: "VAULT",   href: "vault.html"   },
    { label: "CONTACT", href: "contact.html" }
  ],

  /* ============================================================
     LANDING PAGE  (index.html)
     ------------------------------------------------------------
     The big front page with the demo reel.

     reel.provider can be "youtube", "vimeo", or "file".

     OPTIONAL FOR ALL PROVIDERS:
       reel.poster — path to a still image (jpg/png) shown
       before someone hits play. For YouTube/Vimeo this turns
       the embed into a click-to-play thumbnail (and makes the
       page load faster, since the iframe only loads on click).
       For "file" this is the native HTML5 video poster.

           reel: { provider: "youtube", id: "...",
                   poster: "assets/images/reel-thumb.jpg" }

     YOUTUBE:
       reel.id is the part of the URL after v=
         https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  "dQw4w9WgXcQ"

     VIMEO:
       reel.id is the number after vimeo.com/
         https://vimeo.com/76979871                   ->  "76979871"

     FILE  (host the video yourself):
       Drop your .mp4 (and/or .webm) into assets/videos/ and set:

         reel: {
           provider: "file",
           id:       "assets/videos/demo-reel-2026.mp4",
           poster:   "assets/videos/demo-reel-2026-poster.jpg"
         }

       The poster line is optional — it's the still image shown
       before someone hits play.

       For best results provide BOTH an .mp4 and a .webm using
       the longer "sources" form (the browser picks the first one
       it can play):

         reel: {
           provider: "file",
           sources: [
             { src: "assets/videos/demo-reel-2026.webm", type: "video/webm" },
             { src: "assets/videos/demo-reel-2026.mp4",  type: "video/mp4"  }
           ],
           poster: "assets/videos/demo-reel-2026-poster.jpg"
         }

       Heads-up: GitHub Pages won't accept any single file over
       100 MB. Compress big reels with Handbrake (free) — a 720p
       H.264 mp4 around 4–6 Mbps usually lands well under.
     ============================================================ */
  landing: {
    issueLabel:    "N° 01",
    headlineTop:   "ANIMATION",
    headlineBig:   "CHARACTERS & FX",
    headlineSub:   "WORKS",
    blurb:         "[write a blurb]",
    reelLabel:     "DEMO REEL — 2026",
    reel: {
      provider: "file",
      id:       "assets/videos/Demo_Reel/HannahRichman_DemoReelFX.mp4",
      poster: "assets/videos/Demo_Reel/FX_Thumbnail4.png"
    },
    tickerLeft:  ["FRAME · BY · FRAME", "EST · 2020", "CEL / DIGITAL", "HAND-DRAWN ANIMATION"],
    tickerRight: ["NOW REELING", "VOL · 01", "SIGNAL ON"]
  },

  /* ============================================================
     DESIGN PAGE  (design.html)
     ------------------------------------------------------------
     The headline at the top of the project grid.
     ============================================================ */
  design: {
    issueLabel: "N° 02",
    headlineTop: "THE",
    headlineBig: "DESIGN",
    headlineSub: "LAB",
    blurb: "[write blurb]"
  },

  /* ============================================================
     PROJECTS  (shown on design.html, opened on project.html)
     ------------------------------------------------------------
     Each project has:
       id        - lowercase, no spaces. Used in the link.
       title     - the big name shown on the cover and page.
       subtitle  - small text under the title (year, medium, etc.)
       cover     - the cover image path for the grid.
       blocks    - the layout of the detail page, in order.

     BLOCK TYPES (use these in the blocks list):
       { type: "heading", text: "BIG WORDS" }
       { type: "text",    text: "A paragraph of writing." }
       { type: "image",   src: "assets/images/projects/foo/01.jpg", caption: "optional" }
       { type: "image-full", src: "..." }
       { type: "two-images", srcA: "...", srcB: "..." }
       { type: "image-text", src: "...", text: "Image on the left, words on the right." }
       { type: "text-image", src: "...", text: "Words on the left, image on the right." }
       { type: "heading-image", heading: "TITLE", src: "..." }
       { type: "spacer" }

     To add a project: copy one whole project block (between the
     { and matching }) and paste it inside the [ ] below, then
     change every value.

     OKay my documentation is bad.
     Take 2 :
      To add a project:
      {
      id: "project-id",
      title: "Project Title",
      subtitle: "Year, medium, etc.",
      cover: "assets/images/projects/project-id/cover.jpg",
      blocks: [
        { type: "heading", text: "BIG WORDS" },
        { type: "text",    text: "A paragraph of writing." },
        { type: "image",   src: "assets/images/projects/project-id/01.jpg", caption: "optional" },
        { type: "image-full", src: "..." }
      ]
      }

      Add a comma after every curly except the last one to create a list.
     ============================================================ */
  projects: [
    {
      id: "Fire",
      title: "FIRE DESIGNS",
      cover: "assets/images/Designs/Fire/FX_Design_FireComp4.png",
      blocks: [
        { type: "text",    text: "A collection of Fire Designs from various projects and practice." },
        { type: "image",   src: "assets/images/Designs/Fire/FX_Design_Fire2.png", caption: "*Firewatchers*" },
        { type: "two-images", srcA: "assets/images/Designs/Fire/FX_Design_Fire3.png", srcB: "assets/images/Designs/Fire/FX_Design_Fire2.png" },
        { type: "image-full", src: "assets/images/Designs/Fire/Fire.png" }
      ] 
    },
       {
      id: "Water",
      title: "WATER DESIGNS",
      cover: "assets/images/Designs/Water/Water_Running.png",
      blocks: [
        { type: "text",    text: "A collection of Water Designs from various projects and practice." },
        { type: "image-full", src: "assets/images/Designs/Water/Water_Running.png" },
        { type: "image-full", src: "assets/images/Designs/Water/Water_Fall.png" }
      ]
    },
    {
      id: "Smoke",
      title: "SMOKE DESIGNS",
      cover: "assets/images/designs/smoke/explosion.png",
      blocks: [
        { type: "text",    text: "A collection of Smoke Designs from various projects and practice." },
        { type: "two-images", srcA: "assets/images/Designs/Smoke/Grenade_Designs0085.png", srcB: "assets/images/Designs/Smoke/Grenade_Designs0139.png" },
        { type: "image-full", src: "assets/images/Designs/Smoke/Explosion.png" },
        { type: "image-full", src: "assets/images/Designs/Smoke/Magic_Column_Smoke.png" }
      ]
      }
  ],

  /* ============================================================
     VAULT PAGE  (vault.html)
     ------------------------------------------------------------
     Password-locked alternate reel.

     The password is stored as a SHA-256 hash so that nobody can
     just read it from the website source. To set a NEW password:

       1. Open hash-tool.html in your browser.
       2. Type your new password into the box.
       3. Copy the long hash that appears.
       4. Paste it as the value of passwordHash below.

     The default password is:  hannah

     The reel here uses the same provider rules as the landing
     reel: "youtube", "vimeo", or "file". See the landing notes
     above for the full file-provider example.
     ============================================================ */
  vault: {
    issueLabel: "N° 03",
    headlineTop: "THE",
    headlineBig: "VAULT",
    headlineSub: "ROOM",
    lockedBlurb: "Password-protected work. For studios, clients, and friends with the password.",
    unlockedBlurb: "Welcome in. Reel below. Don't share the link.",
    passwordHash: "fc881aa34d44660e1012dec26ccda0b469d6c8359e91dc674dab4c095b9fe832",
    promptLabel: "ENTER PASSWORD",
    wrongLabel: "WRONG. TRY AGAIN.",
    unlockButton: "OPEN",
    reelLabel: "PRIVATE REEL",
         reel: {
           provider: "youtube",
           id:       "6bfPGx66-0A",
           poster:   "assets/videos/demo_reel/fx_thumbnail4.png"
         }
  },

  /* ============================================================
     CONTACT PAGE  (contact.html)
     ------------------------------------------------------------
     Email, resume, illustration, about-me text.
     ============================================================ */
  contact: {
    issueLabel:  "N° 04",
    headlineTop: "LET'S",
    headlineBig: "MAKE",
    headlineSub: "ART",
    illustration: "assets/images/contact/portrait.png",
    illustrationAlt: "Self portrait of Hannah",
    email: "hannahrichman.art@gmail.com",
    emailLabel: "WRITE TO HANNAH",
    resumeUrl: "assets/HannahRichman_Resume.pdf",
    resumeLabel: "DOWNLOAD RESUME",
    aboutTitle: "ABOUT",
    aboutText: "My journey began in the suburbs of Peoria, Arizona, where there was not much for me to do in the 120° summers other than to stay inside and watch cartoons. \n\n After I finally beat the “its just a phase” allegations, my continued interest in animation lead me to the Academy of Art in San Francisco, California, where I would spend my first year of college drawing and playing volleyball collegiately. \n\n After much thought and debate, I decided to apply as a transfer to the Savannah College of Art and Design where I would spend the rest of my college years gaining my BFA in 2D Animation. \n\n When I’m not animating I usually find myself playing video games, working out, or coaching at a local volleyball club. Some of my favorite games to play are *Overwatch*, *Stardew Valley*, *Tetris*, and *Sid Meier’s Civilization VI*."
  },

  /* ============================================================
     SOCIALS
     ------------------------------------------------------------
     Shown in the footer of every page. Add or remove as needed.
     ============================================================ */
  socials: [
    { label: "INSTAGRAM",  url: "https://www.instagram.com/_happypants_/"   },
    { label: "YOUTUBE",      url: "https://www.youtube.com/@_HappyPants_/featured"        },
    { label: "TWITTER", url: "https://x.com/_Happy_Pants_" },
    { label: "LINKDIN", url: "https://www.linkedin.com/in/hannah-richman-art/"},
    { label: "EMAIL",      url: "mailto:hannahrichman.art@gmail.com"        }
  ]

};
