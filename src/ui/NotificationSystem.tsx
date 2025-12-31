import React, { useEffect } from 'react';
import { useGameStore } from '../store/game-store';

export const NotificationSystem: React.FC = () => {
    const { notifications, removeNotification } = useGameStore();

    useEffect(() => {
        notifications.forEach((notification) => {
            setTimeout(() => {
                removeNotification(notification.id);
            }, 3000);
        });
    }, [notifications, removeNotification]);

    return (
        <div className="notification-container">
            {notifications.map((notification) => (
                <div key={notification.id} className={`notification notification-${notification.type}`}>
                    {notification.message}
                </div>
            ))}

            <style>{`
                .notification-container {
                    position: fixed;
                    top: env(safe-area-inset-top, 20px);
                    right: 20px;
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    pointer-events: none;
                }

                .notification {
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 5px;
                    border-left: 4px solid;
                    min-width: 250px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                    animation: slideIn 0.3s ease-out;
                }

                .notification-info {
                    border-left-color: #4488ff;
                }

                .notification-success {
                    border-left-color: #44ff44;
                }

                .notification-warning {
                    border-left-color: #ffcc00;
                }

                .notification-error {
                    border-left-color: #ff4444;
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};
