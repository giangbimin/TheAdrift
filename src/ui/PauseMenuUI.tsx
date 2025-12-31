import React from 'react';
import { useGameStore } from '../store/game-store';
import { translationManager, t } from '../services/TranslationService';
import { IRefPhaserGame } from './PhaserGame';
import { Button } from './basic/button';
import { Card, CardHeader, CardTitle, CardContent } from './basic/card';

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
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm font-orbitron">
            <Card variant="cyber" className="w-[90vw] max-w-sm border-amber-400/50 shadow-[0_0_50px_rgba(255,204,0,0.2)]">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-4xl text-amber-400 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,204,0,0.5)]">
                        {t('paused') || 'PAUSED'}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 p-8 pt-4">
                    <Button
                        variant="cyber"
                        className="w-full text-lg border-amber-400/50 hover:bg-amber-400/20 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(255,204,0,0.4)] text-amber-100"
                        onClick={handleResume}
                    >
                        {t('resume') || 'RESUME'}
                    </Button>

                    <Button
                        variant="cyber"
                        className="w-full text-lg border-white/30 text-white/80"
                        onClick={toggleLanguage}
                    >
                        {t('language') || 'LANGUAGE'}: {language.toUpperCase()}
                    </Button>

                    <Button
                        variant="exit"
                        className="w-full text-lg mt-4"
                        onClick={handleQuit}
                    >
                        {t('quit') || 'QUIT'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};
