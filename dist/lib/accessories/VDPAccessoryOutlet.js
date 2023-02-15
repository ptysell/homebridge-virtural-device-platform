"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPAccessoryOutlet = void 0;
const VDPAccessory_1 = require("../accessory/VDPAccessory");
class VDPAccessoryOutlet extends VDPAccessory_1.VDPAccessory {
    constructor(HBPlatform, HBPlatformAccessory) {
        super(HBPlatform, HBPlatformAccessory);
        this.HBPlatform = HBPlatform;
        this.HBPlatformAccessory = HBPlatformAccessory;
        this.DEVICE_MODEL = 'VDP Outlet Accessory';
        this.observers = [];
    }
    initialize() {
        this._model = this.DEVICE_MODEL;
        console.log('Setting Accessory Model: ' + this.DEVICE_MODEL);
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
    setServices() {
        this._accessoryCharacteristics = { On: false, Name: this._name };
        this._accessoryState = { On: false };
        this._hbPlatformAccessoryService = this._hbPlatformAccessory.getService(this._hbPlatform.Service.Switch) || this._hbPlatformAccessory.addService(this._hbPlatform.Service.Switch);
    }
    setCharacteristics() {
        this._hbPlatformAccessoryService.setCharacteristic(this._hbPlatform.Characteristic.Name, this._name);
        this._hbPlatformAccessoryService.getCharacteristic(this._hbPlatform.Characteristic.On)
            .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
    }
    async getOn() {
        return this._accessoryState.On;
    }
    async setOn(value) {
        this._accessoryState.On = value;
        this.state = value;
        this._accessoryCharacteristics.On = value;
        this.notify();
    }
    update(observable) {
        if (observable instanceof VDPAccessory_1.VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessoryOutlet](Observer.Update) VDPAccessory |' + observable.name + '| Reacted To An Event');
        }
    }
}
exports.VDPAccessoryOutlet = VDPAccessoryOutlet;
//# sourceMappingURL=VDPAccessoryOutlet.js.map