import { useState, useRef, useCallback, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from './ui/PhaserGame';
import { MainMenuUI } from './ui/MainMenuUI';
import { HudUI } from './ui/HudUI';
import { PauseMenuUI } from './ui/PauseMenuUI';
import { LoginScreen } from './ui/LoginScreen';
import { InventoryUI } from './ui/InventoryUI';
import { NotificationSystem } from './ui/NotificationSystem';
import { GameOverUI } from './ui/GameOverUI';
import { SCENE_KEYS } from './shared/constants';
import { useGameStore } from './store/game-store';
import { EventBus } from './shared/EventBus';

function App() {
    const [currentScene, setCurrentScene] = useState<string | null>(null);
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const { isPaused, updateMetrics, setPaused, setGameOver, session, toggleInventory } = useGameStore();

    const onSceneReady = useCallback((scene: Phaser.Scene) => {
        console.log('[App] Scene Ready:', scene.scene.key);
        setCurrentScene(scene.scene.key);
    }, []);

    useEffect(() => {
        const handleMetricsUpdate = (metrics: any) => {
            updateMetrics(metrics);
        };

        const handlePauseToggle = (paused: boolean) => {
            setPaused(paused);
        };

        const handleGameOver = (over: boolean) => {
            setGameOver(over);
        };

        EventBus.on('update-game-metrics', handleMetricsUpdate);
        EventBus.on('game-paused', handlePauseToggle);
        EventBus.on('game-over', handleGameOver);

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'i' || e.key === 'I') {
                toggleInventory();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            EventBus.removeListener('update-game-metrics', handleMetricsUpdate);
            EventBus.removeListener('game-paused', handlePauseToggle);
            EventBus.removeListener('game-over', handleGameOver);
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [updateMetrics, setPaused, setGameOver, toggleInventory]);

    console.log('[App] Render - isAuthenticated:', session.isAuthenticated, 'currentScene:', currentScene);

    return (
        <div id="app">
            {/* Login Screen */}
            {!session.isAuthenticated && <LoginScreen />}

            {/* Only render Phaser after authentication to prevent WebGL errors */}
            {session.isAuthenticated && (
                <>
                    <PhaserGame ref={phaserRef} currentActiveScene={onSceneReady} />

                    {/* React UI Overlay */}
                    <div className="react-ui-overlay">
                        {currentScene === SCENE_KEYS.MAIN_MENU && (
                            <MainMenuUI phaserRef={phaserRef} />
                        )}

                        {currentScene === SCENE_KEYS.GAME && (
                            <>
                                <HudUI />
                                {isPaused && <PauseMenuUI phaserRef={phaserRef} />}
                            </>
                        )}

                        <GameOverUI />
                        <InventoryUI />
                        <NotificationSystem />
                    </div>
                </>
            )}

            <style>{`
                .react-ui-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 999;
                    padding-top: env(safe-area-inset-top);
                    padding-bottom: env(safe-area-inset-bottom);
                    padding-left: env(safe-area-inset-left);
                    padding-right: env(safe-area-inset-right);
                }

                .react-ui-overlay > * {
                    pointer-events: auto;
                }
            `}</style>
        </div>
    );
}

export default App;
