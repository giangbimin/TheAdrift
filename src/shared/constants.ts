export const GAME_WIDTH = 1024;
export const GAME_HEIGHT = 768;
export const GAME_VERSION = '0.2.0-nebula';

export const SCENE_KEYS = {
    BOOT: 'Boot',
    PRELOADER: 'Preloader',
    MAIN_MENU: 'MainMenu',
    GAME: 'Game',
    GAME_OVER: 'GameOver',
    ORIENTATION_OVERLAY: 'OrientationOverlay',
    GLOBAL: 'GlobalScene',
    OVERLAY: 'OverlayScene'
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
    BOOT_LOGO: 'assets/nebula_grid_logo.png',
    BACKGROUND: 'assets/space_background.png',
    CLICK_SFX: 'https://labs.phaser.io/assets/audio/SoundEffects/click.wav',
    MENU_BGM: 'https://labs.phaser.io/assets/audio/jungle.mp3'
} as const;

export const COLORS = {
    BACKGROUND: 0x0f041d,
    PRIMARY: 0xffffff,
    SECONDARY: 0x000000,
    ACCENT: 0xffcc00,
    ERROR: 0xff0000,
    SUCCESS: 0x00ff00
} as const;

export const UI_CONFIG = {
    PRELOADER: {
        BAR_WIDTH_RATIO: 0.4,
        BAR_HEIGHT: 30,
        BAR_STROKE: 2,
        BAR_FILL_OFFSET: 8,
        TEXT_OFFSET_Y: 50,
        BOOT_LOGO_Y_RATIO: 0.4,
        FONT_SIZE: '24px',
        FONT_FAMILY: 'Arial'
    },
    TOAST: {
        DURATION: 3000,
        Y_OFFSET: 50
    },
    LOGO: {
        DEFAULT: {
            MAX_WIDTH: '70vw',
            MAX_HEIGHT: '35vh'
        },
        MOBILE: {
            MAX_WIDTH: '50vw',
            MAX_HEIGHT: '40vh'
        }
    }
} as const;

export const GAME_CONFIG = {
    AUDIO: {
        DEFAULT_BGM_VOLUME: 0.5,
        SFX_VOLUME: 1.0
    },
    TRANSITIONS: {
        DEFAULT_DURATION: 500,
        FLASH_DURATION: 500,
        LOGO_TWEEN: 2000
    }
} as const;

export const GAME_BALANCE = {
    PLAYER: {
        INITIAL_HP: 100,
        INITIAL_XP: 0,
        INITIAL_LEVEL: 1,
        MAX_XP_BASE: 100
    },
    TIMERS: {
        GAME_TICK: 1000,
        HIT_TEST_DELAY: 3000
    }
} as const;

export interface GameConfig {
    width: number;
    height: number;
    debug: boolean;
}
