import React from 'react';
import { useGameStore } from '../store/game-store';
import { EventBus } from '../shared/EventBus';

export const GameOverUI: React.FC = () => {
    const { isGameOver, resetGame } = useGameStore();

    const handleRestart = () => {
        resetGame();
        EventBus.emit('ui-restart-game');
    };

    if (!isGameOver) return null;

    return (
        <div className="game-over-ui">
            <div className="content">
                <h1 className="title">MISSION FAILED</h1>
                <div className="status-line">SIGNAL LOST</div>

                <button className="cyber-btn restart" onClick={handleRestart}>
                    REBOOT SYSTEM
                </button>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');

                .game-over-ui {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(10, 0, 0, 0.85);
                    z-index: 100;
                    font-family: 'Orbitron', sans-serif;
                    backdrop-filter: blur(10px);
                    animation: fadeIn 0.5s ease-out;
                }

                .content {
                    text-align: center;
                    color: #ff3333;
                }

                .title {
                    font-size: 8vmin;
                    margin: 0;
                    text-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
                    letter-spacing: 5px;
                }

                .status-line {
                    font-size: 3vmin;
                    color: #fff;
                    margin-bottom: 50px;
                    opacity: 0.8;
                }

                .cyber-btn {
                    padding: 2vmin 4vmin;
                    background: linear-gradient(90deg, rgba(255, 50, 50, 0.2), rgba(255, 50, 50, 0.4));
                    border: 1px solid #ff3333;
                    color: #fff;
                    font-family: 'Orbitron', sans-serif;
                    font-weight: 700;
                    font-size: 2.5vmin;
                    text-transform: uppercase;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(255, 50, 50, 0.3);
                    transition: all 0.3s;
                    position: relative;
                }

                .cyber-btn:hover {
                    background: rgba(255, 50, 50, 0.6);
                    box-shadow: 0 0 30px rgba(255, 50, 50, 0.6);
                    letter-spacing: 2px;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};
