"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPAccessory = void 0;
//import { VDPRoom } from '../home/VDPRoom';
const settings_1 = require("../../settings");
class VDPAccessory {
    constructor(HBPlatform, HBPlatformAccessory) {
        this.HBPlatform = HBPlatform;
        this.HBPlatformAccessory = HBPlatformAccessory;
        this.observers = [];
        this.DEVICE_MODEL = '';
        this.state = false;
        this._name = HBPlatformAccessory.displayName;
        this._uniqueIdentifier = HBPlatformAccessory.UUID;
        //this._accessoryState = {name: this._name, uniqueIdentifier: this._uniqueIdentifier};
        this._hbPlatform = HBPlatform;
        this._hbPlatformAccessory = HBPlatformAccessory;
        //this._hbPlatformAccessoryService = this.HBPlatformAccessory.services;
        //this._hbCharacteristic = this._hbServices[0].characteristics.
        this._manufacturer = settings_1.DEVICE_MANUFACTURER;
        this._model = this.DEVICE_MODEL;
        this._serialNumber = this._hbPlatformAccessory.UUID;
        this.initialize();
    }
    get name() {
        return this._name;
    }
    updateName(name) {
        this._name = name;
    }
    initialize() {
        this.setAccessoryInformation();
        this.setServices();
        this.setCharacteristics();
    }
    setAccessoryInformation() {
        this.HBPlatformAccessory.getService(this.HBPlatform.Service.AccessoryInformation)
            .setCharacteristic(this.HBPlatform.Characteristic.Manufacturer, this._manufacturer)
            .setCharacteristic(this.HBPlatform.Characteristic.Model, this._model)
            .setCharacteristic(this.HBPlatform.Characteristic.SerialNumber, this._serialNumber);
    }
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