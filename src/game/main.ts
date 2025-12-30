import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game, Scale } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, GAME_VERSION } from '../constants';

const isDev = import.meta.env.DEV;

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'game-container',
    backgroundColor: COLORS.BACKGROUND,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: isDev
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ]
};

const StartGame = (parent: string) => {

    const game = new Game({ ...config, parent });

    // Custom Styled Console Log for DX
    const logStyle = [
        'background: #000',
        'color: #fff',
        'padding: 10px',
        'border-radius: 5px',
        'font-weight: bold',
        'border: 1px solid #ffcc00'
    ].join(';');

    console.log(
        `%c 🧛 VAMPIRE SURVIVOR CLONE | v${GAME_VERSION} | ${isDev ? 'DEBUG MODE' : 'PRODUCTION'} `,
        logStyle
    );

    return game;
}

export default StartGame;
