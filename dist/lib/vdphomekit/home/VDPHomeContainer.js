"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPHomeContainer = void 0;
const settings_1 = require("../../../settings");
const VDPAccessorySwitch_1 = require("../../accessories/VDPAccessorySwitch");
class VDPHomeContainer {
    constructor(containerName, platform) {
        this.containerName = containerName;
        this.platform = platform;
        this._observers = [];
        this._name = containerName;
        this._uniqueIdentifier = platform.api.hap.uuid.generate(this.name);
        this._accessories = [];
        this._containers = [];
        this._hbPlatform = platform;
        const existingTestRoomAccessory = this.HBPlatform.accessories.find(accessory => accessory.UUID === this.uniqueIdentifier);
        if (existingTestRoomAccessory) {
            this.HBPlatform.log.debug('Restoring ROOM ACCESSORY form Cache:' + existingTestRoomAccessory.displayName);
            this._accessory = new VDPAccessorySwitch_1.VDPAccessorySwitch(this.HBPlatform, existingTestRoomAccessory);
        }
        else {
            this.HBPlatform.log.debug('Adding New ROOM ACCESSORY:' + this.name);
            const accessory = new this.HBPlatform.api.platformAccessory(this.name, this.uniqueIdentifier);
            this._accessory = new VDPAccessorySwitch_1.VDPAccessorySwitch(this.HBPlatform, accessory);
            this.HBPlatform.api.registerPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [accessory]);
        }
        this.attach(this.accessory, this.accessory.name, '<Constructor>');
        this.accessory.attach(this, this.name, 'asdf');
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
    get HBPlatform() { return this._hbPlatform; }
    set HBPlatform(platform) { this._hbPlatform = platform; }
    addAccessory(accessory) {
        this.HBPlatform.log.warn('Adding ACCESSORY to ROOM |' + accessory.name + ' | ' + this.name);
        const isExist = this.accessories.includes(accessory);
        if (isExist) {
            return;
        }
        this.accessories.push(accessory);
        this.attach(accessory, accessory.name, '<addAccessory>');
        accessory.attach(this, 'aqwer', '5rgreg');
    }
    removeAccessory(accessory) {
        const accessoryIndex = this.accessories.indexOf(accessory);
        if (accessoryIndex === -1) {
            return;
        }
        this.accessories.splice(accessoryIndex, 1);
        this.detach(accessory, '', '');
    }
    addContainer(container) {
        const isExist = this.containers.includes(container);
        if (isExist) {
            return;
        }
        this.containers.push(container);
        this.attach(container, container.name, '<addContainer>');
        container.attach(this, this.name, '<addContainer>');
    }
    removeContainer(container) {
        const containerIndex = this.containers.indexOf(container);
        if (containerIndex === -1) {
            return;
        }
        this.accessories.splice(containerIndex, 1);
        this.detach(container, '', '');
    }
    attach(observer, key, message) {
        this.HBPlatform.log.warn('Attaching ' + key + ' to Container ' + this.name + '...');
        const isExist = this.observers.includes(observer);
        if (isExist) {
            throw new Error('attach error');
        }
        this.observers.push(observer);
    }
    detach(observer, key, message) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return;
        }
        this.observers.splice(observerIndex, 1);
    }
    notify(key, message) {
        this.HBPlatform.log.warn('[VDPHomeContainer](' + this.name + ') notifying observers....(' + key + '|' + message + ')');
        for (const observer of this.observers) {
            observer.update(this, key, message);
        }
    }
}
exports.VDPHomeContainer = VDPHomeContainer;
//# sourceMappingURL=VDPHomeContainer.js.map