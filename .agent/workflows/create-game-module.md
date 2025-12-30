---
description: Workflow: Create Game Module
---

1. **Define Data:** Add new state to `src/store/useGameStore.ts`.
2. **Define Logic:** Create logic in `src/services/` (e.g., `CombatService.ts`).
3. **Bridge:** Add events to `src/shared/EventBus.ts`.
4. **Implementation:** - Create UI in `src/ui/`.
   - Create Game logic in `src/game/systems/`.
5. **Localization:** Add keys to `src/lang/`.