import { useState, useRef } from 'react';
import { IRefPhaserGame, PhaserGame } from './ui/PhaserGame';
import { MainMenuUI } from './ui/MainMenuUI';
import { SCENE_KEYS } from './shared/constants';

function App() {
    const [currentScene, setCurrentScene] = useState<string | null>(null);
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const onSceneReady = (scene: Phaser.Scene) => {
        setCurrentScene(scene.scene.key);
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={onSceneReady} />

            {/* React UI Layers */}
            {currentScene === SCENE_KEYS.MAIN_MENU && (
                <MainMenuUI phaserRef={phaserRef} />
            )}

            {/* Add more overlays as needed (HUD, Pause, etc.) */}
        </div>
    );
}

export default App;
