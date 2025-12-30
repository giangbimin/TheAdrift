import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game, Scale } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { OrientationOverlay } from './scenes/OrientationOverlay';
import { SCENE_KEYS, GAME_WIDTH, GAME_HEIGHT, COLORS, GAME_VERSION } from '../shared/constants';
import { EventBus } from '../shared/EventBus';

const isDev = import.meta.env.DEV;

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'game-container',
    backgroundColor: COLORS.BACKGROUND,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: isDev
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver,
        OrientationOverlay
    ]
};

const StartGame = (parent: string) => {

    const game = new Game({ ...config, parent });

    // Orientation Management
    const checkOrientation = () => {
        // Only trigger orientation lock on mobile or if specifically desired
        // For now, let's check for extreme portrait aspect ratios
        const isPortrait = window.innerHeight > window.innerWidth;
        const overlayScene = game.scene.getScene(SCENE_KEYS.ORIENTATION_OVERLAY);

        if (isPortrait) {
            if (!game.scene.isActive(SCENE_KEYS.ORIENTATION_OVERLAY)) {
                game.scene.pause(SCENE_KEYS.MAIN_MENU);
                game.scene.pause(SCENE_KEYS.GAME);
                game.scene.start(SCENE_KEYS.ORIENTATION_OVERLAY);
                game.scene.bringToTop(SCENE_KEYS.ORIENTATION_OVERLAY);
            }
        } else {
            if (game.scene.isActive(SCENE_KEYS.ORIENTATION_OVERLAY)) {
                game.scene.stop(SCENE_KEYS.ORIENTATION_OVERLAY);
                game.scene.resume(SCENE_KEYS.MAIN_MENU);
                game.scene.resume(SCENE_KEYS.GAME);
            }
        }
    };

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    // Initial check after a short delay to let scenes initialize
    game.events.once('ready', () => {
        setTimeout(checkOrientation, 100);
    });

    // Event Bus Bridge
    game.events.on('ready', () => {
        // Listen to all scene starts
        game.scene.scenes.forEach(scene => {
            scene.events.on('create', () => {
                EventBus.emit('current-scene-ready', scene);
            });
        });
    });

    // Custom Styled Console Log for DX
    const logStyle = [
        'background: #000',
        'color: #fff',
        'padding: 10px',
        'border-radius: 5px',
        'font-weight: bold',
        'border: 1px solid #ffcc00'
    ].join(';');

    console.log(
        `%c 🧛 VAMPIRE SURVIVOR CLONE | v${GAME_VERSION} | ${isDev ? 'DEBUG MODE' : 'PRODUCTION'} `,
        logStyle
    );

    return game;
}

export default StartGame;
