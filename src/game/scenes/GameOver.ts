import { Scene } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, GAME_WIDTH, GAME_HEIGHT } from '../../shared/constants';

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text: Phaser.GameObjects.Text;

    constructor() {
        super(SCENE_KEYS.GAME_OVER);
    }

    create() {
        // Stop all sounds
        this.game.sound.stopAll();

        // Notify React to show Game Over UI
        EventBus.emit('game-over', true);

        // Listen for restart
        const restartListener = () => {
            this.scene.start(SCENE_KEYS.MAIN_MENU);
            EventBus.removeListener('ui-restart-game', restartListener);
        };
        EventBus.on('ui-restart-game', restartListener);
    }
}
