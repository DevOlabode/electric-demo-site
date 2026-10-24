# Prairie Current Electric & Solar (demo)

A demo website for a made-up Edmonton-area electrical and solar company. Built by Samuel Olabode to show local trades businesses what a simple, mobile-friendly site looks like.

Plain HTML, CSS and JavaScript. No build step. The Archivo font loads from Google Fonts.

## Files

- `index.html`: the page
- `styles.css`: all styles (mobile-first, breakpoints at 640px and 960px)
- `script.js`: mobile menu, the solar savings estimator (rough demo maths), footer year, and the quote form (validates, then shows a demo message; nothing is sent)

## Run locally

Open `index.html` in a browser, or run `npx serve .` in this folder.

## Deploy on Vercel

1. Push this folder to a GitHub repo (or one repo with a folder per demo).
2. In Vercel: Add New > Project > import the repo. If the repo has several demos, set Root Directory to this folder.
3. Framework preset: Other. No build command, no output directory. Deploy.

Or from this folder: `npx vercel` then `npx vercel --prod`.

## Before sharing

- Open it on your phone and check that the photos load.
- Photos are hotlinked from Unsplash (free Unsplash License). For reliability, download them into an `images/` folder and update the `src` paths.
- The phone number throughout is your real one, (825) 461-1264, and every button opens a text message to you (sms: links). The email is still fake on purpose.
- `<meta name="robots" content="noindex">` keeps the fake business out of Google. Leave it in.

## Photo credits (Unsplash)

- Hero: solar panel install on a shingled roof, Bill Mead
- Solar section: electrician testing a panel, Toolmash Expo
- Projects: Vivint Solar, Raze Solar, mostafa mahmoudi, Watt A Lot
