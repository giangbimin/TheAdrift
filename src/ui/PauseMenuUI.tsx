import React from 'react';
import { useGameStore } from '../store/game-store';
import { translationManager, t } from '../services/TranslationService';
import { IRefPhaserGame } from './PhaserGame';

interface IProps {
    phaserRef: React.RefObject<IRefPhaserGame>;
}

export const PauseMenuUI: React.FC<IProps> = ({ phaserRef }) => {
    const { setPaused, setLanguage, language } = useGameStore();

    const handleResume = () => {
        if (phaserRef.current?.scene) {
            phaserRef.current.scene.events.emit('ui-resume-game');
            setPaused(false);
        }
    };

    const handleQuit = () => {
        if (phaserRef.current?.scene) {
            phaserRef.current.scene.events.emit('ui-quit-to-menu');
            setPaused(false);
        }
    };

    const toggleLanguage = () => {
        translationManager.toggleLanguage();
        setLanguage(translationManager.getCurrentLanguage());
    };

    return (
        <div className="pause-overlay">
            <div className="pause-content">
                <h1>{t('paused') || 'PAUSED'}</h1>
                <div className="button-group">
                    <button className="menu-button" onClick={handleResume}>
                        {t('resume') || 'RESUME'}
                    </button>
                    <button className="menu-button" onClick={toggleLanguage}>
                        {t('language') || 'LANGUAGE'}: {language.toUpperCase()}
                    </button>
                    <button className="menu-button quit" onClick={handleQuit}>
                        {t('quit') || 'QUIT'}
                    </button>
                </div>
            </div>

            <style>{`
                .pause-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(5px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    color: white;
                    font-family: 'Arial Black', sans-serif;
                }

                .pause-content {
                    background: rgba(40, 40, 40, 0.9);
                    padding: 40px;
                    border: 4px solid #ffcc00;
                    border-radius: 15px;
                    text-align: center;
                    box-shadow: 0 0 30px rgba(255, 204, 0, 0.3);
                }

                h1 {
                    font-size: 48px;
                    margin-bottom: 30px;
                    color: #ffcc00;
                    text-shadow: 4px 4px 0px #000;
                }

                .button-group {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .menu-button {
                    width: 250px;
                    height: 50px;
                    background: #222;
                    color: white;
                    border: 2px solid white;
                    font-size: 20px;
                    cursor: pointer;
                    transition: all 0.1s;
                }

                .menu-button:hover {
                    background: #ffcc00;
                    color: black;
                    transform: scale(1.05);
                }

                .menu-button.quit:hover {
                    background: #ff4444;
                    color: white;
                }
            `}</style>
        </div>
    );
};
