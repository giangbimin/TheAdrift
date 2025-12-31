import React, { useState } from 'react';
import { useGameStore } from '../store/game-store';

export const LoginScreen: React.FC = () => {
    const { session, login } = useGameStore();
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        if (username.trim()) {
            login(Date.now().toString(), username);
        }
    };

    if (session.isAuthenticated) {
        return null;
    }

    return (
        <div className="login-screen">
            <div className="content-wrapper">
                {/* Left Side: Logo */}
                <div className="left-panel">
                    <img src="assets/nebula_grid_logo.png" alt="Nebula Grid" className="login-logo" />
                </div>

                {/* Vertical Divider */}
                <div className="divider"></div>

                {/* Right Side: Login Form */}
                <div className="right-panel">
                    <div className="login-box">
                        <div className="login-title">PILOT IDENTIFICATION</div>

                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="ENTER CALLSIGN"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                autoFocus
                            />
                            <div className="input-glow"></div>
                        </div>

                        <button className="cyber-btn confirm" onClick={handleLogin}>
                            INITIALIZE LINK
                        </button>

                        <div className="system-status">
                            SYSTEM STATUS: <span className="online">ONLINE</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="background-overlay"></div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');

                .login-screen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #050510;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 999;
                    font-family: 'Orbitron', sans-serif;
                    overflow: hidden;
                    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
                }

                .background-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url('assets/space_background.png');
                    background-size: cover;
                    background-position: center;
                    opacity: 0.4;
                    z-index: -1;
                }

                .content-wrapper {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    width: 90vw;
                    max-width: 1000px;
                    height: 80vh;
                    gap: 0;
                    position: relative;
                }

                /* Left Panel: Logo */
                .left-panel {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-right: 4vw;
                    animation: slideInLeft 0.8s ease-out;
                }

                .login-logo {
                    width: 100%;
                    max-width: 500px;
                    height: auto;
                    filter: drop-shadow(0 0 20px rgba(0, 240, 255, 0.5));
                    mix-blend-mode: screen;
                }

                /* Divider */
                .divider {
                    width: 2px;
                    height: 60%;
                    background: linear-gradient(180deg, transparent, rgba(0, 240, 255, 0.5), transparent);
                    box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
                    animation: fadeIn 1s ease-out;
                }

                /* Right Panel: Login Form */
                .right-panel {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-left: 4vw;
                    animation: slideInRight 0.8s ease-out;
                }

                .login-box {
                    width: 100%;
                    max-width: 380px;
                    padding: 40px;
                    background: rgba(0, 10, 20, 0.85);
                    border: 2px solid rgba(0, 240, 255, 0.3);
                    border-radius: 4px;
                    backdrop-filter: blur(15px);
                    position: relative;
                    /* Fancy border corners */
                    box-shadow: 
                        0 0 20px rgba(0, 0, 0, 0.5),
                        inset 0 0 20px rgba(0, 240, 255, 0.05);
                }

                /* Corner Accents */
                .login-box::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    width: 20px;
                    height: 20px;
                    border-top: 2px solid #00f0ff;
                    border-left: 2px solid #00f0ff;
                    box-shadow: -2px -2px 10px rgba(0, 240, 255, 0.5);
                }

                .login-box::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 20px;
                    height: 20px;
                    border-bottom: 2px solid #00f0ff;
                    border-right: 2px solid #00f0ff;
                    box-shadow: 2px 2px 10px rgba(0, 240, 255, 0.5);
                }

                .login-title {
                    color: #fff;
                    text-align: center;
                    font-size: 20px;
                    margin-bottom: 30px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: #00f0ff;
                    text-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
                }

                .input-wrapper {
                    position: relative;
                    margin-bottom: 25px;
                }

                input {
                    width: 100%;
                    padding: 15px;
                    background: rgba(0, 0, 0, 0.6);
                    border: 1px solid rgba(0, 240, 255, 0.3);
                    color: #fff;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 16px;
                    text-align: center;
                    outline: none;
                    transition: all 0.3s;
                    box-sizing: border-box;
                    border-radius: 2px;
                }

                input:focus {
                    background: rgba(0, 240, 255, 0.1);
                    border-color: #00f0ff;
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
                    letter-spacing: 1px;
                }

                .cyber-btn {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(90deg, rgba(0, 240, 255, 0.2), rgba(0, 240, 255, 0.4));
                    border: 1px solid #00f0ff;
                    color: #fff;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    text-transform: uppercase;
                    transition: all 0.3s;
                    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
                    position: relative;
                    overflow: visible; /* Allow accents to pop if needed, but safe inside usually */
                }

                /* Corner Accents for Button */
                .cyber-btn::before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    width: 10px;
                    height: 10px;
                    border-top: 2px solid #00f0ff;
                    border-left: 2px solid #00f0ff;
                    transition: all 0.3s;
                }

                .cyber-btn::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    right: -1px;
                    width: 10px;
                    height: 10px;
                    border-bottom: 2px solid #00f0ff;
                    border-right: 2px solid #00f0ff;
                    transition: all 0.3s;
                }

                .cyber-btn:hover {
                    background: rgba(0, 240, 255, 0.4);
                    color: #fff;
                    box-shadow: 0 0 25px rgba(0, 240, 255, 0.6);
                    border-color: #fff;
                    /* Removed letter-spacing to prevent layout shift */
                }

                .cyber-btn:hover::before, .cyber-btn:hover::after {
                    width: 100%;
                    height: 100%;
                    opacity: 0.3;
                }

                .system-status {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 10px;
                    color: #666;
                    letter-spacing: 1px;
                }

                .online {
                    color: #00ff00;
                    text-shadow: 0 0 5px #00ff00;
                }

                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; height: 0; }
                    to { opacity: 1; height: 60%; }
                }

                /* Mobile Landscape Optimization */
                @media (max-width: 900px) and (orientation: landscape) {
                   .content-wrapper {
                       width: 100%;
                       padding: 0 20px;
                   }
                   
                   .left-panel {
                       padding-right: 2vw;
                   }
                   
                   .right-panel {
                       padding-left: 2vw;
                   }
                   
                   .login-logo {
                       max-width: 350px; /* Limit logo size on small heights */
                   }
                   
                   .login-box {
                       padding: 20px;
                       max-width: 320px;
                   }
                   
                   .login-title {
                       font-size: 16px;
                       margin-bottom: 20px;
                   }
                   
                   input, .cyber-btn {
                       padding: 10px;
                       font-size: 14px;
                   }
                }
            `}</style>
        </div>
    );
};
