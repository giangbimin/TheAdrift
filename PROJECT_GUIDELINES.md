## 1. Project Context & Architecture
- **Hybrid Framework:** - **React Layer (UI):** Manages Menus, HUD, Overlays, and Localization using Zustand.
    - **Phaser Layer (Game):** Manages Physics, Rendering, Sprite Animations, and Particle Systems.
- **Bridge (EventBus):** Decoupled communication via `src/shared/EventBus.ts`.
- **Source of Truth:** Global state lives in `src/store/`, synced via Events.

## 2. Directory Structure (Modular System)
- `src/ui/`: React Components, Hooks, and Styles.
- `src/game/`: Phaser Scenes, Prefabs, and Systems.
- `src/services/`: Singleton logic (Audio, API, Localization).
- `src/store/`: Zustand/Redux global state management.
- `src/shared/`: EventBus, Constants, and TypeScript Types.

## 3. Core Development Rules
- **Modular Logic:** Pure calculation logic (formulas, curves) must be in `/src/game/systems/`.
- **Constants First:** Never hardcode asset keys or magic numbers. Use `src/shared/constants.ts`.
- **Mobile-First:** - **Phaser:** Use relative coordinates (`width * 0.5`) and `Scale.FIT`.
    - **React:** Use CSS `env(safe-area-inset-*)`.
- **Localization:** No raw strings. Use `t('key')` via `LangService`.

## 4. Automation & Anti-Loop Policy (Strict)
- **Port Management:** Check port 5173 before `npm run dev`. Do not spawn duplicate processes.
- **Build-Check Loop:** Run `npm run build` after major logic changes.
- **Error Logging:** Append all build/runtime errors to `dev_error.log`.
- **Retry Limit:** STOP after 2 failed fix attempts for the same error. Report to user.
- **Headless Validation:** Verify success via terminal/build logs. DO NOT open browser agent.

## 5. Workflow: Scene Transition (`.agent/workflows/scene-transition.md`)
1. **Initiation:** React emits `UI_ACTION_START`. Disable UI inputs.
2. **Phase Out:** React triggers CSS transition (opacity 0); Phaser executes `cameras.main.fadeOut()`.
3. **The Swap:** Phaser waits for `camerafadeoutcomplete`, then executes `this.scene.start(NEXT_SCENE)`.
4. **Phase In:** New Scene emits `SCENE_READY`; Phaser executes `cameras.main.fadeIn()`; React triggers CSS transition (opacity 1).

## 6. Performance Standards
- **Object Pooling:** Mandatory for Bullets, Enemies, and XP Gems using `Phaser.GameObjects.Group`.
- **Delta Time:** All movement logic must use the `delta` parameter for frame-rate independence.
- **Cleanup:** Always use `this.events.once('shutdown', ...)` to remove EventBus listeners.

## 7. Implementation Steps
1. Write/Modify Code.
2. Run `npm run build`.
3. If build fails -> Log to `dev_error.log` -> Attempt fix (max 2 times) -> Stop if unresolved.
4. If build succeeds -> Start app using `npm run preview`.