# trackNdraw

A simple tracing game for kids. It opens the device camera so kids can see
their paper, and shows a picture (a built-in line drawing, or one they
upload) semi-transparently on top of the camera view so they can trace it.

## Features

- Live camera view (defaults to the rear/environment camera, with a button
  to flip to the front camera)
- A gallery of 18 original, colorful line-art pictures to trace
- Upload your own image to trace instead
- A slider to adjust how transparent the picture is over the camera feed
- Flashlight toggle when the device/browser supports it
- Zoom in/out on the camera (+/- buttons, or mouse-wheel/trackpad on
  desktop)
- Controls auto-hide behind a floating button so they don't cover the
  camera view

## Getting started

```bash
npm install
npm run dev
```

This serves the app over **HTTPS** (via a locally-generated, self-signed
certificate) on both `localhost` and your machine's LAN IP, because
`getUserMedia` (camera access) is only allowed by browsers in a "secure
context" — `https://` or `http://localhost`. A plain `http://<lan-ip>`
address is blocked, which is why the camera would otherwise fail when
opening the app from a phone/tablet using your computer's IP.

To test on a phone: open the printed `Network:` URL from the terminal.
The browser will warn that the certificate isn't trusted (it's
self-signed) — tap **Advanced → Proceed** (wording varies by browser)
once, and the camera will work normally after that.

## Build

```bash
npm run build
```
