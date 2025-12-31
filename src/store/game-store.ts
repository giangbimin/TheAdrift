import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SETTINGS } from '../shared/constants';

interface InventoryItem {
    id: string;
    name: string;
    icon: string;
    quantity: number;
}

interface UserSession {
    userId: string | null;
    username: string | null;
    isAuthenticated: boolean;
}

interface GameState {
    language: string;
    isGameStarted: boolean;
    isPaused: boolean;

    // Gameplay Metrics
    hp: number;
    maxHp: number;
    xp: number;
    maxXp: number;
    level: number;
    score: number;
    timer: number;

    // Inventory
    inventory: InventoryItem[];
    isInventoryOpen: boolean;

    // Session
    session: UserSession;

    // Notifications
    notifications: Array<{ id: string; message: string; type: 'info' | 'success' | 'warning' | 'error' }>;

    setLanguage: (lang: string) => void;
    setGameStarted: (started: boolean) => void;
    setPaused: (paused: boolean) => void;

    isGameOver: boolean;
    setGameOver: (over: boolean) => void;

    updateMetrics: (metrics: Partial<Pick<GameState, 'hp' | 'maxHp' | 'xp' | 'maxXp' | 'level' | 'score' | 'timer'>>) => void;
    resetGame: () => void;

    // Inventory actions
    addItem: (item: InventoryItem) => void;
    removeItem: (itemId: string) => void;
    toggleInventory: () => void;

    // Session actions
    login: (userId: string, username: string) => void;
    logout: () => void;

    // Notification actions
    addNotification: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
    removeNotification: (id: string) => void;
}

const initialState = {
    isPaused: false,
    isGameOver: false,
    hp: 100,
    maxHp: 100,
    xp: 0,
    maxXp: 100,
    level: 1,
    score: 0,
    timer: 0,
    inventory: [],
    isInventoryOpen: false,
    notifications: []
};

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            language: SETTINGS.DEFAULT_LANG,
            isGameStarted: false,
            ...initialState,
            session: {
                userId: null,
                username: null,
                isAuthenticated: false
            },

            setLanguage: (lang) => set({ language: lang }),
            setGameStarted: (started) => set({ isGameStarted: started }),
            setPaused: (paused) => set({ isPaused: paused }),

            setGameOver: (over) => set({ isGameOver: over, isPaused: over }),

            updateMetrics: (metrics) => set((state) => ({ ...state, ...metrics })),
            resetGame: () => set((state) => ({ ...state, ...initialState, isGameStarted: false, isGameOver: false })),

            // Inventory
            addItem: (item) => set((state) => {
                const existing = state.inventory.find(i => i.id === item.id);
                if (existing) {
                    return {
                        inventory: state.inventory.map(i =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                        )
                    };
                }
                return { inventory: [...state.inventory, item] };
            }),

            removeItem: (itemId) => set((state) => ({
                inventory: state.inventory.filter(i => i.id !== itemId)
            })),

            toggleInventory: () => set((state) => ({ isInventoryOpen: !state.isInventoryOpen })),

            // Session
            login: (userId, username) => set({
                session: { userId, username, isAuthenticated: true }
            }),

            logout: () => set({
                session: { userId: null, username: null, isAuthenticated: false },
                ...initialState
            }),

            // Notifications
            addNotification: (message, type = 'info') => set((state) => ({
                notifications: [...state.notifications, { id: Date.now().toString(), message, type }]
            })),

            removeNotification: (id) => set((state) => ({
                notifications: state.notifications.filter(n => n.id !== id)
            }))
        }),
        {
            name: 'nebula-grid-storage',
            partialize: (state) => ({
                session: state.session,
                language: state.language
            })
        }
    )
);
