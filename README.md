# Prairie Current Electric & Solar (demo)

A five-page demo website for a made-up Edmonton-area electrical and solar company. Built by Samuel Olabode to show local trades businesses what a simple, mobile-friendly site looks like.

Plain HTML, CSS and JavaScript. No build step. The Archivo font loads from Google Fonts.

## Files

- `index.html`: Home
- `services/index.html`: Services, including the solar savings estimator and FAQ
- `past-work/index.html`: Past Work gallery
- `about/index.html`: About
- `contact/index.html`: Contact and quote form
- `styles.css`: all styles (mobile-first, breakpoints at 640px and 960px)
- `script.js`: mobile menu, footer year, the estimator (rough demo maths), and the quote form (validates, then shows a demo message; nothing is sent)
- `images/`: all photos

## Changing the header or footer

There is no build step, so each page has its own copy of the header, footer and mobile bar. A change to one has to be made in all five files. The only difference between the copies is `aria-current="page"` on the current page's nav link.

## Run locally

Run `npx serve .` in this folder, then open http://localhost:3000. Links use root paths such as `/services/`, so opening the files directly from Finder will not work.

## Deploy on Vercel

The repo is connected to Vercel with no config files. Framework preset: Other. No build command, no output directory. Pushing to the production branch deploys it, and other branches get a preview URL.

## Swapping in real photos

Replace the files in `images/`. To keep the markup as it is, use the same file names. Otherwise update the `src` in the pages below, and update `alt`, `width`, `height` and the captions to match the new photo.

| File | Used on |
|---|---|
| `solar-install-lifting-panel.jpg` | Home hero, Home preview, Past Work |
| `solar-brick-house.jpg` | Home preview, Past Work |
| `solar-installer-harness.jpg` | Home preview, Services, Past Work, About |
| `solar-hip-roof.jpg` | Home "What we do", Past Work |
| `control-panel-wiring.jpg` | Home "What we do", Services, Past Work |
| `panel-testing-multimeter.jpg` | Home "What we do", Services, Past Work |

## Making the quote form send

The form in `contact/index.html` does not send anything. To connect it with Web3Forms, the service planned for The Right Clean:

1. Create a free access key at web3forms.com, using the inbox that should get the quotes.
2. On the form, add `action="https://api.web3forms.com/submit" method="POST"`.
3. Add hidden fields inside the form: `access_key` with your key, `subject`, and the honeypot field `botcheck`.
4. In `script.js`, replace the demo success message with a `fetch` POST of the form data, and show an error message if it fails.
5. Change the footer and form copy that say the site is a demo.

## Before sharing

- Open it on your phone and check that the photos load.
- Every phone number on the site is your real one, (825) 461-1264, so prospects can reach you from any page. "Text" buttons open a message to it and the Contact and footer numbers call it.
- The email, hello@prairiecurrent.example, is fake on purpose.
- `<meta name="robots" content="noindex">` is on every page and keeps the fake business out of Google. Leave it in.

## Photo credits (Unsplash)

- Installer lifting a panel: Bill Mead
- Testing a panel with a multimeter: Toolmash Expo
- Brick house, harness install, hip roof and control panel: Vivint Solar, Raze Solar, mostafa mahmoudi, Watt A Lot
