import React, { useMemo } from 'react';
import { useGameStore } from '../store/game-store';
import { t } from '../services/TranslationService';

export const HudUI: React.FC = () => {
    const { hp, maxHp, xp, maxXp, level, score, timer } = useGameStore();

    const hpPercent = useMemo(() => Math.max(0, (hp / maxHp) * 100), [hp, maxHp]);
    const xpPercent = useMemo(() => Math.max(0, (xp / maxXp) * 100), [xp, maxXp]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="hud-overlay">
            {/* Top XP Bar */}
            <div className="xp-container">
                <div className="xp-bar-bg">
                    <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }}>
                        <div className="xp-shine"></div>
                    </div>
                </div>
                <div className="level-badge">
                    <span className="level-label">LV</span>
                    <span className="level-number">{level}</span>
                </div>
            </div>

            {/* Top Left Stats */}
            <div className="stats-panel">
                <div className="stat-item timer">
                    <span className="stat-icon">⏱</span>
                    <span className="stat-value">{formatTime(timer)}</span>
                </div>
                <div className="stat-item score">
                    <span className="stat-icon">⭐</span>
                    <span className="stat-value">{score.toLocaleString()}</span>
                </div>
            </div>

            {/* Bottom Left HP Bar */}
            <div className="hp-container">
                <div className="hp-label">
                    <span>❤️ HP</span>
                    <span>{hp} / {maxHp}</span>
                </div>
                <div className="hp-bar-bg">
                    <div
                        className="hp-bar-fill"
                        style={{
                            width: `${hpPercent}%`,
                            background: hpPercent > 50 ? '#4ade80' : hpPercent > 25 ? '#fbbf24' : '#ef4444'
                        }}
                    >
                        <div className="hp-shine"></div>
                    </div>
                </div>
            </div>

            <style>{`
                .hud-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    z-index: 10;
                }

                /* XP Bar - Top */
                .xp-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .xp-bar-bg {
                    flex: 1;
                    height: 28px;
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 14px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    overflow: hidden;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
                }

                .xp-bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                    transition: width 0.3s ease-out;
                    position: relative;
                    overflow: hidden;
                }

                .xp-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    animation: shine 2s infinite;
                }

                @keyframes shine {
                    to { left: 100%; }
                }

                .level-badge {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    background: linear-gradient(135deg, #ffcc00, #ff9900);
                    padding: 8px 16px;
                    border-radius: 20px;
                    box-shadow: 0 4px 15px rgba(255, 204, 0, 0.5);
                    font-weight: bold;
                    color: #000;
                }

                .level-label {
                    font-size: 12px;
                }

                .level-number {
                    font-size: 20px;
                }

                /* Stats Panel - Top Left */
                .stats-panel {
                    position: absolute;
                    top: 60px;
                    left: 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(10px);
                    padding: 10px 15px;
                    border-radius: 10px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
                }

                .stat-icon {
                    font-size: 20px;
                }

                .stat-value {
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                }

                .timer .stat-value {
                    color: #60a5fa;
                }

                .score .stat-value {
                    color: #fbbf24;
                }

                /* HP Bar - Bottom Left */
                .hp-container {
                    position: absolute;
                    bottom: 30px;
                    left: 15px;
                    width: 300px;
                }

                .hp-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: bold;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                }

                .hp-bar-bg {
                    height: 24px;
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 12px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    overflow: hidden;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
                }

                .hp-bar-fill {
                    height: 100%;
                    transition: width 0.2s ease-out, background 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .hp-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    animation: shine 2s infinite;
                }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .xp-container {
                        padding: 10px;
                    }
                    
                    .stats-panel {
                        top: 50px;
                        left: 10px;
                    }
                    
                    .stat-item {
                        padding: 8px 12px;
                    }
                    
                    .stat-value {
                        font-size: 16px;
                    }
                    
                    .hp-container {
                        width: calc(100% - 20px);
                        left: 10px;
                        bottom: 20px;
                    }
                }
            `}</style>
        </div>
    );
};
