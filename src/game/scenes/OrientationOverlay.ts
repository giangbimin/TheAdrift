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

        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, COLORS.SECONDARY, 0.9)
            .setInteractive();

        this.add.text(cx, cy, t('please_rotate'), {
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: GAME_WIDTH * 0.8 }
        }).setOrigin(0.5);
    }
}
