import React from 'react';
import { IRefPhaserGame } from './PhaserGame';
import { useGameStore } from '../store/game-store';
import { translationManager, t } from '../services/TranslationService';
import { GAME_VERSION } from '../shared/constants';

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
                    <img src="assets/nebula_grid_logo.png" alt="Nebula Grid" className="game-logo" />
                </div>

                <div className="menu-grid">
                    {/* Primary Action */}
                    <div className="row-primary">
                        <button className="cyber-btn primary" onClick={handleStartGame}>
                            START JOURNEY
                        </button>
                    </div>

                    <div className="actions-wrapper">
                        {/* Secondary Actions Column 1 */}
                        <div className="col-secondary">
                            <button className="cyber-btn secondary">
                                <span className="btn-icon">📦</span> INVENTORY
                            </button>
                            <button className="cyber-btn secondary">
                                <span className="btn-icon">🚀</span> SHIP MANAGEMENT
                            </button>
                            <button className="cyber-btn secondary" onClick={() => { }}>
                                <span className="btn-icon">🔧</span> QIAM UPGRADES
                            </button>
                        </div>

                        {/* Secondary Actions Column 2 */}
                        <div className="col-secondary">
                            <button className="cyber-btn secondary">
                                <span className="btn-icon">💎</span> MODULE UPGRADES
                            </button>
                            <button className="cyber-btn secondary" onClick={() => { }}>
                                <span className="btn-icon">⚙</span> SETTINGS
                            </button>
                            <button className="cyber-btn exit" onClick={handleLogout}>
                                EXIT
                            </button>
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
                    max-width: 70vw; /* Increased from 40vw */
                    max-height: 35vh; /* Increased from 20vh */
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

                .cyber-btn {
                    position: relative;
                    width: 100%;
                    padding: 1.5vmin;
                    background: linear-gradient(90deg, rgba(0, 240, 255, 0.2), rgba(0, 240, 255, 0.4));
                    border: 1px solid #00f0ff;
                    color: #fff;
                    font-family: 'Orbitron', sans-serif;
                    font-weight: 700;
                    text-transform: uppercase;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
                    backdrop-filter: blur(5px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: visible; /* Changed from hidden to visible for accents */
                    box-sizing: border-box; /* Ensure padding doesn't increase width */
                }

                /* Corner Accents for Buttons */
                .cyber-btn::before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    width: 8px;
                    height: 8px;
                    border-top: 2px solid #00f0ff;
                    border-left: 2px solid #00f0ff;
                    transition: all 0.3s;
                }

                .cyber-btn::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    right: -1px;
                    width: 8px;
                    height: 8px;
                    border-bottom: 2px solid #00f0ff;
                    border-right: 2px solid #00f0ff;
                    transition: all 0.3s;
                }

                .cyber-btn:hover {
                    background: rgba(0, 240, 255, 0.4);
                    box-shadow: 0 0 25px rgba(0, 240, 255, 0.6);
                    border-color: #fff;
                    /* Removed letter-spacing to prevent layout shift */
                }

                .cyber-btn:hover::before, .cyber-btn:hover::after {
                    width: 100%;
                    height: 100%;
                    opacity: 0.3;
                }

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
                        max-width: 50vw; /* Increased from 30vw */
                        max-height: 40vh; /* Ensure it fits vertically */
                    }
                    
                    .actions-wrapper {
                        gap: 20px;
                    }

                    .cyber-btn.primary {
                        font-size: 14px;
                    }
                    
                    .cyber-btn.secondary, .cyber-btn.exit {
                        font-size: 11px;
                    }
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
