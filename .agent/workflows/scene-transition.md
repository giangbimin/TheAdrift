---
description: Smooth Scene Transition (Hybrid React-Phaser)
---

## Objective
To synchronize visual transitions (Fade-in/Fade-out) between the **React UI Layer** and the **Phaser Game Layer** ensuring a seamless user experience without UI flickering or abrupt scene jumps.

## Architecture Logic
The transition follows a "Phased Shutdown and Startup" sequence:
1. **React** triggers the intent.
2. **Both Layers** execute visual "Out" animations.
3. **Phaser** performs the structural scene swap.
4. **Both Layers** execute visual "In" animations once the new scene is ready.

---

## 🔄 Execution Steps

### Phase 1: Initiation (The "Out" Transition)
1. **User Action:** User clicks a button in the React UI.
2. **Signal:** React emits `UI_ACTION_START` via the `EventBus`.
3. **React Logic:** - Disable all UI pointers/buttons to prevent double-clicks.
    - Start CSS Transition (e.g., `opacity: 0`) on the React Overlay.
4. **Phaser Logic:**
    - Listen for `UI_ACTION_START`.
    - Execute `this.cameras.main.fadeOut(duration, r, g, b)`.
    - Trigger a camera shake or flash if required by game design.

### Phase 2: The Swap (The "Switch" Transition)
1. **Wait for Completion:** Phaser listens for the `camerafadeoutcomplete` event.
2. **Scene Swap:** - Execute `this.scene.start(NEXT_SCENE_KEY)`.
    - Update the Global Store (`useGameStore`) to sync the current scene state (e.g., changing from 'MENU' to 'BATTLE').

### Phase 3: Manifestation (The "In" Transition)
1. **Scene Initialization:** The new Phaser Scene enters the `create()` method.
2. **Signal:** Phaser emits `SCENE_READY` via the `EventBus`.
3. **Phaser Logic:**
    - Execute `this.cameras.main.fadeIn(duration, r, g, b)`.
4. **React Logic:**
    - Listen for `SCENE_READY`.
    - Reset CSS Transition (e.g., `opacity: 1`) to reveal the new UI HUD or Menu.
    - Re-enable pointer events.

---

## 🛠️ Code Implementation Standards

### EventBus Signatures
- `EventBus.emit('ui-action-start', payload)`
- `EventBus.emit('current-scene-ready', sceneInstance)`

### Phaser Scene Cleanup
Always clean up listeners in the `shutdown` event to prevent memory leaks:
```typescript
this.events.once('shutdown', () => {
    EventBus.off('ui-action-start');
});