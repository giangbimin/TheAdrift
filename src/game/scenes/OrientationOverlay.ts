import { Scene } from 'phaser';
import { SCENE_KEYS, GAME_WIDTH, GAME_HEIGHT, COLORS } from '../../shared/constants';
import { t } from '../../services/TranslationService';

export class OrientationOverlay extends Scene {
    constructor() {
        super(SCENE_KEYS.ORIENTATION_OVERLAY);
    }

    create() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        // Ensure we draw over everything
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.8)
            .setInteractive();

        this.add.text(cx, cy, t('please_rotate'), {
            fontSize: '48px',
            color: '#ffcc00',
            align: 'center',
            fontStyle: 'bold',
            wordWrap: { width: GAME_WIDTH * 0.8 }
        }).setOrigin(0.5);
    }
}
