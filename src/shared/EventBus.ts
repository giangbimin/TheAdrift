import { Events } from 'phaser';

// The EventBus is a central EventEmitter that allows React and Phaser to communicate
// Phaser scenes can emit events that React listens to, and vice-versa.
export const EventBus = new Events.EventEmitter();
