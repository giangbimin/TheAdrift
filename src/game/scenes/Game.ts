import { Scene } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, GAME_WIDTH, GAME_HEIGHT, GAME_BALANCE } from '../../shared/constants';
import { EventBus } from '../../shared/EventBus';

export class Game extends Scene {
    private isPaused: boolean = false;
    private timerEvent: Phaser.Time.TimerEvent;
    private joystickVector: { x: number; y: number } = { x: 0, y: 0 };

    // Game stats
    private stats = {
        hp: GAME_BALANCE.PLAYER.INITIAL_HP,
        maxHp: GAME_BALANCE.PLAYER.INITIAL_HP,
        xp: GAME_BALANCE.PLAYER.INITIAL_XP,
        maxXp: GAME_BALANCE.PLAYER.MAX_XP_BASE,
        level: GAME_BALANCE.PLAYER.INITIAL_LEVEL,
        score: 0,
        timer: 0
    };

    constructor() {
        super(SCENE_KEYS.GAME);
    }

    create() {
        this.isPaused = false;

        // Reset stats for new game
        this.stats = {
            hp: GAME_BALANCE.PLAYER.INITIAL_HP,
            maxHp: GAME_BALANCE.PLAYER.INITIAL_HP,
            xp: GAME_BALANCE.PLAYER.INITIAL_XP,
            maxXp: GAME_BALANCE.PLAYER.MAX_XP_BASE,
            level: GAME_BALANCE.PLAYER.INITIAL_LEVEL,
            score: 0,
            timer: 0
        };

        // Background
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, ASSET_KEYS.BACKGROUND)
            .setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

        // Launch OverlayScene in parallel
        this.scene.launch(SCENE_KEYS.OVERLAY);

        // Input: Pause Menu
        this.input.keyboard.on('keydown-ESC', () => this.togglePause());

        // Listen for joystick input from OverlayScene
        EventBus.on('joystick-move', this.handleJoystickInput, this);

        // UI Event Listeners
        this.events.on('ui-resume-game', () => this.resumeGame());
        this.events.on('ui-quit-to-menu', () => this.quitToMenu());

        // Game Timer
        this.timerEvent = this.time.addEvent({
            delay: GAME_BALANCE.TIMERS.GAME_TICK,
            callback: () => {
                if (!this.isPaused) {
                    this.stats.timer++;
                    this.emitStats();
                }
            },
            loop: true
        });

        // Test: Trigger screen flash after X seconds
        this.time.delayedCall(GAME_BALANCE.TIMERS.HIT_TEST_DELAY, () => {
            EventBus.emit('player-hit');
        });

        // Initial sync
        this.emitStats();

        // Notify React that the scene is ready
        EventBus.emit('current-scene-ready', this);
    }

    private handleJoystickInput(vector: { x: number; y: number }) {
        this.joystickVector = vector;
        // In a real game, this would move the player
        // For now, we just store the vector
    }

    private emitStats() {
        EventBus.emit('update-game-metrics', { ...this.stats });
    }

    private togglePause() {
        if (this.isPaused) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }
    }

    private pauseGame() {
        this.isPaused = true;
        this.physics.pause();
        this.scene.pause(SCENE_KEYS.OVERLAY);
        EventBus.emit('game-paused', true);
    }

    private resumeGame() {
        this.isPaused = false;
        this.physics.resume();
        this.scene.resume(SCENE_KEYS.OVERLAY);
        EventBus.emit('game-paused', false);
    }

    private quitToMenu() {
        this.scene.stop(SCENE_KEYS.OVERLAY);
        this.scene.start(SCENE_KEYS.MAIN_MENU);
    }

    update() {
        if (this.isPaused) return;

        // Example: Use joystick vector for player movement
        if (this.joystickVector.x !== 0 || this.joystickVector.y !== 0) {
            // Move player based on joystick input
            // console.log('Joystick:', this.joystickVector);
        }
    }

    shutdown() {
        EventBus.removeListener('joystick-move', this.handleJoystickInput, this);
    }
}
