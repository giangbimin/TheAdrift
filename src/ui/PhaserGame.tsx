import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from '../game/main';
import { EventBus } from '../shared/EventBus';

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

// Singleton game instance outside component
let globalGameInstance: Phaser.Game | null = null;

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(({ currentActiveScene }, ref) => {
    const activeSceneCallback = useRef(currentActiveScene);

    useEffect(() => {
        activeSceneCallback.current = currentActiveScene;
    }, [currentActiveScene]);

    useLayoutEffect(() => {
        console.log('[PhaserGame] useLayoutEffect triggered');

        const onSceneReady = (scene_instance: Phaser.Scene) => {
            console.log('[PhaserGame] Scene ready event received:', scene_instance.scene.key);
            if (activeSceneCallback.current) {
                activeSceneCallback.current(scene_instance);
            }

            if (typeof ref === 'function') {
                ref({ game: globalGameInstance, scene: scene_instance });
            } else if (ref) {
                ref.current = { game: globalGameInstance, scene: scene_instance };
            }
        };

        EventBus.on('current-scene-ready', onSceneReady);

        // Only create game if it doesn't exist
        if (globalGameInstance === null) {
            console.log('[PhaserGame] Creating new Phaser game instance (singleton)');
            globalGameInstance = StartGame('game-container');
            console.log('[PhaserGame] Game instance created:', globalGameInstance);

            if (typeof ref === 'function') {
                ref({ game: globalGameInstance, scene: null });
            } else if (ref) {
                ref.current = { game: globalGameInstance, scene: null };
            }
        } else {
            console.log('[PhaserGame] Game instance already exists, reusing it');
        }

        return () => {
            console.log('[PhaserGame] Cleanup - removing event listener only');
            EventBus.removeListener('current-scene-ready', onSceneReady);
            // Do NOT destroy the game here - it's a singleton
        };
    }, [ref]);

    return (
        <div id="game-container" style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
        }}></div>
    );
});
