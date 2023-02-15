"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPHomeContainer = void 0;
class VDPHomeContainer {
    constructor(name) {
        this._observers = [];
        this._name = name;
        this._uniqueIdentifier = 'NOT IMPLEMENTED';
        this._accessory = null;
        this._accessories = [];
        this._containers = [];
    }
    get observers() { return this._observers; }
    set observers(observers) { this._observers = observers; }
    get name() { return this._name; }
    set name(name) { this._name = name; }
    get uniqueIdentifier() { return this._uniqueIdentifier; }
    set uniqueIdentifier(uniqueIdentifier) { this._uniqueIdentifier = uniqueIdentifier; }
    get accessory() { return this._accessory; }
    set accessory(accessory) { this._accessory = accessory; }
    get accessories() { return this._accessories; }
    set accessories(accessories) { this._accessories = accessories; }
    get containers() { return this._containers; }
    set containers(containers) { this._containers = containers; }
}
exports.VDPHomeContainer = VDPHomeContainer;
//# sourceMappingURL=VDPHomeContainer.js.map