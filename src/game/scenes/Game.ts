import { Scene } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, GAME_WIDTH, GAME_HEIGHT } from '../../shared/constants';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text: Phaser.GameObjects.Text;

    constructor() {
        super(SCENE_KEYS.GAME);
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, ASSET_KEYS.BACKGROUND);
        this.background.setAlpha(0.2);

        this.msg_text = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Game Started!\nDefeat the vampires!', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start(SCENE_KEYS.GAME_OVER);
        });
    }
}
