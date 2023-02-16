"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPAccessoryOutlet = exports.DEVICE_MODEL = void 0;
const settings_1 = require("../../settings");
const VDPAccessory_1 = require("../accessory/VDPAccessory");
exports.DEVICE_MODEL = 'VDP Outlet Accessory';
class VDPAccessoryOutlet extends VDPAccessory_1.VDPAccessory {
    constructor(platform, accessory) {
        super(platform, accessory);
        this.platform = platform;
        this.accessory = accessory;
        this.accessoryInformation.Manufacturer = settings_1.DEVICE_MANUFACTURER;
        this.accessoryInformation.Model = exports.DEVICE_MODEL;
        this.accessoryInformation.SerialNumber = this.uniqueIdentifier;
        this.HBPlatformAccessory.getService(this.HBPlatform.Service.AccessoryInformation)
            .setCharacteristic(this.HBPlatform.Characteristic.Manufacturer, this.accessoryInformation.Manufacturer)
            .setCharacteristic(this.HBPlatform.Characteristic.Model, this.accessoryInformation.Model)
            .setCharacteristic(this.HBPlatform.Characteristic.SerialNumber, this.accessoryInformation.SerialNumber);
        this.On = false;
        this._hbPlatformAccessoryService = this.HBPlatformAccessory.getService(this.HBPlatform.Service.Switch) ||
            this.HBPlatformAccessory.addService(this.HBPlatform.Service.Switch);
        this.HBPlatformAccessoryService.setCharacteristic(this.platform.Characteristic.Name, this.name);
        this.HBPlatformAccessoryService.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
    }
    async getOn() {
        this.HBPlatform.log.warn('getOn: ' + this.On);
        return this.On;
    }
    async setOn(value) {
        this.HBPlatform.log.warn('setOn-01: ' + this.On + ' | ' + value);
        this.On = value;
        this.notify();
        this.HBPlatform.log.warn('setOn-02: ' + this.On + ' | ' + value);
    }
    update(observable) {
        if (observable instanceof VDPAccessory_1.VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessoryOutlet](Observer.Update)| ' + this.name + '| Reacted To An Event|' + observable.name);
        }
    }
}
exports.VDPAccessoryOutlet = VDPAccessoryOutlet;
//# sourceMappingURL=VDPAccessoryOutlet.js.map