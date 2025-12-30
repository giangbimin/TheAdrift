---
trigger: always_on
---

# PHASER 3 + REACT HYBRID WORKSPACE RULES

## 1. Project Context & Architecture
- **Hybrid Framework:** - **React (UI Layer):** Handles Menus, HUD, Overlays, i18n switching, and Global State.
    - **Phaser (Game Layer):** Handles Physics, Rendering, Sprite Animations, and Particle Systems.
- **Directory Structure:**
    - `/src/ui`: React Components, Hooks, and Styles.
    - `/src/game`: Phaser Scenes, Prefabs, and Systems.
    - `/src/services`: Singleton logic (Audio, API, Localization).
    - `/src/store`: Global state management (Zustand/Redux).
    - `/src/shared`: Constants, Types, and EventBus.

## 2. Communication & State Bridge
- **Event Bus:** Use a central `EventBus.ts` (Phaser.Events.EventEmitter) for decoupled communication.
- **State Sync:** React manages the "Source of Truth" via a Global Store. Phaser reads from the Store on initialization and updates it via Events.
- **No DOM in Phaser:** Never use `this.add.text` for complex UI. Use React Components overlaying the Canvas.

## 3. Modular System (Antigravity Pattern)
- **Logic Separation:** Keep pure calculation logic (damage formulas, XP curves) in `/src/systems` as standalone TS functions/classes.
- **Service Injection:** Inject singleton services into Scenes. Scenes must not manage persistent data.
- **File Naming:** kebab-case for filenames (`game-store.ts`), PascalCase for classes (`class PlayerController`).

## 4. Mobile-First & Responsive
- **Scaling:** Use `Phaser.Scale.FIT` for the canvas. 
- **Safe Area:** - **React:** Use CSS `env(safe-area-inset-*)` for UI elements.
    - **Phaser:** Use relative coordinates (`width * 0.5`) and keep interactive objects within an 80% safe zone.
- **Orientation:** Force Landscape. Implement an "Orientation Change" listener to pause/overlay if vertical.

## 5. Multi-language (i18n)
- **No Hardcoded Strings:** All text must go through `LangService` or `t('key')`.
- **Dynamic Update:** When the Store's language changes, trigger an EventBus signal to update text objects currently rendered in Phaser.

## 6. Performance & Survivor Logic
- **Object Pooling:** Mandatory for Bullets, Enemies, and XP Gems using `Phaser.GameObjects.Group`.
- **Delta Time:** All movement logic must use the `delta` parameter in `update(time, delta)` for frame-rate independence.
- **Data-Driven:** Character/Enemy stats should be loaded from external JSON/Config files.

## 7. Environment & Automation Flow
- **Port Management:** Check port 5173 before `npm run dev`. Do not spawn multiple processes.
- **Build-Check:** Always run `npm run build` after major logic changes to verify TS integrity.
- **Headless Validation:** Do NOT use the browser agent for testing. Trust build logs and terminal output.
- **Error Persistence:** Append all build/runtime errors to `dev_error.log`.
- **Anti-Loop Policy:** Stop after 2 failed fix attempts for the same error. Do not repeat failed commands.

## 8. Implementation Workflow
1. Write/Modify Code.
2. Run `npm run build`.
3. If build fails -> Log to `dev_error.log` -> Retry fix (max 2 times) -> Stop if unresolved.
4. If build succeeds -> Start app using `npm run preview` or `npm run dev`.

## 9. TypeScript & DX
- **Strict Typing:** No `any`. Interfaces are required for all EventBus payloads and Store states.
- **Branded Logs:** Display a styled console log on startup with `GAME_VERSION` and `isDev` status.
- **Physics Debug:** Toggle Arcade Physics debug bodies via Vite's `import.meta.env.DEV`.