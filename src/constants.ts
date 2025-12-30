export const GAME_WIDTH = 1024;
export const GAME_HEIGHT = 768;
export const GAME_VERSION = '0.1.0-alpha';

export const SCENE_KEYS = {
    BOOT: 'Boot',
    PRELOADER: 'Preloader',
    MAIN_MENU: 'MainMenu',
    GAME: 'Game',
    GAME_OVER: 'GameOver',
    ORIENTATION_OVERLAY: 'OrientationOverlay'
} as const;

export const SETTINGS = {
    SAFE_ZONE_PERCENT: 0.8,
    DEFAULT_LANG: 'en'
} as const;

export const ASSET_KEYS = {
    PHASER_LOGO: 'phaser_logo',
    BOOT_LOGO: 'boot_logo',
    BACKGROUND: 'background',
    CLICK_SFX: 'click_sfx',
    MENU_BGM: 'menu_bgm'
} as const;

export const ASSET_URLS = {
    BOOT_LOGO: 'https://labs.phaser.io/assets/sprites/phaser3-logo.png',
    BACKGROUND: 'https://labs.phaser.io/assets/skies/space3.png',
    CLICK_SFX: 'https://labs.phaser.io/assets/audio/SoundEffects/click.wav',
    MENU_BGM: 'https://labs.phaser.io/assets/audio/jungle.mp3'
} as const;

export const COLORS = {
    BACKGROUND: 0x028af8,
    PRIMARY: 0xffffff,
    SECONDARY: 0x000000,
    ACCENT: 0xffcc00
} as const;

export interface GameConfig {
    width: number;
    height: number;
    debug: boolean;
}
