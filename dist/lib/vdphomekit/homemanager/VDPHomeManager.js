"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPHomeManager = void 0;
class VDPHomeManager {
    constructor() {
        this._homes = [];
    }
    get homes() { return this._homes; }
    set homes(homes) { this._homes = homes; }
    get delegate() { return this._delegate; }
    set delegate(delegate) { this._delegate = delegate; }
    get observers() { return this._observers; }
    set observers(observers) { this._observers = observers; }
    addHome(withName) {
        try {
        }
        catch (error) {
        }
        finally {
            this.addHomeCompletionHandler();
        }
    }
    addHomeCompletionHandler() { }
    removeHome() {
        try {
        }
        catch (error) {
        }
        finally {
            this.removeHomeCompletionHandler();
        }
    }
    removeHomeCompletionHandler() { }
}
exports.VDPHomeManager = VDPHomeManager;
//# sourceMappingURL=VDPHomeManager.js.map