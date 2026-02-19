# Time Tracker – iPad PWA

## Why PWA for iPad?
A Progressive Web App is the **best choice** for iPad because:
- ✅ No App Store approval needed
- ✅ Installs directly from Safari to the Home Screen
- ✅ Works fully offline after first load
- ✅ Uses iPad's full screen in both portrait & landscape
- ✅ Respects Face ID notch / home bar safe areas
- ✅ Auto-updates when you re-deploy

## How to Install on iPad

1. **Host the files** on any HTTPS server:
   - [Netlify](https://netlify.com) — drag & drop the folder → instant URL
   - [GitHub Pages](https://pages.github.com) — free, works in minutes
   - [Vercel](https://vercel.com) — one-click deploy

2. **Open Safari on iPad** and navigate to your URL.

3. Tap the **Share button** (box with arrow) in Safari's toolbar.

4. Select **"Add to Home Screen"**.

5. Tap **"Add"** — the icon appears on your iPad Home Screen.

6. Launch it — it opens full-screen, no browser chrome, just like a native app!

## Generate Icons
Open `create-icons.html` in any browser, then:
- Right-click the 192px icon → Save as `icon-192.png`
- Right-click the 512px icon → Save as `icon-512.png`
- Make copies named `icon-152.png`, `icon-167.png`, `icon-180.png`
  (iPad uses these specific sizes)

## Files Required
```
time-tracker-ipad/
├── index.html          ← main app
├── manifest.json       ← PWA config
├── service-worker.js   ← offline cache
├── icon-152.png        ← iPad Retina icon
├── icon-167.png        ← iPad Pro icon
├── icon-180.png        ← iPhone/iPad icon
├── icon-192.png        ← general PWA icon
├── icon-512.png        ← splash / store icon
└── README.md           ← this file
```

## iPad-Specific Features
- **Safe area padding**: Automatically avoids Face ID notch and home bar
- **Touch targets**: All buttons are ≥44pt (Apple HIG standard)
- **No input zoom**: Font size ≥16px on inputs prevents iOS auto-zoom
- **Orientation support**: Optimised layouts for both portrait & landscape
- **SF Pro font**: Uses Apple's system font for a native feel
- **Offline**: All data stored in localStorage — works without internet

## Troubleshooting
- **"Add to Home Screen" missing**: You must use **Safari** (not Chrome/Firefox)
- **App not updating**: Clear Safari cache → Settings → Safari → Clear History
- **Data lost**: Data is per-browser. Don't use Private Browsing mode.
