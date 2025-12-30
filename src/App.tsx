import { useState, useRef, useCallback, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from './ui/PhaserGame';
import { MainMenuUI } from './ui/MainMenuUI';
import { SCENE_KEYS } from './shared/constants';

function App() {
    const [currentScene, setCurrentScene] = useState<string | null>(null);
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const onSceneReady = useCallback((scene: Phaser.Scene) => {
        setCurrentScene(scene.scene.key);
    }, []);

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={onSceneReady} />

            {/* React UI Layers */}
            {currentScene === SCENE_KEYS.MAIN_MENU && (
                <MainMenuUI phaserRef={phaserRef} />
            )}
        </div>
    );
}

export default App;
