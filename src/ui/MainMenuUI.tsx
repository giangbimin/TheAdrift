import React from 'react';
import { IRefPhaserGame } from './PhaserGame';
import { useGameStore } from '../store/game-store';
import { translationManager, t } from '../services/TranslationService';
import { SCENE_KEYS } from '../shared/constants';

interface IProps {
    phaserRef: React.RefObject<IRefPhaserGame>;
}

export const MainMenuUI: React.FC<IProps> = ({ phaserRef }) => {
    const { language, setLanguage } = useGameStore();

    const handleStartGame = () => {
        if (phaserRef.current?.scene) {
            // Trigger start game in Phaser
            phaserRef.current.scene.events.emit('ui-start-game');
        }
    };

    const toggleLanguage = () => {
        translationManager.toggleLanguage();
        setLanguage(translationManager.getCurrentLanguage());
    };

    return (
        <div className="main-menu-ui">
            <div className="logo-placeholder"></div>

            <div className="button-container">
                <button className="menu-button" onClick={handleStartGame}>
                    {t('start_game')}
                </button>
                <button className="menu-button">
                    {t('options')}
                </button>
                <button className="menu-button">
                    {t('credits')}
                </button>
            </div>

            <button className="lang-toggle" onClick={toggleLanguage}>
                {language.toUpperCase()}
            </button>

            <style>{`
                .main-menu-ui {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    font-family: 'Arial Black', sans-serif;
                }
                .button-container {
                    margin-top: 15vh;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    pointer-events: auto;
                }
                .menu-button {
                    width: 280px;
                    height: 70px;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    border: 2px solid white;
                    font-size: 28px;
                    cursor: pointer;
                    transition: all 0.1s;
                }
                .menu-button:hover {
                    background: #ffcc00;
                    color: black;
                    transform: scale(1.05);
                    border-width: 4px;
                }
                .lang-toggle {
                    position: absolute;
                    top: 5%;
                    right: 5%;
                    padding: 10px 20px;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    border: 2px solid white;
                    cursor: pointer;
                    pointer-events: auto;
                }
            `}</style>
        </div>
    );
};
