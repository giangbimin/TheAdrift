import React from 'react';
import { useGameStore } from '../store/game-store';

export const InventoryUI: React.FC = () => {
    const { inventory, isInventoryOpen, toggleInventory } = useGameStore();

    if (!isInventoryOpen) {
        return null;
    }

    return (
        <div className="inventory-overlay">
            <div className="inventory-panel">
                <div className="inventory-header">
                    <h2>Inventory</h2>
                    <button onClick={toggleInventory}>✕</button>
                </div>
                <div className="inventory-grid">
                    {inventory.length === 0 ? (
                        <p className="empty-message">No items</p>
                    ) : (
                        inventory.map((item) => (
                            <div key={item.id} className="inventory-item">
                                <div className="item-icon">{item.icon}</div>
                                <div className="item-name">{item.name}</div>
                                <div className="item-quantity">x{item.quantity}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style>{`
                .inventory-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 998;
                    pointer-events: auto;
                }

                .inventory-panel {
                    background: #1a1a1a;
                    border: 2px solid #ffcc00;
                    border-radius: 10px;
                    padding: 20px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                }

                .inventory-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    color: white;
                }

                .inventory-header h2 {
                    margin: 0;
                    color: #ffcc00;
                }

                .inventory-header button {
                    background: #ff4444;
                    border: none;
                    color: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                }

                .inventory-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                    gap: 10px;
                }

                .inventory-item {
                    background: #2a2a2a;
                    border: 1px solid #444;
                    border-radius: 5px;
                    padding: 10px;
                    text-align: center;
                    color: white;
                }

                .item-icon {
                    font-size: 32px;
                    margin-bottom: 5px;
                }

                .item-name {
                    font-size: 12px;
                    margin-bottom: 3px;
                }

                .item-quantity {
                    font-size: 10px;
                    color: #ffcc00;
                }

                .empty-message {
                    color: #888;
                    text-align: center;
                    padding: 40px;
                }
            `}</style>
        </div>
    );
};
