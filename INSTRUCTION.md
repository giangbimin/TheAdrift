# NEBULA GRID: Project Generation Instructions

## 1. Project Overview
**Name**: Nebula Grid: Starbound Survivor
**Type**: Hybrid Web Game
**Architecture**: React (UI Overlay) + Phaser 3 (Game Engine)
**Theme**: Cyberpunk / Sci-Fi ("Nebula Grid")

## 2. Technology Stack
- **Build Tool**: Vite (TypeScript)
- **Core Frameworks**: 
  - React 19 (User Interface)
  - Phaser 3.90 (Game Loop, Physics, Rendering)
- **Styling**: 
  - Tailwind CSS v4 (Utility-first)
  - shadcn/ui (Reusable Components)
  - CSS Variables (Theming)
- **State Management**: Zustand (Global Store)
- **Communication**: Phaser EventEmitter (EventBus)

## 3. Architecture Patterns

### 3.1 The 4-Layer Rendering Model
The application must be structured in 4 distinct visual/logic layers (z-index from lowest to highest):

1.  **Layer 4 (Global/Background)**: `GlobalScene` (Phaser). Persistent. Handles BGM, SFX, and asset preloading. Never destroyed.
2.  **Layer 2 (Game World)**: `GameScene` (Phaser). Handles physics (Arcade), sprites, enemies, and core gameplay loop.
3.  **Layer 3 (VFX Overlay)**: `OverlayScene` (Phaser). Handles screen effects (flash, shake) and virtual joystick input visualization.
4.  **Layer 1 (UI)**: React DOM Overlay (`position: fixed`). Handles **ALL** text, buttons, menus, HUDs, and inventory.

### 3.2 The Hybrid Bridge Principle
- **Strict Separation**: 
    - **Phaser** handles the Canvas. It should **NEVER** render complex text or buttons (avoid `this.add.text`, `this.add.dom`).
    - **React** handles the DOM. It should **NEVER** handle game loop logic or physics.
- **State Sync**: 
    - **Zustand** is the Single Source of Truth.
    - **Phaser** receives updates via `EventBus` or direct store subscription (rarely).
    - **React** updates the store, which triggers events to Phaser if needed (e.g., specific game actions).

## 4. Implementation Guidelines

### 4.1 Directory Structure
```
src/
├── ui/                 # [ROOT] All UI Logic and Components
│   ├── basic/          # [ATOMIC] Reusable Primitives (Button, Card, etc.)
│   ├── MainMenuUI.tsx  # [COMPOSITE] Feature Screens
│   ├── LoginScreen.tsx 
│   ├── HudUI.tsx
│   └── ...
├── services/           # Singleton Services (Audio, Translation)
├── shared/             # Shared Types & Constants
│   ├── constants.ts    # centralized configs (UI_CONFIG, GAME_CONFIG)
│   └── EventBus.ts     # Communication Bridge
└── store/              # State Management
    └── game-store.ts   # Zustand Store
```

### 4.2 Styling & Theming (Tailwind v4)
- **Configuration**: Use `src/index.css` with `@theme` directive (NO `tailwind.config.js`).
- **Theme Variables**:
    - Fonts: `font-orbitron`
    - Colors: `nebula-cyan` (#00f0ff), `nebula-amber` (#ffcc00), `nebula-bg` (#0f041d)
- **Components**:
    - Use `src/ui/basic/button.tsx` with `variant="cyber"` for all actions.
    - Use `src/ui/basic/card.tsx` with `variant="cyber"` for all panels/containers.

### 4.3 Coding Rules
1.  **No Magic Numbers**: All gameplay values (speed, damage) and UI constants (sizes, delays) must live in `src/shared/constants.ts`.
2.  **Asset Management**: All asset paths must be defined in `ASSET_URLS` within `constants.ts`.
3.  **Mobile First**: 
    - UI must use `Safe Area` insets.
    - Game must handle landscape orientation enforcement.
    - Use `vmax`/`vmin` for responsive UI scaling.

## 5. Workflow: Generating New Features
1.  **State**: Define new state in `game-store.ts` (e.g., `isInventoryOpen`).
2.  **UI**: Create a React component in `src/ui/` using shadcn components.
3.  **Integration**: Add the component to `App.tsx` (Layer 1).
4.  **Logic**: Connect to Phaser via `EventBus` if it affects the game world (e.g., using an item).

## 6. Build & Deployment
- **Bundler**: Vite.
- **PostCSS**: Must use CommonJS config (`module.exports`) for compatibility.
- **Output**: `dist/` folder ready for static hosting or Capacitor wrapper.
