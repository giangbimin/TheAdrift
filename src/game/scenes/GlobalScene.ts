import { Scene } from 'phaser';
import { SCENE_KEYS } from '../../shared/constants';
import { EventBus } from '../../shared/EventBus';
import { useGameStore } from '../../store/game-store';

export class GlobalScene extends Scene {
    private currentBGM: Phaser.Sound.BaseSound | null = null;
    private backgroundLoader: Phaser.Loader.LoaderPlugin;
    private loadQueue: Array<{ type: string; key: string; url: string }> = [];
    private isLoading: boolean = false;

    constructor() {
        super(SCENE_KEYS.GLOBAL);
    }

    create() {
        console.log('[GlobalScene] Initialized - Persistent scene active');

        // Listen for audio commands from other scenes or React
        EventBus.on('play-bgm', this.playBGM, this);
        EventBus.on('stop-bgm', this.stopBGM, this);
        EventBus.on('play-sfx', this.playSFX, this);
        EventBus.on('queue-assets', this.queueAssets, this);
        EventBus.on('start-background-load', this.startBackgroundLoad, this);

        // Sync with game store
        this.syncWithStore();

        // Notify that GlobalScene is ready
        EventBus.emit('global-scene-ready');
    }

    private playBGM(key: string, config?: Phaser.Types.Sound.SoundConfig) {
        // Stop current BGM if playing
        if (this.currentBGM && this.currentBGM.isPlaying) {
            this.currentBGM.stop();
        }

        // Play new BGM
        this.currentBGM = this.sound.add(key, {
            loop: true,
            volume: 0.5,
            ...config
        });
        this.currentBGM.play();
        console.log(`[GlobalScene] Playing BGM: ${key}`);
    }

    private stopBGM() {
        if (this.currentBGM) {
            this.currentBGM.stop();
            this.currentBGM = null;
            console.log('[GlobalScene] BGM stopped');
        }
    }

    private playSFX(key: string, config?: Phaser.Types.Sound.SoundConfig) {
        this.sound.play(key, {
            volume: 0.7,
            ...config
        });
    }

    private queueAssets(assets: Array<{ type: string; key: string; url: string }>) {
        this.loadQueue.push(...assets);
        console.log(`[GlobalScene] Queued ${assets.length} assets for background loading`);
    }

    private startBackgroundLoad() {
        if (this.isLoading || this.loadQueue.length === 0) {
            return;
        }

        this.isLoading = true;
        console.log(`[GlobalScene] Starting background load of ${this.loadQueue.length} assets`);

        // Load assets from queue
        this.loadQueue.forEach(asset => {
            switch (asset.type) {
                case 'image':
                    this.load.image(asset.key, asset.url);
                    break;
                case 'audio':
                    this.load.audio(asset.key, asset.url);
                    break;
                case 'spritesheet':
                    // Add spritesheet loading logic if needed
                    break;
            }
        });

        this.load.once('complete', () => {
            console.log('[GlobalScene] Background loading complete');
            this.isLoading = false;
            this.loadQueue = [];
            EventBus.emit('background-load-complete');
        });

        this.load.start();
    }

    private syncWithStore() {
        // Subscribe to store changes and sync inventory/session data
        // This creates a bridge between Phaser and React state
        const unsubscribe = useGameStore.subscribe((state) => {
            // Mirror critical state to Phaser if needed
            // For now, we just log changes
            console.log('[GlobalScene] Store updated');
        });

        // Store unsubscribe for cleanup if needed
        this.events.once('shutdown', unsubscribe);
    }

    update() {
        // GlobalScene runs continuously but doesn't need active updates
        // Can be used for periodic tasks if needed
    }
}
