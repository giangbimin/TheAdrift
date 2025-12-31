import { Scene } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, ASSET_URLS } from '../../shared/constants';
import { EventBus } from '../../shared/EventBus';

export class Boot extends Scene {
    constructor() {
        super(SCENE_KEYS.BOOT);
    }

    preload() {
        //  The Boot Scene is responsible for loading any assets that are required for your Preloader
        this.load.image(ASSET_KEYS.BOOT_LOGO, ASSET_URLS.BOOT_LOGO);
    }

    create() {
        console.log('[Phaser] Boot Scene Create');

        // Launch GlobalScene as persistent
        this.scene.launch(SCENE_KEYS.GLOBAL);

        EventBus.emit('current-scene-ready', this);
        this.scene.start(SCENE_KEYS.PRELOADER);
    }
}
