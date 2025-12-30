import { create } from 'zustand';
import { SETTINGS } from '../shared/constants';

interface GameState {
    language: string;
    isGameStarted: boolean;
    setLanguage: (lang: string) => void;
    setGameStarted: (started: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
    language: SETTINGS.DEFAULT_LANG,
    isGameStarted: false,
    setLanguage: (lang) => set({ language: lang }),
    setGameStarted: (started) => set({ isGameStarted: started }),
}));
