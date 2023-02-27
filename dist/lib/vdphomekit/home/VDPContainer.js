"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPHomeContainer = void 0;
const settings_1 = require("../../../settings");
const VDPAccessorySwitch_1 = require("../../accessories/VDPAccessorySwitch");
class VDPHomeContainer {
    constructor(withName, platform) {
        this.withName = withName;
        this.platform = platform;
        this._observers = [];
        this._sender = '';
        this._name = withName;
        this._uniqueIdentifier = platform.api.hap.uuid.generate(this.name);
        //this._accessoryState = false;
        this._accessories = [];
        this._containers = [];
        this._hbPlatform = platform;
        const existingTestRoomAccessory = this.HBPlatform.accessories.find(accessory => accessory.UUID === this.uniqueIdentifier);
        if (existingTestRoomAccessory) {
            this._accessory = new VDPAccessorySwitch_1.VDPAccessorySwitch(this.HBPlatform, existingTestRoomAccessory);
        }
        else {
            this.platform.log.error('SOMETHING -------------');
            const accessory = new this.HBPlatform.api.platformAccessory(this.name, this.uniqueIdentifier);
            this._accessory = new VDPAccessorySwitch_1.VDPAccessorySwitch(this.HBPlatform, accessory);
            this.HBPlatform.api.registerPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [accessory]);
        }
        this.attach(this.accessory);
        this.accessory.attach(this);
    }
    get observers() { return this._observers; }
    set observers(observers) { this._observers = observers; }
    get sender() { return this._sender; }
    set sender(sender) { this._sender = sender; }
    get name() { return this._name; }
    set name(name) { this._name = name; }
    get uniqueIdentifier() { return this._uniqueIdentifier; }
    set uniqueIdentifier(uniqueIdentifier) { this._uniqueIdentifier = uniqueIdentifier; }
    get accessory() { return this._accessory; }
    set accessory(accessory) { this._accessory = accessory; }
    //private _accessoryState: boolean;
    //public get accessoryState(): boolean { return this._accessoryState; }
    //protected set accessoryState(accessoryState: boolean) { this._accessoryState = accessoryState; }
    get accessoryState() { return this.accessory.On; }
    set accessoryState(value) { this.accessory.setOn(value); }
    get accessories() { return this._accessories; }
    set accessories(accessories) { this._accessories = accessories; }
    get containers() { return this._containers; }
    set containers(containers) { this._containers = containers; }
    get HBPlatform() { return this._hbPlatform; }
    set HBPlatform(platform) { this._hbPlatform = platform; }
    addAccessory(accessory) {
        const isExist = this.accessories.includes(accessory);
        if (isExist) {
            throw new Error('');
        }
        this.accessories.push(accessory);
        this.attach(accessory);
        accessory.attach(this);
    }
    removeAccessory(accessory) {
        const accessoryIndex = this.accessories.indexOf(accessory);
        if (accessoryIndex === -1) {
            throw new Error('');
        }
        this.accessories.splice(accessoryIndex, 1);
        this.detach(accessory);
    }
    addContainer(container) {
        const isExist = this.containers.includes(container);
        if (isExist) {
            throw new Error('');
        }
        this.containers.push(container);
        this.attach(container);
    }
    removeContainer(container) {
        const containerIndex = this.containers.indexOf(container);
        if (containerIndex === -1) {
            throw new Error('');
        }
        this.accessories.splice(containerIndex, 1);
        this.detach(container);
    }
    attach(observer) {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            throw new Error('attach error');
        }
        this.observers.push(observer);
    }
    detach(observer) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            throw new Error('');
        }
        this.observers.splice(observerIndex, 1);
    }
    notify(action, state, message) {
        for (const observer of this.observers) {
            observer.update(this, this.sender, action, state, message);
        }
    }
}
exports.VDPHomeContainer = VDPHomeContainer;
//# sourceMappingURL=VDPContainer.js.map