# trackNdraw

### 👉 [Open trackNdraw and start drawing](https://onezloop.github.io/trackNdraw/)

A simple tracing game for kids. It opens the device camera so kids can see
their paper, and shows a picture (a built-in line drawing, or one they
upload) semi-transparently on top of the camera view so they can trace it.

## How to draw with it

Works best on a phone or tablet, propped up over a sheet of paper.

1. **Open the app** at
   [onezloop.github.io/trackNdraw](https://onezloop.github.io/trackNdraw/)
   and allow camera access when the browser asks. The rear camera starts by
   default, pointed at whatever is in front of it.
2. **Put a blank sheet of paper** under the camera so the paper fills most
   of the screen.
3. **Tap the 🎨 button** to open the picture picker, then tap a picture from
   the gallery — or tap **Upload** to trace your own image. The picker
   closes on its own once you pick one.
4. **Line the picture up with the paper.** Drag the picture with one finger
   to move it, pinch with two fingers to resize it (mouse-drag and
   scroll-wheel on a laptop). Double-tap it, or tap the ⊙ button, to snap it
   back to the middle.
5. **Adjust "Picture fade"** in the 🎨 panel until you can see both the
   picture and your pencil lines clearly.
6. **Trace the lines on the paper** with a pencil, following the picture on
   the screen. Then lift the device away and admire the drawing.

Two extras that help: the **+ / −** buttons zoom the camera in and out, and
the **💡** button turns on the phone's flashlight if the paper is in shadow
(it only appears on devices that support it).

## Features

- Live camera view (defaults to the rear/environment camera, with a button
  to flip to the front camera)
- A gallery of 28 original, colorful line-art pictures to trace
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
