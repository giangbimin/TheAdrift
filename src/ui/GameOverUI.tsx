import React from 'react';
import { useGameStore } from '../store/game-store';
import { EventBus } from '../shared/EventBus';
import { Button } from './basic/button';
import { Card, CardHeader, CardTitle, CardContent } from './basic/card';

export const GameOverUI: React.FC = () => {
    const { isGameOver, resetGame } = useGameStore();

    const handleRestart = () => {
        resetGame();
        EventBus.emit('ui-restart-game');
    };

    if (!isGameOver) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/85 z-50 backdrop-blur-sm animate-fade-in font-orbitron">
            <Card variant="cyber" className="w-[90vw] max-w-md border-red-500/50 shadow-[0_0_50px_rgba(255,0,0,0.4)]">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-[8vmin] md:text-5xl text-red-500 tracking-[0.2em] animate-pulse">
                        MISSION FAILED
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-8 pt-4">
                    <div className="text-xl md:text-2xl text-white/80 tracking-widest uppercase">
                        SIGNAL LOST
                    </div>

                    <Button
                        variant="exit"
                        size="cyber"
                        onClick={handleRestart}
                        className="w-full text-xl py-6"
                    >
                        REBOOT SYSTEM
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};
