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

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(({ currentActiveScene }, ref) => {
    const game = useRef<Phaser.Game | null>(null);
    const activeSceneCallback = useRef(currentActiveScene);

    useEffect(() => {
        activeSceneCallback.current = currentActiveScene;
    }, [currentActiveScene]);

    useLayoutEffect(() => {
        const onSceneReady = (scene_instance: Phaser.Scene) => {
            if (activeSceneCallback.current) {
                activeSceneCallback.current(scene_instance);
            }

            if (typeof ref === 'function') {
                ref({ game: game.current, scene: scene_instance });
            } else if (ref) {
                ref.current = { game: game.current, scene: scene_instance };
            }
        };

        EventBus.on('current-scene-ready', onSceneReady);

        if (game.current === null) {
            game.current = StartGame('game-container');

            if (typeof ref === 'function') {
                ref({ game: game.current, scene: null });
            } else if (ref) {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {
            EventBus.removeListener('current-scene-ready', onSceneReady);
            // We only destroy the game when the component unmounts
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        };
    }, [ref]);

    return (
        <div id="game-container"></div>
    );
});
