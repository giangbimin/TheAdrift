import { Scene } from 'phaser';
import { SCENE_KEYS } from '../../shared/constants';
import { EventBus } from '../../shared/EventBus';

export class OverlayScene extends Scene {
    private joystick: Phaser.GameObjects.Container;
    private joystickBase: Phaser.GameObjects.Circle;
    private joystickThumb: Phaser.GameObjects.Circle;
    private joystickPointer: Phaser.Input.Pointer | null = null;
    private joystickVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

    private flashOverlay: Phaser.GameObjects.Rectangle;

    constructor() {
        super(SCENE_KEYS.OVERLAY);
    }

    create() {
        console.log('[OverlayScene] Initialized');

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Create virtual joystick (bottom-left)
        this.createVirtualJoystick(100, height - 100);

        // Create flash overlay (for damage/effects)
        this.flashOverlay = this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0xff0000,
            0
        );
        this.flashOverlay.setDepth(1000);

        // Listen for flash effects from GameScene
        EventBus.on('trigger-screen-flash', this.triggerFlash, this);
        EventBus.on('player-hit', () => this.triggerFlash(0xff0000, 0.3), this);
        EventBus.on('player-levelup', () => this.triggerFlash(0xffcc00, 0.5), this);

        // Notify that OverlayScene is ready
        EventBus.emit('overlay-scene-ready');
    }

    private createVirtualJoystick(x: number, y: number) {
        const baseRadius = 60;
        const thumbRadius = 30;

        // Joystick base
        this.joystickBase = this.add.circle(x, y, baseRadius, 0x000000, 0.3);
        this.joystickBase.setStrokeStyle(2, 0xffffff, 0.5);

        // Joystick thumb
        this.joystickThumb = this.add.circle(x, y, thumbRadius, 0xffffff, 0.7);

        // Container for joystick
        this.joystick = this.add.container(0, 0, [this.joystickBase, this.joystickThumb]);
        this.joystick.setDepth(999);

        // Make joystick interactive
        this.joystickBase.setInteractive({ useHandCursor: true });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const distance = Phaser.Math.Distance.Between(
                pointer.x,
                pointer.y,
                this.joystickBase.x,
                this.joystickBase.y
            );

            if (distance < baseRadius) {
                this.joystickPointer = pointer;
            }
        });

        this.input.on('pointerup', () => {
            this.joystickPointer = null;
            this.joystickThumb.setPosition(this.joystickBase.x, this.joystickBase.y);
            this.joystickVector.set(0, 0);
            EventBus.emit('joystick-move', { x: 0, y: 0 });
        });
    }

    private triggerFlash(color: number = 0xff0000, intensity: number = 0.3) {
        this.flashOverlay.setFillStyle(color, intensity);

        this.tweens.add({
            targets: this.flashOverlay,
            alpha: 0,
            duration: 200,
            ease: 'Power2'
        });
    }

    update() {
        // Update joystick position
        if (this.joystickPointer) {
            const baseX = this.joystickBase.x;
            const baseY = this.joystickBase.y;
            const pointerX = this.joystickPointer.x;
            const pointerY = this.joystickPointer.y;

            const angle = Phaser.Math.Angle.Between(baseX, baseY, pointerX, pointerY);
            const distance = Phaser.Math.Distance.Between(baseX, baseY, pointerX, pointerY);
            const maxDistance = 60;

            const clampedDistance = Math.min(distance, maxDistance);
            const thumbX = baseX + Math.cos(angle) * clampedDistance;
            const thumbY = baseY + Math.sin(angle) * clampedDistance;

            this.joystickThumb.setPosition(thumbX, thumbY);

            // Calculate normalized vector
            this.joystickVector.set(
                (thumbX - baseX) / maxDistance,
                (thumbY - baseY) / maxDistance
            );

            // Emit joystick movement to GameScene
            EventBus.emit('joystick-move', {
                x: this.joystickVector.x,
                y: this.joystickVector.y
            });
        }
    }

    shutdown() {
        EventBus.removeListener('trigger-screen-flash', this.triggerFlash, this);
        EventBus.removeListener('player-hit');
        EventBus.removeListener('player-levelup');
    }
}
