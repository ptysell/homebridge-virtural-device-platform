"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPAccessory = void 0;
//export interface HBPlatformAccessoryCharacteristics{}
class VDPAccessory {
    //protected _accessoryCharacteristics: IVDPAccessoryCharacteristics[];
    //public state = false;
    //protected _hbPlatformServices: Service[] | undefined;
    //protected _hbPlatformAccessoryService!: Service;
    //protected _hbCharacteristic: Characteristic[] | undefined;
    constructor(platform, platformAccessory) {
        this.platform = platform;
        this.platformAccessory = platformAccessory;
        this._observers = [];
        this._name = platformAccessory.displayName;
        this._uniqueIdentifier = platformAccessory.UUID;
        this._hbPlatform = platform;
        this._hbPlatformAccessory = platformAccessory;
        // this._hbPlatformAccessoryServices = undefined;
        this._accessoryInformation = { Manufacturer: 'N/A', Model: 'N/A', SerialNumber: 'N/A' };
        this._accessoryCharacteristics = {};
        //this._accessoryState = {name: this._name, uniqueIdentifier: this._uniqueIdentifier};
        //this._hbPlatformAccessoryService = this.HBPlatformAccessory.services;
        //this._hbCharacteristic = this._hbServices[0].characteristics.
        // this.initialize();
    }
    get observers() { return this._observers; }
    set observers(observers) { this._observers = observers; }
    get name() { return this._name; }
    set name(name) { this._name = name; }
    updateName(name) { this._name = name; }
    get uniqueIdentifier() { return this._uniqueIdentifier; }
    set uniqueIdentifier(uniqueIdentifier) { this._uniqueIdentifier = uniqueIdentifier; }
    get HBPlatform() { return this._hbPlatform; }
    set HBPlatform(platform) { this._hbPlatform = platform; }
    get HBPlatformAccessory() { return this._hbPlatformAccessory; }
    set HBPlatformAccessory(accessory) { this._hbPlatformAccessory = accessory; }
    get HBPlatformAccessoryService() { return this._hbPlatformAccessoryService; }
    set HBPlatformAccessoryServices(service) { this._hbPlatformAccessoryService = service; }
    get accessoryInformation() { return this._accessoryInformation; }
    ;
    set accessoryInformation(characteristic) { this._accessoryInformation = characteristic; }
    get accessoryCharacteristics() { return this._accessoryCharacteristics; }
    set accessoryCharacteristics(accessoryCharacteristics) { this._accessoryCharacteristics = accessoryCharacteristics; }
    // protected abstract initialize(): void;
    // protected abstract setAccessoryInformation(): void;
    // protected abstract setServices(): void;
    // protected abstract setCharacteristics(): void;
    //abstract getOn(): Promise<CharacteristicValue>;
    //abstract setOn(value: CharacteristicValue): void;
    attach(observer) {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return;
        }
        this.observers.push(observer);
    }
    detach(observer) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return;
        }
        this.observers.splice(observerIndex, 1);
    }
    notify() {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}
exports.VDPAccessory = VDPAccessory;
//# sourceMappingURL=VDPAccessory.js.map