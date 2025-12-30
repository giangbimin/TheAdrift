---
trigger: always_on
---

# Phaser 3 + TypeScript Game Development Rules

## 1. Project Architecture
- **Strict Scene Management:** Always separate logic into Boot, Preloader, MainMenu, and GameScene.
- **Dependency Injection:** Pass data between scenes using the `init(data)` method.
- **Constants First:** Never hardcode strings (asset keys) or numbers (player speed, colors). Always check `src/constants.ts` first; if a constant is missing, create it.

## 2. Asset Management
- **Centralized Keys:** Use the `ASSET_KEYS` object from `constants.ts` for all `load` and `add` calls.
- **Preloading:** All assets must be loaded in `Preloader.ts`. Do not load assets inside the `GameScene` unless it's for dynamic/on-demand loading.

## 3. Performance & Survivor Mechanics
- **Object Pooling:** For bullets, enemies, and XP gems, always implement and use `Phaser.GameObjects.Group` with `runChildUpdate: true` to reuse objects.
- **Physics:** Use `Arcade Physics` unless otherwise specified. Avoid complex polygon colliders to maintain 60FPS with high entity counts.
- **Delta Time:** All movement logic must use the `delta` parameter from the `update(time, delta)` method to ensure frame-rate independent movement.

## 4. TypeScript & Code Style
- **Strong Typing:** Define Interfaces for Game Data (e.g., `IPlayerStats`, `IEnemyConfig`). Avoid the `any` type.
- **Private/Protected:** Use proper TS access modifiers for class properties and methods.
- **Clean Code:** Keep Scene files under 300 lines. Move complex logic (e.g., Weapon Systems, Enemy AI) into separate "Prefabs" or "Systems" classes.

## 5. Mobile & Responsive
- **Scaling:** Always assume a mobile-first responsive design. Use `this.cameras.main.width` and `height` for positioning UI elements relative to the screen.
- **Input:** Implement both Keyboard (for desktop dev) and Virtual Joystick/Touch (for mobile) support.

## 6. Environment & Debugging
- **Debug Mode:** Link all physics debug and hitboxes to the `isDev` flag (Vite's `import.meta.env.DEV`). 
- **Logging & DX:** 
    - Always display a custom styled console log on startup showing `GAME_VERSION` and `DEV MODE` status.
    - Implement enhanced asset loading error logging in `Preloader.ts` using the `loaderror` event.
    - In `MainMenu`, if `isDev` is true, add a bottom corner overlay showing real-time FPS and Build Version.

## 7. Port & Process Management
- **Port Conflict Check:** Before attempting to start the dev server, check if the default port (usually 5173) is already in use. If it is, attempt to kill the process or notify me before trying a different port.
- **Process Persistence:** Always verify if the app is already running before executing `npm run dev`.

## 8. Build & Post-Implementation Testing
- **Automated Build:** After every major feature implementation or file change, run `npm run build` to ensure TypeScript compilation and Vite bundling are successful.
- **Post-Build Execution:** Once the build is successful, execute the preview command (e.g., `npm run preview`) to verify the production bundle.
- **Headless Validation:** Do NOT attempt to open or "run agent" to test inside a browser window. Verify success solely based on Terminal output and Build logs.

## 9. Robust Error Logging & Anti-Loop
- **Error Persistence:** If a build or runtime error occurs, append the error details to a file named `dev_error.log` in the project root.
- **No-Loop Policy:** - If a specific fix fails more than twice, STOP and report the error to me. 
    - DO NOT attempt the same command or logic repeatedly in a loop.
    - Check the `dev_error.log` before attempting a fix to ensure you aren't repeating a failed strategy.

## 10. Implementation Workflow
1. Write/Modify Code.
2. Run `npm run build`.
3. If build fails -> Log error to `dev_error.log` -> Attempt fix (max 2 times) -> Stop if unresolved.
4. If build succeeds -> Start the app using `npm run preview` or `npm run dev`.
