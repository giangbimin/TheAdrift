import React from 'react';
import { IRefPhaserGame } from './PhaserGame';
import { useGameStore } from '../store/game-store';
import { translationManager, t } from '../services/TranslationService';
import { GAME_VERSION, ASSET_URLS, UI_CONFIG } from '../shared/constants';
import { Button } from './basic/button';

interface IProps {
    phaserRef: React.RefObject<IRefPhaserGame>;
}

export const MainMenuUI: React.FC<IProps> = ({ phaserRef }) => {
    const { language, setLanguage, session, logout } = useGameStore();

    const handleStartGame = () => {
        if (phaserRef.current?.scene) {
            phaserRef.current.scene.events.emit('ui-start-game');
        }
    };

    const toggleLanguage = () => {
        translationManager.toggleLanguage();
        setLanguage(translationManager.getCurrentLanguage());
    };

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <div className="main-menu-ui">
            {/* Top Bar */}
            <div className="top-bar">
                <div className="left-section">
                    <span className="location-text">HOME BACKGROUND</span>
                </div>
                <div className="right-section">
                    <div className="icon-btn">🔊</div>
                    <div className="icon-btn">🎵</div>
                    <div className="icon-btn help">▶</div>
                </div>
            </div>

            {/* Center Content */}
            <div className="center-content">
                <div className="logo-section">
                    <img src={ASSET_URLS.BOOT_LOGO} alt="Nebula Grid" className="game-logo" />
                </div>

                <div className="menu-grid">
                    {/* Primary Action */}
                    <div className="row-primary">
                        <Button variant="cyber" size="cyber" onClick={handleStartGame}>
                            START JOURNEY
                        </Button>
                    </div>

                    <div className="actions-wrapper">
                        {/* Secondary Actions */}
                        <div className="col-secondary">
                            <Button variant="cyber" size="cyber" onClick={() => { }}>
                                <span className="mr-2">📦</span> INVENTORY
                            </Button>
                            <Button variant="cyber" size="cyber" onClick={() => { }}>
                                <span className="mr-2">🚀</span> SHIP MANAGEMENT
                            </Button>
                            <Button variant="cyber" size="cyber" onClick={() => { }}>
                                <span className="mr-2">🔧</span> QIAM UPGRADES
                            </Button>
                        </div>

                        <div className="col-secondary">
                            <Button variant="cyber" size="cyber" onClick={() => { }}>
                                <span className="mr-2">💎</span> MODULE UPGRADES
                            </Button>
                            <Button variant="cyber" size="cyber" onClick={() => { }}>
                                <span className="mr-2">⚙</span> SETTINGS
                            </Button>
                            <Button variant="exit" size="cyber" onClick={handleLogout}>
                                EXIT
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="bottom-bar">
                <div className="social-icons">
                    <span>🐦</span><span>💬</span><span>👽</span><span>📺</span>
                </div>
                <div className="version-info">
                    ALPHA {GAME_VERSION}
                    <div className="star-icon">✦</div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');

                .main-menu-ui {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    font-family: 'Orbitron', sans-serif;
                    color: white;
                    background: transparent;
                    overflow: hidden;
                    padding-left: env(safe-area-inset-left);
                    padding-right: env(safe-area-inset-right);
                    padding-top: env(safe-area-inset-top);
                    padding-bottom: env(safe-area-inset-bottom);
                }

                /* Top Bar */
                .top-bar {
                    display: flex;
                    justify-content: space-between;
                    padding: 2vmin 40px;
                    pointer-events: auto;
                    flex-shrink: 0;
                }

                .location-text {
                    font-size: 2vmin;
                    letter-spacing: 1px;
                    color: #fff;
                    text-transform: uppercase;
                }

                .right-section {
                    display: flex;
                    gap: 15px;
                }

                .icon-btn {
                    cursor: pointer;
                    opacity: 0.8;
                    font-size: 2.5vmin;
                    transition: all 0.2s;
                }

                /* Center Content */
                .center-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 0 20px;
                    overflow-y: auto; /* Allow scrolling on very small screens */
                }

                .logo-section {
                    margin-bottom: 3vmin;
                    animation: float 4s ease-in-out infinite;
                }

                .game-logo {
                    max-width: ${UI_CONFIG.LOGO.DEFAULT.MAX_WIDTH};
                    max-height: ${UI_CONFIG.LOGO.DEFAULT.MAX_HEIGHT};
                    width: auto;
                    height: auto;
                    filter: drop-shadow(0 0 20px rgba(0, 240, 255, 0.3));
                }

                /* Menu Grid */
                .menu-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 2vmin;
                    z-index: 10;
                    width: 100%;
                    align-items: center;
                    pointer-events: auto;
                }

                .row-primary {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1vmin;
                }

                .actions-wrapper {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    width: 100%;
                    flex-wrap: wrap; /* Wrap on very small screens */
                }

                .col-secondary {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5vmin;
                }

                /* Button styles moved to CyberButton component */

                /* Bottom Bar */
                .bottom-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    padding: 2vmin 40px;
                    pointer-events: auto;
                    flex-shrink: 0;
                }

                .social-icons {
                    display: flex;
                    gap: 15px;
                    font-size: 2.5vmin;
                    opacity: 0.7;
                }

                .version-info {
                    text-align: right;
                    font-size: 1.5vmin;
                    color: #fff;
                }

                .star-icon {
                    font-size: 3vmin;
                    color: #fff;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                /* Mobile Landscape Specific Tweaks */
                @media (max-width: 900px) and (orientation: landscape) {
                    .top-bar, .bottom-bar {
                        padding: 10px 20px;
                    }
                    
                    .game-logo {
                        max-width: ${UI_CONFIG.LOGO.MOBILE.MAX_WIDTH};
                        max-height: ${UI_CONFIG.LOGO.MOBILE.MAX_HEIGHT};
                        margin-bottom: 5px;
                    }
                    
                    .actions-wrapper {
                        gap: 20px;
                    }

                    /* Button overrides handled in component */
                }
                
                /* Just in case of portrait mobile (though game forces landscape) */
                @media (orientation: portrait) {
                    .actions-wrapper {
                         flex-direction: column;
                         gap: 10px;
                    }
                }
            `}</style>
        </div>
    );
};
