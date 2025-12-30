import { Scene } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, ASSET_URLS } from '../../constants';

export class Boot extends Scene {
    constructor() {
        super(SCENE_KEYS.BOOT);
    }

    preload() {
        // Load a simple placeholder logo for the boot transition
        this.load.image(ASSET_KEYS.BOOT_LOGO, ASSET_URLS.BOOT_LOGO);
    }

    create() {
        this.scene.start(SCENE_KEYS.PRELOADER);
    }
}
