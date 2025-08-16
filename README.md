Sure! Here’s the plain text version for easy copy-paste without any code block formatting:

---

Project: HSHM (Ionic React + Vite + Capacitor)

Overview
This project is an Ionic React app built with Vite, packaged as a native Android app using Capacitor. This README provides instructions to build the web app, sync it with the Android native project, and generate an APK using Android Studio.

Prerequisites

* Node.js and npm installed
* Android Studio installed and configured
* Android SDK & emulator or physical device
* Capacitor CLI installed (comes with project dependencies)

Project Setup
Run `npm install` to install dependencies.

Build & Run Web App (Vite)
To build the web assets for production, run `npm run build`.
The build output will be in the `dist/` directory (default for Vite).

Capacitor Configuration
Make sure your capacitor.config.json contains:
{
"appId": "com.example.app",
"appName": "hshm",
"webDir": "dist"
}
The `webDir` points to your built web assets folder (`dist`).

Adding Android Platform (One-time)
Run `npx cap add android` to add the Android platform.

Sync Web Assets to Android
After each build, run `npx cap copy android` or `npx cap sync android` to sync the web assets to the native Android project.

Open Android Studio Project
Run `npx cap open android` to open the native Android project in Android Studio.
Use Android Studio to run on an emulator or physical device.

Build APK with Android Studio

1. In Android Studio, select Build > Build Bundle(s) / APK(s) > Build APK(s).
2. Once the build completes, the APK location is shown in a notification.
3. Transfer the APK to your device for testing.
4. For production, generate a signed APK via Build > Generate Signed Bundle / APK.

Notes

* Always run `npm run build` before syncing to ensure the latest code is used.
* Ensure `webDir` in capacitor.config.json matches your build output folder.
* Use `npx cap sync android` to update Capacitor plugins and copy assets.
* For iOS builds, add the iOS platform similarly with `npx cap add ios`.

Troubleshooting

* Missing web assets error: Verify the build output directory matches `webDir` in Capacitor config.
* Android build fails: Check Android SDK installation and update build tools.
* HMR or dev server: Use `npm run dev` for development, but native builds require production build.

Useful Links

* Capacitor Official Docs: [https://capacitorjs.com/docs](https://capacitorjs.com/docs)
* Ionic React Docs: [https://ionicframework.com/docs/react](https://ionicframework.com/docs/react)
* Vite Docs: [https://vitejs.dev/guide/](https://vitejs.dev/guide/)

---

Let me know if you want me to add anything else!