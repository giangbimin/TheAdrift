# 🛠 PROJECT WORKFLOW & RULES (ANTIGRAVITY STYLE)

## 📁 Workspace Organization
- **.agent/workflows/**: Cửa ngõ điều hành AI.
- **src/ui/**: React Layer (Zustand, i18n UI).
- **src/game/**: Phaser Layer (Scenes, Systems).
- **src/services/**: Core Logic (Singleton Services).

## 🔄 Core Workflows

### 1. The "Anti-Loop" Build Flow
- **Step 1:** Modify code.
- **Step 2:** Execute `npm run build`.
- **Step 3:** On Error -> Write to `dev_error.log` -> Try fix (Max 2).
- **Step 4:** On Success -> Start `npm run preview`.

### 2. Hybrid Communication Flow
- **Phaser -> React:** Emit via `EventBus`. Update `Zustand Store`.
- **React -> Phaser:** Change `Store`. Phaser listens to store changes or EventBus.

## 📱 Mobile-First & Localization Rules
- **Scaling:** UI React (CSS safe-area), Game Phaser (Relative Positioning).
- **i18n:** Every text object in Game/UI must call `t(key)`.

## 🛠 Developer Tooling
- **Port Check:** Always verify process before `npm run dev`.
- **Log Monitor:** Watch `dev_error.log` for recurring patterns.